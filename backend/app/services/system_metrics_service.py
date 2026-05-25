import psutil
import time

from sqlalchemy.orm import Session

from app.models.system_metrics import (
    SystemMetrics
)

from app.models.user import User


def collect_system_metrics(
    db: Session
):

    # ==========================
    # CPU
    # ==========================

    cpu_usage = psutil.cpu_percent()

    # ==========================
    # MEMORY
    # ==========================

    memory_usage = psutil.virtual_memory().percent

    # ==========================
    # RESPONSE TIME
    # ==========================

    start = time.time()

    end = time.time()

    response_time = round(
        end - start,
        4
    )

    # ==========================
    # ACTIVE USERS
    # ==========================

    active_users = db.query(
        User
    ).filter(
        User.is_active == True
    ).count()

    # ==========================
    # SAVE
    # ==========================

    metrics = SystemMetrics(

        cpu_usage=cpu_usage,

        memory_usage=memory_usage,

        api_response_time=response_time,

        active_users=active_users
    )

    db.add(metrics)

    db.commit()

    db.refresh(metrics)

    return metrics