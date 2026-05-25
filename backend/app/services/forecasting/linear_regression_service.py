import pandas as pd
import numpy as np
import time

from sklearn.linear_model import LinearRegression

from sklearn.metrics import (
    mean_absolute_percentage_error,
    mean_absolute_error,
    mean_squared_error
)


def run_linear_regression_forecast(

    prophet_df,

    future_months=6
):

    start_time = time.time()

    # ==========================
    # COPY DATA
    # ==========================

    df = prophet_df.copy()

    # ==========================
    # TIME INDEX
    # ==========================

    df["time_index"] = range(
        len(df)
    )

    # ==========================
    # SEASON DETECTION
    # ==========================

    seasonal_detected = False

    if len(df) >= 12:

        seasonal_detected = True

    # ==========================
    # TRAIN TEST SPLIT
    # ==========================

    split_index = int(
        len(df) * 0.8
    )

    train_df = df.iloc[
        :split_index
    ]

    test_df = df.iloc[
        split_index:
    ]

    # ==========================
    # MODEL
    # ==========================

    model = LinearRegression()

    model.fit(

        train_df[
            ["time_index"]
        ],

        train_df["y"]
    )

    # ==========================
    # VALIDATION
    # ==========================

    predictions = model.predict(

        test_df[
            ["time_index"]
        ]
    )

    mape = mean_absolute_percentage_error(

        test_df["y"],

        predictions
    )

    mae = mean_absolute_error(

        test_df["y"],

        predictions
    )

    rmse = np.sqrt(

        mean_squared_error(

            test_df["y"],

            predictions
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

    mean_value = df["y"].mean()

    std_value = df["y"].std()

    anomalies = df[

        abs(
            df["y"] -
            mean_value
        )

        > (2 * std_value)
    ]

    if len(anomalies) > 0:

        anomaly_detected = True

    # ==========================
    # AUTO RETRAIN
    # ==========================

    model.fit(

        df[
            ["time_index"]
        ],

        df["y"]
    )

    retrained = True

    # ==========================
    # FUTURE FORECAST
    # ==========================

    future_indices = np.array(

        range(

            len(df),

            len(df)
            +
            future_months
        )

    ).reshape(-1,1)

    future_predictions = model.predict(
        future_indices
    )

    # ==========================
    # BUILD FORECAST
    # ==========================

    results = []

    last_date = df[
        "ds"
    ].max()

    future_dates = pd.date_range(

        start=last_date,

        periods=
        future_months + 1,

        freq="MS"
    )[1:]

    for i in range(
        future_months
    ):

        results.append({

            "month":

            future_dates[i]

            .strftime(
                "%Y-%m"
            ),

            "predicted_revenue":

            round(

                float(

                    future_predictions[i]

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
        "Linear Regression",

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