from pydantic import BaseModel
from datetime import datetime


class DatasetResponse(BaseModel):

    id: int
    filename: str
    file_path: str
    uploaded_by: int
    created_at: datetime

    class Config:
        from_attributes = True