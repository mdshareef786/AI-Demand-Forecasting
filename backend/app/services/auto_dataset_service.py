import pandas as pd

from app.services.data_cleaning import (
    clean_dataset
)


def auto_process_dataset(
    file_path:str
):

    df = clean_dataset(
        file_path
    )

    columns=[]

    for col in df.columns:

        col_name=col.lower()

        if "date" in col_name:

            columns.append(
                "date"
            )

        elif (

            "sales" in col_name

            or

            "revenue" in col_name

        ):

            columns.append(
                "sales"
            )

        elif "category" in col_name:

            columns.append(
                "category"
            )

        elif "product" in col_name:

            columns.append(
                "product"
            )

    return {

        "rows":
        len(df),

        "columns":
        len(df.columns),

        "detected":
        columns,

        "status":
        "Auto Processed"
    }