from fastapi import (
    APIRouter,
    Depends
)

from app.auth.oauth2 import (
    get_current_user
)

from app.models.user import User

from app.services.rate_limit_service import (
    check_rate_limit
)

router = APIRouter(

    prefix="/security",

    tags=["Security"]
)


@router.get("/rate-limit")

def rate_limit(

    current_user: User = Depends(
        get_current_user
    )
):

    return check_rate_limit(
        current_user.id
    )