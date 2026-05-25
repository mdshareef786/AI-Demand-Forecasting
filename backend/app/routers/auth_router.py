from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from app.database import get_db

from app.models.user import User

from app.schemas.user_schema import (
    UserCreate
)

from app.auth.auth_handler import (

    hash_password,

    verify_password,

    create_access_token
)

router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]
)


# ==================================
# VALID ROLES
# ==================================

VALID_ROLES = [

    "super_admin",

    "analyst",

    "viewer"
]


# ==================================
# REGISTER
# ==================================

@router.post(

    "/register",

    status_code=status.HTTP_201_CREATED
)

def register(

    user: UserCreate,

    db: Session = Depends(get_db)
):

    # CHECK EMAIL

    existing_user = db.query(

        User

    ).filter(

        User.email == user.email

    ).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already exists"
        )

    # ROLE

    role = getattr(

        user,

        "role",

        "viewer"
    )

    if role not in VALID_ROLES:

        raise HTTPException(

            status_code=400,

            detail="Invalid role"
        )

    # HASH PASSWORD

    hashed_password = hash_password(

        user.password
    )

    # CREATE USER

    new_user = User(

        name=user.name,

        email=user.email,

        password=hashed_password,

        role=role
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message":
            "User registered successfully",

        "role":
            new_user.role
    }


# ==================================
# LOGIN
# ==================================

@router.post("/login")

def login(

    form_data:
    OAuth2PasswordRequestForm = Depends(),

    db: Session = Depends(get_db)
):

    existing_user = db.query(

        User

    ).filter(

        User.email ==
        form_data.username

    ).first()

    if not existing_user:

        raise HTTPException(

            status_code=401,

            detail="Invalid email"
        )

    if not verify_password(

        form_data.password,

        existing_user.password
    ):

        raise HTTPException(

            status_code=401,

            detail="Invalid password"
        )

    if not existing_user.is_active:

        raise HTTPException(

            status_code=403,

            detail="Account disabled"
        )

    # TOKEN

    access_token = create_access_token(

        data={

            "sub":
                existing_user.email,

            "role":
                existing_user.role,

            "user_id":
                existing_user.id
        }
    )

    return {

        "access_token":
            access_token,

        "token_type":
            "bearer",

        "role":
            existing_user.role,

        "name":
            existing_user.name
    }