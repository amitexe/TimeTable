from pydantic import BaseModel
from typing import Optional, Dict

class ClassroomBase(BaseModel):
    name: str
    abbreviation: str
    color: Optional[str] = "#10B981"
    is_homeroom: Optional[bool] = False
    is_shared: Optional[bool] = True
    requires_supervision: Optional[bool] = False
    availability: Optional[Dict] = {}

class ClassroomCreate(ClassroomBase):
    pass

class ClassroomUpdate(BaseModel):
    name: Optional[str] = None
    abbreviation: Optional[str] = None
    color: Optional[str] = None
    is_homeroom: Optional[bool] = None
    is_shared: Optional[bool] = None
    requires_supervision: Optional[bool] = None
    availability: Optional[Dict] = None

class Classroom(ClassroomBase):
    id: int

    class Config:
        from_attributes = True
