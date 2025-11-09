from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.class_model import Class
from ..schemas.class_schema import Class as ClassSchema, ClassCreate, ClassUpdate

router = APIRouter(prefix="/classes", tags=["classes"])

@router.get("/", response_model=List[ClassSchema])
def get_classes(db: Session = Depends(get_db)):
    return db.query(Class).all()

@router.get("/{class_id}", response_model=ClassSchema)
def get_class(class_id: int, db: Session = Depends(get_db)):
    cls = db.query(Class).filter(Class.id == class_id).first()
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    return cls

@router.post("/", response_model=ClassSchema)
def create_class(cls: ClassCreate, db: Session = Depends(get_db)):
    db_class = Class(**cls.dict())
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class

@router.put("/{class_id}", response_model=ClassSchema)
def update_class(class_id: int, cls: ClassUpdate, db: Session = Depends(get_db)):
    db_class = db.query(Class).filter(Class.id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")
    
    update_data = cls.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_class, key, value)
    
    db.commit()
    db.refresh(db_class)
    return db_class

@router.delete("/{class_id}")
def delete_class(class_id: int, db: Session = Depends(get_db)):
    db_class = db.query(Class).filter(Class.id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")
    
    db.delete(db_class)
    db.commit()
    return {"message": "Class deleted successfully"}
