from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class GalleryItemResponse(BaseModel):
    id: int
    review_id: int
    business_id: Optional[int] = None
    business_name: Optional[str] = None
    guest_name: Optional[str] = None
    media_type: str
    url: str
    width: Optional[int] = None
    height: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class GalleryListResponse(BaseModel):
    items: list[GalleryItemResponse]
    total: int
