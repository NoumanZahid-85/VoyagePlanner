def test_create_item(client, seeded_db):
    res = client.post(f"/days/{seeded_db['day'].id}/items", json={"place_name": "New Place"})
    assert res.status_code == 201
    data = res.json()
    assert data["place_name"] == "New Place"
    assert data["order_index"] == 1


def test_create_item_404_for_missing_day(client):
    res = client.post("/days/9999/items", json={"place_name": "New Place"})
    assert res.status_code == 404


def test_update_item_reorder(client, seeded_db):
    res = client.patch(f"/items/{seeded_db['item'].id}", json={"order_index": 5})
    assert res.status_code == 200
    assert res.json()["order_index"] == 5


def test_update_item_move_to_another_day(client, seeded_db):
    from backend.tests.conftest import override_get_db
    from backend.database import get_db
    from backend import models
    db = next(override_get_db())
    new_day = models.Day(trip_id=seeded_db["trip"].id, date="2026-07-12")
    db.add(new_day)
    db.commit()
    db.close()

    res = client.patch(f"/items/{seeded_db['item'].id}", json={"day_id": new_day.id, "order_index": 0})
    assert res.status_code == 200
    assert res.json()["day_id"] == new_day.id


def test_update_item_404_for_missing_item(client):
    res = client.patch("/items/9999", json={"order_index": 0})
    assert res.status_code == 404


def test_delete_item(client, seeded_db):
    res = client.delete(f"/items/{seeded_db['item'].id}")
    assert res.status_code == 204


def test_delete_item_404(client):
    res = client.delete("/items/9999")
    assert res.status_code == 404
