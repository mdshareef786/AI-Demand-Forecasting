from datetime import datetime


# ==========================
# ACCURACY TREND
# ==========================

def accuracy_trend():

    return {

        "prophet":[

            82.1,
            84.5,
            87.2,
            89.4

        ],

        "linear":[

            78.2,
            80.4,
            82.1,
            84.2

        ],

        "ensemble":[

            86.1,
            88.2,
            90.4,
            92.1
        ]
    }



# ==========================
# HISTORICAL
# ==========================

def historical_forecast():

    return {

        "history":[

            {

                "month":
                "Jan",

                "forecast":
                120000
            },

            {

                "month":
                "Feb",

                "forecast":
                128000
            },

            {

                "month":
                "Mar",

                "forecast":
                138000
            }
        ]
    }



# ==========================
# CONFIDENCE
# ==========================

def confidence_score():

    return {

        "prophet":
        91,

        "linear":
        85,

        "ensemble":
        95
    }



# ==========================
# TREND INSIGHTS
# ==========================

def trend_recommendations():

    return {

        "recommendations":[

            "Increase inventory",

            "Focus marketing",

            "Monitor anomalies",

            "Increase stock"
        ],

        "generated":

        datetime.now()

        .strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    }