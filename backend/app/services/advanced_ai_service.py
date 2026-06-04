from datetime import datetime


# ==========================
# PRODUCT DEMAND ENGINE
# ==========================

def demand_recommendation():

    return {

        "recommended_products":[

            "Laptop",

            "Mobile",

            "Headphones"
        ],

        "reason":
        "High demand trend",

        "generated_at":

        datetime.now()

        .strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    }



# ==========================
# CUSTOMER BEHAVIOR
# ==========================

def customer_behavior():

    return {

        "top_buying_pattern":
        "Electronics",

        "repeat_customers":
        72,

        "avg_purchase":
        14500
    }



# ==========================
# DEMAND SPIKE
# ==========================

def demand_spike():

    return {

        "spike_detected":
        True,

        "category":
        "Electronics",

        "increase":
        "28%"
    }



# ==========================
# LOW STOCK
# ==========================

def low_stock():

    return {

        "low_stock":

        [

            "Laptop",

            "Tablet"
        ],

        "risk":
        "High"
    }



# ==========================
# INVENTORY OPTIMIZATION
# ==========================

def inventory_ai():

    return {

        "suggestion":

        "Increase inventory for Electronics",

        "optimization":
        True
    }

# ==========================
# HIGH GROWTH PRODUCTS
# ==========================

def high_growth_products():

    return {

        "products": [

            {
                "name": "Laptop",
                "growth": "32%"
            },

            {
                "name": "Mobile",
                "growth": "27%"
            },

            {
                "name": "Headphones",
                "growth": "18%"
            }
        ]
    }


# ==========================
# DECLINING PRODUCTS
# ==========================

def declining_products():

    return {

        "products": [

            {
                "name": "Tablet",
                "decline": "15%"
            },

            {
                "name": "Printer",
                "decline": "11%"
            }
        ]
    }