from fastapi import APIRouter

from app.services.ensemble_service import (
    ensemble_prediction
)

router = APIRouter(

    prefix="/ensemble",

    tags=["AI Ensemble"]
)


@router.get(
    "/predict"
)
def predict():

    return ensemble_prediction(

        prophet_value=145000,

        linear_value=138000
    )