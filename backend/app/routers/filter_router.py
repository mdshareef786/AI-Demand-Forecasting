from fastapi import (
    APIRouter,
    Query
)

router = APIRouter(

    prefix="/filters",

    tags=["Advanced Filters"]
)


@router.get(
    "/forecast"
)
def forecast_filter(

    model: str = Query(
        None
    ),

    region: str = Query(
        None
    ),

    category: str = Query(
        None
    )
):

    return {

        "selected_model":
        model,

        "selected_region":
        region,

        "selected_category":
        category,

        "status":
        "Filter applied"
    }



@router.get(
    "/reports"
)
def report_filter(

    report_type: str = Query(
        None
    )
):

    return {

        "report_type":
        report_type,

        "status":
        "Report filter applied"
    }



@router.get(
    "/datasets"
)
def dataset_filter(

    dataset_name: str = Query(
        None
    )
):

    return {

        "dataset":
        dataset_name,

        "status":
        "Dataset filter applied"
    }