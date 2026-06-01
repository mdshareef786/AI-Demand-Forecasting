from fastapi import APIRouter

router = APIRouter(

    prefix="/alert-settings",

    tags=["Alert Settings"]
)

settings = {

    "email_alerts": True,

    "forecast_alerts": True,

    "report_alerts": True
}


@router.get("/")

def get_settings():

    return settings


@router.put("/update")

def update_settings(

    email_alerts: bool,

    forecast_alerts: bool,

    report_alerts: bool
):

    settings["email_alerts"] = email_alerts

    settings["forecast_alerts"] = forecast_alerts

    settings["report_alerts"] = report_alerts

    return {

        "message":

        "Settings updated",

        "settings":

        settings
    }