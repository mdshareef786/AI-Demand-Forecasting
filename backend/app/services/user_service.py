def update_profile(name, email):

    return {
        "updated": True,
        "name": name,
        "email": email
    }


def reset_password():

    return {
        "password_reset": True,
        "message": "Password reset link sent"
    }


def account_status(active=True):

    return {
        "account_active": active
    }