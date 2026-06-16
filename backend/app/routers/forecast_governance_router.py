from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.forecast_governance_service import (

    create_governance_record,

    get_governance_records,

    update_status,

    governance_dashboard,

    governance_history
)

router = APIRouter(

    prefix="/forecast-governance",

    tags=["Forecast Governance Center"]
)


@router.post("/create")
def create(

    forecast_id: int,

    version: str,

    modified_by: int,

    lifecycle_status: str = "draft",

    remarks: str = "",

    db: Session = Depends(get_db)
):

    return create_governance_record(

        db,

        forecast_id,

        version,

        modified_by,

        remarks
    )


@router.get("/")
def records(

    db: Session = Depends(
        get_db
    )
):

    return get_governance_records(
        db
    )


@router.put("/update-status/{governance_id}")
def update(

    governance_id: int,

    status: str,

    db: Session = Depends(
        get_db
    )
):

    return update_status(

        db,

        governance_id,

        status
    )


@router.get("/dashboard")
def dashboard(

    db: Session = Depends(
        get_db
    )
):

    return governance_dashboard(
        db
    )


@router.get("/history")
def history(

    db: Session = Depends(
        get_db
    )
):

    return governance_history(
        db
    )