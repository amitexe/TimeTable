from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.classroom import Classroom
from ..schemas.classroom_schema import Classroom as ClassroomSchema, ClassroomCreate, ClassroomUpdate

router = APIRouter(prefix="/classrooms", tags=["classrooms"])

@router.get("/", response_model=List[ClassroomSchema])
def get_classrooms(db: Session = Depends(get_db)):
    return db.query(Classroom).all()

@router.get("/{classroom_id}", response_model=ClassroomSchema)
def get_classroom(classroom_id: int, db: Session = Depends(get_db)):
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return classroom

@router.post("/", response_model=ClassroomSchema)
def create_classroom(classroom: ClassroomCreate, db: Session = Depends(get_db)):
    db_classroom = Classroom(**classroom.dict())
    db.add(db_classroom)
    db.commit()
    db.refresh(db_classroom)
    return db_classroom

@router.put("/{classroom_id}", response_model=ClassroomSchema)
def update_classroom(classroom_id: int, classroom: ClassroomUpdate, db: Session = Depends(get_db)):
    db_classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not db_classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    
    update_data = classroom.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_classroom, key, value)
    
    db.commit()
    db.refresh(db_classroom)
    return db_classroom

@router.delete("/{classroom_id}")
def delete_classroom(classroom_id: int, db: Session = Depends(get_db)):
    db_classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not db_classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    
    db.delete(db_classroom)
    db.commit()
    return {"message": "Classroom deleted successfully"}
