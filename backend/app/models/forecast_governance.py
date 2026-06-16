from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Index
)

from datetime import datetime

from app.database import Base


class ForecastGovernance(Base):

    __tablename__ = "forecast_governance"

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

    version = Column(
        String(50),
        nullable=False
    )

    lifecycle_status = Column(
        String(50),
        default="draft",
        index=True
    )

    """
    draft
    submitted
    approved
    rejected
    archived
    """

    modified_by = Column(
        Integer,
        nullable=False
    )

    remarks = Column(
        String(1000)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (

        Index(
            "idx_governance_status",
            "lifecycle_status"
        ),
    )