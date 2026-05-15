from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.auth.admin_auth import (
    get_admin_user
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
# ADMIN DASHBOARD SUMMARY
# ==================================

@router.get("/dashboard-summary")
def get_dashboard_summary(

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
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

        "total_users": total_users,

        "active_users": active_users,

        "total_datasets": total_datasets,

        "total_forecasts": total_forecasts,

        "total_reports": total_reports
    }


# ==================================
# GET ALL USERS
# ==================================

@router.get("/users")
def get_all_users(

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
    )
):

    users = db.query(User).order_by(

        User.created_at.desc()

    ).all()

    results = []

    for item in users:

        results.append({

            "id": item.id,

            "name": item.name,

            "email": item.email,

            "role": item.role,

            "is_active": item.is_active,

            "created_at": item.created_at
        })

    return {

        "total_users": len(results),

        "users": results
    }


# ==================================
# DISABLE USER
# ==================================

@router.put("/disable-user/{user_id}")
def disable_user(

    user_id: int,

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
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

        "message": "User disabled successfully"
    }


# ==================================
# ENABLE USER
# ==================================

@router.put("/enable-user/{user_id}")
def enable_user(

    user_id: int,

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
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

        "message": "User enabled successfully"
    }


# ==================================
# DELETE USER
# ==================================

@router.delete("/delete-user/{user_id}")
def delete_user(

    user_id: int,

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
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

        "message": "User deleted successfully"
    }


# ==================================
# ALL DATASETS
# ==================================

@router.get("/datasets")
def get_all_datasets(

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
    )
):

    datasets = db.query(
        Dataset
    ).order_by(

        Dataset.created_at.desc()

    ).all()

    results = []

    for item in datasets:

        results.append({

            "id": item.id,

            "filename": item.filename,

            "file_path": item.file_path,

            "uploaded_by": item.uploaded_by,

            "created_at": item.created_at
        })

    return {

        "total_datasets": len(results),

        "datasets": results
    }


# ==================================
# DELETE DATASET
# ==================================

@router.delete("/delete-dataset/{dataset_id}")
def delete_dataset(

    dataset_id: int,

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
    )
):

    dataset = db.query(Dataset).filter(

        Dataset.id == dataset_id

    ).first()

    if not dataset:

        raise HTTPException(

            status_code=404,

            detail="Dataset not found"
        )

    db.delete(dataset)

    db.commit()

    return {

        "message": "Dataset deleted successfully"
    }


# ==================================
# FORECAST ACTIVITIES
# ==================================

@router.get("/forecast-activities")
def get_forecast_activities(

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
    )
):

    forecasts = db.query(

        ForecastHistory

    ).order_by(

        ForecastHistory.created_at.desc()

    ).limit(20).all()

    results = []

    for item in forecasts:

        results.append({

            "user_id": item.user_id,

            "model_used": item.model_used,

            "category": item.category,

            "product": item.product,

            "forecast_months": item.forecast_months,

            "mape": item.mape,

            "mae": item.mae,

            "rmse": item.rmse,

            "created_at": item.created_at
        })

    return {

        "forecast_activities": results
    }


# ==================================
# ALL REPORTS
# ==================================

@router.get("/reports")
def get_all_reports(

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
    )
):

    reports = db.query(
        Report
    ).order_by(

        Report.created_at.desc()

    ).all()

    results = []

    for item in reports:

        results.append({

            "id": item.id,

            "report_name": item.report_name,

            "report_type": item.report_type,

            "created_at": item.created_at
        })

    return {

        "total_reports": len(results),

        "reports": results
    }


# ==================================
# SYSTEM ANALYTICS
# ==================================

@router.get("/system-analytics")
def get_system_analytics(

    db: Session = Depends(get_db),

    admin_user: User = Depends(
        get_admin_user
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

    inactive_users = db.query(
        User
    ).filter(

        User.is_active == False

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

        "total_users": total_users,

        "active_users": active_users,

        "inactive_users": inactive_users,

        "total_datasets": total_datasets,

        "total_forecasts": total_forecasts,

        "total_reports": total_reports
    }