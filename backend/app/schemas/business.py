from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime


class BusinessBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    logo_url: Optional[str] = None
    hero_image_url: Optional[str] = None
    website_url: str
    booking_url: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_email: Optional[str] = None
    whatsapp_number: Optional[str] = None
    address: Optional[str] = None
    google_maps_url: Optional[str] = None
    google_maps_embed: Optional[str] = None
    order: int = 0
    is_active: bool = True


class BusinessCreate(BusinessBase):
    pass


class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    logo_url: Optional[str] = None
    hero_image_url: Optional[str] = None
    website_url: Optional[str] = None
    booking_url: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_email: Optional[str] = None
    whatsapp_number: Optional[str] = None
    address: Optional[str] = None
    google_maps_url: Optional[str] = None
    google_maps_embed: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class BusinessResponse(BusinessBase):
    id: int
    average_rating: float = 0
    total_reviews: int = 0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class BusinessListResponse(BaseModel):
    businesses: list[BusinessResponse]
    total: int
