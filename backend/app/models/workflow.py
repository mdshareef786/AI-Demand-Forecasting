from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    Index
)

from datetime import datetime

from app.database import Base


class Workflow(Base):

    __tablename__ = "workflows"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(200),
        nullable=False
    )

    workflow_type = Column(
        String(100),
        nullable=False
    )

    """
    forecast
    report
    notification
    """

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (

        Index(
            "idx_workflow_type",
            "workflow_type"
        ),
    )