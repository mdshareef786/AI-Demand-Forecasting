from fastapi import APIRouter

from app.services.retraining_service import (
    auto_retrain_model
)

router = APIRouter(

    prefix="/retraining",

    tags=["AI Retraining"]
)


@router.get(
    "/run"
)
def retrain():

    return auto_retrain_model()