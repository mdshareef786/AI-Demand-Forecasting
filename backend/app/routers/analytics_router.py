import pandas as pd

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dataset import Dataset
from app.models.user import User

from app.auth.oauth2 import get_current_user


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


# ==================================
# DATASET SUMMARY API
# ==================================

@router.get("/summary")
def dataset_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Get latest uploaded dataset
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

    # Read dataset
    try:

        if dataset.file_path.endswith(".csv"):
            df = pd.read_csv(dataset.file_path)

        else:
            df = pd.read_excel(dataset.file_path)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    # ============================
    # AUTO DETECT COLUMNS
    # ============================

    columns = [col.lower() for col in df.columns]

    sales_column = None
    product_column = None

    # Detect sales/revenue column
    for col in df.columns:

        col_name = col.lower()

        if (
        "sales" in col_name
        or "revenue" in col_name
        or "amount" in col_name
        or "income" in col_name
        ):

            sales_column = col
            break

    # Detect product column
    for col in df.columns:
        if "product" in col.lower():
            product_column = col
            break

    # ============================
    # CALCULATIONS
    # ============================

    total_rows = len(df)

    total_columns = len(df.columns)

    total_sales = 0

    top_products = []

    if sales_column:

        total_sales = float(
            df[sales_column].sum()
        )

    if product_column and sales_column:

        top_products = (
            df.groupby(product_column)[sales_column]
            .sum()
            .sort_values(ascending=False)
            .head(5)
            .to_dict()
        )

    return {

        "filename": dataset.filename,

        "total_rows": total_rows,

        "total_columns": total_columns,

        "total_sales": total_sales,

        "top_products": top_products,

        "columns": list(df.columns)
    }

# ==================================
# MONTHLY SALES TREND API
# ==================================

@router.get("/monthly-sales")
def monthly_sales(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Get latest dataset
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

    # Read dataset
    try:

        if dataset.file_path.endswith(".csv"):
            df = pd.read_csv(dataset.file_path)

        else:
            df = pd.read_excel(dataset.file_path)

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

        # Detect date column
        if "date" in col_name:
            date_column = col

        # Detect sales/revenue column
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
    # PROCESS DATES
    # ============================

    df[date_column] = pd.to_datetime(
        df[date_column]
    )

    # Extract month
    df["month"] = df[date_column].dt.strftime("%Y-%m")

    # Group by month
    monthly_sales_data = (
        df.groupby("month")[sales_column]
        .sum()
        .reset_index()
    )

    return monthly_sales_data.to_dict(
        orient="records"
    )