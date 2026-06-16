from app.models.notification_preference import (
    NotificationPreference
)

from app.models.organization_announcement import (
    OrganizationAnnouncement
)


def create_preference(

    db,

    user_id,

    email_notifications,

    forecast_notifications,

    report_notifications
):

    pref = NotificationPreference(

        user_id=user_id,

        email_notifications=email_notifications,

        forecast_notifications=forecast_notifications,

        report_notifications=report_notifications
    )

    db.add(pref)

    db.commit()

    db.refresh(pref)

    return pref


def get_preferences(db):

    return db.query(

        NotificationPreference

    ).all()


def create_announcement(

    db,

    organization_id,

    title,

    message
):

    announcement = OrganizationAnnouncement(

        organization_id=organization_id,

        title=title,

        message=message
    )

    db.add(announcement)

    db.commit()

    db.refresh(announcement)

    return announcement


def get_announcements(db):

    return db.query(

        OrganizationAnnouncement

    ).all()


def notification_history():

    return {

        "history": [

            "Forecast generated successfully",

            "Revenue report completed",

            "Executive report scheduled",

            "Forecast approved by manager"
        ]
    }


def role_based_notifications():

    return {

        "admin": [

            "System Alert",

            "Workflow Failure"
        ],

        "analyst": [

            "Forecast Approval Pending"
        ],

        "viewer": [

            "New Dashboard Available"
        ]
    }