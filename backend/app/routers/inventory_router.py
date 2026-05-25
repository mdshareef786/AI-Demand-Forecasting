from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dataset import Dataset

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory Risk"]
)


@router.get("/risk-analysis")
def inventory_risk(
    db: Session = Depends(get_db)
):

    datasets = db.query(
        Dataset
    ).all()

    total = len(datasets)

    high_risk = int(total * 0.2)

    medium_risk = int(total * 0.3)

    low_risk = total - (
        high_risk +
        medium_risk
    )

    return {
        "high_risk":
        high_risk,

        "medium_risk":
        medium_risk,

        "low_risk":
        low_risk
    }