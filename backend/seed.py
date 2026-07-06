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

# ──────────────────────────────────────────────
# Trip 1 — Paris Getaway
# ──────────────────────────────────────────────
paris = models.Trip(
    owner_id=user.id, name="Paris Getaway",
    start_date=date(2026, 7, 10), end_date=date(2026, 7, 14),
)
db.add(paris)
db.flush()

paris_days = [
    models.Day(trip_id=paris.id, date=date(2026, 7, 10), label="Arrival & Explore"),
    models.Day(trip_id=paris.id, date=date(2026, 7, 11), label="Museums & Culture"),
    models.Day(trip_id=paris.id, date=date(2026, 7, 12), label="Versailles Day Trip"),
    models.Day(trip_id=paris.id, date=date(2026, 7, 13), label="Food & Shopping"),
]
db.add_all(paris_days)
db.flush()

paris_items = [
    models.ItineraryItem(day_id=paris_days[0].id, place_name="Louvre Museum", latitude=48.8606, longitude=2.3376, scheduled_time=time(10, 0), note="Book tickets in advance — Mona Lisa room gets crowded", order_index=0),
    models.ItineraryItem(day_id=paris_days[0].id, place_name="Cafe de Flore", latitude=48.8540, longitude=2.3326, scheduled_time=time(13, 0), note="Classic Parisian cafe — try the croque monsieur", order_index=1),
    models.ItineraryItem(day_id=paris_days[0].id, place_name="Musee d'Orsay", latitude=48.8600, longitude=2.3266, scheduled_time=time(15, 0), note="Impressionist collection on top floor", order_index=2),
    models.ItineraryItem(day_id=paris_days[1].id, place_name="Eiffel Tower", latitude=48.8584, longitude=2.2945, scheduled_time=time(9, 0), note="Sunrise visit — book summit tickets online", order_index=0),
    models.ItineraryItem(day_id=paris_days[1].id, place_name="Arc de Triomphe", latitude=48.8738, longitude=2.2950, scheduled_time=time(11, 30), note="Walk up the spiral stairs for panoramic view", order_index=1),
    models.ItineraryItem(day_id=paris_days[1].id, place_name="Montmartre", latitude=48.8867, longitude=2.3431, scheduled_time=time(14, 0), note="Visit Sacre-Coeur and explore artist square", order_index=2),
    models.ItineraryItem(day_id=paris_days[2].id, place_name="Palace of Versailles", latitude=48.8049, longitude=2.1204, scheduled_time=time(10, 0), note="RER C from Paris — allow full day", order_index=0),
    models.ItineraryItem(day_id=paris_days[2].id, place_name="Marie-Antoinette's Estate", latitude=48.8195, longitude=2.1064, scheduled_time=time(14, 0), note="The Petit Trianon and Queen's Hamlet", order_index=1),
    models.ItineraryItem(day_id=paris_days[3].id, place_name="Le Marais", latitude=48.8595, longitude=2.3623, scheduled_time=time(10, 0), note="Trendy boutiques and falafel on Rue des Rosiers", order_index=0),
    models.ItineraryItem(day_id=paris_days[3].id, place_name="Galeries Lafayette", latitude=48.8738, longitude=2.3276, scheduled_time=time(14, 0), note="Art deco dome and rooftop view", order_index=1),
]
db.add_all(paris_items)

paris_bookings = [
    models.Booking(trip_id=paris.id, type="flight", name="Air France AF1234", starts_at=datetime(2026, 7, 10, 6, 0), ends_at=datetime(2026, 7, 10, 10, 30), confirmation_number="AF-CONF-98765", notes="Terminal 2E, Seat 14A"),
    models.Booking(trip_id=paris.id, type="hotel", name="Hotel Le Marais", starts_at=datetime(2026, 7, 10, 15, 0), ends_at=datetime(2026, 7, 14, 11, 0), confirmation_number="MAR-2026-447", notes="Room 304, City view"),
]
db.add_all(paris_bookings)

