from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ContentBase(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    slug: str = Field(min_length=3, max_length=255)
    excerpt: Optional[str] = Field(None, max_length=500)
    content: str = ""
    hero_image_url: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    seo_title: Optional[str] = None
    meta_description: Optional[str] = None


class BlogCreate(ContentBase):
    business_id: Optional[int] = None
    author: str = "Mr. Desert Editorial"
    reading_time: int = Field(5, ge=1, le=120)
    status: str = "draft"


class GuideCreate(ContentBase):
    map_url: Optional[str] = None
    status: str = "draft"


class ContentResponse(ContentBase):
    id: int
    business_id: Optional[int] = None
    author: Optional[str] = None
    reading_time: Optional[int] = None
    map_url: Optional[str] = None
    status: str
    published_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
