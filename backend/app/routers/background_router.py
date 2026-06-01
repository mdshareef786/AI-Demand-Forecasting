from fastapi import APIRouter, BackgroundTasks

from app.services.background_service import (
    run_background_job
)

router = APIRouter(
    prefix="/background",
    tags=["Background Tasks"]
)

@router.get("/run")
async def run_task(
    background_tasks: BackgroundTasks
):

    background_tasks.add_task(
        run_background_job
    )

    return {
        "message":
        "Background job started"
    }