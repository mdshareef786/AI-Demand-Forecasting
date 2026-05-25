from fastapi import APIRouter
from datetime import datetime
import random

router = APIRouter(

    prefix="/realtime",

    tags=["Real Time Monitoring"]
)


@router.get(
    "/sales-monitor"
)
def live_sales():

    current_sales = random.randint(
        100000,
        500000
    )

    active_users = random.randint(
        20,
        120
    )

    forecast_refresh = True

    return {

        "timestamp":

        datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        ),

        "current_sales":
        current_sales,

        "active_users":
        active_users,

        "forecast_refresh":
        forecast_refresh,

        "status":
        "Live monitoring active"
    }