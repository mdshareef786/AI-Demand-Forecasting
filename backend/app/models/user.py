from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    Index
)

from datetime import datetime

from app.database import Base


class User(Base):

    __tablename__ = "users"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # USER INFO
    # ==========================

    name = Column(
        String(100),
        nullable=False,
        index=True
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    password = Column(
        String(255),
        nullable=False
    )

    # ==========================
    # ROLE MANAGEMENT
    # ==========================

    role = Column(

        String(30),

        default="viewer",

        nullable=False,

        index=True
    )

    """
    Supported Roles

    super_admin
    analyst
    viewer
    """

    # ==========================
    # ACCOUNT STATUS
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
    # INDEX OPTIMIZATION
    # ==========================

    __table_args__ = (

        Index(
            "idx_user_email",
            "email"
        ),

        Index(
            "idx_user_role",
            "role"
        ),

        Index(
            "idx_user_active",
            "is_active"
        ),

        Index(
            "idx_user_created",
            "created_at"
        ),

        Index(
            "idx_user_name",
            "name"
        ),
    )