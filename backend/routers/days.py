from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.auth import get_current_user

router = APIRouter(tags=["days"])


@router.post("/trips/{trip_id}/days", response_model=schemas.DayOut, status_code=201)
def create_day(
    trip_id: int,
    body: schemas.DayIn,
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
    day = models.Day(trip_id=trip_id, date=body.date, label=body.label)
    db.add(day)
    db.commit()
    db.refresh(day)
    return day
