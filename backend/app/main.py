from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.models import user, dataset

from app.routers import (
    auth_router,
    user_router,
    dataset_router,
    analytics_router,
    forecast_router,
    report_router
)

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(
    title="AI Demand Forecasting API"
)

# ============================
# CORS CONFIGURATION
# ============================

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ============================
# ROUTERS
# ============================

app.include_router(auth_router.router)

app.include_router(user_router.router)

app.include_router(dataset_router.router)

app.include_router(analytics_router.router)

app.include_router(forecast_router.router)

app.include_router(report_router.router)

# ============================
# ROOT API
# ============================

@app.get("/")
def home():

    return {
        "message": "API Running Successfully"
    }