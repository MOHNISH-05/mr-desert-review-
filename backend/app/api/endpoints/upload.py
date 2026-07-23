from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status, Form
from sqlalchemy.orm import Session
from typing import Optional
import os
import uuid
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.review import ReviewMedia
from app.schemas.review import ReviewMediaResponse

router = APIRouter(prefix="/api/upload", tags=["Upload"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/avif"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/quicktime"}
MAX_IMAGE_SIZE = 10 * 1024 * 1024
MAX_VIDEO_SIZE = 100 * 1024 * 1024

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/media", response_model=list[ReviewMediaResponse])
def upload_media(
    files: list[UploadFile] = File(...),
    review_id: Optional[int] = Form(None),
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    uploaded = []
    for file in files:
        if file.content_type in ALLOWED_IMAGE_TYPES:
            media_type = "image"
            if file.size and file.size > MAX_IMAGE_SIZE:
                raise HTTPException(status_code=400, detail=f"{file.filename} exceeds max image size")
        elif file.content_type in ALLOWED_VIDEO_TYPES:
            media_type = "video"
            if file.size and file.size > MAX_VIDEO_SIZE:
                raise HTTPException(status_code=400, detail=f"{file.filename} exceeds max video size")
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}")

        ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        content = file.file.read()
        with open(filepath, "wb") as f:
            f.write(content)

        media = ReviewMedia(
            review_id=review_id,
            media_type=media_type,
            url=f"/uploads/{filename}",
            public_id=filename,
        )
        db.add(media)
        uploaded.append(media)

    db.flush()
    return [ReviewMediaResponse.model_validate(m) for m in uploaded]
