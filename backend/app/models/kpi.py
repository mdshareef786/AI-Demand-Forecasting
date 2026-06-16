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


class KPI(Base):

    __tablename__ = "kpis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    kpi_name = Column(
        String(200),
        nullable=False
    )

    target_value = Column(
        Float,
        nullable=False
    )

    current_value = Column(
        Float,
        default=0
    )

    threshold = Column(
        Float,
        default=0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (

        Index(
            "idx_kpi_name",
            "kpi_name"
        ),
    )