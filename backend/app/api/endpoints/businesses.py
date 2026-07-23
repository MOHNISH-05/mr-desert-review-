from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.business import Business
from app.schemas.business import BusinessCreate, BusinessUpdate, BusinessResponse, BusinessListResponse

router = APIRouter(prefix="/api/businesses", tags=["Businesses"])


@router.get("", response_model=BusinessListResponse)
def get_businesses(db: Session = Depends(get_db)):
    businesses = db.query(Business).filter(Business.is_active == True).order_by(Business.order).all()
    return BusinessListResponse(
        businesses=[BusinessResponse.model_validate(b) for b in businesses],
        total=len(businesses),
    )


@router.get("/{business_id}", response_model=BusinessResponse)
def get_business(business_id: int, db: Session = Depends(get_db)):
    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return business


@router.get("/slug/{slug}", response_model=BusinessResponse)
def get_business_by_slug(slug: str, db: Session = Depends(get_db)):
    business = db.query(Business).filter(Business.slug == slug).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return business


@router.post("", response_model=BusinessResponse, status_code=status.HTTP_201_CREATED)
def create_business(
    business_data: BusinessCreate,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    business = Business(**business_data.model_dump())
    db.add(business)
    db.flush()
    return business


@router.put("/{business_id}", response_model=BusinessResponse)
def update_business(
    business_id: int,
    business_data: BusinessUpdate,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    for key, value in business_data.model_dump(exclude_unset=True).items():
        setattr(business, key, value)
    db.flush()
    return business


@router.delete("/{business_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_business(
    business_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    db.delete(business)
