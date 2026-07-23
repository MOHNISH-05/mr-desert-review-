from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import Optional
import os
import uuid
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.review import Review, ReviewMedia, ReviewReply
from app.models.business import Business
from app.schemas.review import (
    ReviewCreate, ReviewResponse, ReviewListResponse,
    ReviewMediaResponse, ReviewReplyResponse,
)

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])


@router.get("/admin", response_model=ReviewListResponse)
def get_admin_reviews(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin),
):
    return get_reviews(page=page, page_size=page_size, status=status, db=db)


@router.get("", response_model=ReviewListResponse)
def get_reviews(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    business_id: Optional[int] = None,
    status: Optional[str] = "approved",
    is_published: Optional[bool] = None,
    is_featured: Optional[bool] = None,
    is_verified: Optional[bool] = None,
    country: Optional[str] = None,
    rating: Optional[float] = None,
    source: Optional[str] = None,
    sort: str = "newest",
    db: Session = Depends(get_db),
):
    query = db.query(Review)

    if business_id:
        query = query.filter(Review.business_id == business_id)
    if status:
        query = query.filter(Review.status == status)
    if status == "approved" and is_published is None:
        query = query.filter(Review.is_published == True)
    if is_published is not None:
        query = query.filter(Review.is_published == is_published)
    if is_featured is not None:
        query = query.filter(Review.is_featured == is_featured)
    if is_verified is not None:
        query = query.filter(Review.is_verified == is_verified)
    if country:
        query = query.filter(Review.country == country)
    if rating:
        query = query.filter(Review.overall_rating == rating)
    if source:
        query = query.filter(Review.review_source == source)

    if sort == "oldest":
        query = query.order_by(Review.created_at.asc())
    elif sort == "rating":
        query = query.order_by(desc(Review.overall_rating))
    elif sort == "helpful":
        query = query.order_by(desc(Review.helpful_count))
    else:
        query = query.order_by(desc(Review.created_at))

    total = query.count()
    reviews = query.offset((page - 1) * page_size).limit(page_size).all()

    review_responses = []
    for r in reviews:
        resp = ReviewResponse.model_validate(r)
        resp.guest_email = None
        business = db.query(Business).filter(Business.id == r.business_id).first()
        resp.business_name = business.name if business else None
        resp.business_slug = business.slug if business else None
        review_responses.append(resp)

    return ReviewListResponse(
        reviews=review_responses,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=(total + page_size - 1) // page_size if total > 0 else 1,
    )


@router.get("/{review_id}", response_model=ReviewResponse)
def get_review(review_id: int, db: Session = Depends(get_db)):
    # Individual story pages are public, so never expose pending or rejected submissions.
    review = db.query(Review).filter(
        Review.id == review_id,
        Review.status == "approved",
        Review.is_published == True,
    ).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    resp = ReviewResponse.model_validate(review)
    resp.guest_email = None
    business = db.query(Business).filter(Business.id == review.business_id).first()
    resp.business_name = business.name if business else None
    resp.business_slug = business.slug if business else None
    return resp


@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    """Accept a guest submission into moderation; it is never public immediately."""
    business = db.query(Business).filter(Business.id == review_data.business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    review = Review(
        business_id=review_data.business_id,
        guest_name=review_data.guest_name,
        guest_email=review_data.guest_email,
        guest_phone=review_data.guest_phone,
        country=review_data.country,
        city=review_data.city,
        visit_date=review_data.visit_date,
        overall_rating=review_data.overall_rating,
        staff_rating=review_data.staff_rating,
        cleanliness_rating=review_data.cleanliness_rating,
        food_rating=review_data.food_rating,
        location_rating=review_data.location_rating,
        experience_rating=review_data.experience_rating,
        value_for_money=review_data.value_for_money,
        title=review_data.title,
        content=review_data.content,
        is_recommended=review_data.is_recommended,
        review_source=review_data.review_source,
        status="pending",
    )
    db.add(review)
    db.flush()

    stats = db.query(
        func.avg(Review.overall_rating),
        func.count(Review.id),
    ).filter(
        Review.business_id == review_data.business_id,
        Review.status == "approved",
    ).first()
    avg_rating, total_reviews = stats
    business.average_rating = round(float(avg_rating or 0), 1)
    business.total_reviews = total_reviews or 0

    resp = ReviewResponse.model_validate(review)
    resp.business_name = business.name
    resp.business_slug = business.slug
    return resp


@router.put("/{review_id}", response_model=ReviewResponse)
def update_review(
    review_id: int,
    review_data: ReviewCreate,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    for key, value in review_data.model_dump(exclude_unset=True).items():
        setattr(review, key, value)
    db.flush()
    return ReviewResponse.model_validate(review)


@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)


@router.post("/{review_id}/approve", response_model=ReviewResponse)
def approve_review(
    review_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.status = "approved"
    review.is_published = True
    db.flush()
    return ReviewResponse.model_validate(review)


@router.post("/{review_id}/reject", response_model=ReviewResponse)
def reject_review(
    review_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.status = "rejected"
    review.is_published = False
    db.flush()
    return ReviewResponse.model_validate(review)


@router.post("/{review_id}/feature", response_model=ReviewResponse)
def feature_review(
    review_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.is_featured = not review.is_featured
    db.flush()
    return ReviewResponse.model_validate(review)


@router.post("/{review_id}/verify", response_model=ReviewResponse)
def verify_review(
    review_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.is_verified = not review.is_verified
    db.flush()
    return ReviewResponse.model_validate(review)


@router.post("/{review_id}/media", response_model=list[ReviewMediaResponse])
def add_guest_review_media(
    review_id: int,
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
):
    """Allow photos to be attached only to the submitter's new pending review."""
    review = db.query(Review).filter(Review.id == review_id, Review.status == "pending").first()
    if not review:
        raise HTTPException(status_code=404, detail="Pending review not found")
    if len(files) > 20:
        raise HTTPException(status_code=400, detail="A review can include up to 20 images")
    allowed = {"image/jpeg", "image/png", "image/webp", "image/avif"}
    upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    media_items = []
    for file in files:
        if file.content_type not in allowed:
            raise HTTPException(status_code=400, detail="Only JPG, PNG, WEBP or AVIF images are supported")
        content = file.file.read()
        if len(content) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Each image must be 10 MB or smaller")
        ext = (file.filename.rsplit(".", 1)[-1] if file.filename and "." in file.filename else "jpg").lower()
        filename = f"{uuid.uuid4()}.{ext}"
        with open(os.path.join(upload_dir, filename), "wb") as destination:
            destination.write(content)
        media_items.append(ReviewMedia(review_id=review_id, media_type="image", url=f"/uploads/{filename}", public_id=filename))
    db.add_all(media_items)
    db.flush()
    return [ReviewMediaResponse.model_validate(item) for item in media_items]


@router.post("/{review_id}/helpful")
def mark_helpful(review_id: int, db: Session = Depends(get_db)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.helpful_count += 1
    db.flush()
    return {"helpful_count": review.helpful_count}


@router.post("/{review_id}/reply", response_model=ReviewReplyResponse)
def reply_to_review(
    review_id: int,
    content: str,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    reply = db.query(ReviewReply).filter(ReviewReply.review_id == review_id).first()
    if reply:
        reply.content = content
    else:
        reply = ReviewReply(
            review_id=review_id,
            admin_id=int(payload["sub"]),
            content=content,
        )
        db.add(reply)
    db.flush()
    return ReviewReplyResponse.model_validate(reply)
