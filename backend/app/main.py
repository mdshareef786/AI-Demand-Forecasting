from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from dotenv import load_dotenv

import os


# ==================================
# LOAD ENV VARIABLES
# ==================================

load_dotenv()


# ==================================
# DATABASE
# ==================================

from app.database import (
    engine,
    Base
)


# ==================================
# IMPORT MODELS
# ==================================

from app.models import (
    user,
    dataset,
    forecast_history,
    forecast_schedule,
    report,
    notification,
    project_permission
)


# ==================================
# IMPORT ROUTERS
# ==================================
from app.routers import (

    auth_router,

    user_router,

    dataset_router,

    analytics_router,

    forecast_router,

    report_router,

    admin_router,

    notification_router,

    search_router,

    inventory_router,

    anomaly_router,

    retraining_router,

    revenue_router,

    insights_router,

    filter_router,

    ensemble_router,

    realtime_router,

    export_router,

    comparison_router,

    cache_router,

    automation_router,

    audit_router,

    security_router,

    jwt_security_router,

    background_router,

    alert_settings_router,

    project_router,

    scenario_router,

    project_activity_router,

    executive_router,

    ai_insights_engine_router,

    collaboration_router,

    dataset_version_router,

    accuracy_router,

    executive_reporting_router,

    dashboard_layout_router
)

from app.routers import (
    project_permission_router
)


# ==================================
# CREATE DATABASE TABLES
# ==================================

Base.metadata.create_all(
    bind=engine
)


# ==================================
# FASTAPI APPLICATION
# ==================================

app = FastAPI(

    title="AI Demand Forecasting API",

    version="2.0.0"
)


# ==================================
# FRONTEND URL
# ==================================

FRONTEND_URL = os.getenv(
    "FRONTEND_URL"
)


# ==================================
# CORS CONFIGURATION
# ==================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        FRONTEND_URL,

        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==================================
# REGISTER ROUTERS
# ==================================

app.include_router(
    auth_router.router
)

app.include_router(
    user_router.router
)

app.include_router(
    dataset_router.router
)

app.include_router(
    analytics_router.router
)

app.include_router(
    forecast_router.router
)

app.include_router(
    report_router.router
)

app.include_router(
    admin_router.router
)

app.include_router(
    notification_router.router
)

app.include_router(
    search_router.router
)

app.include_router(
    inventory_router.router
)

app.include_router(
    anomaly_router.router
)

app.include_router(
    retraining_router.router
)

app.include_router(
    revenue_router.router
)

app.include_router(
    insights_router.router
)

app.include_router(
    filter_router.router
)

app.include_router(
    ensemble_router.router
)

app.include_router(
    realtime_router.router
)

app.include_router(
    export_router.router
)

app.include_router(
    comparison_router.router
)

app.include_router(
    cache_router.router
)

app.include_router(
    automation_router.router
)

app.include_router(
    audit_router.router
)

app.include_router(
    security_router.router
)

app.include_router(
    jwt_security_router.router
)

app.include_router(
    background_router.router
)

app.include_router(
    alert_settings_router.router
)

app.include_router(
    project_router.router
)

app.include_router(
    scenario_router.router
)

app.include_router(
    project_activity_router.router
)

app.include_router(
    executive_router.router
)

app.include_router(
    ai_insights_engine_router.router
)

app.include_router(
    collaboration_router.router
)

app.include_router(
    dataset_version_router.router
)

app.include_router(
    accuracy_router.router
)

app.include_router(
    executive_reporting_router.router
)

app.include_router(
    dashboard_layout_router.router
)

app.include_router(
    project_permission_router.router
)

# ==================================
# ROOT API
# ==================================

@app.get("/")
def home():

    return {

        "message":
            "AI Demand Forecasting API Running Successfully",

        "version":
            "2.0.0",

        "environment":
            os.getenv(
                "ENVIRONMENT"
            )
    }


# ==================================
# HEALTH CHECK API
# ==================================

@app.get("/health")
def health_check():

    return {

        "status": "healthy",

        "application":
            "AI Demand Forecasting Platform"
    }