from app.models.forecast_comment import (
    ForecastComment
)


def add_comment(

    db,

    project_id,

    user_id,

    comment
):

    item = ForecastComment(

        project_id=project_id,

        user_id=user_id,

        comment=comment
    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item


def get_comments(

    db,

    project_id
):

    return db.query(

        ForecastComment

    ).filter(

        ForecastComment.project_id
        ==
        project_id

    ).all()


def share_report():

    return {

        "status":
        "shared",

        "message":
        "Report shared successfully"
    }


def revision_history():

    return {

        "revisions": [

            "Version 1",

            "Version 2",

            "Version 3"
        ]
    }