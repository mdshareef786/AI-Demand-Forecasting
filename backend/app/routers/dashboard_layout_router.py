from fastapi import APIRouter

from app.services.dashboard_layout_service import (

    save_layout,

    get_layout,

    available_widgets,

    cross_filter
)

router = APIRouter(

    prefix="/dashboard-layout",

    tags=["Dashboard Layout"]
)


@router.post("/save")
def save(

    user_id: int,

    layout: dict
):

    return save_layout(

        user_id,

        layout
    )


@router.get("/{user_id}")
def get(

    user_id: int
):

    return get_layout(
        user_id
    )


@router.get("/widgets/list")
def widgets():

    return available_widgets()


@router.get("/cross-filter")
def filters():

    return cross_filter()