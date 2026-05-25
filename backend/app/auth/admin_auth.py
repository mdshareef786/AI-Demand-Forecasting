from fastapi import (
    Depends,
    HTTPException,
    status
)

from app.auth.oauth2 import (
    get_current_user
)

from app.models.user import User


# ==================================
# SUPER ADMIN
# ==================================

def get_super_admin(

    current_user: User = Depends(
        get_current_user
    )
):

    if current_user.role != "super_admin":

        raise HTTPException(

            status_code=status.HTTP_403_FORBIDDEN,

            detail="Super Admin access required"
        )

    return current_user


# ==================================
# ANALYST ACCESS
# ==================================

def get_analyst_user(

    current_user: User = Depends(
        get_current_user
    )
):

    allowed_roles = [

        "super_admin",

        "analyst"
    ]

    if current_user.role not in allowed_roles:

        raise HTTPException(

            status_code=status.HTTP_403_FORBIDDEN,

            detail="Analyst access required"
        )

    return current_user


# ==================================
# VIEWER ACCESS
# ==================================

def get_viewer_user(

    current_user: User = Depends(
        get_current_user
    )
):

    allowed_roles = [

        "super_admin",

        "analyst",

        "viewer"
    ]

    if current_user.role not in allowed_roles:

        raise HTTPException(

            status_code=status.HTTP_403_FORBIDDEN,

            detail="Viewer access required"
        )

    return current_user


# ==================================
# LEGACY ADMIN SUPPORT
# ==================================

def get_admin_user(

    current_user: User = Depends(
        get_current_user
    )
):

    allowed_roles = [

        "super_admin"
    ]

    if current_user.role not in allowed_roles:

        raise HTTPException(

            status_code=status.HTTP_403_FORBIDDEN,

            detail="Admin access required"
        )

    return current_user