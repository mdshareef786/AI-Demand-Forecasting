from sqlalchemy.orm import Session

from app.models.activity_log import (
    ActivityLog
)


def create_activity_log(

    db: Session,

    user_id: int,

    activity_type: str,

    module: str,

    api_name: str = None,

    execution_time: float = None,

    status: str = "success"
):

    activity = ActivityLog(

        user_id=user_id,

        activity_type=activity_type,

        module=module,

        api_name=api_name,

        execution_time=execution_time,

        status=status
    )

    db.add(activity)

    db.commit()

    db.refresh(activity)

    return activity