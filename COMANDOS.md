# 📋 Lista de Comandos para Kumo

Este documento contiene todos los comandos necesarios para instalar dependencias y ejecutar la aplicación Kumo.

---

## 🐍 BACKEND (FastAPI)

### Instalación

```bash
# 1. Navegar a la carpeta del backend
cd backend

# 2. Crear entorno virtual de Python
python -m venv venv

# 3. Activar el entorno virtual
# Windows PowerShell:
venv\Scripts\activate
# Windows CMD:
venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

# 4. Instalar dependencias
pip install -r requirements.txt
```

### Ejecución

```bash
# Asegúrate de estar en la carpeta backend/ con el entorno virtual activado
uvicorn main:app --reload
```

**Backend disponible en:** http://localhost:8000
- **API docs:** http://localhost:8000/docs
- **Health check:** http://localhost:8000/health
- **Strategies endpoint:** http://localhost:8000/api/v1/strategies

---

## ⚛️ FRONTEND (React + Vite)

### Instalación

```bash
# 1. Navegar a la carpeta del frontend (desde la raíz del proyecto)
cd frontend

# 2. Instalar todas las dependencias
npm install

# 3. Verificar que todo está instalado correctamente
npm list
```

**Nota:** La dependencia `tailwindcss-animate` ya está incluida en `package.json` y se instalará automáticamente con `npm install`.

### Ejecución

```bash
# Asegúrate de estar en la carpeta frontend/
npm run dev
```

**Frontend disponible en:** http://localhost:5173

---

## 🚀 Flujo Completo de Inicio

### Primera vez (Instalación completa)

#### Terminal 1 - Backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Ejecuciones posteriores

#### Terminal 1 - Backend:
```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

---

## 📦 Comandos Adicionales

### Backend

```bash
# Ver paquetes instalados
pip list

# Actualizar pip
python -m pip install --upgrade pip

# Desactivar entorno virtual
deactivate

# Reinstalar dependencias
pip install -r requirements.txt --force-reinstall
```

### Frontend

```bash
# Ver paquetes instalados
npm list

# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Build para producción
npm run build

# Vista previa de producción
npm run preview

# Ejecutar linter
npm run lint
```

---

## ✅ Verificación Rápida

### 1. Verifica que el backend funciona:
```bash
curl http://localhost:8000/health
```
Debería devolver: `{"status":"ok"}`

### 2. Verifica las estrategias:
```bash
curl http://localhost:8000/api/v1/strategies
```
Debería devolver un JSON con 3 estrategias.

### 3. Verifica el frontend:
Abre http://localhost:5173 en tu navegador y navega a "Mis Estrategias". Deberías ver 3 tarjetas con estrategias cargadas desde el backend.

---

## 🐛 Troubleshooting

### Si el backend no inicia:
```bash
# Verifica la versión de Python (debe ser 3.10+)
python --version

# Verifica que FastAPI está instalado
pip show fastapi

# Reinstala las dependencias
pip install -r requirements.txt --force-reinstall
```

### Si el frontend no inicia:
```bash
# Verifica la versión de Node (debe ser 18+)
node --version

# Limpia e reinstala
rm -rf node_modules package-lock.json
npm install
```

### Si hay errores de CORS:
Asegúrate de que:
1. El backend está ejecutándose en el puerto 8000
2. El frontend está ejecutándose en el puerto 5173
3. Ambos servidores están activos simultáneamente

---

## 💡 Notas Importantes

- **Siempre** activa el entorno virtual antes de trabajar con el backend
- Mantén **ambos servidores** ejecutándose simultáneamente para que la aplicación funcione completamente
- El frontend se recargará automáticamente al hacer cambios en el código (hot reload)
- El backend se recargará automáticamente gracias al flag `--reload` de uvicorn
- Los puertos por defecto son:
  - Backend: `8000`
  - Frontend: `5173`

---

¡Listo! Con estos comandos deberías tener tu aplicación Kumo funcionando perfectamente. 🎉

