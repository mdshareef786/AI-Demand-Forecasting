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

from app.services.alert_service import (
    create_alert
)

from app.services.email_service import (
    send_email_notification
)

router = APIRouter(

    prefix="/notifications",

    tags=["Notifications"]
)

# ==================================
# CREATE THRESHOLD ALERT
# ==================================

@router.post("/threshold-alert")
def create_threshold_alert(

    sales:int,

    threshold:int=100000,

    db:Session=Depends(get_db),

    current_user:User=Depends(
        get_current_user
    )
):

    if sales > threshold:

        alert = create_alert(

            db=db,

            user_id=current_user.id,

            title=
            "Threshold Alert",

            message=
            f"Sales crossed threshold: {sales}"
        )

        return {

            "alert_generated":
            True,

            "sales":
            sales,

            "threshold":
            threshold,

            "message":
            alert.message
        }

    return {

        "alert_generated":
        False,

        "message":
        "Threshold not reached"
    }



# ==================================
# FORECAST FAILURE ALERT
# ==================================

@router.post("/forecast-failure")

def forecast_failure(

    reason:str,

    db:Session=Depends(get_db),

    current_user:User=Depends(
        get_current_user
    )
):

    alert=create_alert(

        db=db,

        user_id=current_user.id,

        title=
        "Forecast Failure",

        message=
        reason
    )

    return {

        "created":
        True,

        "alert":
        alert.message
    }



# ==================================
# REPORT COMPLETION ALERT
# ==================================

@router.post("/report-complete")

def report_complete(

    report_name:str,

    db:Session=Depends(get_db),

    current_user:User=Depends(
        get_current_user
    )
):

    alert=create_alert(

        db=db,

        user_id=current_user.id,

        title=
        "Report Completed",

        message=
        f"{report_name} generated"
    )

    return {

        "report":
        report_name,

        "status":
        "completed"
    }

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

# ==================================
# EMAIL ALERT
# ==================================

@router.post("/email-alert")

def email_alert(

    email:str,

    subject:str,

    message:str,

    db:Session=Depends(get_db),

    current_user:User=Depends(
        get_current_user
    )
):

    result = send_email_notification(

        email=email,

        subject=subject,

        message=message
    )

    create_alert(

        db=db,

        user_id=current_user.id,

        title=
        "Email Alert",

        message=
        f"Mail sent to {email}"
    )

    return result



# ==================================
# REPORT EMAIL
# ==================================

@router.post("/report-email")

def report_email(

    email:str,

    report_name:str,

    db:Session=Depends(get_db),

    current_user:User=Depends(
        get_current_user
    )
):

    result=send_email_notification(

        email=email,

        subject=
        "Report Generated",

        message=
        f"{report_name} ready"
    )

    return result