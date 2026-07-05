def test_list_trips_empty(client):
    res = client.get("/trips/")
    assert res.status_code == 200
    assert res.json() == []


def test_list_trips_with_seeded_data(client, seeded_db):
    res = client.get("/trips/")
    assert res.status_code == 200
    data = res.json()
    assert len(data) == 1
    assert data[0]["name"] == "Test Trip"


def test_get_trip_returns_nested_days_and_items(client, seeded_db):
    res = client.get(f"/trips/{seeded_db['trip'].id}")
    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Test Trip"
    assert len(data["days"]) == 1
    assert len(data["days"][0]["items"]) == 1


def test_get_trip_404_for_missing_trip(client):
    res = client.get("/trips/9999")
    assert res.status_code == 404


def test_create_trip_returns_correct_fields(client):
    res = client.post("/trips/", json={"name": "New Trip", "start_date": "2026-08-01", "end_date": "2026-08-05"})
    assert res.status_code == 201
    data = res.json()
    assert data["name"] == "New Trip"
    assert data["start_date"] == "2026-08-01"
