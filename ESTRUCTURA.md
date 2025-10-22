# 📂 Estructura del Proyecto Kumo

```
Kumo/
│
├── 📄 README.md                    # Documentación principal del proyecto
├── 📄 SETUP.md                     # Guía detallada de instalación paso a paso
├── 📄 COMANDOS.md                  # Lista rápida de todos los comandos
├── 📄 ESTRUCTURA.md                # Este archivo - Estructura visual del proyecto
├── 📄 .gitignore                   # Archivos ignorados por Git
│
├── 📁 backend/                     # 🐍 Backend con FastAPI
│   ├── 📄 main.py                  # Aplicación principal de FastAPI
│   ├── 📄 requirements.txt         # Dependencias de Python
│   ├── 📄 .env.example            # Ejemplo de variables de entorno
│   ├── 📄 .gitignore              # Ignorados específicos del backend
│   └── 📄 README.md               # Documentación del backend
│
└── 📁 frontend/                    # ⚛️ Frontend con React + Vite
    ├── 📁 public/                  # Archivos estáticos
    │   └── 📄 vite.svg            # Favicon
    │
    ├── 📁 src/                     # Código fuente
    │   ├── 📁 components/          # Componentes reutilizables
    │   │   ├── 📁 ui/             # Componentes de shadcn/ui
    │   │   │   ├── 📄 button.tsx  # Componente Button
    │   │   │   └── 📄 card.tsx    # Componente Card
    │   │   └── 📄 Layout.tsx      # Layout principal con navegación
    │   │
    │   ├── 📁 pages/              # Páginas de la aplicación
    │   │   ├── 📄 Landing.tsx     # Página: Landing page principal (sin layout)
    │   │   ├── 📄 Templates.tsx   # Página: Biblioteca de Plantillas
    │   │   ├── 📄 Designer.tsx    # Página: Diseñador Manual
    │   │   ├── 📄 Strategies.tsx  # Página: Mis Estrategias (conectada al backend)
    │   │   └── 📄 Academy.tsx     # Página: Academia
    │   │
    │   ├── 📁 lib/                # Utilidades
    │   │   └── 📄 utils.ts        # Funciones de utilidad (cn para clsx + tailwind-merge)
    │   │
    │   ├── 📄 App.tsx             # Componente raíz con React Router
    │   ├── 📄 main.tsx            # Punto de entrada de React
    │   └── 📄 index.css           # Estilos globales (Tailwind + custom CSS)
    │
    ├── 📄 index.html              # HTML principal
    ├── 📄 package.json            # Dependencias de Node.js
    ├── 📄 vite.config.ts          # Configuración de Vite
    ├── 📄 tsconfig.json           # Configuración de TypeScript
    ├── 📄 tsconfig.node.json      # TypeScript config para Node
    ├── 📄 tailwind.config.js      # Configuración de Tailwind CSS (con colores personalizados)
    ├── 📄 postcss.config.js       # Configuración de PostCSS
    ├── 📄 components.json         # Configuración de shadcn/ui
    ├── 📄 .eslintrc.cjs          # Configuración de ESLint
    ├── 📄 vite-env.d.ts          # Tipos de Vite
    ├── 📄 .gitignore             # Ignorados específicos del frontend
    └── 📄 README.md              # Documentación del frontend
```

---

## 📊 Resumen de Archivos

### 📁 Backend (7 archivos)
- **Código principal:** 1 archivo Python (`main.py`)
- **Configuración:** 3 archivos (requirements.txt, .env.example, .gitignore)
- **Documentación:** 1 archivo (README.md)

### 📁 Frontend (25 archivos)
- **Componentes React:** 6 archivos (.tsx)
- **Páginas:** 5 archivos (.tsx)
- **Configuración:** 10 archivos (package.json, vite.config.ts, tsconfig, etc.)
- **Estilos:** 1 archivo (index.css)
- **Documentación:** 1 archivo (README.md)
- **Assets:** 1 archivo (vite.svg)

### 📁 Raíz (4 archivos)
- **Documentación:** 4 archivos (README.md, SETUP.md, COMANDOS.md, ESTRUCTURA.md)
- **Configuración:** 1 archivo (.gitignore)

**Total:** ~36 archivos generados

---

## 🎨 Componentes de UI Implementados

### shadcn/ui Components:
- ✅ **Button** - Botón con múltiples variantes (default, outline, ghost, etc.)
- ✅ **Card** - Tarjeta con Header, Title, Description, Content y Footer

### Custom Components:
- ✅ **Layout** - Layout responsivo con navegación lateral y móvil
- ✅ **Landing** - Landing page profesional con header y footer
- ✅ **Templates** - Página de biblioteca de plantillas
- ✅ **Designer** - Página de diseñador visual
- ✅ **Strategies** - Página de estrategias (con integración backend)
- ✅ **Academy** - Página de academia/cursos

