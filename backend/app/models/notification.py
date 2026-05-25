from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
    Index
)

from datetime import datetime

from app.database import Base


class Notification(Base):

    __tablename__ = "notifications"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # USER
    # ==========================

    user_id = Column(

        Integer,

        ForeignKey(
            "users.id"
        ),

        nullable=False,

        index=True
    )

    # ==========================
    # CONTENT
    # ==========================

    title = Column(
        String(255),
        nullable=False,
        index=True
    )

    message = Column(
        String(500),
        nullable=False
    )

    # ==========================
    # TYPES
    # ==========================

    notification_type = Column(

        String(50),

        default="system",

        index=True
    )

    """
    forecast
    dataset
    report
    alert
    system
    """

    module = Column(

        String(50),

        default="general",

        index=True
    )

    """
    forecast
    analytics
    reports
    monitoring
    dataset
    """

    # ==========================
    # STATUS
    # ==========================

    is_read = Column(
        Boolean,
        default=False,
        index=True
    )

    priority = Column(
        String(20),
        default="normal",
        index=True
    )

    # ==========================
    # CREATED
    # ==========================

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True
    )

    # ==========================
    # OPTIMIZATION
    # ==========================

    __table_args__ = (

        Index(
            "idx_notification_user",
            "user_id"
        ),

        Index(
            "idx_notification_type",
            "notification_type"
        ),

        Index(
            "idx_notification_module",
            "module"
        ),

        Index(
            "idx_notification_read",
            "is_read"
        ),

        Index(
            "idx_notification_created",
            "created_at"
        ),
    )