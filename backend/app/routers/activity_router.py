from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.activity_log import (
    ActivityLog
)

from app.auth.oauth2 import (
    get_current_user
)

from app.models.user import User


router = APIRouter(

    prefix="/activity-logs",

    tags=["Activity Logs"]
)


@router.get("/")
def get_activity_logs(

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )
):

    logs = db.query(
        ActivityLog
    ).filter(

        ActivityLog.user_id
        ==
        current_user.id

    ).order_by(

        ActivityLog.created_at.desc()

    ).all()

    return logs