from app.models.forecast_governance import (
    ForecastGovernance
)


def create_governance_record(

    db,

    forecast_id,

    version,

    modified_by,

    lifecycle_status="draft",

    remarks=""
):

    record = ForecastGovernance(

        forecast_id=forecast_id,

        version=version,

        lifecycle_status="draft",

        modified_by=modified_by,

        remarks=remarks
    )

    db.add(record)

    db.commit()

    db.refresh(record)

    return record


def get_governance_records(db):

    return db.query(

        ForecastGovernance

    ).order_by(

        ForecastGovernance.created_at.desc()

    ).all()


def update_status(

    db,

    governance_id,

    status
):

    record = db.query(

        ForecastGovernance

    ).filter(

        ForecastGovernance.id
        ==
        governance_id

    ).first()

    if not record:

        return None

    record.lifecycle_status = status

    db.commit()

    db.refresh(record)

    return record


def governance_dashboard(db):

    records = db.query(
        ForecastGovernance
    ).all()

    total = len(records)

    approved = len(

        [x for x in records

         if x.lifecycle_status
         ==
         "approved"]
    )

    pending = len(

        [x for x in records

         if x.lifecycle_status
         ==
         "submitted"]
    )

    rejected = len(

        [x for x in records

         if x.lifecycle_status
         ==
         "rejected"]
    )

    return {

        "total_forecasts":
        total,

        "approved":
        approved,

        "pending":
        pending,

        "rejected":
        rejected
    }


def governance_history(db):

    return get_governance_records(
        db
    )