from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Boolean,
    Index
)

from datetime import datetime

from app.database import Base


class ForecastHistory(Base):

    __tablename__ = "forecast_history"

    # ==========================
    # PRIMARY KEY
    # ==========================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==========================
    # USER RELATION
    # ==========================

    user_id = Column(

        Integer,

        ForeignKey(
            "users.id"
        ),

        nullable=False,

        index=True
    )

    # ==========================
    # MODEL INFO
    # ==========================

    model_used = Column(

        String(50),

        nullable=False,

        index=True
    )

    best_model = Column(

        Boolean,

        default=False,

        index=True
    )

    # ==========================
    # FILTERS
    # ==========================

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

    region = Column(
        String(100),
        nullable=True,
        index=True
    )

    # ==========================
    # FORECAST CONFIG
    # ==========================

    forecast_months = Column(
        Integer,
        nullable=False
    )

    retrained = Column(
        Boolean,
        default=False
    )

    seasonal_detected = Column(
        Boolean,
        default=False
    )

    anomaly_detected = Column(
        Boolean,
        default=False
    )

    # ==========================
    # METRICS
    # ==========================

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

    prediction_accuracy = Column(
        Float,
        nullable=True
    )

    execution_time = Column(
        Float,
        nullable=True
    )

    # ==========================
    # ACTIVITY LOGGING
    # ==========================

    api_name = Column(
        String(100),
        nullable=True,
        index=True
    )

    activity_type = Column(
        String(100),
        nullable=True,
        index=True
    )

    status = Column(
        String(50),
        default="success",
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

        "idx_forecast_user_model",

        "user_id",

        "model_used"
    ),

    Index(

        "idx_forecast_region_category",

        "region",

        "category"
    ),

    Index(

        "idx_forecast_created_status",

        "created_at",

        "status"
    ),

)