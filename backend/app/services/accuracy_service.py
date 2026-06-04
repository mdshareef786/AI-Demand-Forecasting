def get_accuracy_dashboard():

    return {

        "mape": 6.4,

        "mae": 4.1,

        "rmse": 5.8,

        "accuracy": "93.6%"
    }


def get_accuracy_trends():

    return {

        "trend": [

            {

                "month": "Jan",

                "accuracy": 88
            },

            {

                "month": "Feb",

                "accuracy": 90
            },

            {

                "month": "Mar",

                "accuracy": 93
            },

            {

                "month": "Apr",

                "accuracy": 94
            }
        ]
    }


def get_model_improvements():

    return {

        "models": [

            {

                "model": "Prophet",

                "improvement": "7%"
            },

            {

                "model": "Linear",

                "improvement": "4%"
            },

            {

                "model": "Ensemble",

                "improvement": "11%"
            }
        ]
    }


def get_evaluation_report():

    return {

        "status":
        "generated",

        "report":
        "Model evaluation report generated successfully"
    }