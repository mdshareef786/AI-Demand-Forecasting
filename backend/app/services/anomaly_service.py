import numpy as np


def detect_anomalies(
    sales_data
):

    mean = float(

        np.mean(
            sales_data
        )
    )

    std = float(

        np.std(
            sales_data
        )
    )

    threshold = mean + (
        2 * std
    )

    anomalies = []

    for value in sales_data:

        if value > threshold:

            anomalies.append(
                int(value)
            )

    return {

        "anomaly_detected":

        bool(
            len(anomalies) > 0
        ),

        "anomalies":

        anomalies
    }



def detect_seasonality(
    sales_data
):

    variance = float(

        np.var(
            sales_data
        )
    )

    seasonal = variance > 1000

    return {

        "seasonal_detected":

        bool(
            seasonal
        )
    }