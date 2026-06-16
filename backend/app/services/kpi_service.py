from app.models.kpi import KPI


def create_kpi(

    db,

    kpi_name,

    target_value,

    current_value,

    threshold
):

    kpi = KPI(

        kpi_name=kpi_name,

        target_value=target_value,

        current_value=current_value,

        threshold=threshold
    )

    db.add(kpi)

    db.commit()

    db.refresh(kpi)

    return kpi


def get_kpis(db):

    return db.query(

        KPI

    ).all()


def get_kpi_trends(db):

    kpis = db.query(
        KPI
    ).all()

    results = []

    for item in kpis:

        achievement = 0

        if item.target_value > 0:

            achievement = round(

                (
                    item.current_value
                    /
                    item.target_value
                ) * 100,

                2
            )

        results.append({

            "kpi":
            item.kpi_name,

            "achievement_percent":
            achievement
        })

    return results


def get_kpi_report(db):

    kpis = db.query(
        KPI
    ).all()

    return {

        "total_kpis":
        len(kpis),

        "report_generated":
        True,

        "kpis":
        kpis
    }


def get_kpi_alerts(db):

    kpis = db.query(
        KPI
    ).all()

    alerts = []

    for item in kpis:

        if item.current_value < item.threshold:

            alerts.append({

                "kpi":
                item.kpi_name,

                "message":
                "Below KPI Threshold"
            })

    return {

        "alerts":
        alerts
    }