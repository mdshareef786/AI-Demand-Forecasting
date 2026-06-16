from app.models.data_quality import (
    DataQuality
)


def create_quality_record(

    db,

    dataset_name,

    quality_score,

    missing_records,

    validation_status
):

    record = DataQuality(

        dataset_name=dataset_name,

        quality_score=quality_score,

        missing_records=missing_records,

        validation_status=validation_status
    )

    db.add(record)

    db.commit()

    db.refresh(record)

    return record


def get_quality_records(db):

    return db.query(

        DataQuality

    ).all()


def quality_score_summary(db):

    records = db.query(
        DataQuality
    ).all()

    if not records:

        return {

            "average_score": 0
        }

    avg = sum(

        r.quality_score

        for r in records

    ) / len(records)

    return {

        "average_score":
        round(avg, 2)
    }


def quality_report(db):

    records = db.query(
        DataQuality
    ).all()

    return {

        "datasets":
        len(records),

        "report_generated":
        True,

        "records":
        records
    }


def quality_dashboard(db):

    records = db.query(
        DataQuality
    ).all()

    return {

        "total_datasets":
        len(records),

        "high_quality":

        len([

            r for r in records

            if r.quality_score >= 90
        ]),

        "low_quality":

        len([

            r for r in records

            if r.quality_score < 70
        ])
    }