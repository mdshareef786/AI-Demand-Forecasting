from fastapi import APIRouter

router = APIRouter(

    prefix="/comparison",

    tags=["Forecast Comparison"]
)


@router.get(
    "/report"
)
def comparison_report():

    prophet_accuracy = 89.4

    linear_accuracy = 84.2

    ensemble_accuracy = 92.1


    best_model = max(

        {

            "Prophet":
            prophet_accuracy,

            "Linear":
            linear_accuracy,

            "Ensemble":
            ensemble_accuracy

        },

        key=lambda x: {

            "Prophet":
            prophet_accuracy,

            "Linear":
            linear_accuracy,

            "Ensemble":
            ensemble_accuracy

        }[x]
    )


    return {

        "prophet":
        prophet_accuracy,

        "linear":
        linear_accuracy,

        "ensemble":
        ensemble_accuracy,

        "best_model":
        best_model
    }