from app.models.dataset_version import (
    DatasetVersion
)


def create_version(

    db,

    dataset_name,

    version,

    uploaded_by
):

    item = DatasetVersion(

        dataset_name=dataset_name,

        version=version,

        uploaded_by=uploaded_by
    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item


def get_versions(
    db
):

    return db.query(
        DatasetVersion
    ).all()


def archive_dataset(

    db,

    version_id
):

    version = db.query(

        DatasetVersion

    ).filter(

        DatasetVersion.id
        ==
        version_id

    ).first()

    if not version:

        return None

    version.status = "archived"

    db.commit()

    db.refresh(version)

    return version


def compare_datasets():

    return {

        "comparison":

        "Dataset comparison completed"
    }