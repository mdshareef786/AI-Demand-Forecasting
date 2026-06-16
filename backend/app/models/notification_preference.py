from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.database import Base


class NotificationPreference(Base):

    __tablename__ = "notification_preferences"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    email_notifications = Column(
        Boolean,
        default=True
    )

    forecast_notifications = Column(
        Boolean,
        default=True
    )

    report_notifications = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )