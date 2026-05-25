from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Float,
    Index
)

from datetime import datetime

from app.database import Base


class ActivityLog(Base):

    __tablename__ = "activity_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(

        Integer,

        ForeignKey(
            "users.id"
        ),

        index=True
    )

    activity_type = Column(

        String(100),

        nullable=False,

        index=True
    )

    module = Column(

        String(100),

        nullable=False,

        index=True
    )

    api_name = Column(

        String(200),

        nullable=True,

        index=True
    )

    execution_time = Column(
        Float,
        nullable=True
    )

    status = Column(

        String(50),

        default="success",

        index=True
    )

    created_at = Column(

        DateTime,

        default=datetime.utcnow,

        index=True
    )

    __table_args__ = (

        Index(
            "idx_activity_user",
            "user_id"
        ),

        Index(
            "idx_activity_module",
            "module"
        ),

        Index(
            "idx_activity_created",
            "created_at"
        ),
    )