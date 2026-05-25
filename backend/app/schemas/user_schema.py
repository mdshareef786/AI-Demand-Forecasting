from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):

    name: str

    email: str

    password: str

    role: Optional[str] = "viewer"