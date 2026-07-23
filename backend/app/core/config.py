from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    APP_NAME: str = "Mr. Desert Jaisalmer - Review Platform"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    DATABASE_URL: str = "sqlite+aiosqlite:///./mr_desert_reviews.db"
    DATABASE_URL_SYNC: str = "sqlite:///./mr_desert_reviews.db"

    SECRET_KEY: str = ""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    CLOUDINARY_CLOUD_NAME: Optional[str] = None
    CLOUDINARY_API_KEY: Optional[str] = None
    CLOUDINARY_API_SECRET: Optional[str] = None

    REDIS_URL: Optional[str] = None
    CELERY_BROKER_URL: Optional[str] = None

    SENTRY_DSN: Optional[str] = None

    CORS_ORIGINS: list[str] = ["*"]

    RATE_LIMIT_PER_MINUTE: int = 10

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

if not settings.SECRET_KEY:
    if settings.DEBUG:
        settings.SECRET_KEY = "local-development-only-change-me"
    else:
        raise RuntimeError("SECRET_KEY must be configured outside development")
