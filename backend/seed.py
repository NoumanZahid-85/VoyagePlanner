from datetime import date, time, datetime
from backend.database import SessionLocal, engine, Base
from backend import models
from backend.auth import hash_password

Base.metadata.create_all(bind=engine)

db = SessionLocal()

existing = db.query(models.User).filter(models.User.email == "demo@travelplanner.app").first()
if existing:
    print("Seed data already exists — skipping.")
    db.close()
    exit()

user = models.User(
    email="demo@travelplanner.app",
    hashed_password=hash_password("demo1234"),
    created_at=datetime.utcnow(),
)
db.add(user)
db.flush()

trip = models.Trip(
    owner_id=user.id,
    name="Paris Getaway",
    start_date=date(2026, 7, 10),
    end_date=date(2026, 7, 14),
)
db.add(trip)
db.flush()

day1 = models.Day(trip_id=trip.id, date=date(2026, 7, 10), label="Arrival & Explore")
day2 = models.Day(trip_id=trip.id, date=date(2026, 7, 11), label="Museums & Culture")
db.add_all([day1, day2])
db.flush()

items = [
    models.ItineraryItem(day_id=day1.id, place_name="Louvre Museum", latitude=48.8606, longitude=2.3376, scheduled_time=time(10, 0), note="Book tickets in advance", order_index=0),
    models.ItineraryItem(day_id=day1.id, place_name="Cafe de Flore", latitude=48.8540, longitude=2.3326, scheduled_time=time(13, 0), note="Classic Parisian cafe", order_index=1),
    models.ItineraryItem(day_id=day2.id, place_name="Eiffel Tower", latitude=48.8584, longitude=2.2945, scheduled_time=time(9, 0), note="Sunrise visit to avoid crowds", order_index=0),
]
db.add_all(items)

booking = models.Booking(
    trip_id=trip.id,
    type="flight",
    name="Air France AF1234",
    starts_at=datetime(2026, 7, 10, 6, 0),
    ends_at=datetime(2026, 7, 10, 10, 30),
    confirmation_number="AF-CONF-98765",
    notes="Terminal 2E, Seat 14A",
)
db.add(booking)

db.commit()
db.close()

print("Seed data created: demo@travelplanner.app / demo1234")
