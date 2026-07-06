from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    set_refresh_cookie,
    clear_refresh_cookie,
)
from backend.seed_data import seed_demo_data, DEMO_EMAIL

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=schemas.AuthOut)
def signup(body: schemas.SignupIn, response: Response, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == body.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")
    user = models.User(email=body.email, hashed_password=hash_password(body.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    set_refresh_cookie(response, refresh_token)
    return {"access_token": access_token, "user": {"id": user.id, "email": user.email}}


@router.post("/login", response_model=schemas.AuthOut)
def login(body: schemas.LoginIn, response: Response, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == body.email).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    set_refresh_cookie(response, refresh_token)
    if body.email == DEMO_EMAIL:
        seed_demo_data(db, user.id)
    return {"access_token": access_token, "user": {"id": user.id, "email": user.email}}


@router.post("/refresh", response_model=schemas.RefreshOut)
def refresh(request: Request, response: Response, db: Session = Depends(get_db)):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")
    user = db.query(models.User).filter(models.User.id == int(payload["sub"])).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    access_token = create_access_token(user.id)
    new_refresh = create_refresh_token(user.id)
    set_refresh_cookie(response, new_refresh)
    return {"access_token": access_token}


@router.post("/logout")
def logout(response: Response):
    clear_refresh_cookie(response)
    return {"message": "Logged out"}
