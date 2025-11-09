from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict

class FacultyBase(BaseModel):
    first_name: str
    last_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    abbreviation: str
    title: Optional[str] = "Mr."
    gender: Optional[str] = "Male"
    is_class_teacher: Optional[bool] = False
    color: Optional[str] = "#8B5CF6"
    constraints: Optional[Dict] = {}
    time_off: Optional[List[str]] = []

class FacultyCreate(FacultyBase):
    pass

class FacultyUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    abbreviation: Optional[str] = None
    title: Optional[str] = None
    gender: Optional[str] = None
    is_class_teacher: Optional[bool] = None
    color: Optional[str] = None
    constraints: Optional[Dict] = None
    time_off: Optional[List[str]] = None

class Faculty(FacultyBase):
    id: int

    class Config:
        from_attributes = True
