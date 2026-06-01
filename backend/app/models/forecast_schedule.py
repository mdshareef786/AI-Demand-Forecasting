from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.database import Base


class ForecastSchedule(Base):

    __tablename__ = "forecast_schedules"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    schedule_name = Column(
        String(100)
    )

    model_name = Column(
        String(50),
        default="prophet"
    )

    interval_type = Column(
        String(50),
        default="daily"
    )

    future_months = Column(
        Integer,
        default=6
    )

    auto_alert = Column(
        Boolean,
        default=True
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )