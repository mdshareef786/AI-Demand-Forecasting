from fastapi import APIRouter

from app.services.retraining_service import (

    auto_retrain_model,

    run_recurring_forecast,

    auto_forecast_refresh
)

router = APIRouter(

    prefix="/retraining",

    tags=["AI Retraining"]
)



# ==========================
# RETRAIN
# ==========================

@router.get("/run")

def retrain():

    return auto_retrain_model()



# ==========================
# RECURRING FORECAST
# ==========================

@router.get(
    "/recurring"
)

def recurring():

    return run_recurring_forecast()



# ==========================
# AUTO REFRESH
# ==========================

@router.get(
    "/refresh"
)

def refresh():

    return auto_forecast_refresh()