from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.collaboration_service import (

    add_comment,

    get_comments,

    share_report,

    revision_history
)

router = APIRouter(

    prefix="/collaboration",

    tags=["Forecast Collaboration"]
)


@router.post("/comment")
def create_comment(

    project_id: int,

    user_id: int,

    comment: str,

    db: Session = Depends(
        get_db
    )
):

    return add_comment(

        db,

        project_id,

        user_id,

        comment
    )


@router.get("/comments/{project_id}")
def comments(

    project_id: int,

    db: Session = Depends(
        get_db
    )
):

    return get_comments(

        db,

        project_id
    )


@router.post("/share-report")
def share():

    return share_report()


@router.get("/revision-history")
def revisions():

    return revision_history()