from sqlalchemy import Column, Integer, String, JSON
from ..database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    abbreviation = Column(String, nullable=False)
    color = Column(String, default="#3B82F6")
    available_slots = Column(JSON, default=list)  # List of available time slots
