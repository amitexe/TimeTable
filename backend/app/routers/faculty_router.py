from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.faculty import Faculty
from ..schemas.faculty_schema import Faculty as FacultySchema, FacultyCreate, FacultyUpdate

router = APIRouter(prefix="/faculties", tags=["faculties"])

@router.get("/", response_model=List[FacultySchema])
def get_faculties(db: Session = Depends(get_db)):
    return db.query(Faculty).all()

@router.get("/{faculty_id}", response_model=FacultySchema)
def get_faculty(faculty_id: int, db: Session = Depends(get_db)):
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return faculty

@router.post("/", response_model=FacultySchema)
def create_faculty(faculty: FacultyCreate, db: Session = Depends(get_db)):
    db_faculty = Faculty(**faculty.dict())
    db.add(db_faculty)
    db.commit()
    db.refresh(db_faculty)
    return db_faculty

@router.put("/{faculty_id}", response_model=FacultySchema)
def update_faculty(faculty_id: int, faculty: FacultyUpdate, db: Session = Depends(get_db)):
    db_faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not db_faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    
    update_data = faculty.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_faculty, key, value)
    
    db.commit()
    db.refresh(db_faculty)
    return db_faculty

@router.delete("/{faculty_id}")
def delete_faculty(faculty_id: int, db: Session = Depends(get_db)):
    db_faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not db_faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    
    db.delete(db_faculty)
    db.commit()
    return {"message": "Faculty deleted successfully"}
