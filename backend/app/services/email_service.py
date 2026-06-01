def send_email_notification(

    email:str,

    subject:str,

    message:str

):

    return {

        "email_sent":True,

        "email":email,

        "subject":subject,

        "message":message
    }