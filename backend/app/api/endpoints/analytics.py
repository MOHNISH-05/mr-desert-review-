from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.review import Review
from app.models.business import Business

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_admin),
):
    total_reviews = db.query(func.count(Review.id)).scalar()
    published_reviews = db.query(func.count(Review.id)).filter(Review.is_published == True).scalar()
    pending_reviews = db.query(func.count(Review.id)).filter(Review.status == "pending").scalar()
    featured_reviews = db.query(func.count(Review.id)).filter(Review.is_featured == True).scalar()
    avg_rating = db.query(func.avg(Review.overall_rating)).scalar()
    total_businesses = db.query(func.count(Business.id)).scalar()

    from sqlalchemy import text
    monthly_query = text("""
        SELECT strftime('%Y-%m', created_at) as month, COUNT(*) as count
        FROM reviews
        WHERE created_at IS NOT NULL
        GROUP BY month
        ORDER BY month DESC
        LIMIT 12
    """)
    monthly_result = db.execute(monthly_query).fetchall()
    monthly_reviews = [{"month": m, "count": c} for m, c in monthly_result]

    by_business = (
        db.query(Business.name, func.count(Review.id), func.avg(Review.overall_rating))
        .outerjoin(Review, Review.business_id == Business.id)
        .group_by(Business.id, Business.name)
        .all()
    )
    business_comparison = [
        {"name": name, "count": count, "avg_rating": round(float(avg or 0), 1)}
        for name, count, avg in by_business
    ]

    rating_dist = (
        db.query(Review.overall_rating, func.count(Review.id))
        .group_by(Review.overall_rating)
        .order_by(desc(Review.overall_rating))
        .all()
    )
    rating_distribution = {str(r): c for r, c in rating_dist}

    countries = (
        db.query(Review.country, func.count(Review.id))
        .filter(Review.country.isnot(None))
        .group_by(Review.country)
        .order_by(func.count(Review.id).desc())
        .limit(10)
        .all()
    )
    country_distribution = [{"country": c, "count": cnt} for c, cnt in countries]

    recent = (
        db.query(Review)
        .order_by(desc(Review.created_at))
        .limit(10)
        .all()
    )
    recent_activity = [
        {
            "id": r.id,
            "guest_name": r.guest_name,
            "action": "New Review",
            "status": r.status,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in recent
    ]

    return {
        "total_reviews": total_reviews or 0,
        "published_reviews": published_reviews or 0,
        "pending_reviews": pending_reviews or 0,
        "featured_reviews": featured_reviews or 0,
        "average_rating": round(float(avg_rating or 0), 1),
        "total_businesses": total_businesses or 0,
        "monthly_reviews": monthly_reviews,
        "business_comparison": business_comparison,
        "rating_distribution": rating_distribution,
        "country_distribution": country_distribution,
        "recent_activity": recent_activity,
    }
