import pandas as pd
import time

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.dataset import Dataset
from app.models.user import User
from app.models.forecast_history import ForecastHistory

from app.auth.oauth2 import get_current_user

from app.services.forecasting.prophet_service import (
    run_prophet_forecast
)

from app.services.forecasting.linear_regression_service import (
    run_linear_regression_forecast
)

from app.services.notification_service import (
    create_forecast_notification
)

from app.services.activity_service import (
    create_activity_log
)

from app.auth.role_checker import (
    require_roles
)

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"]
)


# ==================================
# FORECAST PREDICTION API
# ==================================

@router.get("/predict")
def predict_future_sales(

    future_months: int = 6,

    model: str = "prophet",

    category: str = None,

    product: str = None,

    db: Session = Depends(get_db),

    current_user: User = Depends(

        require_roles(

            [

                "super_admin",

                "analyst"
            ]
        )
    )
):

    # ============================
    # START TIMER
    # ============================

    start_time = time.time()

    # ============================
    # VALIDATE INPUT
    # ============================

    if future_months <= 0:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail="future_months must be greater than 0"
        )

    # ============================
    # GET LATEST DATASET
    # ============================

    dataset = db.query(Dataset).filter(

        Dataset.uploaded_by == current_user.id

    ).order_by(

        Dataset.created_at.desc()

    ).first()

    if not dataset:

        raise HTTPException(

            status_code=status.HTTP_404_NOT_FOUND,

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

            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,

            detail=f"Error reading dataset: {str(e)}"
        )

    # ============================
    # DETECT REQUIRED COLUMNS
    # ============================

    date_column = None
    sales_column = None

    category_column = None
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

        if "category" in col_name:

            category_column = col

        if "product" in col_name:

            product_column = col

    if not date_column or not sales_column:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail="Required columns not found"
        )

    # ============================
    # APPLY FILTERS
    # ============================

    if (

        category
        and category_column
        and category.strip() != ""
    ):

        df = df[

            df[category_column]
            .astype(str)
            .str.lower()

            == category.lower()
        ]

    if (

        product
        and product_column
        and product.strip() != ""
    ):

        df = df[

            df[product_column]
            .astype(str)
            .str.lower()

            == product.lower()
        ]

    if df.empty:

        raise HTTPException(

            status_code=404,

            detail="No matching data found"
        )

    # ============================
    # PROCESS DATA
    # ============================

    try:

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

        if len(monthly_data) < 6:

            raise HTTPException(

                status_code=400,

                detail="Minimum 6 months of historical data required"
            )

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=f"Error processing dataset: {str(e)}"
        )

    # ============================
    # PREPARE DATA
    # ============================

    prophet_df = monthly_data.rename(

        columns={

            "month": "ds",

            sales_column: "y"
        }
    )

    prophet_df["ds"] = prophet_df["ds"].astype(str)

    prophet_df["ds"] = pd.to_datetime(
        prophet_df["ds"]
    )

    # ============================
    # RUN FORECAST MODEL
    # ============================

    if model.lower() == "prophet":

        forecast_response = run_prophet_forecast(

            prophet_df=prophet_df,

            future_months=future_months
        )

    elif model.lower() == "linear":

        forecast_response = run_linear_regression_forecast(

            prophet_df=prophet_df,

            future_months=future_months
        )

    else:

        raise HTTPException(

            status_code=400,

            detail="Invalid forecasting model"
        )

    

    # ============================
    # FORMAT FORECAST
    # ============================

    formatted_forecast = []

    for item in forecast_response["forecast"]:

        formatted_forecast.append({

            "month": item["month"],

            "predicted_revenue": int(
                item["predicted_revenue"]
            )
        })


    # ============================
    # EXECUTION TIME
    # ============================

    execution_time = round(

        time.time()

        -

        start_time,

        2
    )


    # ============================
    # SAVE FORECAST HISTORY
    # ============================

    history = ForecastHistory(

        user_id=current_user.id,

        model_used=forecast_response[
            "model"
        ],

        category=category,

        product=product,

        forecast_months=future_months,

        mape=forecast_response[
            "forecast_error_mape"
        ],

        mae=forecast_response[
            "mae"
        ],

        rmse=forecast_response[
            "rmse"
        ],

        prediction_accuracy=
        forecast_response.get(
            "prediction_accuracy"
        ),

        seasonal_detected=
        forecast_response.get(
            "seasonal_detected",
            False
        ),

        anomaly_detected=
        forecast_response.get(
            "anomaly_detected",
            False
        ),

        retrained=
        forecast_response.get(
            "retrained",
            False
        ),

        execution_time=
        execution_time,

        api_name="/forecast/predict",

        activity_type=
        "forecast_generation",

        status="success"
    )

    db.add(history)

    db.commit()

    # ============================
    # CREATE ACTIVITY LOG
    # ============================

    create_activity_log(

        db=db,

        user_id=current_user.id,

        api_name="/forecast/predict",

        activity_type="Forecast Generated",

        module="Forecast"
    )
    # ============================
    # CREATE NOTIFICATION
    # ============================

    create_forecast_notification(

        db=db,

        user_id=current_user.id,

        model_name=
        forecast_response[
            "model"
        ]
    )


    # ============================
    # RETURN RESPONSE
    # ============================

    return {

        "model":
    forecast_response[
        "model"
    ],

    "forecast_error_mape":
    forecast_response[
        "forecast_error_mape"
    ],

    "mae":
    forecast_response[
        "mae"
    ],

    "rmse":
    forecast_response[
        "rmse"
    ],

    "prediction_accuracy":
    forecast_response.get(
        "prediction_accuracy"
    ),

    "seasonal_detected":
    forecast_response.get(
        "seasonal_detected"
    ),

    "anomaly_detected":
    forecast_response.get(
        "anomaly_detected"
    ),

    "retrained":
    forecast_response.get(
        "retrained"
    ),

    "execution_time":
    execution_time,

    "real_time_enabled":
    True,

    "auto_refresh":
    True,

    "forecast_months":
    future_months,

    "category_filter":
    category,

    "product_filter":
    product,

    "forecast":
    formatted_forecast
}

