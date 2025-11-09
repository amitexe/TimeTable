from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from ..database import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    class_id = Column(Integer, ForeignKey("classes.id"), nullable=False)
    group = Column(String, nullable=True)  # For batch groups
    faculty_id = Column(Integer, ForeignKey("faculties.id"), nullable=False)
    periods_per_week = Column(Integer, default=1)
    duration = Column(Integer, default=1)  # Duration in consecutive periods
    shared_faculty_ids = Column(JSON, default=list)  # For co-teaching
    classroom_type = Column(String, default="regular")  # regular, lab, sports, etc.
    constraints = Column(JSON, default=dict)  # Additional constraints
