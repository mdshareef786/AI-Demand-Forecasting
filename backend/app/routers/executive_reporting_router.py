from fastapi import APIRouter

from app.services.executive_reporting_service import (

    executive_summary,

    monthly_forecast_report,

    revenue_outlook,

    management_summary,

    report_schedule
)

router = APIRouter(

    prefix="/executive-reports",

    tags=["Executive Reporting"]
)


@router.get("/summary")
def summary():

    return executive_summary()


@router.get("/monthly")
def monthly():

    return monthly_forecast_report()


@router.get("/revenue-outlook")
def outlook():

    return revenue_outlook()


@router.get("/management-summary")
def management():

    return management_summary()


@router.get("/schedule")
def schedule():

    return report_schedule()