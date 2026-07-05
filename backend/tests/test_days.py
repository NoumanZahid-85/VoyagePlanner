def test_create_day(client, seeded_db):
    res = client.post(f"/trips/{seeded_db['trip'].id}/days", json={"date": "2026-07-11"})
    assert res.status_code == 201
    data = res.json()
    assert data["date"] == "2026-07-11"


def test_create_day_404_for_missing_trip(client):
    res = client.post("/trips/9999/days", json={"date": "2026-07-11"})
    assert res.status_code == 404
