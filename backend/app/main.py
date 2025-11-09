from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import (
    course_router,
    class_router,
    faculty_router,
    lesson_router,
    classroom_router,
    timetable_router
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Timetable Generator API",
    description="Automatic timetable generation system",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(course_router.router)
app.include_router(class_router.router)
app.include_router(faculty_router.router)
app.include_router(lesson_router.router)
app.include_router(classroom_router.router)
app.include_router(timetable_router.router)

@app.get("/")
def root():
    return {
        "message": "Timetable Generator API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