---

## 🔌 Endpoints del Backend

### Disponibles:
- ✅ `GET /` - Endpoint de bienvenida
- ✅ `GET /health` - Health check del servidor
- ✅ `GET /api/v1/strategies` - Lista de estrategias (mock data)
- ✅ `GET /api/v1/templates` - Lista de plantillas (mock data)

### Configuración:
- ✅ CORS configurado para permitir peticiones desde localhost:5173
- ✅ Documentación automática en `/docs` (Swagger UI)
- ✅ Documentación alternativa en `/redoc` (ReDoc)

---

## 🎨 Tema y Colores

### Colores Principales:
```css
--primary: #4F46E5        /* Violeta - Color principal */
--background: #0B1120     /* Azul noche - Fondo */
--surface: #1e293b        /* Gris oscuro - Tarjetas */
```

### Gradientes y Acentos:
- **Gradiente principal:** Violeta (#A78BFA) → Rosa (#F472B6) → Naranja (#FB923C)
- **Hover states:** Naranja (#FB923C) para interacciones
- **CTAs destacados:** Gradientes con transiciones suaves

### Características del Tema:
- ✅ Dark mode activado por defecto
- ✅ Sistema de colores consistente usando CSS variables
- ✅ Gradientes vibrantes (violeta, rosa, naranja)
- ✅ Transiciones y animaciones suaves
- ✅ Scrollbar personalizada
- ✅ Scroll suave (smooth scroll)
- ✅ Diseño responsivo (mobile-first)

---

## 📱 Navegación

### Desktop (Pantallas grandes):
- Barra lateral fija (izquierda)
- 72 columnas de ancho
- Navegación vertical con iconos y descripciones

### Mobile (Pantallas pequeñas):
- Barra de navegación inferior fija
- Grid de 4 columnas
- Iconos con labels compactos

### Rutas Disponibles:
- `/` - Landing page (sin layout, con header y footer propio)
- `/templates` - Biblioteca de Plantillas
- `/designer` - Diseñador Manual
- `/strategies` - Mis Estrategias
- `/academy` - Academia

---

## 🔧 Tecnologías Implementadas

### Frontend Stack:
- ✅ React 18
- ✅ Vite 5
- ✅ TypeScript
- ✅ Tailwind CSS 3
- ✅ shadcn/ui
- ✅ React Router 6
- ✅ Lucide React (iconos)
- ✅ class-variance-authority
- ✅ clsx + tailwind-merge

### Backend Stack:
- ✅ FastAPI
- ✅ Uvicorn (ASGI server)
- ✅ Pydantic (validación)
- ✅ Python-dotenv (variables de entorno)

---

## 🔐 Características de Seguridad

- ✅ CORS configurado correctamente
- ✅ Variables de entorno (.env)
- ✅ .gitignore completo para ambos proyectos
- ✅ TypeScript para type safety en el frontend
- ✅ Pydantic para validación de datos en el backend

---

## 📝 Documentación Generada

- ✅ **README.md** - Documentación principal del proyecto
- ✅ **SETUP.md** - Guía paso a paso de instalación
- ✅ **COMANDOS.md** - Lista de comandos de terminal
- ✅ **ESTRUCTURA.md** - Este archivo
- ✅ **backend/README.md** - Documentación del backend
- ✅ **frontend/README.md** - Documentación del frontend

---

## ✨ Características Implementadas

### ✅ Completado:
1. ✅ Estructura de monorepo (frontend + backend)
2. ✅ Backend con FastAPI y endpoints mock
3. ✅ Frontend con React, Vite y TypeScript
4. ✅ Tailwind CSS con tema oscuro personalizado
5. ✅ shadcn/ui configurado con Button y Card
6. ✅ Layout responsivo (desktop + mobile)
7. ✅ React Router con 5 páginas (incluye Landing)
8. ✅ Landing page profesional con gradientes y CTAs
9. ✅ Integración frontend-backend funcional
10. ✅ CORS configurado correctamente
11. ✅ Documentación completa

### 🚧 Para el futuro:
- 🔲 Diseñador visual drag-and-drop
- 🔲 Sistema de autenticación
- 🔲 Base de datos (PostgreSQL)
- 🔲 Backtesting engine
- 🔲 Gráficos de trading (Chart.js / Recharts)
- 🔲 Exportación de estrategias
- 🔲 Testing (Jest, Pytest)
- 🔲 Despliegue (Docker, CI/CD)

---

**Estado del Proyecto:** ✅ **Esqueleto Completo y Funcional**

Todos los componentes básicos están implementados y conectados. El proyecto está listo para comenzar el desarrollo de características más avanzadas.

