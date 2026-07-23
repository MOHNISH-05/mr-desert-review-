from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from app.core.database import Base


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    excerpt = Column(String(500), nullable=True)
    content = Column(Text, nullable=False, default="")
    hero_image_url = Column(String(500), nullable=True)
    author = Column(String(255), nullable=False, default="Mr. Desert Editorial")
    category = Column(String(100), nullable=True)
    tags = Column(String(1000), nullable=True)
    reading_time = Column(Integer, nullable=False, default=5)
    seo_title = Column(String(255), nullable=True)
    meta_description = Column(String(500), nullable=True)
    status = Column(String(30), nullable=False, default="draft", index=True)
    published_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class DestinationGuide(Base):
    __tablename__ = "destination_guides"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    excerpt = Column(String(500), nullable=True)
    content = Column(Text, nullable=False, default="")
    hero_image_url = Column(String(500), nullable=True)
    category = Column(String(100), nullable=True)
    tags = Column(String(1000), nullable=True)
    map_url = Column(String(500), nullable=True)
    seo_title = Column(String(255), nullable=True)
    meta_description = Column(String(500), nullable=True)
    status = Column(String(30), nullable=False, default="draft", index=True)
    published_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
