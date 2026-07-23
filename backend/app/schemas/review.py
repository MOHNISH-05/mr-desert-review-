from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime


class ReviewMediaResponse(BaseModel):
    id: int
    media_type: str
    url: str
    public_id: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None

    class Config:
        from_attributes = True


class ReviewReplyResponse(BaseModel):
    id: int
    content: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ReviewBase(BaseModel):
    business_id: int
    guest_name: str = Field(min_length=2, max_length=255)
    guest_email: Optional[str] = None
    guest_phone: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    visit_date: Optional[datetime] = None
    overall_rating: float = Field(ge=1, le=5)
    staff_rating: Optional[float] = Field(None, ge=1, le=5)
    cleanliness_rating: Optional[float] = Field(None, ge=1, le=5)
    food_rating: Optional[float] = Field(None, ge=1, le=5)
    location_rating: Optional[float] = Field(None, ge=1, le=5)
    experience_rating: Optional[float] = Field(None, ge=1, le=5)
    value_for_money: Optional[float] = Field(None, ge=1, le=5)
    title: Optional[str] = Field(None, max_length=500)
    content: str = Field(min_length=10)
    is_recommended: bool = True
    review_source: str = "website"


class ReviewCreate(ReviewBase):
    captcha_token: Optional[str] = None


class ReviewResponse(BaseModel):
    id: int
    business_id: int
    business_name: Optional[str] = None
    business_slug: Optional[str] = None
    guest_name: str
    guest_email: Optional[str] = None
    guest_photo_url: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    visit_date: Optional[datetime] = None
    overall_rating: float
    staff_rating: Optional[float] = None
    cleanliness_rating: Optional[float] = None
    food_rating: Optional[float] = None
    location_rating: Optional[float] = None
    experience_rating: Optional[float] = None
    value_for_money: Optional[float] = None
    title: Optional[str] = None
    content: str
    is_recommended: bool
    is_verified: bool
    is_featured: bool
    is_published: bool
    is_pinned: bool
    status: str
    review_source: str
    helpful_count: int
    media: list[ReviewMediaResponse] = []
    reply: Optional[ReviewReplyResponse] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ReviewListResponse(BaseModel):
    reviews: list[ReviewResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class ReviewStatsResponse(BaseModel):
    total_reviews: int
    published_reviews: int
    pending_reviews: int
    featured_reviews: int
    average_rating: float
    rating_distribution: dict
    monthly_reviews: list[dict]
    country_distribution: list[dict]
