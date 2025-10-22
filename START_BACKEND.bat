@echo off
echo ================================================
echo  KUMO - Iniciando Backend
echo ================================================
cd backend
call venv\Scripts\activate.bat
echo.
echo Backend iniciando en http://localhost:8000
echo Presiona Ctrl+C para detener
echo.
uvicorn main:app --reload --host 0.0.0.0 --port 8000

