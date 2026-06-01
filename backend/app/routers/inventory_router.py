from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.dataset import Dataset

from app.services.inventory_service import (

    inventory_system_status,

    erp_status,

    webhook_status,

    external_api_status,

    integration_settings
)

router = APIRouter(

    prefix="/inventory",

    tags=["Inventory Risk"]
)



# ==========================
# RISK
# ==========================

@router.get(
"/risk-analysis"
)

def inventory_risk(

db:Session=Depends(
get_db
)

):

    datasets=db.query(
        Dataset
    ).all()

    total=len(
        datasets
    )

    high=int(
        total*0.2
    )

    medium=int(
        total*0.3
    )

    low=total-(

        high+

        medium
    )

    return {

        "high_risk":
        high,

        "medium_risk":
        medium,

        "low_risk":
        low
    }



# ==========================
# INVENTORY SYSTEM
# ==========================

@router.get(
"/integration"
)

def inventory_integration():

    return inventory_system_status()



# ==========================
# ERP
# ==========================

@router.get(
"/erp"
)

def erp():

    return erp_status()



# ==========================
# WEBHOOK
# ==========================

@router.get(
"/webhook"
)

def webhook():

    return webhook_status()



# ==========================
# EXTERNAL API
# ==========================

@router.get(
"/external-api"
)

def external_api():

    return external_api_status()



# ==========================
# SETTINGS
# ==========================

@router.get(
"/settings"
)

def settings():

    return integration_settings()