# ==================================
# MODEL COMPARISON API
# ==================================

@router.get("/compare-models")
def compare_forecasting_models(

    future_months: int = 6,

    category: str = None,

    product: str = None,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
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

    if dataset.file_path.endswith(".csv"):

        df = pd.read_csv(
            dataset.file_path
        )

    else:

        df = pd.read_excel(
            dataset.file_path
        )

    date_column = None
    sales_column = None

    category_column = None
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

        if "category" in col_name:

            category_column = col

        if "product" in col_name:

            product_column = col

    if not date_column or not sales_column:

        raise HTTPException(

            status_code=400,

            detail="Required columns not found"
        )

    if (

        category
        and category_column
    ):

        df = df[

            df[category_column]
            .astype(str)
            .str.lower()

            == category.lower()
        ]

    if (

        product
        and product_column
    ):

        df = df[

            df[product_column]
            .astype(str)
            .str.lower()

            == product.lower()
        ]

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

    prophet_df = monthly_data.rename(

        columns={

            "month": "ds",

            sales_column: "y"
        }
    )

    prophet_df["ds"] = prophet_df["ds"].astype(str)

    prophet_df["ds"] = pd.to_datetime(
        prophet_df["ds"]
    )

    prophet_result = run_prophet_forecast(

        prophet_df=prophet_df,

        future_months=future_months
    )

    linear_result = run_linear_regression_forecast(

        prophet_df=prophet_df,

        future_months=future_months
    )

    models = [

        prophet_result,

        linear_result
    ]

    best_model = min(

        models,

        key=lambda x: x[
            "forecast_error_mape"
        ]
    )

    create_activity_log(

        db=db,

        user_id=current_user.id,

        api_name="/forecast/compare-models",

        activity_type="Model Comparison",

        module="Forecast"
    )

    return {

        "best_model": best_model[
            "model"
        ],

        "comparison": [

            {

                "model": prophet_result[
                    "model"
                ],

                "mape": prophet_result[
                    "forecast_error_mape"
                ],

                "mae": prophet_result[
                    "mae"
                ],

                "rmse": prophet_result[
                    "rmse"
                ]
            },

            {

                "model": linear_result[
                    "model"
                ],

                "mape": linear_result[
                    "forecast_error_mape"
                ],

                "mae": linear_result[
                    "mae"
                ],

                "rmse": linear_result[
                    "rmse"
                ]
            }
        ]
    }

# ==================================
# FORECAST HISTORY API
# ==================================

@router.get("/history")
def get_forecast_history(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    history = db.query(

        ForecastHistory

    ).filter(

        ForecastHistory.user_id
        == current_user.id

    ).order_by(

        ForecastHistory.id.desc()

    ).all()

    return [

        {

            "id": item.id,

            "model_used":
            item.model_used,

            "forecast_months":
            item.forecast_months,

            "prediction_accuracy":
            item.prediction_accuracy,

            "mape":
            item.mape,

            "mae":
            item.mae,

            "rmse":
            item.rmse,

            "execution_time":
            item.execution_time,

            "status":
            item.status

        }

        for item in history
    ]