from app.models.project_activity import (
    ProjectActivity
)


def log_activity(

    db,

    project_id,

    user_id,

    activity
):

    record = ProjectActivity(

        project_id=project_id,

        user_id=user_id,

        activity=activity
    )

    db.add(record)

    db.commit()

    db.refresh(record)

    return record


def get_project_activity(

    db,

    project_id
):

    return db.query(

        ProjectActivity

    ).filter(

        ProjectActivity.project_id
        ==
        project_id

    ).all()