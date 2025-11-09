# Start Backend Server

Write-Host "🚀 Starting Timetable Generator Backend..." -ForegroundColor Cyan
Write-Host ""

Set-Location backend

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Start server
Write-Host "Starting FastAPI server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "API will be available at:" -ForegroundColor Green
Write-Host "  → http://localhost:8000" -ForegroundColor Cyan
Write-Host "  → API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""

uvicorn app.main:app --reload
