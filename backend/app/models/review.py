from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=False, index=True)
    guest_name = Column(String(255), nullable=False)
    guest_email = Column(String(255), nullable=True)
    guest_phone = Column(String(50), nullable=True)
    guest_photo_url = Column(String(500), nullable=True)
    country = Column(String(100), nullable=True)
    city = Column(String(255), nullable=True)
    visit_date = Column(DateTime(timezone=True), nullable=True)
    overall_rating = Column(Float, nullable=False)
    staff_rating = Column(Float, nullable=True)
    cleanliness_rating = Column(Float, nullable=True)
    food_rating = Column(Float, nullable=True)
    location_rating = Column(Float, nullable=True)
    experience_rating = Column(Float, nullable=True)
    value_for_money = Column(Float, nullable=True)
    title = Column(String(500), nullable=True)
    content = Column(Text, nullable=False)
    is_recommended = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=False)
    is_pinned = Column(Boolean, default=False)
    status = Column(String(50), default="pending")
    review_source = Column(String(100), default="website")
    helpful_count = Column(Integer, default=0)
    language = Column(String(10), default="en")
    ip_address = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    business = relationship("Business", backref="reviews")
    media = relationship("ReviewMedia", back_populates="review", cascade="all, delete-orphan")
    reply = relationship("ReviewReply", back_populates="review", uselist=False, cascade="all, delete-orphan")


class ReviewMedia(Base):
    __tablename__ = "review_media"

    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(Integer, ForeignKey("reviews.id"), nullable=False, index=True)
    media_type = Column(String(20), nullable=False)
    url = Column(String(500), nullable=False)
    public_id = Column(String(255), nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    review = relationship("Review", back_populates="media")


class ReviewReply(Base):
    __tablename__ = "review_replies"

    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(Integer, ForeignKey("reviews.id"), nullable=False, unique=True, index=True)
    admin_id = Column(Integer, ForeignKey("admin_users.id"), nullable=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    review = relationship("Review", back_populates="reply")
    admin = relationship("AdminUser", backref="replies")
