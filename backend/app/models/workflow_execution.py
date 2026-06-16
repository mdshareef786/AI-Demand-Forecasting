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


class WorkflowExecution(Base):

    __tablename__ = "workflow_executions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id"),
        nullable=False
    )

    status = Column(
        String(50),
        default="completed"
    )

    execution_message = Column(
        String(1000)
    )

    executed_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (

        Index(
            "idx_execution_workflow",
            "workflow_id"
        ),
    )