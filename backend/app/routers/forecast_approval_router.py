from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.forecast_approval_service import (

    submit_forecast,

    approve_forecast,

    reject_forecast,

    approval_history,

    get_approval
)

router = APIRouter(

    prefix="/forecast-approval",

    tags=["Forecast Approval Workflow"]
)


@router.post("/submit")
def submit(

    forecast_id: int,

    submitted_by: int,

    comments: str = "",

    db: Session = Depends(
        get_db
    )
):

    return submit_forecast(

        db,

        forecast_id,

        submitted_by,

        comments
    )


@router.put("/approve/{approval_id}")
def approve(

    approval_id: int,

    approved_by: int,

    db: Session = Depends(
        get_db
    )
):

    return approve_forecast(

        db,

        approval_id,

        approved_by
    )


@router.put("/reject/{approval_id}")
def reject(

    approval_id: int,

    approved_by: int,

    db: Session = Depends(
        get_db
    )
):

    return reject_forecast(

        db,

        approval_id,

        approved_by
    )


@router.get("/history")
def history(

    db: Session = Depends(
        get_db
    )
):

    return approval_history(
        db
    )


@router.get("/{approval_id}")
def get(

    approval_id: int,

    db: Session = Depends(
        get_db
    )
):

    return get_approval(

        db,

        approval_id
    )