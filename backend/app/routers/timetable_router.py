from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.timetable_schema import TimetableResponse
from ..services.timetable_generator import generate_timetable

router = APIRouter(prefix="/timetable", tags=["timetable"])

@router.post("/generate", response_model=TimetableResponse)
def generate_timetable_endpoint(db: Session = Depends(get_db)):
    """Generate timetable for all classes"""
    result = generate_timetable(db)
    return result
