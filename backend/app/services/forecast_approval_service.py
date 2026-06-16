from datetime import datetime

from app.models.forecast_approval import (
    ForecastApproval
)


def submit_forecast(

    db,

    forecast_id,

    submitted_by,

    comments=""
):

    approval = ForecastApproval(

        forecast_id=forecast_id,

        submitted_by=submitted_by,

        comments=comments,

        status="pending"
    )

    db.add(approval)

    db.commit()

    db.refresh(approval)

    return approval


def approve_forecast(

    db,

    approval_id,

    approved_by
):

    approval = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.id
        ==
        approval_id

    ).first()

    if not approval:

        return None

    approval.status = "approved"

    approval.approved_by = approved_by

    approval.reviewed_at = datetime.utcnow()

    db.commit()

    db.refresh(approval)

    return approval


def reject_forecast(

    db,

    approval_id,

    approved_by
):

    approval = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.id
        ==
        approval_id

    ).first()

    if not approval:

        return None

    approval.status = "rejected"

    approval.approved_by = approved_by

    approval.reviewed_at = datetime.utcnow()

    db.commit()

    db.refresh(approval)

    return approval


def approval_history(db):

    return db.query(

        ForecastApproval

    ).order_by(

        ForecastApproval.submitted_at.desc()

    ).all()


def get_approval(

    db,

    approval_id
):

    return db.query(

        ForecastApproval

    ).filter(

        ForecastApproval.id
        ==
        approval_id

    ).first()