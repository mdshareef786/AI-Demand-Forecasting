import pandas as pd
import numpy as np

from prophet import Prophet

from sklearn.metrics import (
    mean_absolute_percentage_error,
    mean_absolute_error,
    mean_squared_error
)


def run_prophet_forecast(
    prophet_df,
    future_months=6
):

    # ============================
    # TRAIN / TEST SPLIT
    # ============================

    split_index = int(
        len(prophet_df) * 0.8
    )

    train_df = prophet_df.iloc[
        :split_index
    ]

    test_df = prophet_df.iloc[
        split_index:
    ]

    # ============================
    # CREATE MODEL
    # ============================

    model = Prophet(

        yearly_seasonality=True,

        weekly_seasonality=False,

        daily_seasonality=False,

        changepoint_prior_scale=0.05,

        seasonality_mode="multiplicative"
    )

    # ============================
    # TRAIN MODEL
    # ============================

    model.fit(train_df)

    # ============================
    # TEST FORECAST
    # ============================

    test_forecast = model.predict(

        test_df[["ds"]]
    )

    # ============================
    # CALCULATE METRICS
    # ============================

    mape = mean_absolute_percentage_error(

        test_df["y"],

        test_forecast["yhat"]
    )

    mae = mean_absolute_error(

        test_df["y"],

        test_forecast["yhat"]
    )

    rmse = np.sqrt(

        mean_squared_error(

            test_df["y"],

            test_forecast["yhat"]
        )
    )

    forecast_error = round(
        mape * 100,
        2
    )

    mae = round(float(mae), 2)

    rmse = round(float(rmse), 2)

    # ============================
    # RETRAIN ON FULL DATA
    # ============================

    final_model = Prophet(

        yearly_seasonality=True,

        weekly_seasonality=False,

        daily_seasonality=False,

        changepoint_prior_scale=0.05,

        seasonality_mode="multiplicative"
    )

    final_model.fit(prophet_df)

    # ============================
    # CREATE FUTURE DATAFRAME
    # ============================

    future = final_model.make_future_dataframe(

        periods=future_months,

        freq="MS"
    )

    # ============================
    # PREDICT FUTURE
    # ============================

    forecast = final_model.predict(
        future
    )

    # ============================
    # FILTER FUTURE RESULTS
    # ============================

    last_training_date = prophet_df["ds"].max()

    future_forecast = forecast[
        forecast["ds"] > last_training_date
    ].head(future_months)

    # ============================
    # BUILD RESPONSE
    # ============================

    forecast_results = []

    for _, row in future_forecast.iterrows():

        forecast_results.append({

            "month": row["ds"].strftime("%Y-%m"),

            "predicted_revenue": round(
                float(row["yhat"]),
                2
            )
        })

    # ============================
    # RETURN RESULTS
    # ============================

    return {

        "model": "Prophet Forecasting",

        "forecast_error_mape": forecast_error,

        "mae": mae,

        "rmse": rmse,

        "forecast": forecast_results
    }