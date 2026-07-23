"""Attach official local image assets to representative review stories."""
from app.core.database import SessionLocal
from app.models.review import Review, ReviewMedia
from app.models.business import Business
from app.models.admin import AdminUser

IMAGE_BY_BUSINESS = {
    1: "/images/official/mr-desert.jpg",
    2: "/images/official/elite-castle.webp",
    3: "/images/official/happy-adventure.jpg",
    4: "/images/official/mr-desert.jpg",
}

USER_IMAGES_BY_BUSINESS = {
    1: ["/images/dheeraj/mr-desert-alley.webp", "/images/dheeraj/dheeraj-purohit.webp", "/images/dheeraj/camel-safari.webp"],
    2: [
        "/images/dheeraj/elite-castle-family-02.webp",
        "/images/dheeraj/elite-castle-family-05.webp",
        "/images/dheeraj/elite-castle-family-06.webp",
        "/images/dheeraj/elite-castle-family-21.webp",
        "/images/dheeraj/elite-castle-family-22.webp",
        "/images/dheeraj/elite-castle-family-23.webp",
        "/images/dheeraj/elite-castle-family-24.webp",
    ],
    3: ["/images/dheeraj/happy-camp-day.webp", "/images/dheeraj/happy-camp-night.webp"],
    4: ["/images/dheeraj/dheeraj-purohit.webp", "/images/dheeraj/camel-safari.webp"],
}

with SessionLocal() as db:
    for business_id, image_url in IMAGE_BY_BUSINESS.items():
        review = db.query(Review).filter(Review.business_id == business_id, Review.is_published == True).order_by(Review.id.asc()).first()
        if review and not db.query(ReviewMedia).filter(ReviewMedia.review_id == review.id).first():
            db.add(ReviewMedia(review_id=review.id, media_type="image", url=image_url, public_id=f"official-business-{business_id}"))
        if review:
            existing = {item.url for item in db.query(ReviewMedia).filter(ReviewMedia.review_id == review.id).all()}
            for index, user_image in enumerate(USER_IMAGES_BY_BUSINESS.get(business_id, []), start=1):
                if user_image not in existing:
                    db.add(ReviewMedia(review_id=review.id, media_type="image", url=user_image, public_id=f"dheeraj-image-{business_id}-{index}"))
    db.commit()
    print("Review story images synchronized.")
