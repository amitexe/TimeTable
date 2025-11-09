from pydantic import BaseModel
from typing import List, Optional

class CourseBase(BaseModel):
    title: str
    abbreviation: str
    color: Optional[str] = "#3B82F6"
    available_slots: Optional[List[str]] = []

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    abbreviation: Optional[str] = None
    color: Optional[str] = None
    available_slots: Optional[List[str]] = None

class Course(CourseBase):
    id: int

    class Config:
        from_attributes = True
