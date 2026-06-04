from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import (
    get_db
)

from app.services.scenario_service import (

    create_scenario,

    run_scenario,

    save_result,

    get_scenarios,

    compare_scenarios
)

router = APIRouter(

    prefix="/scenario",

    tags=["Scenario Planning"]
)


@router.post("/create")
def create_new_scenario(

    project_id: int,

    scenario_name: str,

    growth_rate: float,

    seasonality_factor: float,

    demand_multiplier: float,

    promotion_impact: float,

    db: Session = Depends(
        get_db
    )
):

    return create_scenario(

        db,

        project_id,

        scenario_name,

        growth_rate,

        seasonality_factor,

        demand_multiplier,

        promotion_impact
    )


@router.post("/run")
def run_forecast_scenario(

    scenario_id: int,

    base_sales: float,

    growth_rate: float,

    seasonality_factor: float,

    demand_multiplier: float,

    promotion_impact: float,

    db: Session = Depends(
        get_db
    )
):

    result = run_scenario(

        base_sales,

        growth_rate,

        seasonality_factor,

        demand_multiplier,

        promotion_impact
    )

    save_result(

        db,

        scenario_id,

        result
    )

    return {

        "forecast_result":
        result
    }


@router.get("/list")
def list_scenarios(

    db: Session = Depends(
        get_db
    )
):

    return get_scenarios(
        db
    )


@router.get("/compare")
def compare_all_scenarios(

    db: Session = Depends(
        get_db
    )
):

    return compare_scenarios(
        db
    )