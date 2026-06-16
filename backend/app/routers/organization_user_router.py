from fastapi import (
    APIRouter,
    Depends
)

from app.models.organization_user import OrganizationUser

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.organization_user_service import (

    add_user_to_organization,

    get_organization_users,

    update_user_role,

    remove_user_from_organization
)

router = APIRouter(

    prefix="/organization-users",

    tags=["Organization Users"]
)


# ==========================
# ADD USER
# ==========================

@router.post("/add")
def add_user(

    organization_id: int,

    user_id: int,

    role: str,

    db: Session = Depends(
        get_db
    )
):

    return add_user_to_organization(

        db,

        organization_id,

        user_id,

        role
    )


# ==========================
# GET USERS
# ==========================

@router.get("/{organization_id}")
def list_users(

    organization_id: int,

    db: Session = Depends(
        get_db
    )
):

    return get_organization_users(

        db,

        organization_id
    )


# ==========================
# UPDATE ROLE
# ==========================

@router.put("/{member_id}")
def update_role(

    member_id: int,

    role: str,

    db: Session = Depends(
        get_db
    )
):

    return update_user_role(

        db,

        member_id,

        role
    )


# ==========================
# REMOVE USER
# ==========================

@router.delete("/{member_id}")
def remove_user(

    member_id: int,

    db: Session = Depends(
        get_db
    )
):

    return {

        "removed":

        remove_user_from_organization(

            db,

            member_id
        )
    }

# ==========================
# GET ALL USERS
# ==========================

@router.get("/")
def get_all_users(
    db: Session = Depends(get_db)
):

    return db.query(
        OrganizationUser
    ).all()