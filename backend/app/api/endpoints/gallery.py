from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional
from app.core.database import get_db
from app.models.review import ReviewMedia, Review
from app.schemas.gallery import GalleryItemResponse, GalleryListResponse

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])


@router.get("", response_model=GalleryListResponse)
def get_gallery(
    page: int = Query(1, ge=1),
    page_size: int = Query(24, ge=1, le=100),
    business_id: Optional[int] = None,
    media_type: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(ReviewMedia).join(Review, ReviewMedia.review_id == Review.id).filter(Review.is_published == True)

    if business_id:
        query = query.filter(Review.business_id == business_id)
    if media_type:
        query = query.filter(ReviewMedia.media_type == media_type)

    total = query.count()
    items = query.order_by(desc(ReviewMedia.created_at)).offset((page - 1) * page_size).limit(page_size).all()

    return GalleryListResponse(
        items=[GalleryItemResponse.model_validate(item) for item in items],
        total=total,
    )
