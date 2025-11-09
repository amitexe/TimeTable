from typing import Dict, List, Any, Tuple
from sqlalchemy.orm import Session
import random
from ..models.course import Course
from ..models.class_model import Class
from ..models.faculty import Faculty
from ..models.lesson import Lesson
from ..models.classroom import Classroom

# Constants
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
PERIODS_PER_DAY = 8

class TimetableGenerator:
    def __init__(self, db: Session):
        self.db = db
        self.timetable = {}
        self.faculty_schedule = {}
        self.classroom_schedule = {}
        self.pending_lessons = []
        
    def generate(self) -> Dict[str, Any]:
        """Generate timetable for all classes"""
        # Load all data
        classes = self.db.query(Class).all()
        lessons = self.db.query(Lesson).all()
        courses = {c.id: c for c in self.db.query(Course).all()}
        faculties = {f.id: f for f in self.db.query(Faculty).all()}
        classrooms = self.db.query(Classroom).all()
        
        # Initialize timetable structure
        for cls in classes:
            class_name = f"{cls.name} {cls.division}" if cls.division else cls.name
            self.timetable[class_name] = {day: [None] * PERIODS_PER_DAY for day in DAYS}
            
        # Initialize faculty schedule
        for faculty in faculties.values():
            self.faculty_schedule[faculty.id] = {day: [False] * PERIODS_PER_DAY for day in DAYS}
            
        # Initialize classroom schedule
        for classroom in classrooms:
            self.classroom_schedule[classroom.id] = {day: [False] * PERIODS_PER_DAY for day in DAYS}
        
        # Sort lessons by priority (more periods_per_week = higher priority)
        sorted_lessons = sorted(lessons, key=lambda l: l.periods_per_week, reverse=True)
        
        # Place lessons
        for lesson in sorted_lessons:
            self._place_lesson(lesson, courses, faculties, classes)
        
        # Build response
        return self._build_response(courses, faculties)
    
    def _place_lesson(self, lesson: Lesson, courses: Dict, faculties: Dict, classes: List):
        """Try to place a lesson in the timetable"""
        course = courses.get(lesson.course_id)
        faculty = faculties.get(lesson.faculty_id)
        cls = next((c for c in classes if c.id == lesson.class_id), None)
        
        if not course or not faculty or not cls:
            return
        
        class_name = f"{cls.name} {cls.division}" if cls.division else cls.name
        placed_count = 0
        
        # Try to place periods_per_week instances of this lesson
        for _ in range(lesson.periods_per_week):
            slot = self._find_valid_slot(lesson, class_name, faculty, cls)
            if slot:
                day, period = slot
                self._assign_slot(class_name, day, period, lesson, course, faculty)
                placed_count += 1
            else:
                # Add to pending
                self.pending_lessons.append({
                    "lesson_id": lesson.id,
                    "course": course.title,
                    "class": class_name,
                    "faculty": f"{faculty.first_name} {faculty.last_name}",
                    "reason": "No valid slot found"
                })
        
    def _find_valid_slot(self, lesson: Lesson, class_name: str, faculty: Faculty, cls: Class) -> Tuple[str, int]:
        """Find a valid slot for a lesson"""
        # Get faculty constraints
        faculty_constraints = faculty.constraints or {}
        max_periods_per_day = faculty_constraints.get("max_periods_per_day", PERIODS_PER_DAY)
        time_off = faculty.time_off or []
        
        # Create list of all possible slots
        possible_slots = []
        for day in DAYS:
            for period in range(PERIODS_PER_DAY):
                if self._is_slot_valid(class_name, day, period, faculty, lesson, max_periods_per_day, time_off):
                    possible_slots.append((day, period))
        
        # Shuffle for randomization
        random.shuffle(possible_slots)
        
        # Return first valid slot, or None
        return possible_slots[0] if possible_slots else None
    
    def _is_slot_valid(self, class_name: str, day: str, period: int, faculty: Faculty, 
                       lesson: Lesson, max_periods_per_day: int, time_off: List) -> bool:
        """Check if a slot is valid for placement"""
        # Check if slot is already occupied in class timetable
        if self.timetable[class_name][day][period] is not None:
            return False
        
        # Check if faculty is available
        if self.faculty_schedule[faculty.id][day][period]:
            return False
        
        # Check faculty time off
        slot_key = f"{day}-{period}"
        if slot_key in time_off:
            return False
        
        # Check max periods per day for faculty
        faculty_periods_today = sum(self.faculty_schedule[faculty.id][day])
        if faculty_periods_today >= max_periods_per_day:
            return False
        
        # Check if same course already scheduled this day
        course_today = any(
            slot and slot.get("lesson_id") == lesson.id 
            for slot in self.timetable[class_name][day] 
            if slot
        )
        if course_today and lesson.duration == 1:
            return False
        
        return True
    
    def _assign_slot(self, class_name: str, day: str, period: int, lesson: Lesson, 
                     course: Course, faculty: Faculty):
        """Assign a lesson to a slot"""
        slot_data = {
            "lesson_id": lesson.id,
            "course_name": course.title,
            "course_abbr": course.abbreviation,
            "faculty_name": f"{faculty.first_name} {faculty.last_name}",
            "faculty_abbr": faculty.abbreviation,
            "classroom": "TBD",  # Can be enhanced with classroom allocation
            "color": course.color
        }
        
        self.timetable[class_name][day][period] = slot_data
        self.faculty_schedule[faculty.id][day][period] = True
    
    def _build_response(self, courses: Dict, faculties: Dict) -> Dict[str, Any]:
        """Build the final response"""
        # Convert None to empty string for frontend
        formatted_timetable = {}
        for class_name, schedule in self.timetable.items():
            formatted_timetable[class_name] = {
                day: [slot if slot else "" for slot in periods]
                for day, periods in schedule.items()
            }
        
        stats = {
            "total_classes": len(self.timetable),
            "total_lessons_placed": sum(
                sum(1 for slot in day_periods if slot)
                for schedule in self.timetable.values()
                for day_periods in schedule.values()
            ),
            "total_pending": len(self.pending_lessons)
        }
        
        return {
            "timetable": formatted_timetable,
            "pending": self.pending_lessons,
            "stats": stats
        }


def generate_timetable(db: Session) -> Dict[str, Any]:
    """Main function to generate timetable"""
    generator = TimetableGenerator(db)
    return generator.generate()
