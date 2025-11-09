# Timetable Generator Backend

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## API Endpoints

- **Courses**: `/courses` (GET, POST, PUT, DELETE)
- **Classes**: `/classes` (GET, POST, PUT, DELETE)
- **Faculties**: `/faculties` (GET, POST, PUT, DELETE)
- **Lessons**: `/lessons` (GET, POST, PUT, DELETE)
- **Classrooms**: `/classrooms` (GET, POST, PUT, DELETE)
- **Timetable**: `/timetable/generate` (POST)
