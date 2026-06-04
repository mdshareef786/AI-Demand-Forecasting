from fastapi import APIRouter

from app.services.ai_insights_engine_service import (

    get_business_recommendations,

    get_growth_products,

    get_declining_products,

    get_forecast_summary
)

router = APIRouter(

    prefix="/ai-insights",

    tags=["AI Insights Engine"]
)


@router.get("/recommendations")
def recommendations():

    return get_business_recommendations()


@router.get("/growth-products")
def growth_products():

    return get_growth_products()


@router.get("/declining-products")
def declining_products():

    return get_declining_products()


@router.get("/forecast-summary")
def forecast_summary():

    return get_forecast_summary()