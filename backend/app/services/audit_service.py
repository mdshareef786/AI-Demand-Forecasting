from datetime import datetime


def create_audit_log(

    user_id:int,

    action:str,

    module:str

):

    return {

        "user_id":
        user_id,

        "action":
        action,

        "module":
        module,

        "timestamp":

        datetime.now()

        .strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    }