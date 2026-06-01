from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.forecast_schedule import (
    ForecastSchedule
)

from app.models.user import User

from app.auth.oauth2 import (
    get_current_user
)

router = APIRouter(
    prefix="/automation",
    tags=["Automation"]
)


# ==================================
# CREATE FORECAST SCHEDULE
# ==================================

@router.post("/create-schedule")
def create_schedule(

    schedule_name:str,

    interval_type:str="daily",

    future_months:int=6,

    model_name:str="prophet",

    db:Session=Depends(get_db),

    current_user:User=Depends(
        get_current_user
    )
):

    schedule = ForecastSchedule(

        user_id=current_user.id,

        schedule_name=schedule_name,

        interval_type=interval_type,

        future_months=future_months,

        model_name=model_name
    )

    db.add(schedule)

    db.commit()

    return {

        "message":
        "Forecast schedule created",

        "schedule":
        schedule_name,

        "interval":
        interval_type,

        "model":
        model_name
    }


# ==================================
# GET ALL SCHEDULES
# ==================================

@router.get("/schedules")
def get_schedules(

    db:Session=Depends(get_db),

    current_user:User=Depends(
        get_current_user
    )
):

    schedules = db.query(
        ForecastSchedule
    ).filter(

        ForecastSchedule.user_id
        ==
        current_user.id

    ).all()

    return schedules