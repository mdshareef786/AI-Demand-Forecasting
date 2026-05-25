from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.system_metrics_service import (
    collect_system_metrics
)

router = APIRouter(

    prefix="/system-metrics",

    tags=["System Metrics"]
)


# ==========================
# GET SYSTEM METRICS
# ==========================

@router.get("/")
def get_system_metrics(

    db: Session = Depends(
        get_db
    )
):

    metrics = collect_system_metrics(
        db
    )

    return {

        "cpu_usage":
            metrics.cpu_usage,

        "memory_usage":
            metrics.memory_usage,

        "api_response_time":
            metrics.api_response_time,

        "active_users":
            metrics.active_users
    }