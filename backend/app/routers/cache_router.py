from fastapi import APIRouter

from app.services.cache_service import (

    get_dashboard_cache,

    update_dashboard_cache
)

router = APIRouter(

    prefix="/cache",

    tags=["Dashboard Cache"]
)


@router.get(
    "/dashboard"
)
def dashboard_cache():

    data = {

        "revenue":
        1450000,

        "forecast":
        "active",

        "users":
        120
    }

    update_dashboard_cache(
        data
    )

    return get_dashboard_cache()