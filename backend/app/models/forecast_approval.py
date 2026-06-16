from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Index
)

from datetime import datetime

from app.database import Base


class ForecastApproval(Base):

    __tablename__ = "forecast_approvals"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    forecast_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    submitted_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    approved_by = Column(
        Integer,
        nullable=True,
        index=True
    )

    status = Column(
        String(50),
        default="pending",
        index=True
    )

    """
    pending
    approved
    rejected
    """

    comments = Column(
        String(1000),
        nullable=True
    )

    submitted_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    reviewed_at = Column(
        DateTime,
        nullable=True
    )

    __table_args__ = (

        Index(
            "idx_approval_status",
            "status"
        ),

        Index(
            "idx_approval_forecast",
            "forecast_id"
        ),
    )