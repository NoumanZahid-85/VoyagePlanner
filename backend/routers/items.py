from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.auth import get_current_user

router = APIRouter(tags=["items"])


@router.post("/days/{day_id}/items", response_model=schemas.ItineraryItemOut, status_code=201)
def create_item(
    day_id: int,
    body: schemas.ItineraryItemIn,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    day = (
        db.query(models.Day)
        .join(models.Trip)
        .filter(models.Day.id == day_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    max_order = (
        db.query(models.ItineraryItem)
        .filter(models.ItineraryItem.day_id == day_id)
        .count()
    )
    item = models.ItineraryItem(
        day_id=day_id,
        place_name=body.place_name,
        latitude=body.latitude,
        longitude=body.longitude,
        scheduled_time=body.scheduled_time,
        note=body.note,
        order_index=max_order,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/items/{item_id}", response_model=schemas.ItineraryItemOut)
def update_item(
    item_id: int,
    body: schemas.ItineraryItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = (
        db.query(models.ItineraryItem)
        .join(models.Day)
        .join(models.Trip)
        .filter(models.ItineraryItem.id == item_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    update_data = body.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/items/{item_id}", status_code=204)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = (
        db.query(models.ItineraryItem)
        .join(models.Day)
        .join(models.Trip)
        .filter(models.ItineraryItem.id == item_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
