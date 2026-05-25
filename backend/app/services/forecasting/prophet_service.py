import pandas as pd
import numpy as np
import time

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

    start_time = time.time()

    # ==========================
    # TRAIN / TEST
    # ==========================

    split_index = int(

        len(prophet_df) * 0.8
    )

    train_df = prophet_df.iloc[
        :split_index
    ]

    test_df = prophet_df.iloc[
        split_index:
    ]

    # ==========================
    # SEASON DETECTION
    # ==========================

    seasonal_detected = False

    if len(prophet_df) >= 12:

        seasonal_detected = True

    # ==========================
    # MODEL
    # ==========================

    model = Prophet(

        yearly_seasonality=True,

        weekly_seasonality=False,

        daily_seasonality=False,

        changepoint_prior_scale=0.05,

        seasonality_mode="multiplicative"
    )

    model.fit(
        train_df
    )

    # ==========================
    # VALIDATION
    # ==========================

    test_forecast = model.predict(

        test_df[
            ["ds"]
        ]
    )

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

    prediction_accuracy = round(

        max(
            0,

            100 - forecast_error
        ),

        2
    )

    # ==========================
    # ANOMALY DETECTION
    # ==========================

    anomaly_detected = False

    std = prophet_df["y"].std()

    mean = prophet_df["y"].mean()

    anomalies = prophet_df[

        abs(
            prophet_df["y"] - mean
        )

        > (2 * std)
    ]

    if len(anomalies) > 0:

        anomaly_detected = True

    # ==========================
    # RETRAIN
    # ==========================

    final_model = Prophet(

        yearly_seasonality=True,

        weekly_seasonality=False,

        daily_seasonality=False,

        changepoint_prior_scale=0.05,

        seasonality_mode="multiplicative"
    )

    final_model.fit(
        prophet_df
    )

    retrained = True

    # ==========================
    # FUTURE
    # ==========================

    future = final_model.make_future_dataframe(

        periods=future_months,

        freq="MS"
    )

    forecast = final_model.predict(
        future
    )

    last_training = prophet_df[
        "ds"
    ].max()

    future_forecast = forecast[

        forecast["ds"]

        > last_training

    ].head(
        future_months
    )

    results = []

    for _, row in future_forecast.iterrows():

        results.append({

            "month":

            row["ds"].strftime(
                "%Y-%m"
            ),

            "predicted_revenue":

            round(

                float(
                    row["yhat"]
                ),

                2
            )
        })

    execution_time = round(

        time.time()
        -
        start_time,

        2
    )

    return {

        "model":
        "Prophet Forecasting",

        "forecast_error_mape":
        forecast_error,

        "mae":
        round(float(mae),2),

        "rmse":
        round(float(rmse),2),

        "prediction_accuracy":
        prediction_accuracy,

        "seasonal_detected":
        seasonal_detected,

        "anomaly_detected":
        anomaly_detected,

        "retrained":
        retrained,

        "execution_time":
        execution_time,

        "forecast":
        results
    }