from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.services.project_permission_service import (
    assign_permission,
    get_permissions,
    remove_permission
)

router = APIRouter(
    prefix="/project-permissions",
    tags=["Project Permissions"]
)


@router.post("/assign")
def assign(
    project_id: int,
    user_id: int,
    role: str,
    db: Session = Depends(get_db)
):

    return assign_permission(
        db,
        project_id,
        user_id,
        role
    )


@router.get("/{project_id}")
def permissions(
    project_id: int,
    db: Session = Depends(get_db)
):

    return get_permissions(
        db,
        project_id
    )


@router.delete("/{permission_id}")
def remove(
    permission_id: int,
    db: Session = Depends(get_db)
):

    return {
        "removed": remove_permission(
            db,
            permission_id
        )
    }