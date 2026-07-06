from datetime import date, time
from sqlalchemy.orm import Session
from backend import models


DEMO_EMAIL = "demo@travelplanner.app"


def seed_demo_data(db: Session, user_id: int):
    existing = db.query(models.Trip).filter(models.Trip.owner_id == user_id).first()
    if existing:
        return

    trips_data = [
        {
            "name": "Paris Getaway",
            "start_date": date(2026, 7, 14),
            "end_date": date(2026, 7, 18),
            "days": [
                {
                    "date": date(2026, 7, 14),
                    "label": "Arrival & Montmartre",
                    "items": [
                        {"place_name": "Check into Hotel des Arts", "scheduled_time": time(10, 0), "note": "Hotel near Sacre-Coeur", "order_index": 0},
                        {"place_name": "Sacré-Cœur Basilica", "scheduled_time": time(11, 30), "note": "Climb to the dome for stunning views", "latitude": 48.8867, "longitude": 2.3431, "order_index": 1},
                        {"place_name": "Lunch at Place du Tertre", "scheduled_time": time(13, 0), "note": "Try the artist square", "order_index": 2},
                        {"place_name": "Montmartre Walk", "scheduled_time": time(15, 0), "note": "Explore the cobblestone streets", "order_index": 3},
                    ],
                },
                {
                    "date": date(2026, 7, 15),
                    "label": "Louvre & Seine",
                    "items": [
                        {"place_name": "Louvre Museum", "scheduled_time": time(9, 0), "note": "Book tickets in advance", "latitude": 48.8606, "longitude": 2.3376, "order_index": 0},
                        {"place_name": "Tuileries Garden", "scheduled_time": time(13, 0), "note": "Relax after the museum", "order_index": 1},
                        {"place_name": "Seine River Cruise", "scheduled_time": time(15, 30), "note": "Bateaux Mouches", "latitude": 48.8589, "longitude": 2.3468, "order_index": 2},
                        {"place_name": "Eiffel Tower Sunset", "scheduled_time": time(19, 0), "note": "Picnic at Champ de Mars", "latitude": 48.8584, "longitude": 2.2945, "order_index": 3},
                    ],
                },
                {
                    "date": date(2026, 7, 16),
                    "label": "Versailles Day Trip",
                    "items": [
                        {"place_name": "Palace of Versailles", "scheduled_time": time(9, 0), "note": "Take RER C from Paris", "latitude": 48.8049, "longitude": 2.1204, "order_index": 0},
                        {"place_name": "Hall of Mirrors", "scheduled_time": time(10, 30), "note": "The most famous room", "order_index": 1},
                        {"place_name": "Versailles Gardens", "scheduled_time": time(13, 0), "note": "Rent a golf cart", "order_index": 2},
                    ],
                },
                {
                    "date": date(2026, 7, 17),
                    "label": "Le Marais & Latin Quarter",
                    "items": [
                        {"place_name": "Notre-Dame Cathedral", "scheduled_time": time(9, 0), "note": "Check restoration progress", "latitude": 48.8530, "longitude": 2.3499, "order_index": 0},
                        {"place_name": "Shakespeare & Company", "scheduled_time": time(10, 30), "note": "Iconic bookstore", "order_index": 1},
                        {"place_name": "Lunch in Latin Quarter", "scheduled_time": time(12, 30), "note": "Rue Mouffetard market", "order_index": 2},
                        {"place_name": "Musée d'Orsay", "scheduled_time": time(14, 30), "note": "Impressionist collection", "latitude": 48.8600, "longitude": 2.3266, "order_index": 3},
                    ],
                },
                {
                    "date": date(2026, 7, 18),
                    "label": "Departure Day",
                    "items": [
                        {"place_name": "Morning at Luxembourg Garden", "scheduled_time": time(8, 0), "note": "Last French breakfast", "order_index": 0},
                        {"place_name": "Shopping on Champs-Élysées", "scheduled_time": time(10, 0), "note": "Souvenir shopping", "order_index": 1},
                        {"place_name": "CDG Airport Transfer", "scheduled_time": time(13, 0), "note": "Allow 1 hour by RER B", "order_index": 2},
                    ],
                },
            ],
        },
        {
            "name": "Tokyo Adventure",
            "start_date": date(2026, 8, 10),
            "end_date": date(2026, 8, 14),
            "days": [
                {
                    "date": date(2026, 8, 10),
                    "label": "Shinjuku Explosion",
                    "items": [
                        {"place_name": "Check into Shinjuku Granbell Hotel", "scheduled_time": time(15, 0), "note": "Great location near station", "order_index": 0},
                        {"place_name": "Tokyo Metropolitan Building", "scheduled_time": time(16, 0), "note": "Free observation deck", "latitude": 35.6895, "longitude": 139.6917, "order_index": 1},
                        {"place_name": "Omoide Yokocho", "scheduled_time": time(18, 0), "note": "Memory Lane - great yakitori", "order_index": 2},
                        {"place_name": "Golden Gai", "scheduled_time": time(20, 0), "note": "Tiny themed bars", "order_index": 3},
                    ],
                },
                {
                    "date": date(2026, 8, 11),
                    "label": "Historic Asakusa",
                    "items": [
                        {"place_name": "Senso-ji Temple", "scheduled_time": time(8, 0), "note": "Arrive early to avoid crowds", "latitude": 35.7148, "longitude": 139.7967, "order_index": 0},
                        {"place_name": "Nakamise Street", "scheduled_time": time(9, 30), "note": "Traditional souvenir shops", "order_index": 1},
                        {"place_name": "Sumida River Cruise", "scheduled_time": time(11, 0), "note": "To Hamarikyu Gardens", "order_index": 2},
                    ],
                },
                {
                    "date": date(2026, 8, 12),
                    "label": "Shibuya & Harajuku",
                    "items": [
                        {"place_name": "Meiji Shrine", "scheduled_time": time(8, 0), "note": "Peaceful forest in the city", "latitude": 35.6764, "longitude": 139.6993, "order_index": 0},
                        {"place_name": "Takeshita Street", "scheduled_time": time(10, 0), "note": "Harajuku's fashion hub", "order_index": 1},
                        {"place_name": "Shibuya Crossing", "scheduled_time": time(13, 0), "note": "Visit Starbucks for the view", "order_index": 2},
                        {"place_name": "TeamLab Planets", "scheduled_time": time(15, 0), "note": "Book tickets in advance", "latitude": 35.6483, "longitude": 139.7862, "order_index": 3},
                    ],
                },
                {
                    "date": date(2026, 8, 13),
                    "label": "Day Trip to Kamakura",
                    "items": [
                        {"place_name": "Great Buddha of Kamakura", "scheduled_time": time(9, 0), "note": "1 hour by train from Tokyo", "latitude": 35.3168, "longitude": 139.5357, "order_index": 0},
                        {"place_name": "Hase-dera Temple", "scheduled_time": time(10, 30), "note": "Beautiful coastal temple", "order_index": 1},
                        {"place_name": "Komachi-dori Street", "scheduled_time": time(13, 0), "note": "Street food lunch", "order_index": 2},
                    ],
                },
                {
                    "date": date(2026, 8, 14),
                    "label": "Akihabara & Departure",
                    "items": [
                        {"place_name": "Yodobashi Camera", "scheduled_time": time(9, 0), "note": "Massive electronics store", "order_index": 0},
                        {"place_name": "Akihabara Radio Kaikan", "scheduled_time": time(10, 30), "note": "Anime and manga", "order_index": 1},
                        {"place_name": "Narita Express to Airport", "scheduled_time": time(14, 0), "note": "Allow 1.5 hours", "order_index": 2},
                    ],
                },
            ],
        },
        {
            "name": "New York Explorer",
            "start_date": date(2026, 9, 5),
            "end_date": date(2026, 9, 8),
            "days": [
                {
                    "date": date(2026, 9, 5),
                    "label": "Midtown Manhattan",
                    "items": [
                        {"place_name": "Top of the Rock", "scheduled_time": time(8, 0), "note": "Better than Empire State for photos", "latitude": 40.7590, "longitude": 73.9795, "order_index": 0},
                        {"place_name": "Times Square", "scheduled_time": time(10, 0), "note": "Just walk through once", "order_index": 1},
                        {"place_name": "Grand Central Terminal", "scheduled_time": time(11, 30), "note": "Whispering gallery", "order_index": 2},
                        {"place_name": "Broadway Show", "scheduled_time": time(20, 0), "note": "Book tickets at TKTS booth", "order_index": 3},
                    ],
                },
                {
                    "date": date(2026, 9, 6),
                    "label": "Downtown & Brooklyn",
                    "items": [
                        {"place_name": "Statue of Liberty Ferry", "scheduled_time": time(8, 0), "note": "Book ferry tickets in advance", "latitude": 40.6892, "longitude": 74.0445, "order_index": 0},
                        {"place_name": "Wall Street & Charging Bull", "scheduled_time": time(13, 0), "note": "Photo at the bull", "order_index": 1},
                        {"place_name": "Brooklyn Bridge Walk", "scheduled_time": time(14, 30), "note": "Walk to Brooklyn for photos", "order_index": 2},
                        {"place_name": "Dumbo & Brooklyn Ice Cream", "scheduled_time": time(16, 0), "note": "Best view of Manhattan skyline", "order_index": 3},
                    ],
                },
                {
                    "date": date(2026, 9, 7),
                    "label": "Central Park & Museums",
                    "items": [
                        {"place_name": "Central Park Loop", "scheduled_time": time(7, 0), "note": "Rent a bike", "latitude": 40.7829, "longitude": 73.9654, "order_index": 0},
                        {"place_name": "The Metropolitan Museum of Art", "scheduled_time": time(10, 0), "note": "Pay what you wish for NY residents", "order_index": 1},
                        {"place_name": "American Museum of Natural History", "scheduled_time": time(14, 0), "note": "Rose Center for Earth and Space", "order_index": 2},
                    ],
                },
                {
                    "date": date(2026, 9, 8),
                    "label": "Last Day Highlights",
                    "items": [
                        {"place_name": "High Line Walk", "scheduled_time": time(9, 0), "note": "Start at Meatpacking District", "latitude": 40.7480, "longitude": 74.0048, "order_index": 0},
                        {"place_name": "Chelsea Market", "scheduled_time": time(10, 30), "note": "Great food hall", "order_index": 1},
                        {"place_name": "One World Observatory", "scheduled_time": time(13, 0), "note": "Amazing views from Freedom Tower", "order_index": 2},
                    ],
                },
            ],
        },
    ]

    for trip_data in trips_data:
        trip = models.Trip(
            owner_id=user_id,
            name=trip_data["name"],
            start_date=trip_data["start_date"],
            end_date=trip_data["end_date"],
        )
        db.add(trip)
        db.flush()

        for day_data in trip_data["days"]:
            day = models.Day(
                trip_id=trip.id,
                date=day_data["date"],
                label=day_data["label"],
            )
            db.add(day)
            db.flush()

            for item_data in day_data["items"]:
                item = models.ItineraryItem(
                    day_id=day.id,
                    place_name=item_data["place_name"],
                    scheduled_time=item_data.get("scheduled_time"),
                    note=item_data.get("note"),
                    latitude=item_data.get("latitude"),
                    longitude=item_data.get("longitude"),
                    order_index=item_data["order_index"],
                )
                db.add(item)

    db.commit()
