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


class Organization(Base):

    __tablename__ = "organizations"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # ORGANIZATION INFO
    # ==========================

    name = Column(
        String(200),
        nullable=False,
        unique=True,
        index=True
    )

    industry = Column(
        String(100),
        nullable=True
    )

    country = Column(
        String(100),
        nullable=True
    )

    email = Column(
        String(150),
        nullable=True
    )

    phone = Column(
        String(50),
        nullable=True
    )

    # ==========================
    # STATUS
    # ==========================

    is_active = Column(
        Boolean,
        default=True,
        index=True
    )

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
            "idx_org_name",
            "name"
        ),

        Index(
            "idx_org_active",
            "is_active"
        ),

        Index(
            "idx_org_created",
            "created_at"
        ),
    )