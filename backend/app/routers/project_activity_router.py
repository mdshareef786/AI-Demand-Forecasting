from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.project_activity_service import (

    log_activity,

    get_project_activity
)

router = APIRouter(

    prefix="/project-activity",

    tags=["Project Activity"]
)


@router.post("/log")
def add_activity(

    project_id: int,

    user_id: int,

    activity: str,

    db: Session = Depends(
        get_db
    )
):

    return log_activity(

        db,

        project_id,

        user_id,

        activity
    )


@router.get("/{project_id}")
def get_activity(

    project_id: int,

    db: Session = Depends(
        get_db
    )
):

    return get_project_activity(

        db,

        project_id
    )