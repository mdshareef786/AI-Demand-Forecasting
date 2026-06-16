from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.organization_service import (

    create_organization,

    get_organizations,

    get_organization,

    update_organization,

    delete_organization
)

router = APIRouter(

    prefix="/organizations",

    tags=["Organization Management"]
)


# ==========================
# CREATE ORGANIZATION
# ==========================

@router.post("/create")
def create_new_organization(

    name: str,

    industry: str = "",

    country: str = "",

    email: str = "",

    phone: str = "",

    db: Session = Depends(
        get_db
    )
):

    return create_organization(

        db,

        name,

        industry,

        country,

        email,

        phone
    )


# ==========================
# GET ALL ORGANIZATIONS
# ==========================

@router.get("/")
def list_organizations(

    db: Session = Depends(
        get_db
    )
):

    return get_organizations(
        db
    )


# ==========================
# GET ORGANIZATION BY ID
# ==========================

@router.get("/{organization_id}")
def get_organization_by_id(

    organization_id: int,

    db: Session = Depends(
        get_db
    )
):

    return get_organization(

        db,

        organization_id
    )


# ==========================
# UPDATE ORGANIZATION
# ==========================

@router.put("/{organization_id}")
def edit_organization(

    organization_id: int,

    data: dict,

    db: Session = Depends(
        get_db
    )
):

    return update_organization(

        db,

        organization_id,

        data
    )


# ==========================
# DELETE ORGANIZATION
# ==========================

@router.delete("/{organization_id}")
def remove_organization(

    organization_id: int,

    db: Session = Depends(
        get_db
    )
):

    success = delete_organization(

        db,

        organization_id
    )

    return {

        "deleted":
        success
    }