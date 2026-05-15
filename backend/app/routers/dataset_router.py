import os
import shutil

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.dataset import Dataset
from app.models.user import User
from app.models.notification import Notification

from app.auth.oauth2 import get_current_user

from app.services.data_cleaning import clean_dataset


router = APIRouter(
    prefix="/dataset",
    tags=["Dataset"]
)


# ==================================
# CREATE NOTIFICATION HELPER
# ==================================

def create_notification(

    db: Session,

    user_id: int,

    title: str,

    message: str
):

    notification = Notification(

        user_id=user_id,

        title=title,

        message=message
    )

    db.add(notification)

    db.commit()


# ==================================
# UPLOAD DATASET
# ==================================

@router.post("/upload")
async def upload_dataset(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    try:

        # ============================
        # VALIDATE FILE EXTENSION
        # ============================

        allowed_extensions = [
            ".csv",
            ".xlsx"
        ]

        file_extension = os.path.splitext(
            file.filename
        )[1]

        if file_extension not in allowed_extensions:

            create_notification(

                db=db,

                user_id=current_user.id,

                title="Dataset Upload Failed",

                message="Only CSV and Excel files are allowed"
            )

            raise HTTPException(

                status_code=status.HTTP_400_BAD_REQUEST,

                detail="Only CSV and Excel files are allowed"
            )

        # ============================
        # SAVE FILE
        # ============================

        upload_dir = "uploads"

        os.makedirs(
            upload_dir,
            exist_ok=True
        )

        file_path = os.path.join(

            upload_dir,

            file.filename
        )

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        # ============================
        # CLEAN DATASET
        # ============================

        df = clean_dataset(
            file_path
        )

        # ============================
        # SAVE DATASET METADATA
        # ============================

        dataset = Dataset(

            filename=file.filename,

            file_path=file_path,

            uploaded_by=current_user.id
        )

        db.add(dataset)

        db.commit()

        db.refresh(dataset)

        # ============================
        # SUCCESS NOTIFICATION
        # ============================

        create_notification(

            db=db,

            user_id=current_user.id,

            title="Dataset Uploaded",

            message=f"{file.filename} uploaded successfully"
        )

        # ============================
        # RETURN RESPONSE
        # ============================

        return {

            "message":
                "Dataset uploaded successfully",

            "rows":
                len(df),

            "columns":
                len(df.columns),

            "filename":
                file.filename
        }

    except HTTPException:

        raise

    except Exception as e:

        # ============================
        # FAILURE NOTIFICATION
        # ============================

        create_notification(

            db=db,

            user_id=current_user.id,

            title="Dataset Upload Failed",

            message=str(e)
        )

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )


# ==================================
# PAGINATED DATASET LIST
# ==================================

@router.get("/list")
def get_paginated_datasets(

    page: int = 1,

    limit: int = 5,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    # ============================
    # VALIDATION
    # ============================

    if page <= 0:

        raise HTTPException(

            status_code=400,

            detail="Page must be greater than 0"
        )

    if limit <= 0:

        raise HTTPException(

            status_code=400,

            detail="Limit must be greater than 0"
        )

    # ============================
    # PAGINATION LOGIC
    # ============================

    skip = (page - 1) * limit

    datasets = db.query(Dataset).filter(

        Dataset.uploaded_by == current_user.id

    ).order_by(

        Dataset.created_at.desc()

    ).offset(skip).limit(limit).all()

    total_datasets = db.query(Dataset).filter(

        Dataset.uploaded_by == current_user.id

    ).count()

    results = []

    for item in datasets:

        results.append({

            "id": item.id,

            "filename": item.filename,

            "file_path": item.file_path,

            "created_at": item.created_at
        })

    # ============================
    # RETURN RESPONSE
    # ============================

    return {

        "page": page,

        "limit": limit,

        "total_datasets": total_datasets,

        "datasets": results
    }


# ==================================
# SEARCH DATASETS
# ==================================

@router.get("/search")
def search_datasets(

    keyword: str,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    datasets = db.query(Dataset).filter(

        Dataset.uploaded_by == current_user.id,

        Dataset.filename.ilike(
            f"%{keyword}%"
        )

    ).order_by(

        Dataset.created_at.desc()

    ).all()

    results = []

    for item in datasets:

        results.append({

            "id": item.id,

            "filename": item.filename,

            "file_path": item.file_path,

            "created_at": item.created_at
        })

    return {

        "keyword": keyword,

        "total_results": len(results),

        "datasets": results
    }