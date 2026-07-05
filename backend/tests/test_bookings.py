def test_list_bookings(client, seeded_db):
    res = client.get(f"/trips/{seeded_db['trip'].id}/bookings")
    assert res.status_code == 200
    assert len(res.json()) == 1


def test_list_bookings_404_for_missing_trip(client):
    res = client.get("/trips/9999/bookings")
    assert res.status_code == 404


def test_create_booking(client, seeded_db):
    res = client.post(
        f"/trips/{seeded_db['trip'].id}/bookings",
        json={
            "type": "hotel",
            "name": "Test Hotel",
            "starts_at": "2026-07-10T15:00:00",
            "ends_at": "2026-07-14T11:00:00",
        },
    )
    assert res.status_code == 201
    assert res.json()["name"] == "Test Hotel"


def test_create_booking_404_for_missing_trip(client):
    res = client.post(
        "/trips/9999/bookings",
        json={
            "type": "hotel",
            "name": "Test Hotel",
            "starts_at": "2026-07-10T15:00:00",
            "ends_at": "2026-07-14T11:00:00",
        },
    )
    assert res.status_code == 404


def test_update_booking(client, seeded_db):
    res = client.patch(f"/bookings/{seeded_db['booking'].id}", json={"confirmation_number": "ABC123"})
    assert res.status_code == 200
    assert res.json()["confirmation_number"] == "ABC123"


def test_update_booking_404(client):
    res = client.patch("/bookings/9999", json={"name": "New Name"})
    assert res.status_code == 404


def test_delete_booking(client, seeded_db):
    res = client.delete(f"/bookings/{seeded_db['booking'].id}")
    assert res.status_code == 204


def test_delete_booking_404(client):
    res = client.delete("/bookings/9999")
    assert res.status_code == 404
