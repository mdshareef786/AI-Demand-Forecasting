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


class ForecastHistory(Base):

    __tablename__ = "forecast_history"

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
    # FORECAST MODEL
    # ==================================

    model_used = Column(

        String(50),

        nullable=False,

        index=True
    )

    # ==================================
    # FILTERS
    # ==================================

    category = Column(
        String(100),
        nullable=True,
        index=True
    )

    product = Column(
        String(100),
        nullable=True,
        index=True
    )

    # ==================================
    # FORECAST CONFIG
    # ==================================

    forecast_months = Column(
        Integer,
        nullable=False
    )

    # ==================================
    # METRICS
    # ==================================

    mape = Column(
        Float,
        nullable=True
    )

    mae = Column(
        Float,
        nullable=True
    )

    rmse = Column(
        Float,
        nullable=True
    )

    # ==================================
    # CREATED DATE
    # ==================================

    created_at = Column(

        DateTime,

        default=datetime.utcnow,

        index=True
    )

    # ==================================
    # DATABASE INDEX OPTIMIZATION
    # ==================================

    __table_args__ = (

        Index(
            "idx_forecast_user_id",
            "user_id"
        ),

        Index(
            "idx_forecast_model",
            "model_used"
        ),

        Index(
            "idx_forecast_created_at",
            "created_at"
        ),

        Index(
            "idx_forecast_category",
            "category"
        ),

        Index(
            "idx_forecast_product",
            "product"
        ),
    )