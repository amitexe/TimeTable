from sqlalchemy import Column, Integer, String, Boolean, JSON
from ..database import Base

class Faculty(Base):
    __tablename__ = "faculties"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    phone = Column(String, nullable=True)
    abbreviation = Column(String, nullable=False)
    title = Column(String, default="Mr.")
    gender = Column(String, default="Male")
    is_class_teacher = Column(Boolean, default=False)
    color = Column(String, default="#8B5CF6")
    constraints = Column(JSON, default=dict)  # max_days, max_periods_per_day, etc.
    time_off = Column(JSON, default=list)  # List of unavailable slots
