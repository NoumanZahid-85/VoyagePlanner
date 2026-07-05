from fastapi.testclient import TestClient
from backend.main import app
from backend.tests.conftest import override_get_db
from backend.database import get_db


def test_signup_creates_user_and_returns_token():
    app.dependency_overrides[get_db] = override_get_db
    client = TestClient(app)
    res = client.post("/auth/signup", json={"email": "new@test.com", "password": "password123"})
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["user"]["email"] == "new@test.com"
    app.dependency_overrides.clear()


def test_signup_duplicate_email(client, test_user):
    res = client.post("/auth/signup", json={"email": "test@example.com", "password": "password123"})
    assert res.status_code == 409


def test_login_success(client, test_user):
    res = client.post("/auth/login", json={"email": "test@example.com", "password": "password123"})
    assert res.status_code == 200
    assert "access_token" in res.json()


def test_login_wrong_password(client, test_user):
    res = client.post("/auth/login", json={"email": "test@example.com", "password": "wrongpass"})
    assert res.status_code == 401


def test_login_nonexistent_email(client):
    res = client.post("/auth/login", json={"email": "noone@test.com", "password": "password123"})
    assert res.status_code == 401


def test_protected_route_without_token(unauth_client):
    res = unauth_client.get("/trips/")
    assert res.status_code == 401


def test_protected_route_with_invalid_token(unauth_client):
    unauth_client.headers["Authorization"] = "Bearer garbage"
    res = unauth_client.get("/trips/")
    assert res.status_code == 401


def test_protected_route_with_valid_token(client):
    res = client.get("/trips/")
    assert res.status_code == 200


def test_refresh_flow(client):
    res = client.post("/auth/refresh")
    assert res.status_code == 200
    assert "access_token" in res.json()


def test_logout_clears_cookie(client):
    res = client.post("/auth/logout")
    assert res.status_code == 200


def test_owner_isolation(seeded_db):
    from backend.database import get_db
    from backend.auth import get_current_user, create_access_token
    from backend import models
    import sqlalchemy

    app.dependency_overrides[get_db] = override_get_db
    db = next(override_get_db())

    other_user = models.User(email="other@test.com", hashed_password="hash")
    db.add(other_user)
    db.commit()

    token = create_access_token(other_user.id)

    def override_auth():
        return other_user

    app.dependency_overrides[get_current_user] = override_auth
    client = TestClient(app)
    client.headers["Authorization"] = f"Bearer {token}"

    res = client.get("/trips/")
    assert res.status_code == 200
    assert res.json() == []

    db.close()
    app.dependency_overrides.clear()
