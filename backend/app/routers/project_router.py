from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.project_service import (

    create_project,

    get_projects,

    get_project,

    update_project,

    delete_project
)

router = APIRouter(

    prefix="/projects",

    tags=["Forecast Projects"]
)


@router.post("/create")
def create_new_project(

    name: str,

    description: str,

    owner_id: int,

    db: Session = Depends(
        get_db
    )
):

    return create_project(

        db,

        name,

        description,

        owner_id
    )


@router.get("/")
def list_projects(

    db: Session = Depends(
        get_db
    )
):

    return get_projects(
        db
    )


@router.get("/{project_id}")
def get_project_by_id(

    project_id: int,

    db: Session = Depends(
        get_db
    )
):

    return get_project(

        db,

        project_id
    )


@router.put("/{project_id}")
def edit_project(

    project_id: int,

    data: dict,

    db: Session = Depends(
        get_db
    )
):

    return update_project(

        db,

        project_id,

        data
    )


@router.delete("/{project_id}")
def remove_project(

    project_id: int,

    db: Session = Depends(
        get_db
    )
):

    success = delete_project(

        db,

        project_id
    )

    return {

        "deleted":
        success
    }