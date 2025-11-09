from sqlalchemy import Column, Integer, String, Boolean, JSON
from ..database import Base

class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    abbreviation = Column(String, nullable=False)
    color = Column(String, default="#10B981")
    is_homeroom = Column(Boolean, default=False)
    is_shared = Column(Boolean, default=True)
    requires_supervision = Column(Boolean, default=False)
    availability = Column(JSON, default=dict)  # Availability per day/period
