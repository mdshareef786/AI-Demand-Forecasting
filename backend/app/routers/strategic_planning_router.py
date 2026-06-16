from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.strategic_planning_service import (

    create_target,

    get_targets,

    annual_dashboard,

    quarterly_dashboard,

    compare_forecast_target,

    planning_recommendations
)

router = APIRouter(

    prefix="/strategic-planning",

    tags=["Strategic Planning"]
)


@router.post("/target/create")
def create(

    target_name: str,

    target_type: str,

    target_value: float,

    forecast_value: float,

    db: Session = Depends(
        get_db
    )
):

    return create_target(

        db,

        target_name,

        target_type,

        target_value,

        forecast_value
    )


@router.get("/targets")
def targets(

    db: Session = Depends(
        get_db
    )
):

    return get_targets(db)


@router.get("/annual-dashboard")
def annual(

    db: Session = Depends(
        get_db
    )
):

    return annual_dashboard(db)


@router.get("/quarterly-dashboard")
def quarterly(

    db: Session = Depends(
        get_db
    )
):

    return quarterly_dashboard(db)


@router.get("/compare")
def compare(

    db: Session = Depends(
        get_db
    )
):

    return compare_forecast_target(
        db
    )


@router.get("/recommendations")
def recommendations():

    return planning_recommendations()