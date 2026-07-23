from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.content import BlogPost, DestinationGuide
from app.schemas.content import BlogCreate, GuideCreate, ContentResponse

router = APIRouter(prefix="/api/content", tags=["Content"])


@router.get("/blogs", response_model=list[ContentResponse])
def list_blogs(page: int = Query(1, ge=1), page_size: int = Query(12, ge=1, le=50), db: Session = Depends(get_db)):
    return db.query(BlogPost).filter(BlogPost.status == "published").order_by(desc(BlogPost.published_at), desc(BlogPost.created_at)).offset((page - 1) * page_size).limit(page_size).all()


@router.get("/blogs/{slug}", response_model=ContentResponse)
def get_blog(slug: str, db: Session = Depends(get_db)):
    item = db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.status == "published").first()
    if not item:
        raise HTTPException(status_code=404, detail="Blog not found")
    return item


@router.post("/blogs", response_model=ContentResponse)
def create_blog(data: BlogCreate, db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    item = BlogPost(**data.model_dump())
    if item.status == "published":
        item.published_at = datetime.now(timezone.utc)
    db.add(item)
    db.flush()
    return item


@router.get("/guides", response_model=list[ContentResponse])
def list_guides(page: int = Query(1, ge=1), page_size: int = Query(12, ge=1, le=50), db: Session = Depends(get_db)):
    return db.query(DestinationGuide).filter(DestinationGuide.status == "published").order_by(desc(DestinationGuide.published_at), desc(DestinationGuide.created_at)).offset((page - 1) * page_size).limit(page_size).all()


@router.get("/guides/{slug}", response_model=ContentResponse)
def get_guide(slug: str, db: Session = Depends(get_db)):
    item = db.query(DestinationGuide).filter(DestinationGuide.slug == slug, DestinationGuide.status == "published").first()
    if not item:
        raise HTTPException(status_code=404, detail="Guide not found")
    return item


@router.post("/guides", response_model=ContentResponse)
def create_guide(data: GuideCreate, db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    item = DestinationGuide(**data.model_dump())
    if item.status == "published":
        item.published_at = datetime.now(timezone.utc)
    db.add(item)
    db.flush()
    return item
