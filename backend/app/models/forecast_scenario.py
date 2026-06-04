from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Index
)

from datetime import datetime

from app.database import Base


class ForecastScenario(Base):

    __tablename__ = "forecast_scenarios"

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
    # SCENARIO INFO
    # ==========================

    scenario_name = Column(
        String(200),
        nullable=False,
        index=True
    )

    # ==========================
    # WHAT-IF VARIABLES
    # ==========================

    growth_rate = Column(
        Float,
        default=0
    )

    seasonality_factor = Column(
        Float,
        default=1
    )

    demand_multiplier = Column(
        Float,
        default=1
    )

    promotion_impact = Column(
        Float,
        default=0
    )

    # ==========================
    # RESULT
    # ==========================

    forecast_result = Column(
        Float,
        nullable=True
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
            "idx_scenario_project",
            "project_id"
        ),

        Index(
            "idx_scenario_name",
            "scenario_name"
        ),

        Index(
            "idx_scenario_created",
            "created_at"
        ),
    )