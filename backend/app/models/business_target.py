from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Index
)

from datetime import datetime

from app.database import Base


class BusinessTarget(Base):

    __tablename__ = "business_targets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    target_name = Column(
        String(200),
        nullable=False
    )

    target_type = Column(
        String(100),
        nullable=False
    )

    """
    annual
    quarterly
    monthly
    """

    target_value = Column(
        Float,
        nullable=False
    )

    forecast_value = Column(
        Float,
        default=0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (

        Index(
            "idx_target_type",
            "target_type"
        ),
    )