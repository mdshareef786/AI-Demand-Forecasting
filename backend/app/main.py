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
    report,
    notification
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

    notification_router
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

    version="2.0.0",

    description="""

    Enterprise AI Demand Forecasting Platform

    Features:
    - AI Forecasting
    - Analytics Dashboard
    - Admin Panel
    - Notifications
    - Reports System
    - Region Analytics
    - Model Comparison
    """
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