# ──────────────────────────────────────────────
# Trip 2 — Tokyo Adventure
# ──────────────────────────────────────────────
tokyo = models.Trip(
    owner_id=user.id, name="Tokyo Adventure",
    start_date=date(2026, 9, 15), end_date=date(2026, 9, 22),
)
db.add(tokyo)
db.flush()

tokyo_days = [
    models.Day(trip_id=tokyo.id, date=date(2026, 9, 15), label="Arrival & Shinjuku"),
    models.Day(trip_id=tokyo.id, date=date(2026, 9, 16), label="Traditional Tokyo"),
    models.Day(trip_id=tokyo.id, date=date(2026, 9, 17), label="Modern Tokyo"),
    models.Day(trip_id=tokyo.id, date=date(2026, 9, 18), label="Day Trip — Mount Fuji"),
    models.Day(trip_id=tokyo.id, date=date(2026, 9, 19), label="Akihabara & Ueno"),
    models.Day(trip_id=tokyo.id, date=date(2026, 9, 20), label="Shibuya & Harajuku"),
    models.Day(trip_id=tokyo.id, date=date(2026, 9, 21), label="Tsukiji & Departure"),
]
db.add_all(tokyo_days)
db.flush()

tokyo_items = [
    models.ItineraryItem(day_id=tokyo_days[0].id, place_name="Shinjuku Gyoen National Garden", latitude=35.6852, longitude=139.7100, scheduled_time=time(14, 0), note="Stroll the Japanese garden after landing", order_index=0),
    models.ItineraryItem(day_id=tokyo_days[0].id, place_name="Tokyo Metropolitan Observatory", latitude=35.6896, longitude=139.6917, scheduled_time=time(17, 30), note="Free sunset view of the city", order_index=1),
    models.ItineraryItem(day_id=tokyo_days[0].id, place_name="Omoide Yokocho", latitude=35.6942, longitude=139.7005, scheduled_time=time(19, 0), note="Narrow alley with yakitori — cash only", order_index=2),
    models.ItineraryItem(day_id=tokyo_days[1].id, place_name="Senso-ji Temple", latitude=35.7148, longitude=139.7967, scheduled_time=time(9, 0), note="Oldest temple — go early to avoid crowds", order_index=0),
    models.ItineraryItem(day_id=tokyo_days[1].id, place_name="Nakamise-dori", latitude=35.7143, longitude=139.7955, scheduled_time=time(10, 30), note="Shopping street leading to the temple", order_index=1),
    models.ItineraryItem(day_id=tokyo_days[1].id, place_name="Ueno Park", latitude=35.7151, longitude=139.7730, scheduled_time=time(13, 0), note="Visit the museums and zoo", order_index=2),
    models.ItineraryItem(day_id=tokyo_days[2].id, place_name="Shibuya Crossing", latitude=35.6595, longitude=139.7004, scheduled_time=time(10, 0), note="Iconic scramble — view from Starbucks above", order_index=0),
    models.ItineraryItem(day_id=tokyo_days[2].id, place_name="Meiji Jingu", latitude=35.6764, longitude=139.6993, scheduled_time=time(11, 30), note="Serene forest shrine in the heart of Tokyo", order_index=1),
    models.ItineraryItem(day_id=tokyo_days[2].id, place_name="Takeshita Street", latitude=35.6717, longitude=139.7026, scheduled_time=time(14, 0), note="Harajuku — crepes and quirky fashion", order_index=2),
    models.ItineraryItem(day_id=tokyo_days[2].id, place_name="Tokyo Tower", latitude=35.6586, longitude=139.7454, scheduled_time=time(18, 0), note="Evening illumination view", order_index=3),
    models.ItineraryItem(day_id=tokyo_days[3].id, place_name="Mount Fuji 5th Station", latitude=35.3606, longitude=138.7272, scheduled_time=time(8, 0), note="Book bus from Shinjuku Highway Bus Terminal", order_index=0),
    models.ItineraryItem(day_id=tokyo_days[3].id, place_name="Lake Kawaguchi", latitude=35.5136, longitude=138.7570, scheduled_time=time(13, 0), note="Reflection of Mount Fuji — rent a bike", order_index=1),
    models.ItineraryItem(day_id=tokyo_days[4].id, place_name="Akihabara Electric Town", latitude=35.7023, longitude=139.7745, scheduled_time=time(10, 0), note="Anime, manga, and electronics district", order_index=0),
    models.ItineraryItem(day_id=tokyo_days[4].id, place_name="Yanaka Ginza", latitude=35.7279, longitude=139.7703, scheduled_time=time(14, 0), note="Old-school shopping street — great street food", order_index=1),
    models.ItineraryItem(day_id=tokyo_days[5].id, place_name="TeamLab Borderless", latitude=35.6264, longitude=139.7840, scheduled_time=time(10, 0), note="Digital art museum — book ahead", order_index=0),
    models.ItineraryItem(day_id=tokyo_days[5].id, place_name="Roppongi Hills", latitude=35.6600, longitude=139.7292, scheduled_time=time(14, 0), note="Mori Art Museum and observation deck", order_index=1),
    models.ItineraryItem(day_id=tokyo_days[6].id, place_name="Tsukiji Outer Market", latitude=35.6654, longitude=139.7707, scheduled_time=time(7, 0), note="Fresh sushi breakfast — arrive early", order_index=0),
    models.ItineraryItem(day_id=tokyo_days[6].id, place_name="Ginza", latitude=35.6717, longitude=139.7667, scheduled_time=time(10, 0), note="High-end shopping district", order_index=1),
]
db.add_all(tokyo_items)

