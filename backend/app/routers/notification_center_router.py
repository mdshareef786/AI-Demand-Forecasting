from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.notification_center_service import (

    create_preference,

    get_preferences,

    create_announcement,

    get_announcements,

    notification_history,

    role_based_notifications
)

router = APIRouter(

    prefix="/notification-center",

    tags=["Notification Center Enhancements"]
)


@router.post("/preferences/create")
def create_notification_preference(

    user_id: int,

    email_notifications: bool,

    forecast_notifications: bool,

    report_notifications: bool,

    db: Session = Depends(
        get_db
    )
):

    return create_preference(

        db,

        user_id,

        email_notifications,

        forecast_notifications,

        report_notifications
    )


@router.get("/preferences")
def preferences(

    db: Session = Depends(
        get_db
    )
):

    return get_preferences(
        db
    )


@router.post("/announcements/create")
def announcement(

    organization_id: int,

    title: str,

    message: str,

    db: Session = Depends(
        get_db
    )
):

    return create_announcement(

        db,

        organization_id,

        title,

        message
    )


@router.get("/announcements")
def announcements(

    db: Session = Depends(
        get_db
    )
):

    return get_announcements(
        db
    )


@router.get("/history")
def history():

    return notification_history()


@router.get("/role-based")
def role_notifications():

    return role_based_notifications()