from fastapi import APIRouter

from app.services.executive_command_service import (

    executive_dashboard,

    forecast_metrics,

    strategic_insights,

    business_summary,

    executive_alerts
)

router = APIRouter(

    prefix="/executive-command",

    tags=["Executive Command Center"]
)


@router.get("/dashboard")
def dashboard():

    return executive_dashboard()


@router.get("/forecast-metrics")
def metrics():

    return forecast_metrics()


@router.get("/strategic-insights")
def insights():

    return strategic_insights()


@router.get("/business-summary")
def summary():

    return business_summary()


@router.get("/alerts")
def alerts():

    return executive_alerts()