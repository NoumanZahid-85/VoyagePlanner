import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.database import Base, get_db
from backend.main import app
from backend.auth import get_current_user, create_access_token
from backend import models

TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session():
    db = TestingSessionLocal()
    yield db
    db.close()


@pytest.fixture
def test_user(db_session):
    user = models.User(
        email="test@example.com",
        hashed_password="$2b$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5GzWq5Y5zQ5Y5zQ5Y5zQ5Y5",
    )
    db_session.add(user)
    db_session.commit()
    return user


@pytest.fixture
def client(test_user):
    token = create_access_token(test_user.id)

    def override_auth():
        return test_user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_auth
    client = TestClient(app)
    client.headers["Authorization"] = f"Bearer {token}"
    yield client
    app.dependency_overrides.clear()


@pytest.fixture
def unauth_client():
    app.dependency_overrides[get_db] = override_get_db
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@pytest.fixture
def seeded_db(db_session, test_user):
    trip = models.Trip(owner_id=test_user.id, name="Test Trip", start_date="2026-07-10", end_date="2026-07-14")
    db_session.add(trip)
    db_session.commit()
    day = models.Day(trip_id=trip.id, date="2026-07-10", label="Day 1")
    db_session.add(day)
    db_session.commit()
    item = models.ItineraryItem(day_id=day.id, place_name="Test Place", order_index=0)
    db_session.add(item)
    db_session.commit()
    booking = models.Booking(trip_id=trip.id, type="flight", name="Test Flight", starts_at="2026-07-10T06:00:00", ends_at="2026-07-10T10:00:00")
    db_session.add(booking)
    db_session.commit()
    return {"trip": trip, "day": day, "item": item, "booking": booking}
