from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class AdminLogin(BaseModel):
    username: str
    password: str


class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminUserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str] = None
    is_active: bool
    is_superadmin: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AdminCreate(BaseModel):
    username: str = Field(min_length=3, max_length=100)
    email: str
    password: str = Field(min_length=6)
    full_name: Optional[str] = None
    is_superadmin: bool = False


class AdminUpdate(BaseModel):
    email: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_superadmin: Optional[bool] = None
