from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.kpi_service import (

    create_kpi,

    get_kpis,

    get_kpi_trends,

    get_kpi_report,

    get_kpi_alerts
)

router = APIRouter(

    prefix="/kpis",

    tags=["Advanced KPI Management"]
)


@router.post("/create")
def create(

    kpi_name: str,

    target_value: float,

    current_value: float,

    threshold: float,

    db: Session = Depends(
        get_db
    )
):

    return create_kpi(

        db,

        kpi_name,

        target_value,

        current_value,

        threshold
    )


@router.get("/")
def list_kpis(

    db: Session = Depends(
        get_db
    )
):

    return get_kpis(db)


@router.get("/trends")
def trends(

    db: Session = Depends(
        get_db
    )
):

    return get_kpi_trends(db)


@router.get("/report")
def report(

    db: Session = Depends(
        get_db
    )
):

    return get_kpi_report(db)


@router.get("/alerts")
def alerts(

    db: Session = Depends(
        get_db
    )
):

    return get_kpi_alerts(db)