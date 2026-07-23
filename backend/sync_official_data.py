"""Refresh business records from the official public business websites.

The descriptions are editorial summaries of publicly available facts, not copied page text.
"""
from app.core.database import SessionLocal
from app.models.business import Business

OFFICIAL_DATA = {
    "mr-desert": {
        "description": "Mr. Desert Jaisalmer is the official tourism brand led by Dheeraj Purohit, connecting authentic Jaisalmer experiences with comfortable stays, heritage hospitality and thoughtful Rajasthan travel. The ecosystem spans hotels, desert camps, camel and jeep safaris, sightseeing and customized tour planning, with a focus on celebrating the culture and spirit of the Thar Desert.",
        "short_description": "Jaisalmer tourism, heritage stays, desert camps, safaris and Rajasthan journeys.",
        "contact_phone": "+91-8854808196", "contact_email": "mrdesertjaisalmer@gmail.com", "whatsapp_number": "+918854808196",
        "address": "Hotel Elite Castle, near Dibba Para, Jaisalmer, Rajasthan 345001", "booking_url": "https://mrdesertjaisalmer.in",
    },
    "elite-castle": {
        "description": "Elite Castle is a heritage hotel near Jaisalmer Fort, combining Rajasthani character with modern comfort. Accommodation includes Deluxe Rooms, Suites and desert cottages, supported by rooftop dining with fort views, Wi-Fi, room service, parking, air conditioning, front-desk support and local experiences.",
        "short_description": "Heritage hotel near Jaisalmer Fort with suites, rooftop dining and warm hospitality.",
        "contact_phone": "+91-9460248196", "contact_email": "elitecastlejaisalmer@gmail.com", "whatsapp_number": "+919460248196",
        "address": "Fort Road, Dhibba Para, Manak Chowk, Jaisalmer, Rajasthan 345001", "booking_url": "https://elitecastlejaisalmer.com",
    },
    "happy-adventure": {
        "description": "Happy Adventure Desert Camp sits near Sam Sand Dunes, around 40 km from Jaisalmer city. Guests can choose Luxury AC Swiss Tents and Royal AC Cottages, then combine camel or jeep safaris with Rajasthani dining, folk music and dance, bonfire evenings, stargazing, quad biking and other desert adventures.",
        "short_description": "Luxury tents and cottages near Sam Sand Dunes with safaris, culture and desert dining.",
        "contact_phone": "+91-8386029849", "contact_email": "jaisalmerhappycamp@gmail.com", "whatsapp_number": "+918386029849",
        "address": "Sam Sand Dunes, Jaisalmer, Rajasthan 345001", "booking_url": "https://happyadventurecampjaisalmer.com",
    },
    "tour-planner": {
        "description": "Elite India Tour Planner creates personalized Rajasthan and India journeys with local expertise, transparent planning and 24x7 support. Services include customized itineraries, sightseeing, transportation, accommodation coordination and complete travel packages for couples, families and groups.",
        "short_description": "Personalized Rajasthan and India tours with local experts and end-to-end planning.",
        "contact_phone": "+91-9460248196", "contact_email": "mrdesertjaisalmer@gmail.com", "whatsapp_number": "+919460248196",
        "address": "Jaisalmer, Rajasthan, India", "booking_url": "https://eliteindiatourplanner.com",
    },
}

with SessionLocal() as db:
    for slug, data in OFFICIAL_DATA.items():
        business = db.query(Business).filter(Business.slug == slug).first()
        if business:
            for key, value in data.items():
                setattr(business, key, value)
    db.commit()
    print("Official business data synchronized.")
