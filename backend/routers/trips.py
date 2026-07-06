from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from backend.database import get_db
from backend import models, schemas
from backend.auth import get_current_user

router = APIRouter(prefix="/trips", tags=["trips"])


@router.get("", response_model=list[schemas.TripOut])
def list_trips(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    trips = (
        db.query(models.Trip)
        .options(joinedload(models.Trip.days).joinedload(models.Day.items))
        .filter(models.Trip.owner_id == current_user.id)
        .all()
    )
    return trips


@router.post("", response_model=schemas.TripOut, status_code=201)
def create_trip(
    body: schemas.TripIn,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    trip = models.Trip(
        owner_id=current_user.id,
        name=body.name,
        start_date=body.start_date,
        end_date=body.end_date,
    )
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip


@router.get("/{trip_id}", response_model=schemas.TripOut)
def get_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    trip = (
        db.query(models.Trip)
        .options(joinedload(models.Trip.days).joinedload(models.Day.items))
        .filter(models.Trip.id == trip_id, models.Trip.owner_id == current_user.id)
        .first()
    )
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip
