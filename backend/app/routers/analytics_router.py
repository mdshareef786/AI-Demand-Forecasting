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
from app.models.forecast_history import (
    ForecastHistory
)

from app.auth.oauth2 import get_current_user


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


# ==================================
# LOAD DATASET HELPER
# ==================================

def load_latest_dataset(
    db: Session,
    current_user: User
):

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

    return dataset, df


# ==================================
# DETECT COLUMNS
# ==================================

def detect_columns(df):

    date_column = None

    sales_column = None

    category_column = None

    product_column = None

    region_column = None

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

        if "category" in col_name:

            category_column = col

        if "product" in col_name:

            product_column = col

        if (

            "region" in col_name
            or "state" in col_name
            or "city" in col_name
        ):

            region_column = col

    return {

        "date": date_column,

        "sales": sales_column,

        "category": category_column,

        "product": product_column,

        "region": region_column
    }


# ==================================
# DATASET SUMMARY
# ==================================

@router.get("/summary")
def dataset_summary(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    dataset, df = load_latest_dataset(
        db,
        current_user
    )

    columns = detect_columns(df)

    total_rows = len(df)

    total_columns = len(df.columns)

    total_sales = 0

    average_sales = 0

    top_products = []

    if columns["sales"]:

        total_sales = float(

            df[columns["sales"]]
            .sum()
        )

        average_sales = float(

            df[columns["sales"]]
            .mean()
        )

    if (

        columns["product"]
        and columns["sales"]
    ):

        top_products = (

            df.groupby(

                columns["product"]

            )[columns["sales"]]

            .sum()

            .sort_values(
                ascending=False
            )

            .head(5)

            .to_dict()
        )

    return {

        "filename": dataset.filename,

        "total_rows": total_rows,

        "total_columns": total_columns,

        "total_sales": round(
            total_sales,
            2
        ),

        "average_sales": round(
            average_sales,
            2
        ),

        "top_products": top_products,

        "columns": list(df.columns)
    }


# ==================================
# MONTHLY SALES TREND
# ==================================

@router.get("/monthly-sales")
def monthly_sales(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    _, df = load_latest_dataset(
        db,
        current_user
    )

    columns = detect_columns(df)

    if (

        not columns["date"]
        or not columns["sales"]
    ):

        raise HTTPException(

            status_code=400,

            detail="Required columns not found"
        )

    df[columns["date"]] = pd.to_datetime(
        df[columns["date"]]
    )

    df["month"] = df[
        columns["date"]
    ].dt.strftime("%Y-%m")

    monthly_sales_data = (

        df.groupby("month")[
            columns["sales"]
        ]

        .sum()

        .reset_index()
    )

    results = []

    for _, row in monthly_sales_data.iterrows():

        results.append({

            "month": row["month"],

            "sales": float(
                row[columns["sales"]]
            )
        })

    return {

        "monthly_sales": results
    }


# ==================================
# CATEGORY SALES ANALYTICS
# ==================================

@router.get("/category-sales")
def category_sales_analytics(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    _, df = load_latest_dataset(
        db,
        current_user
    )

    columns = detect_columns(df)

    if (

        not columns["category"]
        or not columns["sales"]
    ):

        raise HTTPException(

            status_code=400,

            detail="Category or Sales column not found"
        )

    category_sales = (

        df.groupby(

            columns["category"]

        )[columns["sales"]]

        .sum()

        .reset_index()
    )

    results = []

    for _, row in category_sales.iterrows():

        results.append({

            "category": str(
                row[columns["category"]]
            ),

            "total_sales": float(
                row[columns["sales"]]
            )
        })

    return {

        "category_sales": results
    }


# ==================================
# REGION SALES ANALYTICS
# ==================================

@router.get("/region-sales")
def region_sales_analytics(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    _, df = load_latest_dataset(
        db,
        current_user
    )

    columns = detect_columns(df)

    if not columns["sales"]:

        raise HTTPException(

            status_code=400,

            detail="Sales column not found"
        )

    if not columns["region"]:

        return {

            "message": "Region data not available in dataset"
        }

    region_sales = (

        df.groupby(

            columns["region"]

        )[columns["sales"]]

        .sum()

        .reset_index()
    )

    results = []

    for _, row in region_sales.iterrows():

        results.append({

            "region": str(
                row[columns["region"]]
            ),

            "total_sales": float(
                row[columns["sales"]]
            )
        })

    return {

        "region_sales": results
    }


# ==================================
# TOP REGIONS
# ==================================

@router.get("/top-regions")
def top_regions(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    _, df = load_latest_dataset(
        db,
        current_user
    )

    columns = detect_columns(df)

    if (

        not columns["region"]
        or not columns["sales"]
    ):

        raise HTTPException(

            status_code=400,

            detail="Region data not found"
        )

    top_regions_data = (

        df.groupby(

            columns["region"]

        )[columns["sales"]]

        .sum()

        .sort_values(
            ascending=False
        )

        .head(5)

        .reset_index()
    )

    results = []

    for _, row in top_regions_data.iterrows():

        results.append({

            "region": str(
                row[columns["region"]]
            ),

            "total_sales": float(
                row[columns["sales"]]
            )
        })

    return {

        "top_regions": results
    }


# ==================================
# DATE RANGE ANALYTICS
# ==================================

@router.get("/date-range")
def date_range_analytics(

    start_date: str,

    end_date: str,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    _, df = load_latest_dataset(
        db,
        current_user
    )

    columns = detect_columns(df)

    if (

        not columns["date"]
        or not columns["sales"]
    ):

        raise HTTPException(

            status_code=400,

            detail="Required columns not found"
        )

    df[columns["date"]] = pd.to_datetime(
        df[columns["date"]]
    )

    start = pd.to_datetime(start_date)

    end = pd.to_datetime(end_date)

    filtered_df = df[

        (df[columns["date"]] >= start)

        &

        (df[columns["date"]] <= end)
    ]

    total_sales = float(

        filtered_df[
            columns["sales"]
        ].sum()
    )

    total_records = len(
        filtered_df
    )

    average_sales = 0

    if not filtered_df.empty:

        average_sales = float(

            filtered_df[
                columns["sales"]
            ].mean()
        )

    return {

        "start_date": start_date,

        "end_date": end_date,

        "total_records": total_records,

        "total_sales": round(
            total_sales,
            2
        ),

        "average_sales": round(
            average_sales,
            2
        )
    }


# ==================================
# RECENT FORECAST ACTIVITIES
# ==================================

@router.get("/recent-activities")
def recent_forecast_activities(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    activities = db.query(

        ForecastHistory

    ).filter(

        ForecastHistory.user_id == current_user.id

    ).order_by(

        ForecastHistory.created_at.desc()

    ).limit(10).all()

    results = []

    for item in activities:

        results.append({

            "model_used": item.model_used,

            "category": item.category,

            "product": item.product,

            "forecast_months": item.forecast_months,

            "mape": item.mape,

            "mae": item.mae,

            "rmse": item.rmse,

            "created_at": item.created_at
        })

    return {

        "recent_activities": results
    }


# ==================================
# KPI ANALYTICS
# ==================================

@router.get("/kpis")
def analytics_kpis(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    _, df = load_latest_dataset(
        db,
        current_user
    )

    columns = detect_columns(df)

    if not columns["sales"]:

        raise HTTPException(

            status_code=400,

            detail="Sales column not found"
        )

    total_sales = float(

        df[columns["sales"]]
        .sum()
    )

    average_sales = float(

        df[columns["sales"]]
        .mean()
    )

    highest_sale = float(

        df[columns["sales"]]
        .max()
    )

    lowest_sale = float(

        df[columns["sales"]]
        .min()
    )

    return {

        "total_sales": round(
            total_sales,
            2
        ),

        "average_sales": round(
            average_sales,
            2
        ),

        "highest_sale": round(
            highest_sale,
            2
        ),

        "lowest_sale": round(
            lowest_sale,
            2
        )
    }