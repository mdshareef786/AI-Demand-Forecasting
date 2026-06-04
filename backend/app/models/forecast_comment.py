from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.database import Base


class ForecastComment(Base):

    __tablename__ = "forecast_comments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    project_id = Column(
        Integer,
        ForeignKey(
            "forecast_projects.id"
        ),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey(
            "users.id"
        ),
        nullable=False
    )

    comment = Column(
        String(1000),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )