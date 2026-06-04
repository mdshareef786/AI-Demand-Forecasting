from fastapi import APIRouter

from app.services.executive_service import (

    get_executive_dashboard,

    get_business_kpis,

    get_cost_analysis
)

router = APIRouter(

    prefix="/executive",

    tags=["Executive Dashboard"]
)


@router.get("/dashboard")
def executive_dashboard():

    return get_executive_dashboard()


@router.get("/kpis")
def executive_kpis():

    return get_business_kpis()


@router.get("/cost-analysis")
def cost_analysis():

    return get_cost_analysis()