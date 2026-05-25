def ensemble_prediction(

    prophet_value,

    linear_value
):

    prediction = round(

        (
            prophet_value
            +
            linear_value
        ) / 2,

        2
    )

    return {

        "model":
        "Ensemble",

        "prophet":
        prophet_value,

        "linear":
        linear_value,

        "ensemble_prediction":
        prediction
    }