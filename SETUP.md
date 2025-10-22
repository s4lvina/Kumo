# 🚀 Guía de Configuración e Instalación de Kumo

Esta guía te llevará paso a paso para configurar y ejecutar la aplicación Kumo en tu máquina local.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 18 o superior** - [Descargar aquí](https://nodejs.org/)
- **Python 3.10 o superior** - [Descargar aquí](https://www.python.org/)
- **Git** (opcional) - [Descargar aquí](https://git-scm.com/)

## 🔧 Instalación Paso a Paso

### 1️⃣ Configurar el Backend (FastAPI)

#### Paso 1: Navegar a la carpeta del backend
```bash
cd backend
```

#### Paso 2: Crear un entorno virtual de Python
```bash
python -m venv venv
```

#### Paso 3: Activar el entorno virtual

**En Windows (PowerShell o CMD):**
```bash
venv\Scripts\activate
```

**En Linux/Mac:**
```bash
source venv/bin/activate
```

Deberías ver `(venv)` al inicio de tu línea de comandos.

#### Paso 4: Instalar las dependencias de Python
```bash
pip install -r requirements.txt
```

Esto instalará:
- FastAPI
- Uvicorn
- Python-dotenv
- Pydantic

#### Paso 5: Verificar la instalación
```bash
python -c "import fastapi; print('FastAPI instalado correctamente')"
```

---

### 2️⃣ Configurar el Frontend (React + Vite)

#### Paso 1: Navegar a la carpeta del frontend
```bash
# Desde la raíz del proyecto
cd frontend
```

#### Paso 2: Instalar las dependencias de Node.js
```bash
npm install
```

Este comando instalará todas las dependencias definidas en `package.json`, incluyendo:
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React (iconos)
- shadcn/ui dependencies

#### Paso 3: Instalar la dependencia adicional para animaciones
```bash
npm install -D tailwindcss-animate
```

#### Paso 4: Verificar la instalación
```bash
npm list react
```

Deberías ver la versión de React instalada.

---

## ▶️ Ejecutar la Aplicación

### 🐍 Iniciar el Backend

1. Asegúrate de estar en la carpeta `backend/` con el entorno virtual activado
2. Ejecuta:

```bash
uvicorn main:app --reload
```

**Salida esperada:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**El backend estará disponible en:**
- API: http://localhost:8000
- Documentación Swagger: http://localhost:8000/docs
- Health check: http://localhost:8000/health

---

### ⚛️ Iniciar el Frontend

1. Abre una **nueva terminal** (deja el backend ejecutándose en la otra)
2. Navega a la carpeta `frontend/`
3. Ejecuta:

```bash
npm run dev
```

**Salida esperada:**
```
  VITE v5.4.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**El frontend estará disponible en:**
- http://localhost:5173

---

## ✅ Verificar que Todo Funciona

### 1. Verifica el Backend

Abre tu navegador y visita:
```
http://localhost:8000/health
```

Deberías ver:
```json
{"status": "ok"}
```

### 2. Verifica el endpoint de estrategias

```
http://localhost:8000/api/v1/strategies
```

Deberías ver un JSON con 3 estrategias de ejemplo.

### 3. Verifica el Frontend

Abre:
```
http://localhost:5173
```

Deberías ver la aplicación Kumo funcionando con:
- ✅ Navegación lateral (desktop) o inferior (móvil)
- ✅ 4 páginas: Templates, Diseñador, Mis Estrategias, Academia
- ✅ La página "Mis Estrategias" debe mostrar 3 estrategias cargadas desde el backend

### 4. Verifica la Conexión Frontend-Backend

1. Ve a la página "Mis Estrategias" en el frontend
2. Abre la consola del navegador (F12)
3. Deberías ver un mensaje:
   ```
   ✅ Estrategias cargadas correctamente desde el backend: [...]
   ```

Si ves un error, asegúrate de que:
- El backend está ejecutándose en el puerto 8000
- No hay problemas de CORS (ya está configurado en el backend)

---

## 🎯 Comandos Rápidos de Referencia

### Backend
```bash
# Activar entorno virtual (Windows)
venv\Scripts\activate

# Activar entorno virtual (Linux/Mac)
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
uvicorn main:app --reload
```

### Frontend
```bash
# Instalar dependencias
npm install

# Instalar tailwindcss-animate
npm install -D tailwindcss-animate

# Ejecutar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## 🐛 Solución de Problemas Comunes

### Problema: "No module named 'fastapi'"
**Solución:** Asegúrate de haber activado el entorno virtual y ejecutado `pip install -r requirements.txt`

### Problema: "Cannot find module '@/lib/utils'"
**Solución:** Verifica que el archivo `frontend/src/lib/utils.ts` existe y que `tsconfig.json` tiene la configuración de paths correcta.

### Problema: "CORS error" en el frontend
**Solución:** Verifica que el backend esté ejecutándose y que el frontend esté intentando conectarse a `http://localhost:8000`

### Problema: El puerto 8000 ya está en uso
**Solución:** Cambia el puerto del backend:
```bash
uvicorn main:app --reload --port 8001
```
Y actualiza la URL en el frontend (`src/pages/Strategies.tsx`)

### Problema: El puerto 5173 ya está en uso
**Solución:** Vite automáticamente usará el siguiente puerto disponible (5174, 5175, etc.)

---

## 🎉 ¡Listo!

Si has llegado hasta aquí y todo funciona, ¡felicidades! Tienes tu aplicación Kumo completamente configurada y funcionando.

### Próximos Pasos

1. Explora las diferentes páginas de la aplicación
2. Revisa el código en `frontend/src/` y `backend/main.py`
3. Experimenta agregando nuevos endpoints en el backend
4. Personaliza los componentes de UI en el frontend
5. ¡Comienza a construir tus propias estrategias de trading!

---

**¿Problemas o preguntas?** 
Revisa los logs en la terminal del backend y la consola del navegador para más información sobre errores.

