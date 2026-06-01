from fastapi import APIRouter

from app.services.comparison_service import (

    accuracy_trend,

    historical_forecast,

    confidence_score,

    trend_recommendations
)

router = APIRouter(

    prefix="/comparison",

    tags=["Forecast Comparison"]
)



# ==========================
# REPORT
# ==========================

@router.get(
"/report"
)

def comparison_report():

    prophet=89.4

    linear=84.2

    ensemble=92.1

    best=max(

        {

            "Prophet":
            prophet,

            "Linear":
            linear,

            "Ensemble":
            ensemble

        },

        key=lambda x:{

            "Prophet":
            prophet,

            "Linear":
            linear,

            "Ensemble":
            ensemble

        }[x]

    )

    return {

        "prophet":
        prophet,

        "linear":
        linear,

        "ensemble":
        ensemble,

        "best_model":
        best
    }



# ==========================
# ACCURACY TREND
# ==========================

@router.get(
"/accuracy-trend"
)

def trend():

    return accuracy_trend()



# ==========================
# HISTORY
# ==========================

@router.get(
"/historical"
)

def history():

    return historical_forecast()



# ==========================
# CONFIDENCE
# ==========================

@router.get(
"/confidence"
)

def confidence():

    return confidence_score()



# ==========================
# RECOMMENDATION
# ==========================

@router.get(
"/recommendations"
)

def recommendation():

    return trend_recommendations()