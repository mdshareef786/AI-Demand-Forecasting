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

from app.auth.oauth2 import get_current_user

from app.services.data_cleaning import clean_dataset


router = APIRouter(
    prefix="/dataset",
    tags=["Dataset"]
)


@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Validate file extension
    allowed_extensions = [".csv", ".xlsx"]

    file_extension = os.path.splitext(
        file.filename
    )[1]

    if file_extension not in allowed_extensions:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV and Excel files are allowed"
        )

    # Save file
    upload_dir = "uploads"

    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Clean dataset using pandas
    try:

        df = clean_dataset(file_path)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    # Save dataset metadata
    dataset = Dataset(
        filename=file.filename,
        file_path=file_path,
        uploaded_by=current_user.id
    )

    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    return {
        "message": "Dataset uploaded successfully",
        "rows": len(df),
        "columns": len(df.columns),
        "filename": file.filename
    }