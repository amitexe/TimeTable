# Timetable Generator

A complete web-based automatic timetable generation system with React + TypeScript frontend and FastAPI backend.

## 🚀 Features

- **Course Management**: Create and manage courses with colors and abbreviations
- **Class Management**: Define classes with divisions and batch counts
- **Faculty Management**: Add faculty members with constraints (max periods per day, time off, etc.)
- **Lesson Management**: Link courses, classes, and faculties to create lessons
- **Classroom Management**: Define classrooms with properties (homeroom, shared, etc.)
- **Automatic Timetable Generation**: Generate conflict-free timetables based on constraints
- **Visual Timetable Display**: Color-coded grid view of generated timetables
- **Pending Lessons**: Track lessons that couldn't be placed due to constraints

## 📋 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- React Router (navigation)
- TanStack React Query (data fetching)
- Zustand (state management)
- Axios (API calls)
- Lucide React (icons)

### Backend
- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- SQLite (database)
- Pydantic (data validation)
- Custom constraint-based scheduling algorithm

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```powershell
cd backend
```

2. Create virtual environment:
```powershell
python -m venv venv
.\venv\Scripts\activate
```

3. Install dependencies:
```powershell
pip install -r requirements.txt
```

4. Start the backend server:
```powershell
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📊 Seeding Sample Data

To quickly test the system with sample data:

1. Make sure the backend server is running
2. Run the seed script:
```powershell
cd backend
python seed_data.py
```

This will create:
- 7 courses (Math, Science, English, etc.)
- 3 classes (Grade 10 A, Grade 10 B, Grade 9 A)
- 4 faculty members
- 4 classrooms
- Multiple lessons linking them together

## 📖 Usage Guide

### Step-by-Step Workflow

1. **Add Courses**: Go to Courses page and add your subjects
2. **Create Classes**: Define your classes in the Classes page
3. **Add Faculties**: Add teachers with their constraints
4. **Define Classrooms**: Create classrooms if needed
5. **Create Lessons**: Link courses, classes, and faculties in the Lessons page
6. **Generate Timetable**: Go to Timetable page and click "Generate Timetable"

### API Endpoints

#### Courses
- `GET /courses/` - Get all courses
- `POST /courses/` - Create new course
- `PUT /courses/{id}` - Update course
- `DELETE /courses/{id}` - Delete course

#### Classes
- `GET /classes/` - Get all classes
- `POST /classes/` - Create new class
- `PUT /classes/{id}` - Update class
- `DELETE /classes/{id}` - Delete class

#### Faculties
- `GET /faculties/` - Get all faculties
- `POST /faculties/` - Create new faculty
- `PUT /faculties/{id}` - Update faculty
- `DELETE /faculties/{id}` - Delete faculty

#### Lessons
- `GET /lessons/` - Get all lessons
- `POST /lessons/` - Create new lesson
- `PUT /lessons/{id}` - Update lesson
- `DELETE /lessons/{id}` - Delete lesson

#### Classrooms
- `GET /classrooms/` - Get all classrooms
- `POST /classrooms/` - Create new classroom
- `PUT /classrooms/{id}` - Update classroom
- `DELETE /classrooms/{id}` - Delete classroom

#### Timetable
- `POST /timetable/generate` - Generate timetable

## 🧮 Timetable Generation Algorithm

The algorithm uses a constraint-based approach:

1. **Initialization**: Creates empty timetable grids for all classes
2. **Priority Sorting**: Sorts lessons by periods_per_week (higher first)
3. **Slot Finding**: For each lesson period, finds valid slots that satisfy:
   - Class availability
   - Faculty availability
   - Faculty max periods per day constraint
   - No same course twice in a day (unless multi-period lesson)
   - Faculty time-off restrictions
4. **Placement**: Assigns lessons to valid slots with randomization for variety
5. **Pending Tracking**: Lessons that can't be placed are added to pending list

## 🎨 UI Features

- **Color-coded Cards**: Each entity (course, faculty, etc.) has a customizable color
- **Responsive Grid Layout**: Works on desktop and tablet screens
- **Modal Forms**: Clean popup forms for creating/editing entries
- **Stats Dashboard**: Overview of all entities at a glance
- **Visual Timetable Grid**: Period-by-day grid with color-coded lesson blocks
- **Pending Lessons Alert**: Highlights lessons that couldn't be scheduled

## 🔧 Configuration

### Backend Configuration
- Database: SQLite (configurable in `backend/app/database.py`)
- CORS: Enabled for all origins (configure in `backend/app/main.py`)
- Port: 8000 (default FastAPI port)

### Frontend Configuration
- API URL: `http://localhost:8000` (configurable via VITE_API_URL env var)
- Port: 5173 (default Vite port)

## 📝 Development Notes

### Backend Structure
```
backend/
├── app/
│   ├── main.py              # FastAPI app & routes
│   ├── database.py          # Database configuration
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── routers/             # API route handlers
│   └── services/            # Business logic (timetable generator)
├── requirements.txt
└── seed_data.py
```

### Frontend Structure
```
frontend/
├── src/
│   ├── pages/              # Page components
│   ├── components/         # Reusable components
│   ├── services/           # API client
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── package.json
└── vite.config.ts
```

## 🐛 Troubleshooting

### Backend Issues
- **Module not found**: Ensure virtual environment is activated and dependencies installed
- **Database locked**: Close any other connections to the SQLite database
- **CORS errors**: Check CORS middleware configuration in `main.py`

### Frontend Issues
- **Can't connect to API**: Ensure backend is running on port 8000
- **Module not found**: Run `npm install` to install dependencies
- **Build errors**: Clear node_modules and reinstall with `npm install`

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

This is a prototype system. Enhancements can include:
- Advanced constraint resolution
- Drag-and-drop timetable editing
- Export to PDF/Excel
- Multi-week timetables
- Teacher workload balancing
- Room capacity constraints
- Break time management

## 📞 Support

For issues or questions, please check the API documentation at `/docs` endpoint.
