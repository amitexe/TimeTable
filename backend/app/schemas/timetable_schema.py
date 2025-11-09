from pydantic import BaseModel
from typing import Dict, List, Any

class TimetableSlot(BaseModel):
    lesson_id: int
    course_name: str
    course_abbr: str
    faculty_name: str
    faculty_abbr: str
    classroom: str
    color: str

class TimetableGenerate(BaseModel):
    pass  # Can add filters/options later

class TimetableResponse(BaseModel):
    timetable: Dict[str, Dict[str, List[Any]]]  # {class_name: {day: [slots]}}
    pending: List[Dict[str, Any]]
    stats: Dict[str, Any]
