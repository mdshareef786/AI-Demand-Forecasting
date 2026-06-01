from app.models.notification import Notification


def create_alert(

    db,

    user_id:int,

    title:str,

    message:str

):

    alert = Notification(

        user_id=user_id,

        title=title,

        message=message,

        is_read=False
    )

    db.add(alert)

    db.commit()

    db.refresh(alert)

    return alert