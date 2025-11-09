from pydantic import BaseModel
from typing import List, Optional, Dict

class ClassBase(BaseModel):
    name: str
    division: Optional[str] = None
    batch_count: Optional[int] = 1
    restrictions: Optional[Dict] = {}
    available_slots: Optional[List[str]] = []

class ClassCreate(ClassBase):
    pass

class ClassUpdate(BaseModel):
    name: Optional[str] = None
    division: Optional[str] = None
    batch_count: Optional[int] = None
    restrictions: Optional[Dict] = None
    available_slots: Optional[List[str]] = None

class Class(ClassBase):
    id: int

    class Config:
        from_attributes = True
