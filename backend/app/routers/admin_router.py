from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.auth.role_checker import (
    require_roles
)

from app.models.user import User
from app.models.dataset import Dataset
from app.models.forecast_history import ForecastHistory
from app.models.report import Report


router = APIRouter(

    prefix="/admin",

    tags=["Admin"]
)


# ==================================
# DASHBOARD SUMMARY
# ==================================

@router.get("/dashboard-summary")
def get_dashboard_summary(

    db: Session = Depends(get_db),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    total_users = db.query(
        User
    ).count()

    active_users = db.query(
        User
    ).filter(
        User.is_active == True
    ).count()

    total_datasets = db.query(
        Dataset
    ).count()

    total_forecasts = db.query(
        ForecastHistory
    ).count()

    total_reports = db.query(
        Report
    ).count()

    return {

        "total_users":
        total_users,

        "active_users":
        active_users,

        "total_datasets":
        total_datasets,

        "total_forecasts":
        total_forecasts,

        "total_reports":
        total_reports
    }


# ==================================
# GET USERS
# ==================================

@router.get("/users")
def get_all_users(

    db: Session = Depends(get_db),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    users = db.query(
        User
    ).order_by(
        User.created_at.desc()
    ).all()

    return users


# ==================================
# DISABLE USER
# ==================================

@router.put(
    "/disable-user/{user_id}"
)
def disable_user(

    user_id: int,

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )

    user.is_active = False

    db.commit()

    return {

        "message":
        "User disabled"
    }


# ==================================
# ENABLE USER
# ==================================

@router.put(
    "/enable-user/{user_id}"
)
def enable_user(

    user_id: int,

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )

    user.is_active = True

    db.commit()

    return {

        "message":
        "User enabled"
    }


# ==================================
# DELETE USER
# ==================================

@router.delete(
    "/delete-user/{user_id}"
)
def delete_user(

    user_id: int,

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )

    db.delete(user)

    db.commit()

    return {

        "message":
        "User deleted"
    }


# ==================================
# DATASETS
# ==================================

@router.get("/datasets")
def get_all_datasets(

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    datasets = db.query(
        Dataset
    ).all()

    return datasets


# ==================================
# DELETE DATASET
# ==================================

@router.delete(
    "/delete-dataset/{dataset_id}"
)
def delete_dataset(

    dataset_id: int,

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    dataset = db.query(
        Dataset
    ).filter(

        Dataset.id ==
        dataset_id

    ).first()

    if not dataset:

        raise HTTPException(

            status_code=404,

            detail=
            "Dataset not found"
        )

    db.delete(dataset)

    db.commit()

    return {

        "message":
        "Dataset deleted"
    }


# ==================================
# FORECAST ACTIVITIES
# ==================================

@router.get(
    "/forecast-activities"
)
def forecast_activities(

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    data = db.query(
        ForecastHistory
    ).order_by(

        ForecastHistory.created_at.desc()

    ).limit(20).all()

    return data


# ==================================
# REPORTS
# ==================================

@router.get("/reports")
def reports(

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    reports = db.query(
        Report
    ).all()

    return reports


# ==================================
# SYSTEM ANALYTICS
# ==================================

@router.get(
    "/system-analytics"
)
def system_analytics(

    db: Session = Depends(
        get_db
    ),

    admin_user: User = Depends(

        require_roles(
            ["super_admin"]
        )
    )
):

    return {

        "users":
        db.query(User).count(),

        "datasets":
        db.query(
            Dataset
        ).count(),

        "forecasts":
        db.query(
            ForecastHistory
        ).count(),

        "reports":
        db.query(
            Report
        ).count()
    }