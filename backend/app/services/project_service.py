from app.models.forecast_project import (
    ForecastProject
)


def create_project(
    db,
    name,
    description,
    owner_id
):

    project = ForecastProject(

        name=name,

        description=description,

        owner_id=owner_id
    )

    db.add(project)

    db.commit()

    db.refresh(project)

    return project


def get_projects(
    db
):

    return db.query(
        ForecastProject
    ).all()


def get_project(
    db,
    project_id
):

    return db.query(
        ForecastProject
    ).filter(

        ForecastProject.id
        ==
        project_id

    ).first()


def update_project(
    db,
    project_id,
    data
):

    project = get_project(
        db,
        project_id
    )

    if not project:

        return None

    if "name" in data:

        project.name = data["name"]

    if "description" in data:

        project.description = data[
            "description"
        ]

    if "status" in data:

        project.status = data[
            "status"
        ]

    db.commit()

    db.refresh(project)

    return project


def delete_project(
    db,
    project_id
):

    project = get_project(
        db,
        project_id
    )

    if not project:

        return False

    db.delete(project)

    db.commit()

    return True