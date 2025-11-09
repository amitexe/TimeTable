from sqlalchemy import Column, Integer, String, JSON
from ..database import Base

class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    division = Column(String, nullable=True)
    batch_count = Column(Integer, default=1)
    restrictions = Column(JSON, default=dict)  # Custom restrictions
    available_slots = Column(JSON, default=list)  # Available time slots
