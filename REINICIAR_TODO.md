# 🔄 Cómo Reiniciar el Backend

## El backend está crasheado, necesitas reiniciarlo manualmente

### Opción 1: Script Automático
```bash
# Simplemente ejecuta:
START_BACKEND.bat
```

### Opción 2: Manual

#### Paso 1: Detén el backend actual
- Ve a la terminal donde está corriendo el backend
- Presiona `Ctrl+C` para detenerlo

#### Paso 2: Inicia el backend nuevamente
```bash
cd D:\CURSOR\Kumo\Kumo\backend
.\venv\Scripts\activate
uvicorn main:app --reload
```

#### Paso 3: Verifica que funciona
```bash
# En otra terminal:
curl http://localhost:8000/health
# Debe responder: {"status":"ok"}
```

### Opción 3: Desde PowerShell
```powershell
cd D:\CURSOR\Kumo\Kumo\backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

## ✅ Sabrás que funciona cuando veas:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXX] using WatchFiles
INFO:     Started server process [XXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## 🚀 Después de reiniciar:
1. Ve a http://localhost:5173/backtesting
2. Selecciona una estrategia
3. Click "Ejecutar Backtest"
4. ¡Funcionará!

## 🐛 Si sigue sin funcionar:
```bash
# Verifica que el puerto no esté ocupado
netstat -ano | findstr :8000

# Si hay algo corriendo, mat el proceso:
taskkill /PID [PID_NUMBER] /F

# Luego reinicia el backend
```

