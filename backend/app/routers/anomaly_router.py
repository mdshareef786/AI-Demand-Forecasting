from fastapi import (
    APIRouter
)

from app.services.anomaly_service import (
    detect_anomalies,
    detect_seasonality
)

router = APIRouter(

    prefix="/anomaly",

    tags=["AI Optimization"]
)


@router.get(
    "/detect"
)
def anomaly_detection():

    sample_sales = [

        100,
        120,
        115,
        130,
        800,
        125,
        118
    ]

    anomaly = detect_anomalies(
        sample_sales
    )

    seasonal = detect_seasonality(
        sample_sales
    )

    return {

        **anomaly,

        **seasonal
    }