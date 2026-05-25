from datetime import datetime

dashboard_cache = {}


def get_dashboard_cache():

    return dashboard_cache


def update_dashboard_cache(
    data
):

    dashboard_cache[
        "data"
    ] = data

    dashboard_cache[
        "updated_at"
    ] = datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    return dashboard_cache