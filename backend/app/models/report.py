from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Index
)

from sqlalchemy.sql import func

from app.database import Base


class Report(Base):

    __tablename__ = "reports"

    # ==================================
    # PRIMARY KEY
    # ==================================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==================================
    # USER RELATION
    # ==================================

    user_id = Column(

        Integer,

        ForeignKey("users.id"),

        nullable=False,

        index=True
    )

    # ==================================
    # REPORT DETAILS
    # ==================================

    report_name = Column(

        String(255),

        nullable=False,

        index=True
    )

    report_type = Column(

        String(100),

        nullable=False,

        index=True
    )

    file_path = Column(

        String(500),

        nullable=False
    )

    # ==================================
    # CREATED DATE
    # ==================================

    created_at = Column(

        DateTime(timezone=True),

        server_default=func.now(),

        index=True
    )

    # ==================================
    # DATABASE INDEX OPTIMIZATION
    # ==================================

    __table_args__ = (

        Index(
            "idx_report_user_id",
            "user_id"
        ),

        Index(
            "idx_report_created_at",
            "created_at"
        ),

        Index(
            "idx_report_type",
            "report_type"
        ),

        Index(
            "idx_report_name",
            "report_name"
        ),
    )