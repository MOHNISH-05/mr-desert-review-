"""Seed script to populate the database with sample data."""
from datetime import datetime, timezone
from app.core.database import SessionLocal, Base, engine
from app.core.security import get_password_hash
from app.models.business import Business
from app.models.admin import AdminUser
from app.models.review import Review, ReviewMedia, ReviewReply
from app.models.content import BlogPost, DestinationGuide

BLOG_SEEDS = [
    ("Best Time to Visit Jaisalmer", "best-time-to-visit-jaisalmer", "Plan around golden light, cool desert evenings and the cultural calendar.", "Jaisalmer is at its most inviting between October and March, when the days are bright and the desert nights are made for a campfire. Build in time for the fort at sunrise, a dune sunset and an unhurried evening in the old city.", "Travel planning", 6),
    ("A First-Timer's Guide to a Desert Camp", "first-timers-guide-desert-camp", "Everything to know before your first night under the Thar sky.", "A desert camp is more than a room in the dunes. Expect warm hospitality, local food, folk music and a slower rhythm. Pack light layers, comfortable shoes and curiosity; the best moments usually happen between the planned activities.", "Desert experiences", 5),
    ("Jaisalmer Fort: A Living Heritage", "jaisalmer-fort-living-heritage", "Walk the honey-coloured lanes of one of Rajasthan's great living forts.", "Jaisalmer Fort changes character throughout the day. Begin early for quiet lanes and soft light, pause for a rooftop view, and leave time for the homes, temples, craftspeople and stories that make the fort feel lived-in rather than museum-like.", "Culture & history", 7),
    ("Camel Safari or Jeep Safari?", "camel-safari-or-jeep-safari", "Choose the desert adventure that matches your travel style.", "Camel safaris invite you to slow down and watch the dunes unfold. Jeep safaris cover more ground and bring a sense of movement and discovery. If time allows, combine both: a late-afternoon drive followed by a quiet camel ride into sunset.", "Experiences", 4),
]

GUIDE_SEEDS = [
    ("Jaisalmer Fort Guide", "jaisalmer-fort-guide", "History, viewpoints and practical tips for exploring the Golden Fort.", "Start early, wear comfortable footwear and take time to look beyond the main viewpoints. The fort's lanes reward a slow walk, especially around the temples, carved facades and small craft studios.", "Heritage"),
    ("Sam Sand Dunes Guide", "sam-sand-dunes-guide", "How to plan a memorable sunset and desert evening at Sam.", "Arrive before sunset so you can settle into the landscape rather than rush through it. A good evening pairs a dune experience with local food, music and enough quiet to notice the sky after dark.", "Desert"),
    ("Gadisar Lake Guide", "gadisar-lake-guide", "A peaceful morning stop framed by temples, chhatris and old-city stories.", "Gadisar Lake is best experienced in the softer morning light. Walk the edges, notice the carved details and use the visit as a gentle introduction to the layered history of Jaisalmer.", "Places to visit"),
    ("Camel Safari Guide", "camel-safari-guide", "What to expect, what to bring and how to choose your pace.", "Choose a safari operator that treats the animals well and keeps the group size comfortable. Bring sun protection, water and a light layer for the evening; the desert is generous when you give it time.", "Experiences"),
]

Base.metadata.create_all(bind=engine)