tokyo_bookings = [
    models.Booking(trip_id=tokyo.id, type="flight", name="JAL JL8764", starts_at=datetime(2026, 9, 15, 1, 0), ends_at=datetime(2026, 9, 15, 6, 0), confirmation_number="JL-CONF-33442", notes="NRT Terminal 1"),
    models.Booking(trip_id=tokyo.id, type="hotel", name="Hotel Gracery Shinjuku", starts_at=datetime(2026, 9, 15, 15, 0), ends_at=datetime(2026, 9, 22, 11, 0), confirmation_number="GRA-2026-221", notes="Godzilla view room"),
    models.Booking(trip_id=tokyo.id, type="flight", name="JAL JL8765", starts_at=datetime(2026, 9, 22, 17, 0), ends_at=datetime(2026, 9, 22, 22, 0), confirmation_number="JL-CONF-33443", notes="NRT Terminal 1"),
]
db.add_all(tokyo_bookings)

# ──────────────────────────────────────────────
# Trip 3 — Bali Retreat
# ──────────────────────────────────────────────
bali = models.Trip(
    owner_id=user.id, name="Bali Retreat",
    start_date=date(2026, 5, 1), end_date=date(2026, 5, 7),
)
db.add(bali)
db.flush()

bali_days = [
    models.Day(trip_id=bali.id, date=date(2026, 5, 1), label="Arrival & Ubud"),
    models.Day(trip_id=bali.id, date=date(2026, 5, 2), label="Ubud Culture"),
    models.Day(trip_id=bali.id, date=date(2026, 5, 3), label="Temples & Rice Terraces"),
    models.Day(trip_id=bali.id, date=date(2026, 5, 4), label="Seminyak & Beaches"),
    models.Day(trip_id=bali.id, date=date(2026, 5, 5), label="Uluwatu & Cliffs"),
    models.Day(trip_id=bali.id, date=date(2026, 5, 6), label="Nusa Penida Day Trip"),
]
db.add_all(bali_days)
db.flush()

