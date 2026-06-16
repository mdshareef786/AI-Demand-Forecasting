from app.models.business_target import (
    BusinessTarget
)


def create_target(

    db,

    target_name,

    target_type,

    target_value,

    forecast_value
):

    target = BusinessTarget(

        target_name=target_name,

        target_type=target_type,

        target_value=target_value,

        forecast_value=forecast_value
    )

    db.add(target)

    db.commit()

    db.refresh(target)

    return target


def get_targets(db):

    return db.query(

        BusinessTarget

    ).all()


def annual_dashboard(db):

    targets = db.query(

        BusinessTarget

    ).filter(

        BusinessTarget.target_type
        ==
        "annual"

    ).all()

    return {

        "dashboard":
        "Annual Planning",

        "targets":
        targets
    }


def quarterly_dashboard(db):

    targets = db.query(

        BusinessTarget

    ).filter(

        BusinessTarget.target_type
        ==
        "quarterly"

    ).all()

    return {

        "dashboard":
        "Quarterly Planning",

        "targets":
        targets
    }


def compare_forecast_target(db):

    targets = db.query(

        BusinessTarget

    ).all()

    results = []

    for item in targets:

        variance = (

            item.forecast_value
            -
            item.target_value
        )

        results.append({

            "target":
            item.target_name,

            "target_value":
            item.target_value,

            "forecast_value":
            item.forecast_value,

            "variance":
            variance
        })

    return results


def planning_recommendations():

    return {

        "recommendations": [

            "Increase marketing budget in high growth regions",

            "Improve inventory allocation",

            "Focus on top performing products",

            "Monitor quarterly forecast variance"
        ]
    }