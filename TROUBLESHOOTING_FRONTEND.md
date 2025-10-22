# 🔧 Solución de Problemas - Frontend

## ✅ SOLUCIONADO: Errores de TradingView y CORS

### Problema 1: Error de TradingView
```
TypeError: Cannot read properties of undefined (reading 'list')
```

**Causa**: Configuración del widget demasiado compleja con características no disponibles.

**Solución**: ✅ Simplificada la configuración del widget removiendo:
- `enabled_features` problemáticos
- `hide_side_toolbar` obsoleto
- `studies` array vacío
- Cambiado `width/height` por `autosize: true`

### Problema 2: Error CORS
```
Access to fetch at 'http://localhost:8000/api/v1/backtest' from origin 'http://localhost:5173' has been blocked
```

**Causa**: Backend no reiniciado después de cambios (emojis removidos).

**Solución**: ✅ Backend reiniciado completamente con:
```bash
# 1. Matar procesos
taskkill /F /IM python.exe

# 2. Reiniciar backend
cd D:\CURSOR\Kumo\Kumo\backend
.\venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🧪 Verificación

### 1. Backend funcionando:
```bash
curl http://localhost:8000/health
# Debe responder: {"status":"ok"}
```

### 2. Endpoint de Backtest:
```bash
cd backend
.\venv\Scripts\activate
python test_api.py
# Debe mostrar: Status Code: 200 con métricas
```

### 3. Frontend:
1. Ve a: http://localhost:5173/backtesting
2. Selecciona una estrategia
3. Click "Ejecutar Backtest"
4. ✅ Debe mostrar resultados reales

---

## 📋 Checklist Rápido

Si algo falla:

- [ ] ¿Backend corriendo? → `curl http://localhost:8000/health`
- [ ] ¿Frontend corriendo? → `http://localhost:5173`
- [ ] ¿Estrategia válida? → Debe tener al menos un Entry Block
- [ ] ¿Console limpia? → F12 → Console → No errores rojos
- [ ] ¿TradingView carga? → Debe verse el gráfico

---

## 🚀 Estado Actual

### ✅ COMPLETADO:
- Backend con lógica real de backtesting
- Frontend con panel completo de métricas
- TradingView widget integrado y funcionando
- CORS configurado correctamente
- Manejo de errores robusto

### 🎯 Funcionando:
- Endpoint `/api/v1/backtest` → Status 200
- Cálculo de métricas reales (Win Rate, Sharpe, Drawdown, etc.)
- Gráfico de equity curve
- Lista de trades
- Configuración de parámetros

---

## 🔥 Si persisten problemas:

### Hard Reset:
```bash
# 1. Matar todo
taskkill /F /IM python.exe
taskkill /F /IM node.exe

# 2. Backend
cd D:\CURSOR\Kumo\Kumo\backend
.\venv\Scripts\activate
uvicorn main:app --reload

# 3. Frontend (nueva terminal)
cd D:\CURSOR\Kumo\Kumo\frontend
npm run dev

# 4. Abrir navegador en modo incógnito
http://localhost:5173/backtesting
```

### Limpiar cache del navegador:
- Chrome/Edge: `Ctrl+Shift+Delete` → Borrar todo
- O abrir en **modo incógnito**: `Ctrl+Shift+N`

---

## 📞 Debug Avanzado

### Ver logs del backend:
- La terminal donde corre `uvicorn` muestra todos los logs
- Busca líneas con `>>` para seguir el flujo

### Ver logs del frontend:
- F12 → Console
- Busca líneas con `[BACKTEST]` o `[TRADINGVIEW]`

### Test directo del API:
```bash
cd backend
python test_api.py
```

---

**Última actualización**: 22 de octubre de 2025
**Estado**: ✅ Sistema funcionando correctamente