BUSINESSES = [
    {
        "name": "Mr. Desert Jaisalmer",
        "slug": "mr-desert",
        "description": "Mr. Desert Jaisalmer is the premier tourism brand in Jaisalmer, Rajasthan, offering world-class travel experiences. From luxury desert camps and heritage hotels to thrilling camel safaris and curated Rajasthan tour packages, we provide authentic and unforgettable journeys through the golden city.",
        "short_description": "Premier tourism brand offering hotels, desert camps, safaris & Rajasthan tour packages.",
        "website_url": "https://mrdesertjaisalmer.in",
        "booking_url": "https://mrdesertjaisalmer.in/booking",
        "contact_phone": "+91-9829038039",
        "contact_email": "info@mrdesertjaisalmer.in",
        "whatsapp_number": "+919829038039",
        "address": "Near Sam Sand Dunes, Jaisalmer, Rajasthan 345001",
        "google_maps_url": "https://maps.google.com/?q=Mr+Desert+Jaisalmer",
        "average_rating": 4.9,
        "total_reviews": 350,
        "order": 1,
    },
    {
        "name": "Elite Castle Jaisalmer",
        "slug": "elite-castle",
        "description": "Elite Castle Jaisalmer is a luxury heritage hotel located in the heart of Jaisalmer. Combining Rajput-era architecture with modern luxury, we offer beautifully appointed rooms, rooftop dining with fort views, and warm Rajasthani hospitality that makes every stay memorable.",
        "short_description": "Luxury heritage hotel in Jaisalmer with premium rooms & rooftop dining.",
        "website_url": "https://elitecastlejaisalmer.com",
        "booking_url": "https://elitecastlejaisalmer.com/booking",
        "contact_phone": "+91-9829038039",
        "contact_email": "info@elitecastlejaisalmer.com",
        "whatsapp_number": "+919829038039",
        "address": "Near Jaisalmer Fort, Jaisalmer, Rajasthan 345001",
        "google_maps_url": "https://maps.google.com/?q=Elite+Castle+Jaisalmer",
        "average_rating": 4.8,
        "total_reviews": 280,
        "order": 2,
    },
    {
        "name": "Happy Adventure Camp Jaisalmer",
        "slug": "happy-adventure",
        "description": "Happy Adventure Camp Jaisalmer offers the ultimate luxury desert camping experience in the Thar Desert. Enjoy traditional Rajasthani cultural performances, camel safaris at sunset, jeep safaris across golden dunes, starlit dinners, and comfortable Swiss-tent accommodations.",
        "short_description": "Luxury desert camp with cultural programs, camel safaris & overnight camping.",
        "website_url": "https://happyadventurecampjaisalmer.com",
        "booking_url": "https://happyadventurecampjaisalmer.com/booking",
        "contact_phone": "+91-9829038039",
        "contact_email": "info@happyadventurecampjaisalmer.com",
        "whatsapp_number": "+919829038039",
        "address": "Sam Sand Dunes, Jaisalmer, Rajasthan 345001",
        "google_maps_url": "https://maps.google.com/?q=Happy+Adventure+Camp+Jaisalmer",
        "average_rating": 4.9,
        "total_reviews": 420,
        "order": 3,
    },
    {
        "name": "Elite India Tour Planner",
        "slug": "tour-planner",
        "description": "Elite India Tour Planner specializes in crafting customized travel experiences across Rajasthan and India. From private luxury tours to budget-friendly group packages, we handle every detail \u2014 accommodation, transport, guides, and itineraries \u2014 for a seamless travel experience.",
        "short_description": "Professional Rajasthan tour planning with customized packages.",
        "website_url": "https://eliteindiatourplanner.com",
        "booking_url": "https://eliteindiatourplanner.com/booking",
        "contact_phone": "+91-9829038039",
        "contact_email": "info@eliteindiatourplanner.com",
        "whatsapp_number": "+919829038039",
        "address": "Jaisalmer, Rajasthan 345001",
        "google_maps_url": "https://maps.google.com/?q=Elite+India+Tour+Planner",
        "average_rating": 4.9,
        "total_reviews": 190,
        "order": 4,
    },
]

COUNTRIES = ["India", "India", "India", "India", "India", "United Kingdom", "United States", "Germany", "France", "Australia", "Italy", "Spain"]

