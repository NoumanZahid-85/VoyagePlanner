from datetime import date, time, datetime
from pydantic import BaseModel


class SignupIn(BaseModel):
    email: str
    password: str


class LoginIn(BaseModel):
    email: str
    password: str


class AuthOut(BaseModel):
    access_token: str
    user: dict


class RefreshOut(BaseModel):
    access_token: str


class ItineraryItemBase(BaseModel):
    place_name: str
    latitude: float | None = None
    longitude: float | None = None
    scheduled_time: time | None = None
    note: str | None = None


class ItineraryItemIn(ItineraryItemBase):
    pass


class ItineraryItemUpdate(BaseModel):
    place_name: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    scheduled_time: time | None = None
    note: str | None = None
    order_index: int | None = None
    day_id: int | None = None


class ItineraryItemOut(ItineraryItemBase):
    id: int
    day_id: int
    order_index: int

    model_config = {"from_attributes": True}


class DayBase(BaseModel):
    date: date
    label: str | None = None


class DayIn(DayBase):
    pass


class DayOut(DayBase):
    id: int
    trip_id: int
    items: list[ItineraryItemOut] = []

    model_config = {"from_attributes": True}


class TripBase(BaseModel):
    name: str
    start_date: date
    end_date: date


class TripIn(TripBase):
    pass


class TripOut(TripBase):
    id: int
    owner_id: int
    days: list[DayOut] = []

    model_config = {"from_attributes": True}


class BookingBase(BaseModel):
    type: str = "other"
    name: str
    starts_at: datetime
    ends_at: datetime
    confirmation_number: str | None = None
    notes: str | None = None


class BookingIn(BookingBase):
    pass


class BookingUpdate(BaseModel):
    type: str | None = None
    name: str | None = None
    starts_at: datetime | None = None
    ends_at: datetime | None = None
    confirmation_number: str | None = None
    notes: str | None = None


class BookingOut(BookingBase):
    id: int
    trip_id: int

    model_config = {"from_attributes": True}
