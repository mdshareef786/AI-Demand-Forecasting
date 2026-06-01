from fastapi import (
    APIRouter,
    Depends
)

from app.auth.oauth2 import (
    get_current_user
)

from app.models.user import User

from app.services.audit_service import (
    create_audit_log
)

router = APIRouter(

    prefix="/audit",

    tags=["Audit Logs"]
)


@router.get("/admin-action")

def admin_action(

    current_user:User=
    Depends(
        get_current_user
    )
):

    return create_audit_log(

        user_id=
        current_user.id,

        action=
        "Admin Dashboard Access",

        module=
        "Administration"
    )