bali_items = [
    models.ItineraryItem(day_id=bali_days[0].id, place_name="Ubud Monkey Forest", latitude=-8.5181, longitude=115.2590, scheduled_time=time(14, 0), note="Watch your belongings — the monkeys are cheeky", order_index=0),
    models.ItineraryItem(day_id=bali_days[0].id, place_name="Ubud Palace", latitude=-8.5068, longitude=115.2624, scheduled_time=time(17, 0), note="Traditional dance performance at 7pm", order_index=1),
    models.ItineraryItem(day_id=bali_days[1].id, place_name="Campuhan Ridge Walk", latitude=-8.5113, longitude=115.2560, scheduled_time=time(7, 0), note="Beautiful morning walk through rice fields", order_index=0),
    models.ItineraryItem(day_id=bali_days[1].id, place_name="Tegallalang Rice Terrace", latitude=-8.4307, longitude=115.2799, scheduled_time=time(10, 0), note="Iconic rice terraces — small donation at entrance", order_index=1),
    models.ItineraryItem(day_id=bali_days[1].id, place_name="Tirta Empul Temple", latitude=-8.4152, longitude=115.3156, scheduled_time=time(13, 0), note="Holy water temple — bring a sarong", order_index=2),
    models.ItineraryItem(day_id=bali_days[2].id, place_name="Tanah Lot Temple", latitude=-8.6213, longitude=115.0868, scheduled_time=time(16, 0), note="Sunset temple on the rocks", order_index=0),
    models.ItineraryItem(day_id=bali_days[3].id, place_name="Seminyak Beach", latitude=-8.6914, longitude=115.1552, scheduled_time=time(10, 0), note="Surf lessons available on the beach", order_index=0),
    models.ItineraryItem(day_id=bali_days[3].id, place_name="Potato Head Beach Club", latitude=-8.6939, longitude=115.1569, scheduled_time=time(14, 0), note="Iconic beach club — book a daybed", order_index=1),
    models.ItineraryItem(day_id=bali_days[4].id, place_name="Uluwatu Temple", latitude=-8.8291, longitude=115.0849, scheduled_time=time(16, 0), note="Clifftop temple — Kecak fire dance at sunset", order_index=0),
    models.ItineraryItem(day_id=bali_days[5].id, place_name="Kelingking Beach", latitude=-8.7693, longitude=115.5866, scheduled_time=time(9, 0), note="T-Rex shaped cliff — steep hike down", order_index=0),
    models.ItineraryItem(day_id=bali_days[5].id, place_name="Angel's Billabong", latitude=-8.7770, longitude=115.5924, scheduled_time=time(13, 0), note="Natural infinity pool — check tide times", order_index=1),
]
db.add_all(bali_items)

bali_bookings = [
    models.Booking(trip_id=bali.id, type="flight", name="Garuda GA881", starts_at=datetime(2026, 5, 1, 8, 0), ends_at=datetime(2026, 5, 1, 16, 0), confirmation_number="GA-CONF-5567", notes="DPS Airport"),
    models.Booking(trip_id=bali.id, type="hotel", name="Bambu Indah Resort", starts_at=datetime(2026, 5, 1, 14, 0), ends_at=datetime(2026, 5, 7, 12, 0), confirmation_number="BAM-2026-889", notes="Bamboo suite with river view"),
]
db.add_all(bali_bookings)

# ──────────────────────────────────────────────
# Trip 4 — New York City Explorer
# ──────────────────────────────────────────────
nyc = models.Trip(
    owner_id=user.id, name="NYC Explorer",
    start_date=date(2026, 10, 1), end_date=date(2026, 10, 5),
)
db.add(nyc)
db.flush()

nyc_days = [
    models.Day(trip_id=nyc.id, date=date(2026, 10, 1), label="Arrival & Downtown"),
    models.Day(trip_id=nyc.id, date=date(2026, 10, 2), label="Midtown & Central Park"),
    models.Day(trip_id=nyc.id, date=date(2026, 10, 3), label="Brooklyn & Arts"),
    models.Day(trip_id=nyc.id, date=date(2026, 10, 4), label="Museums & Shopping"),
]
db.add_all(nyc_days)
db.flush()

