from datetime import datetime
import time

def run_background_job():

    time.sleep(5)

    print(
        f"Forecast Processing Completed - "
        f"{datetime.now()}"
    )