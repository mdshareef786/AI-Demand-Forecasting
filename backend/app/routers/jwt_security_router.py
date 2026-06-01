from fastapi import APIRouter, Depends
from app.auth.oauth2 import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/jwt-security",
    tags=["JWT Security"]
)

@router.get("/status")
def jwt_status(
    current_user: User = Depends(get_current_user)
):
    return {
        "authenticated": True,
        "user_id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "token_status": "valid"
    }