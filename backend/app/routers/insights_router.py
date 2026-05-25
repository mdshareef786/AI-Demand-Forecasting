from fastapi import APIRouter

router = APIRouter(

    prefix="/insights",

    tags=["AI Business Insights"]
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