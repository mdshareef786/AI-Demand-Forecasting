from fastapi import APIRouter

from app.services.accuracy_service import (

    get_accuracy_dashboard,

    get_accuracy_trends,

    get_model_improvements,

    get_evaluation_report
)

router = APIRouter(

    prefix="/accuracy",

    tags=["Forecast Accuracy Center"]
)


@router.get("/dashboard")
def dashboard():

    return get_accuracy_dashboard()


@router.get("/trends")
def trends():

    return get_accuracy_trends()


@router.get("/improvements")
def improvements():

    return get_model_improvements()


@router.get("/evaluation-report")
def report():

    return get_evaluation_report()