from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.workflow_service import (

    create_workflow,

    get_workflows,

    get_workflow,

    run_workflow,

    get_executions
)

router = APIRouter(

    prefix="/workflows",

    tags=["Workflow Automation"]
)


@router.post("/create")
def create(

    name: str,

    workflow_type: str,

    db: Session = Depends(
        get_db
    )
):

    return create_workflow(

        db,

        name,

        workflow_type
    )


@router.get("/")
def list_workflows(

    db: Session = Depends(
        get_db
    )
):

    return get_workflows(
        db
    )


@router.get("/{workflow_id}")
def get(

    workflow_id: int,

    db: Session = Depends(
        get_db
    )
):

    return get_workflow(

        db,

        workflow_id
    )


@router.post("/run/{workflow_id}")
def run(

    workflow_id: int,

    db: Session = Depends(
        get_db
    )
):

    return run_workflow(

        db,

        workflow_id
    )


@router.get("/executions/history")
def executions(

    db: Session = Depends(
        get_db
    )
):

    return get_executions(
        db
    )