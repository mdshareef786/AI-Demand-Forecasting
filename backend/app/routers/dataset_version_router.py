from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.dataset_version_service import (

    create_version,

    get_versions,

    archive_dataset,

    compare_datasets
)

router = APIRouter(

    prefix="/dataset-version",

    tags=["Dataset Versioning"]
)


@router.post("/create")
def create_dataset_version(

    dataset_name: str,

    version: str,

    uploaded_by: int,

    db: Session = Depends(
        get_db
    )
):

    return create_version(

        db,

        dataset_name,

        version,

        uploaded_by
    )


@router.get("/list")
def list_versions(

    db: Session = Depends(
        get_db
    )
):

    return get_versions(db)


@router.put("/archive/{version_id}")
def archive(

    version_id: int,

    db: Session = Depends(
        get_db
    )
):

    return archive_dataset(

        db,

        version_id
    )


@router.get("/compare")
def compare():

    return compare_datasets()