from pydantic import BaseModel
from typing import List, Optional, Dict

class LessonBase(BaseModel):
    course_id: int
    class_id: int
    group: Optional[str] = None
    faculty_id: int
    periods_per_week: Optional[int] = 1
    duration: Optional[int] = 1
    shared_faculty_ids: Optional[List[int]] = []
    classroom_type: Optional[str] = "regular"
    constraints: Optional[Dict] = {}

class LessonCreate(LessonBase):
    pass

class LessonUpdate(BaseModel):
    course_id: Optional[int] = None
    class_id: Optional[int] = None
    group: Optional[str] = None
    faculty_id: Optional[int] = None
    periods_per_week: Optional[int] = None
    duration: Optional[int] = None
    shared_faculty_ids: Optional[List[int]] = None
    classroom_type: Optional[str] = None
    constraints: Optional[Dict] = None

class Lesson(LessonBase):
    id: int

    class Config:
        from_attributes = True
