from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.auth.oauth2 import (
    get_current_user
)

from app.models.user import User
from app.models.notification import Notification


router = APIRouter(

    prefix="/notifications",

    tags=["Notifications"]
)


# ==================================
# GET USER NOTIFICATIONS
# ==================================

@router.get("/")
def get_notifications(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    notifications = db.query(

        Notification

    ).filter(

        Notification.user_id == current_user.id

    ).order_by(

        Notification.created_at.desc()

    ).all()

    results = []

    for item in notifications:

        results.append({

            "id": item.id,

            "title": item.title,

            "message": item.message,

            "is_read": item.is_read,

            "created_at": item.created_at
        })

    return {

        "notifications": results
    }