nyc_items = [
    models.ItineraryItem(day_id=nyc_days[0].id, place_name="Statue of Liberty", latitude=40.6892, longitude=-74.0445, scheduled_time=time(9, 0), note="Book ferry tickets online — pedestal access included", order_index=0),
    models.ItineraryItem(day_id=nyc_days[0].id, place_name="Wall Street", latitude=40.7074, longitude=-74.0113, scheduled_time=time(13, 0), note="See the Charging Bull and NYSE", order_index=1),
    models.ItineraryItem(day_id=nyc_days[0].id, place_name="Brooklyn Bridge Walk", latitude=40.7061, longitude=-73.9969, scheduled_time=time(15, 0), note="Walk from Manhattan to DUMBO at sunset", order_index=2),
    models.ItineraryItem(day_id=nyc_days[1].id, place_name="Central Park", latitude=40.7829, longitude=-73.9654, scheduled_time=time(8, 0), note="Morning stroll — rent a rowboat at The Loeb Boathouse", order_index=0),
    models.ItineraryItem(day_id=nyc_days[1].id, place_name="Metropolitan Museum of Art", latitude=40.7794, longitude=-73.9632, scheduled_time=time(11, 0), note="The Met — pay-what-you-wish for NY residents", order_index=1),
    models.ItineraryItem(day_id=nyc_days[1].id, place_name="Times Square", latitude=40.7580, longitude=-73.9855, scheduled_time=time(19, 0), note="Neon lights at night — book Broadway show", order_index=2),
    models.ItineraryItem(day_id=nyc_days[2].id, place_name="DUMBO", latitude=40.7030, longitude=-73.9893, scheduled_time=time(10, 0), note="Brooklyn — best photo spot of Manhattan Bridge", order_index=0),
    models.ItineraryItem(day_id=nyc_days[2].id, place_name="Brooklyn Flea Market", latitude=40.6877, longitude=-73.9905, scheduled_time=time(12, 0), note="Weekend market — vintage finds and food", order_index=1),
    models.ItineraryItem(day_id=nyc_days[2].id, place_name="Smorgasburg", latitude=40.7217, longitude=-73.9609, scheduled_time=time(14, 0), note="Outdoor food market with 100+ vendors", order_index=2),
    models.ItineraryItem(day_id=nyc_days[3].id, place_name="Empire State Building", latitude=40.7484, longitude=-73.9857, scheduled_time=time(9, 0), note="Go early to avoid queues — 86th floor observatory", order_index=0),
    models.ItineraryItem(day_id=nyc_days[3].id, place_name="The High Line", latitude=40.7480, longitude=-74.0048, scheduled_time=time(11, 30), note="Elevated park on old rail tracks — Chelsea", order_index=1),
    models.ItineraryItem(day_id=nyc_days[3].id, place_name="One World Trade Center", latitude=40.7127, longitude=-74.0134, scheduled_time=time(15, 0), note="One World Observatory — 360° skyline views", order_index=2),
]
db.add_all(nyc_items)

nyc_bookings = [
    models.Booking(trip_id=nyc.id, type="flight", name="Delta DL404", starts_at=datetime(2026, 10, 1, 7, 0), ends_at=datetime(2026, 10, 1, 10, 30), confirmation_number="DL-CONF-10293", notes="JFK Terminal 4"),
    models.Booking(trip_id=nyc.id, type="hotel", name="The William Vale", starts_at=datetime(2026, 10, 1, 15, 0), ends_at=datetime(2026, 10, 5, 11, 0), confirmation_number="WIL-2026-551", notes="Williamsburg — rooftop pool"),
]
db.add_all(nyc_bookings)

# ──────────────────────────────────────────────
# Trip 5 — London Explorer
# ──────────────────────────────────────────────
london = models.Trip(
    owner_id=user.id, name="London Explorer",
    start_date=date(2026, 8, 5), end_date=date(2026, 8, 9),
)
db.add(london)
db.flush()

