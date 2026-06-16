from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
    Index
)

from datetime import datetime

from app.database import Base


class OrganizationSettings(Base):

    __tablename__ = "organization_settings"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # ORGANIZATION
    # ==========================

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        unique=True,
        index=True
    )

    # ==========================
    # SETTINGS
    # ==========================

    forecast_retention_days = Column(
        Integer,
        default=365
    )

    default_forecast_model = Column(
        String(100),
        default="prophet"
    )

    allow_external_sharing = Column(
        Boolean,
        default=False
    )

    notification_enabled = Column(
        Boolean,
        default=True
    )

    # ==========================
    # CREATED TIME
    # ==========================

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (

        Index(
            "idx_org_settings_org",
            "organization_id"
        ),
    )