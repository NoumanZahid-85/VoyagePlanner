from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.auth import get_current_user

router = APIRouter(tags=["bookings"])


@router.get("/trips/{trip_id}/bookings", response_model=list[schemas.BookingOut])
def list_bookings(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    trip = (
        db.query(models.Trip)
        .filter(models.Trip.id == trip_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return (
        db.query(models.Booking)
        .filter(models.Booking.trip_id == trip_id)
        .all()
    )


@router.post("/trips/{trip_id}/bookings", response_model=schemas.BookingOut, status_code=201)
def create_booking(
    trip_id: int,
    body: schemas.BookingIn,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    trip = (
        db.query(models.Trip)
        .filter(models.Trip.id == trip_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    booking = models.Booking(
        trip_id=trip_id,
        type=body.type,
        name=body.name,
        starts_at=body.starts_at,
        ends_at=body.ends_at,
        confirmation_number=body.confirmation_number,
        notes=body.notes,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.patch("/bookings/{booking_id}", response_model=schemas.BookingOut)
def update_booking(
    booking_id: int,
    body: schemas.BookingUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    booking = (
        db.query(models.Booking)
        .join(models.Trip)
        .filter(models.Booking.id == booking_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    update_data = body.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(booking, key, value)
    db.commit()
    db.refresh(booking)
    return booking


@router.delete("/bookings/{booking_id}", status_code=204)
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    booking = (
        db.query(models.Booking)
        .join(models.Trip)
        .filter(models.Booking.id == booking_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
