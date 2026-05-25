from fastapi import APIRouter

router = APIRouter(

    prefix="/revenue",

    tags=["Revenue Analytics"]
)


@router.get(
    "/prediction"
)
def revenue_prediction():

    current_revenue = 1200000

    predicted_revenue = 1450000

    growth = round(

        (
            predicted_revenue
            -
            current_revenue
        )

        /

        current_revenue

        * 100,

        2
    )

    return {

        "current_revenue":
        current_revenue,

        "predicted_revenue":
        predicted_revenue,

        "growth_percentage":
        growth
    }