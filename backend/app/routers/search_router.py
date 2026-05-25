from fastapi import (
    APIRouter,
    Depends,
    Query
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.dataset import Dataset
from app.models.report import Report
from app.models.user import User


router = APIRouter(

    prefix="/search",

    tags=["Search"]
)


@router.get("/global")
def global_search(

    keyword: str = Query(...),

    db: Session = Depends(
        get_db
    )
):

    datasets = db.query(
        Dataset
    ).filter(

        Dataset.filename.contains(
            keyword
        )

    ).all()


    reports = db.query(
        Report
    ).filter(

        Report.report_name.contains(
            keyword
        )

    ).all()


    users = db.query(
        User
    ).filter(

        User.name.contains(
            keyword
        )

    ).all()


    return {

        "datasets":
        datasets,

        "reports":
        reports,

        "users":
        users
    }