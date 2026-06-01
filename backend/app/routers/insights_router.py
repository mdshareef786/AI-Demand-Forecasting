from fastapi import APIRouter

router = APIRouter(

    prefix="/insights",

    tags=["AI Business Insights"]
)

from app.services.advanced_ai_service import (

    demand_recommendation,

    customer_behavior,

    demand_spike,

    low_stock,

    inventory_ai
)

@router.get(
    "/generate"
)
def generate_insights():

    insights = [

        "Sales expected to increase next quarter",

        "High demand detected in top regions",

        "Inventory risk identified for selected products",

        "Forecast accuracy improved after retraining",

        "Seasonal trend detected in sales pattern"
    ]

    recommendations = [

        "Increase stock for high demand products",

        "Focus marketing in top performing regions",

        "Monitor anomaly products",

        "Schedule monthly retraining"
    ]

    return {

        "insights":
        insights,

        "recommendations":
        recommendations
    }

# ==========================
# DEMAND RECOMMENDATION
# ==========================

@router.get(
"/recommendation"
)

def recommendation():

    return demand_recommendation()



# ==========================
# BUYING BEHAVIOR
# ==========================

@router.get(
"/customer-behavior"
)

def behavior():

    return customer_behavior()



# ==========================
# DEMAND SPIKE
# ==========================

@router.get(
"/demand-spike"
)

def spike():

    return demand_spike()



# ==========================
# LOW STOCK
# ==========================

@router.get(
"/low-stock"
)

def stock():

    return low_stock()



# ==========================
# INVENTORY AI
# ==========================

@router.get(
"/inventory-ai"
)

def inventory():

    return inventory_ai()