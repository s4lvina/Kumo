# ⚡ Kumo - Inicio Rápido

¿Primera vez usando Kumo? Esta guía te llevará de 0 a 100 en menos de 5 minutos.

---

## 🚀 Instalación Express (Copy & Paste)

### 1️⃣ Backend (Terminal 1)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

✅ **Verifica:** Abre http://localhost:8000/docs - Deberías ver la documentación de la API

---

### 2️⃣ Frontend (Terminal 2 - Nueva)

```bash
cd frontend
npm install
npm run dev
```

✅ **Verifica:** Abre http://localhost:5173 - Deberías ver la aplicación Kumo

---

## 🎯 ¿Qué hacer ahora?

### 1. Explora las páginas:

- **🏠 Landing** - La página principal en `/` muestra una landing page profesional con gradientes naranjas/violetas
- **📚 Plantillas** - Navega a `/templates` para ver plantillas de estrategias
- **🎨 Diseñador** - Ve a `/designer` para crear estrategias personalizadas
- **📊 Mis Estrategias** - En `/strategies` verás 3 estrategias cargadas desde el backend
- **📈 Backtesting** - En `/backtesting` puedes probar estrategias con datos históricos (¡NUEVO!)
- **🎓 Academia** - Visita `/academy` para recursos educativos

### 2. Verifica la conexión Backend-Frontend:

1. Ve a la página **"Mis Estrategias"**
2. Abre la consola del navegador (F12)
3. Busca este mensaje: `✅ Estrategias cargadas correctamente desde el backend`

Si lo ves, ¡todo está funcionando perfectamente! 🎉

---

## 📱 Prueba el diseño responsivo

### Desktop:
- Verás una barra lateral fija a la izquierda con navegación vertical

### Mobile:
1. Abre las DevTools (F12)
2. Activa el modo responsive (Ctrl+Shift+M)
3. Cambia a una resolución móvil (ej. iPhone 12)
4. Verás la navegación en la parte inferior

---

## 🔍 Endpoints para probar

### Frontend:
- http://localhost:5173/ - Landing page principal
- http://localhost:5173/strategies - Aplicación principal
- http://localhost:5173/templates - Plantillas
- http://localhost:5173/designer - Diseñador
- http://localhost:5173/backtesting - Panel de Backtesting ⭐ NUEVO

### Backend:
- http://localhost:8000/ - Mensaje de bienvenida
- http://localhost:8000/health - Health check
- http://localhost:8000/api/v1/strategies - Ver estrategias (JSON)
- http://localhost:8000/api/v1/backtest - Endpoint de backtesting ⭐ NUEVO
- http://localhost:8000/docs - Documentación interactiva

### Con curl (opcional):
```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/strategies
```

---

## 🎨 Personaliza los colores

Edita `frontend/tailwind.config.js`:

```javascript
colors: {
  'primary': '#4F46E5',     // Cambia este color
  'background': '#0B1120',  // O este
  'surface': '#1e293b',     // O este
}
```

Guarda y verás los cambios instantáneamente (gracias a hot reload).

---

## 🐛 Troubleshooting Rápido

### ❌ "Cannot GET /api/v1/strategies"
**Causa:** El backend no está ejecutándose
**Solución:** Inicia el backend con `uvicorn main:app --reload`

### ❌ "CORS error"
**Causa:** Backend y frontend en puertos incorrectos
**Solución:** Backend debe estar en :8000, frontend en :5173

### ❌ "Module not found"
**Causa:** Dependencias no instaladas
**Solución:**
```bash
# Backend:
pip install -r requirements.txt

# Frontend:
npm install
```

---

## 📚 Archivos de Documentación

- **README.md** - Visión general del proyecto
- **SETUP.md** - Guía detallada de instalación
- **COMANDOS.md** - Lista completa de comandos
- **ESTRUCTURA.md** - Estructura del proyecto
- **QUICKSTART.md** - Esta guía
- **frontend/BACKTESTING_GUIDE.md** - Guía completa del sistema de backtesting ⭐ NUEVO

---

## 💻 Comandos Útiles

### Ver logs del backend:
Los logs aparecen directamente en la terminal donde ejecutaste `uvicorn`

### Ver errores del frontend:
Abre la consola del navegador (F12) y ve a la pestaña "Console"

### Reiniciar todo:
1. Presiona `Ctrl+C` en ambas terminales
2. Vuelve a ejecutar los comandos de inicio

---

## 🎉 ¡Siguiente Paso!

Ahora que todo está funcionando, puedes:

1. **Probar el Backtesting** ⭐ NUEVO - CON MOTOR REAL
   - Ve al Diseñador (`/designer`)
   - Crea una estrategia simple:
     * Entrada: RSI < 30
     * Salida: RSI > 70
     * Stop Loss: 50 pips
     * Take Profit: 100 pips
   - Guarda la estrategia
   - Haz clic en "Ejecutar Backtest"
   - Analiza los resultados REALES con gráficos y métricas avanzadas
   - Lee `frontend/BACKTESTING_GUIDE.md` y `backend/BACKTEST_ENGINE.md` para más información

2. **Modificar una página** - Edita `frontend/src/pages/Strategies.tsx` y guarda. Verás los cambios instantáneamente.

3. **Añadir un endpoint** - Agrega una nueva ruta en `backend/main.py`:
   ```python
   @app.get("/api/v1/hello")
   async def hello():
       return {"message": "¡Hola desde Kumo!"}
   ```

4. **Crear un nuevo componente** - Crea un archivo en `frontend/src/components/` y úsalo en cualquier página.

---

## 🆘 ¿Necesitas ayuda?

- Revisa **SETUP.md** para una guía más detallada
- Consulta **COMANDOS.md** para ver todos los comandos disponibles
- Lee **ESTRUCTURA.md** para entender la arquitectura del proyecto
- **TROUBLESHOOTING_FRONTEND.md** - Solución de problemas con TradingView y CORS
- **frontend/TRADINGVIEW_TROUBLESHOOTING.md** - Guía específica del widget TradingView
- **backend/BACKTEST_ENGINE.md** - Documentación del motor de backtesting
- **backend/TEST_BACKTEST.md** - Cómo probar el backtesting
- **backend/DEBUGGING_ZERO_TRADES.md** - Por qué el backtest no genera posiciones
- **backend/SUPPORTED_INDICATORS.md** - Lista de indicadores soportados y cómo usarlos
- **frontend/BACKTEST_DIAGNOSTIC_GUIDE.md** - Guía del diagnóstico automático de backtesting
- **backend/STRATEGY_TROUBLESHOOTING.md** - Solución de problemas específicos por estrategia
- **backend/REAL_DATA_SYSTEM.md** - Sistema de datos reales para backtesting
- **frontend/DESIGNER_ACTIONS_GUIDE.md** - Guía para configurar acciones en el Designer
- **frontend/STRUCTURE_MISMATCH_GUIDE.md** - Problema de estructura entre Designer y BacktestEngine

---

**¡Bienvenido a Kumo!** 🌥️✨

