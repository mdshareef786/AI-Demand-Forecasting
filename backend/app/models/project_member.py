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


class ProjectMember(Base):

    __tablename__ = "project_members"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # PROJECT RELATION
    # ==========================

    project_id = Column(
        Integer,
        ForeignKey(
            "forecast_projects.id"
        ),
        nullable=False,
        index=True
    )

    # ==========================
    # USER RELATION
    # ==========================

    user_id = Column(
        Integer,
        ForeignKey(
            "users.id"
        ),
        nullable=False,
        index=True
    )

    # ==========================
    # MEMBER ROLE
    # ==========================

    role = Column(
        String(50),
        default="viewer",
        nullable=False,
        index=True
    )

    """
    owner
    editor
    viewer
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
            "idx_project_member_project",
            "project_id"
        ),

        Index(
            "idx_project_member_user",
            "user_id"
        ),

        Index(
            "idx_project_member_role",
            "role"
        ),
    )