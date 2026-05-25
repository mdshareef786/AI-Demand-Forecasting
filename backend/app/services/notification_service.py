from sqlalchemy.orm import Session
from datetime import datetime

from app.models.notification import Notification


# ==================================
# CREATE NOTIFICATION
# ==================================

def create_notification(

    db: Session,

    user_id: int,

    title: str,

    message: str,

    notification_type: str = "system",

    module: str = "general"
):

    notification = Notification(

        user_id=user_id,

        title=title,

        message=message,

        notification_type=notification_type,

        module=module,

        created_at=datetime.utcnow()
    )

    db.add(notification)

    db.commit()

    db.refresh(notification)

    return notification


# ==================================
# FORECAST NOTIFICATION
# ==================================

def create_forecast_notification(

    db: Session,

    user_id: int,

    model_name: str
):

    return create_notification(

        db=db,

        user_id=user_id,

        title="Forecast Completed",

        message=f"{model_name} forecast generated successfully",

        notification_type="forecast",

        module="forecast"
    )


# ==================================
# DATASET NOTIFICATION
# ==================================

def create_dataset_notification(

    db: Session,

    user_id: int,

    filename: str
):

    return create_notification(

        db=db,

        user_id=user_id,

        title="Dataset Uploaded",

        message=f"{filename} uploaded successfully",

        notification_type="dataset",

        module="dataset"
    )


# ==================================
# REPORT NOTIFICATION
# ==================================

def create_report_notification(

    db: Session,

    user_id: int,

    report_name: str
):

    return create_notification(

        db=db,

        user_id=user_id,

        title="Report Generated",

        message=f"{report_name} created successfully",

        notification_type="report",

        module="report"
    )


# ==================================
# ALERT NOTIFICATION
# ==================================

def create_alert_notification(

    db: Session,

    user_id: int,

    message: str
):

    return create_notification(

        db=db,

        user_id=user_id,

        title="System Alert",

        message=message,

        notification_type="alert",

        module="monitoring"
    )