from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database import Base


class ProjectPermission(Base):

    __tablename__ = "project_permissions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    project_id = Column(
        Integer,
        ForeignKey("forecast_projects.id")
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    role = Column(
        String(30),
        default="viewer"
    )