london_days = [
    models.Day(trip_id=london.id, date=date(2026, 8, 5), label="Arrival & South Bank"),
    models.Day(trip_id=london.id, date=date(2026, 8, 6), label="Royal London"),
    models.Day(trip_id=london.id, date=date(2026, 8, 7), label="Museums & Markets"),
    models.Day(trip_id=london.id, date=date(2026, 8, 8), label="Day Trip — Windsor"),
]
db.add_all(london_days)
db.flush()

london_items = [
    models.ItineraryItem(day_id=london_days[0].id, place_name="Tower of London", latitude=51.5081, longitude=-0.0759, scheduled_time=time(10, 0), note="Book tickets online — see the Crown Jewels", order_index=0),
    models.ItineraryItem(day_id=london_days[0].id, place_name="Tower Bridge", latitude=51.5055, longitude=-0.0754, scheduled_time=time(12, 30), note="Glass floor walkway at the top", order_index=1),
    models.ItineraryItem(day_id=london_days[0].id, place_name="Borough Market", latitude=51.5055, longitude=-0.0910, scheduled_time=time(14, 0), note="Best food market in London — try the truffle risotto", order_index=2),
    models.ItineraryItem(day_id=london_days[1].id, place_name="Buckingham Palace", latitude=51.5014, longitude=-0.1419, scheduled_time=time(10, 30), note="Check for Changing of the Guard at 11am", order_index=0),
    models.ItineraryItem(day_id=london_days[1].id, place_name="Westminster Abbey", latitude=51.4993, longitude=-0.1273, scheduled_time=time(12, 30), note="Coronation church — free audio guide", order_index=1),
    models.ItineraryItem(day_id=london_days[1].id, place_name="Big Ben & Parliament", latitude=51.5007, longitude=-0.1246, scheduled_time=time(14, 30), note="Photo stop — book Parliament tour in advance", order_index=2),
    models.ItineraryItem(day_id=london_days[2].id, place_name="British Museum", latitude=51.5194, longitude=-0.1269, scheduled_time=time(10, 0), note="Free entry — see the Rosetta Stone and Elgin Marbles", order_index=0),
    models.ItineraryItem(day_id=london_days[2].id, place_name="Covent Garden", latitude=51.5118, longitude=-0.1237, scheduled_time=time(13, 30), note="Street performers and boutique shops", order_index=1),
    models.ItineraryItem(day_id=london_days[2].id, place_name="Camden Market", latitude=51.5412, longitude=-0.1480, scheduled_time=time(16, 0), note="Alternative market — great for souvenirs", order_index=2),
    models.ItineraryItem(day_id=london_days[3].id, place_name="Windsor Castle", latitude=51.4838, longitude=-0.6044, scheduled_time=time(10, 0), note="30min train from Paddington — State Apartments", order_index=0),
    models.ItineraryItem(day_id=london_days[3].id, place_name="The Long Walk", latitude=51.4545, longitude=-0.6178, scheduled_time=time(13, 0), note="Scenic 3-mile walk from the castle", order_index=1),
]
db.add_all(london_items)

london_bookings = [
    models.Booking(trip_id=london.id, type="flight", name="British Airways BA178", starts_at=datetime(2026, 8, 5, 8, 0), ends_at=datetime(2026, 8, 5, 12, 0), confirmation_number="BA-CONF-7712", notes="LHR Terminal 5"),
    models.Booking(trip_id=london.id, type="hotel", name="The Hoxton, Holborn", starts_at=datetime(2026, 8, 5, 14, 0), ends_at=datetime(2026, 8, 9, 12, 0), confirmation_number="HOX-2026-334", notes="Cosy double room"),
]
db.add_all(london_bookings)

db.commit()
db.close()

print("Seed data created: demo@travelplanner.app / demo1234")
print("Trips: Paris Getaway, Tokyo Adventure, Bali Retreat, NYC Explorer, London Explorer")
