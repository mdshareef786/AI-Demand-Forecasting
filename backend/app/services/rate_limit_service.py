request_counter = {}

def check_rate_limit(user_id):

    if user_id not in request_counter:

        request_counter[user_id] = 0

    request_counter[user_id] += 1

    if request_counter[user_id] > 100:

        return {
            "allowed": False,
            "message": "Rate limit exceeded"
        }

    return {
        "allowed": True,
        "requests":
        request_counter[user_id]
    }