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


class OrganizationUser(Base):

    __tablename__ = "organization_users"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # RELATIONSHIPS
    # ==========================

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    # ==========================
    # ORGANIZATION ROLE
    # ==========================

    role = Column(
        String(50),
        default="viewer",
        nullable=False,
        index=True
    )

    """
    owner
    admin
    analyst
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

    __table_args__ = (

        Index(
            "idx_org_user_org",
            "organization_id"
        ),

        Index(
            "idx_org_user_user",
            "user_id"
        ),
    )