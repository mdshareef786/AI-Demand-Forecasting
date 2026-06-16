from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.database import Base


class OrganizationAnnouncement(Base):

    __tablename__ = "organization_announcements"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id")
    )

    title = Column(
        String(200)
    )

    message = Column(
        String(2000)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )