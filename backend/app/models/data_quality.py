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


class DataQuality(Base):

    __tablename__ = "data_quality"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    dataset_name = Column(
        String(200),
        nullable=False
    )

    quality_score = Column(
        Float,
        default=100
    )

    missing_records = Column(
        Integer,
        default=0
    )

    validation_status = Column(
        String(50),
        default="Valid"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (

        Index(
            "idx_quality_dataset",
            "dataset_name"
        ),
    )