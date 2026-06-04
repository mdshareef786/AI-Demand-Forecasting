from app.models.forecast_scenario import (
    ForecastScenario
)


def create_scenario(
    db,
    project_id,
    scenario_name,
    growth_rate,
    seasonality_factor,
    demand_multiplier,
    promotion_impact
):

    scenario = ForecastScenario(

        project_id=project_id,

        scenario_name=scenario_name,

        growth_rate=growth_rate,

        seasonality_factor=
        seasonality_factor,

        demand_multiplier=
        demand_multiplier,

        promotion_impact=
        promotion_impact
    )

    db.add(scenario)

    db.commit()

    db.refresh(scenario)

    return scenario


def run_scenario(

    base_sales,

    growth_rate,

    seasonality_factor,

    demand_multiplier,

    promotion_impact
):

    forecast = base_sales

    forecast *= (

        1 +

        (
            growth_rate / 100
        )
    )

    forecast *= (
        seasonality_factor
    )

    forecast *= (
        demand_multiplier
    )

    forecast += (
        promotion_impact
    )

    return round(
        forecast,
        2
    )


def save_result(

    db,

    scenario_id,

    result
):

    scenario = db.query(

        ForecastScenario

    ).filter(

        ForecastScenario.id
        ==
        scenario_id

    ).first()

    if not scenario:

        return None

    scenario.forecast_result = result

    db.commit()

    db.refresh(
        scenario
    )

    return scenario


def get_scenarios(
    db
):

    return db.query(
        ForecastScenario
    ).all()


def compare_scenarios(
    db
):

    scenarios = db.query(
        ForecastScenario
    ).all()

    return [

        {

            "scenario":
            s.scenario_name,

            "forecast":
            s.forecast_result

        }

        for s in scenarios
    ]