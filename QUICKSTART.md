# 🚀 Quick Start Guide - Timetable Generator

## 📦 Installation (One-Time Setup)

### Option 1: Automated Setup (Recommended)
Run the setup script from the project root:

```powershell
.\SETUP.ps1
```

This will automatically:
- Create Python virtual environment
- Install all backend dependencies
- Install all frontend dependencies

### Option 2: Manual Setup

#### Backend Setup
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

#### Frontend Setup
```powershell
cd frontend
npm install
```

---

## ▶️ Running the Application

### You need TWO terminals running simultaneously:

#### Terminal 1: Backend Server
```powershell
# From project root
.\start-backend.ps1

# OR manually:
cd backend
.\venv\Scripts\activate
uvicorn app.main:app --reload
```

✅ Backend runs on: **http://localhost:8000**
📚 API Docs available at: **http://localhost:8000/docs**

#### Terminal 2: Frontend Server
```powershell
# From project root
.\start-frontend.ps1

# OR manually:
cd frontend
npm run dev
```

✅ Frontend runs on: **http://localhost:5173**

---

## 🌱 Seeding Sample Data (Optional but Recommended)

After starting the backend, in a third terminal:

```powershell
cd backend
python seed_data.py
```

This creates:
- ✅ 7 Courses (Math, Science, English, History, PE, Computer Science, Art)
- ✅ 3 Classes (Grade 10 A, Grade 10 B, Grade 9 A)
- ✅ 4 Faculty Members
- ✅ 4 Classrooms
- ✅ 12+ Lessons

---

## 🎯 How to Use the Application

### Step 1: Access the Dashboard
Open **http://localhost:5173** in your browser

### Step 2: Add Your Data (or use seed data)

1. **Courses** → Click "Add Course"
   - Example: Mathematics, abbreviation: MATH, pick a color

2. **Classes** → Click "Add Class"
   - Example: Grade 10, Division: A

3. **Faculties** → Click "Add Faculty"
   - Example: John Smith, abbreviation: JS
   - Set max periods per day (e.g., 6)

4. **Classrooms** → Click "Add Classroom"
   - Example: Room 101, abbreviation: R101

5. **Lessons** → Click "Add Lesson"
   - Select: Course, Class, Faculty
   - Set: Periods per week (e.g., 5 for Math)
   - Set: Duration (1 = single period, 2 = double period)

### Step 3: Generate Timetable
1. Go to **Timetable** page
2. Click **"Generate Timetable"** button
3. View the generated schedules for each class
4. Check "Pending Lessons" section for any unscheduled lessons

---

## 📊 Project Structure

```
timetable2/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI app entry point
│   │   ├── database.py     # Database configuration
│   │   ├── models/         # SQLAlchemy models
│   │   ├── routers/        # API endpoints
│   │   ├── schemas/        # Pydantic validation schemas
│   │   └── services/       # Timetable generation logic
│   ├── requirements.txt    # Python dependencies
│   └── seed_data.py        # Sample data generator
│
├── frontend/               # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/         # Main page components
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API client
│   │   └── App.tsx        # Main app component
│   ├── package.json       # Node.js dependencies
│   └── vite.config.ts     # Vite configuration
│
├── SETUP.ps1              # Automated setup script
├── start-backend.ps1      # Start backend script
├── start-frontend.ps1     # Start frontend script
└── README.md              # This file
```

---

## 🔧 API Endpoints Reference

### Courses
- `GET /courses/` - List all courses
- `POST /courses/` - Create new course
- `PUT /courses/{id}` - Update course
- `DELETE /courses/{id}` - Delete course

### Classes
- `GET /classes/` - List all classes
- `POST /classes/` - Create new class
- `PUT /classes/{id}` - Update class
- `DELETE /classes/{id}` - Delete class

### Faculties
- `GET /faculties/` - List all faculties
- `POST /faculties/` - Create new faculty
- `PUT /faculties/{id}` - Update faculty
- `DELETE /faculties/{id}` - Delete faculty

### Lessons
- `GET /lessons/` - List all lessons
- `POST /lessons/` - Create new lesson
- `PUT /lessons/{id}` - Update lesson
- `DELETE /lessons/{id}` - Delete lesson

### Classrooms
- `GET /classrooms/` - List all classrooms
- `POST /classrooms/` - Create new classroom
- `PUT /classrooms/{id}` - Update classroom
- `DELETE /classrooms/{id}` - Delete classroom

### Timetable
- `POST /timetable/generate` - Generate timetable

---

## 🐛 Troubleshooting

### Backend won't start
```powershell
# Make sure virtual environment is activated
cd backend
.\venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend won't start
```powershell
# Clear node_modules and reinstall
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### "Module not found" errors
- **Backend**: Activate virtual environment first
- **Frontend**: Run `npm install` in frontend directory

### Can't generate timetable
- Make sure you have at least:
  - 1 Course
  - 1 Class
  - 1 Faculty
  - 1 Lesson (linking all three above)

### Port already in use
- Backend (8000): Stop any other process using port 8000
- Frontend (5173): Stop any other Vite dev server

---

## 🎨 Features Showcase

### Dashboard
- Overview cards showing total counts
- Quick start guide
- Navigation to all modules

### Course Management
- Color-coded course cards
- Create/Edit/Delete functionality
- Abbreviation support for timetable display

### Class Management
- Support for divisions (A, B, C, etc.)
- Batch count for lab groups
- Restriction settings

### Faculty Management
- Faculty profiles with contact info
- Color coding for visual identification
- Constraint settings (max periods/day, time off)

### Lesson Management
- Link courses to classes and faculties
- Set frequency (periods per week)
- Support for double/triple period lessons

### Timetable Generation
- Automatic conflict resolution
- Color-coded visual grid
- Pending lessons tracking
- Statistics dashboard

---

## 📈 Next Steps / Enhancements

Possible improvements:
- [ ] Export timetable to PDF/Excel
- [ ] Drag-and-drop manual adjustments
- [ ] Multiple timetable versions
- [ ] Teacher workload analysis
- [ ] Room capacity constraints
- [ ] Break time management
- [ ] Multi-week rotation schedules
- [ ] Conflict highlighting
- [ ] Undo/Redo functionality
- [ ] User authentication

---

## 💡 Tips

1. **Use Seed Data First**: Start with seed data to understand the system
2. **Color Code Everything**: Use distinct colors for better visual clarity
3. **Faculty Constraints**: Set realistic max periods per day
4. **Start Small**: Begin with 2-3 classes before scaling up
5. **Check Pending**: Always review pending lessons to resolve conflicts

---

## 📞 Support

- Check API documentation: http://localhost:8000/docs
- Review console logs for errors
- Ensure both backend and frontend are running

---

**Happy Scheduling! 🎓**
