from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.database import Base


class DatasetVersion(Base):

    __tablename__ = "dataset_versions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    dataset_name = Column(
        String(255),
        nullable=False
    )

    version = Column(
        String(50),
        nullable=False
    )

    uploaded_by = Column(
        Integer,
        nullable=False
    )

    status = Column(
        String(50),
        default="active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )