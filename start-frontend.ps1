# Start Frontend Server

Write-Host "🚀 Starting Timetable Generator Frontend..." -ForegroundColor Cyan
Write-Host ""

Set-Location frontend

Write-Host "Starting Vite dev server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Frontend will be available at:" -ForegroundColor Green
Write-Host "  → http://localhost:5173" -ForegroundColor Cyan
Write-Host ""

npm run dev
