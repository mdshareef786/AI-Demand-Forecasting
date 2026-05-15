import pandas as pd
import numpy as np

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

    # ============================
    # CREATE COPY
    # ============================

    df = prophet_df.copy()

    # ============================
    # CREATE TIME INDEX
    # ============================

    df["time_index"] = range(
        len(df)
    )

    # ============================
    # TRAIN / TEST SPLIT
    # ============================

    split_index = int(
        len(df) * 0.8
    )

    train_df = df.iloc[
        :split_index
    ]

    test_df = df.iloc[
        split_index:
    ]

    # ============================
    # TRAIN MODEL
    # ============================

    model = LinearRegression()

    model.fit(

        train_df[["time_index"]],

        train_df["y"]
    )

    # ============================
    # TEST PREDICTIONS
    # ============================

    predictions = model.predict(

        test_df[["time_index"]]
    )

    # ============================
    # CALCULATE METRICS
    # ============================

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

    mae = round(float(mae), 2)

    rmse = round(float(rmse), 2)

    # ============================
    # FUTURE PREDICTION
    # ============================

    future_indices = np.array(

        range(
            len(df),
            len(df) + future_months
        )

    ).reshape(-1, 1)

    future_predictions = model.predict(
        future_indices
    )

    # ============================
    # BUILD RESPONSE
    # ============================

    forecast_results = []

    last_date = df["ds"].max()

    future_dates = pd.date_range(

        start=last_date,

        periods=future_months + 1,

        freq="MS"
    )[1:]

    for i in range(future_months):

        forecast_results.append({

            "month": future_dates[i]
            .strftime("%Y-%m"),

            "predicted_revenue": round(

                float(
                    future_predictions[i]
                ),

                2
            )
        })

    # ============================
    # RETURN RESPONSE
    # ============================

    return {

        "model": "Linear Regression",

        "forecast_error_mape": forecast_error,

        "mae": mae,

        "rmse": rmse,

        "forecast": forecast_results
    }