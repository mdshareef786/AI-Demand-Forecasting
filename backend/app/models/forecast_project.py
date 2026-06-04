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


class ForecastProject(Base):

    __tablename__ = "forecast_projects"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # PROJECT INFO
    # ==========================

    name = Column(
        String(200),
        nullable=False,
        index=True
    )

    description = Column(
        String(1000),
        nullable=True
    )

    # ==========================
    # PROJECT OWNER
    # ==========================

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    # ==========================
    # PROJECT STATUS
    # ==========================

    status = Column(
        String(50),
        default="active",
        index=True
    )

    """
    active
    archived
    completed
    """

    # ==========================
    # CREATED TIME
    # ==========================

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True
    )

    # ==========================
    # INDEXES
    # ==========================

    __table_args__ = (

        Index(
            "idx_project_owner",
            "owner_id"
        ),

        Index(
            "idx_project_status",
            "status"
        ),

        Index(
            "idx_project_created",
            "created_at"
        ),
    )