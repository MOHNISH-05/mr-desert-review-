from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, func
from app.core.database import Base


class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    logo_url = Column(String(500), nullable=True)
    hero_image_url = Column(String(500), nullable=True)
    website_url = Column(String(500), nullable=False)
    booking_url = Column(String(500), nullable=True)
    contact_phone = Column(String(50), nullable=True)
    contact_email = Column(String(255), nullable=True)
    whatsapp_number = Column(String(50), nullable=True)
    address = Column(Text, nullable=True)
    google_maps_url = Column(String(500), nullable=True)
    google_maps_embed = Column(Text, nullable=True)
    average_rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
