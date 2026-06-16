from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.data_quality_service import (

    create_quality_record,

    get_quality_records,

    quality_score_summary,

    quality_report,

    quality_dashboard
)

router = APIRouter(

    prefix="/data-quality",

    tags=["Data Quality Management"]
)


@router.post("/create")
def create(

    dataset_name: str,

    quality_score: float,

    missing_records: int,

    validation_status: str,

    db: Session = Depends(
        get_db
    )
):

    return create_quality_record(

        db,

        dataset_name,

        quality_score,

        missing_records,

        validation_status
    )


@router.get("/")
def list_records(

    db: Session = Depends(
        get_db
    )
):

    return get_quality_records(
        db
    )


@router.get("/score")
def score(

    db: Session = Depends(
        get_db
    )
):

    return quality_score_summary(
        db
    )


@router.get("/report")
def report(

    db: Session = Depends(
        get_db
    )
):

    return quality_report(
        db
    )


@router.get("/dashboard")
def dashboard(

    db: Session = Depends(
        get_db
    )
):

    return quality_dashboard(
        db
    )