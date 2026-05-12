import os
import pandas as pd

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors

from reportlab.lib.styles import getSampleStyleSheet

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from sklearn.linear_model import LinearRegression

from app.database import get_db

from app.models.dataset import Dataset
from app.models.user import User

from app.auth.oauth2 import get_current_user


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


# ==================================
# EXPORT EXCEL REPORT
# ==================================

@router.get("/export-excel")
def export_excel_report(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    # ============================
    # GET DATASET
    # ============================

    dataset = db.query(Dataset).filter(

        Dataset.uploaded_by == current_user.id

    ).order_by(

        Dataset.created_at.desc()

    ).first()

    if not dataset:

        raise HTTPException(

            status_code=404,

            detail="No dataset found"
        )

    # ============================
    # READ FILE
    # ============================

    try:

        if dataset.file_path.endswith(".csv"):

            df = pd.read_csv(
                dataset.file_path
            )

        else:

            df = pd.read_excel(
                dataset.file_path
            )

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )

    # ============================
    # DETECT COLUMNS
    # ============================

    date_column = None
    sales_column = None

    for col in df.columns:

        col_name = col.lower()

        if "date" in col_name:

            date_column = col

        if (
            "sales" in col_name
            or "revenue" in col_name
            or "amount" in col_name
            or "income" in col_name
        ):

            sales_column = col

    if not date_column or not sales_column:

        raise HTTPException(

            status_code=400,

            detail="Required columns not found"
        )

    # ============================
    # PROCESS MONTHLY DATA
    # ============================

    df[date_column] = pd.to_datetime(
        df[date_column]
    )

    df["month"] = df[
        date_column
    ].dt.to_period("M")

    monthly_data = (

        df.groupby("month")[sales_column]
        .sum()
        .reset_index()

    )

    # ============================
    # FORECASTING
    # ============================

    monthly_data["month_index"] = range(
        len(monthly_data)
    )

    X = monthly_data[[
        "month_index"
    ]]

    y = monthly_data[
        sales_column
    ]

    model = LinearRegression()

    model.fit(X, y)

    future_indexes = pd.DataFrame({

        "month_index": range(

            len(monthly_data),

            len(monthly_data) + 6
        )
    })

    predictions = model.predict(
        future_indexes
    )

    # ============================
    # CREATE FORECAST DATAFRAME
    # ============================

    last_month = monthly_data[
        "month"
    ].iloc[-1]

    forecast_rows = []

    for i, prediction in enumerate(
        predictions,
        start=1
    ):

        forecast_rows.append({

            "month": (
                last_month + i
            ).strftime("%Y-%m"),

            "predicted_revenue": round(
                float(prediction),
                2
            )
        })

    forecast_df = pd.DataFrame(
        forecast_rows
    )

    # ============================
    # CREATE REPORTS FOLDER
    # ============================

    os.makedirs(
        "reports",
        exist_ok=True
    )

    report_path = (
        "reports/forecast_report.xlsx"
    )

    # ============================
    # WRITE EXCEL FILE
    # ============================

    with pd.ExcelWriter(
        report_path,
        engine="openpyxl"
    ) as writer:

        monthly_data.to_excel(

            writer,

            sheet_name="Monthly Sales",

            index=False
        )

        forecast_df.to_excel(

            writer,

            sheet_name="Forecast",

            index=False
        )

    # ============================
    # RETURN FILE
    # ============================

    return FileResponse(

        path=report_path,

        filename="forecast_report.xlsx",

        media_type=(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
    )

# ==================================
# EXPORT PDF REPORT
# ==================================

@router.get("/export-pdf")
def export_pdf_report(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    # ============================
    # GET DATASET
    # ============================

    dataset = db.query(Dataset).filter(

        Dataset.uploaded_by == current_user.id

    ).order_by(

        Dataset.created_at.desc()

    ).first()

    if not dataset:

        raise HTTPException(

            status_code=404,

            detail="No dataset found"
        )

    # ============================
    # READ DATASET
    # ============================

    try:

        if dataset.file_path.endswith(".csv"):

            df = pd.read_csv(
                dataset.file_path
            )

        else:

            df = pd.read_excel(
                dataset.file_path
            )

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )

    # ============================
    # DETECT COLUMNS
    # ============================

    date_column = None
    sales_column = None
    product_column = None

    for col in df.columns:

        col_name = col.lower()

        if "date" in col_name:

            date_column = col

        if (
            "sales" in col_name
            or "revenue" in col_name
            or "amount" in col_name
            or "income" in col_name
        ):

            sales_column = col

        if "product" in col_name:

            product_column = col

    if not date_column or not sales_column:

        raise HTTPException(

            status_code=400,

            detail="Required columns not found"
        )

    # ============================
    # PROCESS DATA
    # ============================

    total_sales = round(
        float(df[sales_column].sum()),
        2
    )

    total_rows = len(df)

    top_products = []

    if product_column:

        top_products = (

            df.groupby(product_column)[sales_column]
            .sum()
            .sort_values(ascending=False)
            .head(5)
            .items()

        )

    # ============================
    # CREATE PDF
    # ============================

    os.makedirs(
        "reports",
        exist_ok=True
    )

    pdf_path = (
        "reports/forecast_report.pdf"
    )

    doc = SimpleDocTemplate(
        pdf_path
    )

    styles = getSampleStyleSheet()

    elements = []

    # ============================
    # TITLE
    # ============================

    title = Paragraph(

        "AI Demand Forecasting Report",

        styles["Title"]
    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )

    # ============================
    # SUMMARY
    # ============================

    summary = [

        ["Metric", "Value"],

        ["Total Revenue", f"₹ {total_sales}"],

        ["Total Rows", str(total_rows)]
    ]

    summary_table = Table(summary)

    summary_table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (-1, 0), colors.grey),

            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),

            ("GRID", (0, 0), (-1, -1), 1, colors.black),

            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

            ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
        ])
    )

    elements.append(summary_table)

    elements.append(
        Spacer(1, 20)
    )

    # ============================
    # TOP PRODUCTS
    # ============================

    top_title = Paragraph(

        "Top Products",

        styles["Heading2"]
    )

    elements.append(top_title)

    elements.append(
        Spacer(1, 10)
    )

    product_data = [

        ["Product", "Revenue"]
    ]

    for product, revenue in top_products:

        product_data.append([

            str(product),

            f"₹ {round(float(revenue), 2)}"
        ])

    product_table = Table(
        product_data
    )

    product_table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (-1, 0), colors.lightblue),

            ("GRID", (0, 0), (-1, -1), 1, colors.black),

            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ])
    )

    elements.append(product_table)

    # ============================
    # BUILD PDF
    # ============================

    doc.build(elements)

    # ============================
    # RETURN FILE
    # ============================

    return FileResponse(

        path=pdf_path,

        filename="forecast_report.pdf",

        media_type="application/pdf"
    )