SAMPLE_REVIEWS_BY_BUSINESS = {
    "mr-desert": [
        {"guest_name": "Rajesh Sharma", "country": "India", "city": "Mumbai", "overall_rating": 5, "title": "Best desert experience in Jaisalmer!", "content": "Mr. Desert made our Jaisalmer trip unforgettable. The camel safari at sunset was magical, and the camp staff were incredibly welcoming. Highly recommended!", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Sarah Johnson", "country": "United Kingdom", "city": "London", "overall_rating": 5, "title": "Magical stay in the desert", "content": "Staying with Mr. Desert was the highlight of our Rajasthan trip. The luxury tents were far better than expected, and the staff went above and beyond.", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 4},
        {"guest_name": "Michael Schmidt", "country": "Germany", "city": "Berlin", "overall_rating": 5, "title": "Outstanding hospitality", "content": "From the moment we arrived, the team ensured we had everything we needed. The jeep safari through the sand dunes was thrilling.", "is_recommended": True, "is_verified": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 4, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Priya Patel", "country": "India", "city": "Ahmedabad", "overall_rating": 5, "title": "Perfect family getaway", "content": "We visited as a family and everyone had an amazing time. The camel ride, puppet show, and Rajasthani dinner were the highlights.", "is_recommended": True, "is_verified": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Emma Watson", "country": "Australia", "city": "Sydney", "overall_rating": 4, "title": "Wonderful desert camp experience", "content": "The entire experience was wonderful. The camp was beautifully set up and the food was fantastic. Only wish we could have stayed longer!", "is_recommended": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 4, "food_rating": 5, "location_rating": 5, "experience_rating": 4, "value_for_money": 4},
    ],
    "elite-castle": [
        {"guest_name": "Amit Kumar", "country": "India", "city": "Delhi", "overall_rating": 5, "title": "Royal treatment at its finest", "content": "Elite Castle is a gem in Jaisalmer! The hotel architecture is stunning, the rooms are spacious, and the rooftop restaurant offers an amazing view of the fort.", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Laura Bianchi", "country": "Italy", "city": "Rome", "overall_rating": 5, "title": "Beautiful heritage hotel", "content": "The Elite Castle perfectly captures the spirit of Jaisalmer. Rooms were tastefully decorated, food was excellent, and staff was always smiling.", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 4, "location_rating": 5, "experience_rating": 5, "value_for_money": 4},
        {"guest_name": "Carlos Garcia", "country": "Spain", "city": "Madrid", "overall_rating": 4, "title": "Great location and amazing staff", "content": "The hotel is perfectly located near the fort. The staff helped us plan our entire Jaisalmer itinerary.", "is_recommended": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 4, "food_rating": 4, "location_rating": 5, "experience_rating": 4, "value_for_money": 4},
        {"guest_name": "Neha Gupta", "country": "India", "city": "Jaipur", "overall_rating": 5, "title": "Best hotel in Jaisalmer", "content": "We stayed for 3 nights and it was absolutely perfect. The room was beautiful, food was amazing, and staff arranged a fantastic desert safari.", "is_recommended": True, "is_verified": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
    ],
    "happy-adventure": [
        {"guest_name": "Vikram Singh", "country": "India", "city": "Jaipur", "overall_rating": 5, "title": "Ultimate desert camping!", "content": "Happy Adventure Camp exceeded all expectations. The luxury tents are incredibly comfortable. Camel safari at sunset was the perfect end to the day!", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Hans Mueller", "country": "Germany", "city": "Berlin", "overall_rating": 5, "title": "Best desert camp experience", "content": "I've traveled to many places but Happy Adventure Camp is truly special. The location amidst golden dunes is breathtaking.", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Claire Dubois", "country": "France", "city": "Paris", "overall_rating": 5, "title": "Magical night in the desert", "content": "The team made our desert stay absolutely magical. From the warm welcome to dinner under the stars, every moment was perfect.", "is_recommended": True, "is_verified": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "David Thompson", "country": "United Kingdom", "city": "London", "overall_rating": 5, "title": "A must-do in Jaisalmer", "content": "Must spend a night at Happy Adventure Camp. Camels, music, and sleeping under a sky full of stars. Unforgettable!", "is_recommended": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 4, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
    ],
    "tour-planner": [
        {"guest_name": "Rohan Mehta", "country": "India", "city": "Mumbai", "overall_rating": 5, "title": "Flawless Rajasthan trip planning", "content": "Elite India Tour Planner organized our 10-day Rajasthan trip and everything was flawless. From hotel bookings to guided tours, every detail was taken care of.", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "James Wilson", "country": "United States", "city": "New York", "overall_rating": 5, "title": "Best travel decision", "content": "Hiring Elite India Tour Planner was the best decision. They designed a custom Rajasthan itinerary that covered all must-see places.", "is_recommended": True, "is_verified": True, "is_featured": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Yuki Tanaka", "country": "Australia", "city": "Sydney", "overall_rating": 5, "title": "Incredible tour experience", "content": "Our family trip to Rajasthan was unforgettable thanks to Elite India Tour Planner. Worth every penny!", "is_recommended": True, "is_verified": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 5, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
        {"guest_name": "Sunita Verma", "country": "India", "city": "Delhi", "overall_rating": 5, "title": "Excellent tour package", "content": "Booked Jaisalmer tour package and it was excellent. Desert camp stay, fort visit, and city tour were all well-organized.", "is_recommended": True, "is_verified": True, "is_published": True, "status": "approved", "staff_rating": 5, "cleanliness_rating": 5, "food_rating": 4, "location_rating": 5, "experience_rating": 5, "value_for_money": 5},
    ],
}

OWNER_REPLIES = {
    "Best desert experience in Jaisalmer!": "Thank you, Rajesh! We're thrilled you enjoyed the desert experience. Hope to welcome you back soon!",
    "Magical stay in the desert": "Dear Sarah, thank you for your wonderful review! You're always welcome at Mr. Desert!",
    "Royal treatment at its finest": "Thank you, Amit! It was our pleasure to host you at Elite Castle. Looking forward to serving you again!",
    "Beautiful heritage hotel": "Grazie Laura! We're glad you appreciated the heritage architecture. Hope to see you again in Jaisalmer!",
    "Ultimate desert camping!": "Thank you, Vikram! We're delighted you had a wonderful time at Happy Adventure Camp. Come back soon!",
    "Flawless Rajasthan trip planning": "Thank you, Rohan! Looking forward to helping you explore more of India!",
}


def seed():
    session = SessionLocal()

    existing = session.query(Business).first()
    if existing:
        if not session.query(BlogPost).first():
            business = session.query(Business).filter(Business.slug == "mr-desert").first()
            for title, slug, excerpt, body, category, reading_time in BLOG_SEEDS:
                session.add(BlogPost(business_id=business.id if business else None, title=title, slug=slug, excerpt=excerpt, content=body, category=category, reading_time=reading_time, status="published", published_at=datetime.now(timezone.utc), author="Mr. Desert Editorial", seo_title=title + " | Mr. Desert Jaisalmer", meta_description=excerpt))
        if not session.query(DestinationGuide).first():
            for title, slug, excerpt, body, category in GUIDE_SEEDS:
                session.add(DestinationGuide(title=title, slug=slug, excerpt=excerpt, content=body, category=category, status="published", published_at=datetime.now(timezone.utc), seo_title=title + " | Jaisalmer Guide", meta_description=excerpt))
        session.commit()
        print("Editorial content checked. Existing business data preserved.")
        session.close()
        return

    admin = AdminUser(
        username="admin",
        email="admin@mrdesertjaisalmer.in",
        hashed_password=get_password_hash("admin123"),
        full_name="Super Admin",
        is_superadmin=True,
        is_active=True,
    )
    session.add(admin)

    business_map = {}
    for b_data in BUSINESSES:
        business = Business(**b_data)
        session.add(business)
        business_map[business.slug] = business

    session.flush()

    for slug, reviews_data in SAMPLE_REVIEWS_BY_BUSINESS.items():
        business = business_map[slug]
        for i, r_data in enumerate(reviews_data):
            review = Review(
                business_id=business.id,
                guest_name=r_data["guest_name"],
                country=r_data.get("country", COUNTRIES[i % len(COUNTRIES)]),
                city=r_data.get("city", "Unknown"),
                overall_rating=r_data["overall_rating"],
                staff_rating=r_data.get("staff_rating"),
                cleanliness_rating=r_data.get("cleanliness_rating"),
                food_rating=r_data.get("food_rating"),
                location_rating=r_data.get("location_rating"),
                experience_rating=r_data.get("experience_rating"),
                value_for_money=r_data.get("value_for_money"),
                title=r_data["title"],
                content=r_data["content"],
                is_recommended=r_data.get("is_recommended", True),
                is_verified=r_data.get("is_verified", False),
                is_featured=r_data.get("is_featured", False),
                is_published=r_data.get("is_published", False),
                status=r_data.get("status", "pending"),
                review_source="website",
                created_at=datetime.now(timezone.utc),
            )
            session.add(review)
            session.flush()

            if r_data["title"] in OWNER_REPLIES:
                reply = ReviewReply(
                    review_id=review.id,
                    admin_id=admin.id,
                    content=OWNER_REPLIES[r_data["title"]],
                )
                session.add(reply)

    session.commit()
    for title, slug, excerpt, body, category, reading_time in BLOG_SEEDS:
        session.add(BlogPost(business_id=business_map["mr-desert"].id, title=title, slug=slug, excerpt=excerpt, content=body, category=category, reading_time=reading_time, status="published", published_at=datetime.now(timezone.utc), author="Mr. Desert Editorial", seo_title=title + " | Mr. Desert Jaisalmer", meta_description=excerpt))
    for title, slug, excerpt, body, category in GUIDE_SEEDS:
        session.add(DestinationGuide(title=title, slug=slug, excerpt=excerpt, content=body, category=category, status="published", published_at=datetime.now(timezone.utc), seo_title=title + " | Jaisalmer Guide", meta_description=excerpt))
    session.commit()
    session.close()
    print("Database seeded successfully!")
    print("Admin login: username=admin, password=admin123")


if __name__ == "__main__":
    seed()
