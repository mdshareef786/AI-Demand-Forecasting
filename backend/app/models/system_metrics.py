from sqlalchemy import (
    Column,
    Integer,
    Float,
    DateTime
)

from datetime import datetime

from app.database import Base


class SystemMetrics(Base):

    __tablename__ = "system_metrics"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # CPU USAGE
    # ==========================

    cpu_usage = Column(
        Float,
        nullable=True
    )

    # ==========================
    # MEMORY USAGE
    # ==========================

    memory_usage = Column(
        Float,
        nullable=True
    )

    # ==========================
    # API RESPONSE TIME
    # ==========================

    api_response_time = Column(
        Float,
        nullable=True
    )

    # ==========================
    # ACTIVE USERS
    # ==========================

    active_users = Column(
        Integer,
        default=0
    )

    # ==========================
    # CREATED DATE
    # ==========================

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )