"""Seed script to populate the database with sample data"""
import requests
import json

BASE_URL = "http://localhost:8000"

def seed_data():
    # Seed Courses
    courses = [
        {"title": "Mathematics", "abbreviation": "MATH", "color": "#3B82F6"},
        {"title": "Science", "abbreviation": "SCI", "color": "#10B981"},
        {"title": "English", "abbreviation": "ENG", "color": "#F59E0B"},
        {"title": "History", "abbreviation": "HIST", "color": "#EF4444"},
        {"title": "Physical Education", "abbreviation": "PE", "color": "#8B5CF6"},
        {"title": "Computer Science", "abbreviation": "CS", "color": "#06B6D4"},
        {"title": "Art", "abbreviation": "ART", "color": "#EC4899"},
    ]
    
    print("Creating courses...")
    for course in courses:
        response = requests.post(f"{BASE_URL}/courses/", json=course)
        print(f"Created: {course['title']} - Status: {response.status_code}")
    
    # Seed Classes
    classes = [
        {"name": "Grade 10", "division": "A", "batch_count": 1},
        {"name": "Grade 10", "division": "B", "batch_count": 1},
        {"name": "Grade 9", "division": "A", "batch_count": 1},
    ]
    
    print("\nCreating classes...")
    for cls in classes:
        response = requests.post(f"{BASE_URL}/classes/", json=cls)
        print(f"Created: {cls['name']} {cls['division']} - Status: {response.status_code}")
    
    # Seed Faculties
    faculties = [
        {
            "first_name": "John",
            "last_name": "Smith",
            "abbreviation": "JS",
            "email": "john.smith@school.com",
            "title": "Mr.",
            "constraints": {"max_periods_per_day": 6},
        },
        {
            "first_name": "Sarah",
            "last_name": "Johnson",
            "abbreviation": "SJ",
            "email": "sarah.johnson@school.com",
            "title": "Ms.",
            "constraints": {"max_periods_per_day": 6},
        },
        {
            "first_name": "Michael",
            "last_name": "Brown",
            "abbreviation": "MB",
            "email": "michael.brown@school.com",
            "title": "Mr.",
            "constraints": {"max_periods_per_day": 5},
        },
        {
            "first_name": "Emily",
            "last_name": "Davis",
            "abbreviation": "ED",
            "email": "emily.davis@school.com",
            "title": "Ms.",
            "constraints": {"max_periods_per_day": 6},
        },
    ]
    
    print("\nCreating faculties...")
    for faculty in faculties:
        response = requests.post(f"{BASE_URL}/faculties/", json=faculty)
        print(f"Created: {faculty['first_name']} {faculty['last_name']} - Status: {response.status_code}")
    
    # Seed Classrooms
    classrooms = [
        {"name": "Room 101", "abbreviation": "R101", "is_homeroom": True},
        {"name": "Room 102", "abbreviation": "R102", "is_homeroom": True},
        {"name": "Science Lab", "abbreviation": "LAB", "is_homeroom": False},
        {"name": "Computer Lab", "abbreviation": "CLAB", "is_homeroom": False},
    ]
    
    print("\nCreating classrooms...")
    for classroom in classrooms:
        response = requests.post(f"{BASE_URL}/classrooms/", json=classroom)
        print(f"Created: {classroom['name']} - Status: {response.status_code}")
    
    # Seed Lessons (linking courses, classes, and faculties)
    lessons = [
        # Grade 10 A
        {"course_id": 1, "class_id": 1, "faculty_id": 1, "periods_per_week": 5},  # Math
        {"course_id": 2, "class_id": 1, "faculty_id": 2, "periods_per_week": 4},  # Science
        {"course_id": 3, "class_id": 1, "faculty_id": 3, "periods_per_week": 4},  # English
        {"course_id": 4, "class_id": 1, "faculty_id": 4, "periods_per_week": 3},  # History
        {"course_id": 5, "class_id": 1, "faculty_id": 1, "periods_per_week": 2},  # PE
        
        # Grade 10 B
        {"course_id": 1, "class_id": 2, "faculty_id": 1, "periods_per_week": 5},  # Math
        {"course_id": 2, "class_id": 2, "faculty_id": 2, "periods_per_week": 4},  # Science
        {"course_id": 3, "class_id": 2, "faculty_id": 3, "periods_per_week": 4},  # English
        {"course_id": 4, "class_id": 2, "faculty_id": 4, "periods_per_week": 3},  # History
        
        # Grade 9 A
        {"course_id": 1, "class_id": 3, "faculty_id": 2, "periods_per_week": 5},  # Math
        {"course_id": 2, "class_id": 3, "faculty_id": 3, "periods_per_week": 4},  # Science
        {"course_id": 3, "class_id": 3, "faculty_id": 4, "periods_per_week": 4},  # English
    ]
    
    print("\nCreating lessons...")
    for lesson in lessons:
        response = requests.post(f"{BASE_URL}/lessons/", json=lesson)
        print(f"Created lesson - Status: {response.status_code}")
    
    print("\n✅ Seed data created successfully!")
    print(f"\nYou can now:")
    print(f"1. View API docs at: {BASE_URL}/docs")
    print(f"2. Generate timetable by POST to: {BASE_URL}/timetable/generate")

if __name__ == "__main__":
    print("🌱 Seeding database with sample data...\n")
    print("⚠️  Make sure the backend server is running on http://localhost:8000\n")
    
    try:
        # Test connection
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            seed_data()
        else:
            print("❌ Backend server is not responding correctly")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Make sure the backend server is running!")
