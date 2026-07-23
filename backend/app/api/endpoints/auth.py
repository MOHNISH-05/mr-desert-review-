from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import verify_password, create_access_token, get_current_admin
from app.models.admin import AdminUser
from app.schemas.admin import AdminLogin, AdminToken, AdminUserResponse, AdminCreate
from app.core.security import get_password_hash

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/login", response_model=AdminToken)
def login(credentials: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == credentials.username).first()
    if not admin or not verify_password(credentials.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled",
        )
    access_token = create_access_token({
        "sub": str(admin.id),
        "username": admin.username,
        "role": "admin",
        "is_superadmin": admin.is_superadmin,
    })
    return AdminToken(access_token=access_token)


@router.get("/me", response_model=AdminUserResponse)
def get_me(payload: dict = Depends(get_current_admin), db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.id == int(payload["sub"])).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin


@router.post("/register", response_model=AdminUserResponse)
def register(
    admin_data: AdminCreate,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    if not payload.get("is_superadmin"):
        raise HTTPException(status_code=403, detail="Superadmin access required")
    existing = db.query(AdminUser).filter(
        (AdminUser.username == admin_data.username) | (AdminUser.email == admin_data.email)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already exists")
    admin = AdminUser(
        username=admin_data.username,
        email=admin_data.email,
        hashed_password=get_password_hash(admin_data.password),
        full_name=admin_data.full_name,
        is_superadmin=admin_data.is_superadmin,
    )
    db.add(admin)
    db.flush()
    return admin
