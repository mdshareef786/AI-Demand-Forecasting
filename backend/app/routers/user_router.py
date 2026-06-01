from fastapi import APIRouter, Depends

from app.auth.oauth2 import get_current_user
from app.models.user import User

from app.services.user_service import (
    update_profile,
    reset_password,
    account_status
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "active": current_user.is_active
    }


@router.put("/profile")
def profile_update(

    name: str,

    email: str
):

    return update_profile(
        name,
        email
    )


@router.post("/password-reset")
def password_reset():

    return reset_password()


@router.get("/account-status")
def status():

    return account_status(
        True
    )