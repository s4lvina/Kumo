# Kumo 🌥️

**Plataforma moderna para diseñar, validar y exportar estrategias de trading algorítmico**

Kumo es una aplicación web completa que te permite crear estrategias de trading de forma visual, validarlas mediante backtesting y exportarlas a múltiples plataformas de trading profesionales.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#-stack-tecnológico)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Exportación de Código](#-exportación-de-código)
- [API Documentation](#-api-documentation)
- [Tema y Colores](#-tema-y-colores)
- [Documentación Adicional](#-documentación-adicional)

## 🚀 Stack Tecnológico

### Frontend
- **React 18** con **Vite** - UI moderna y rápida
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de estilos utility-first
- **shadcn/ui** - Componentes de UI accesibles y personalizables
- **React Router** - Enrutamiento del lado del cliente
- **Lucide React** - Iconos SVG optimizados

### Backend
- **FastAPI** - Framework web moderno de Python
- **Uvicorn** - Servidor ASGI de alto rendimiento
- **Pydantic** - Validación de datos y tipos
- **Jinja2** - Motor de plantillas para generación de código
- **Python 3.10+** - Lenguaje base del backend

## ✨ Características

### 🏠 Landing Page Profesional
- Diseño moderno con gradientes violetas, rosas y naranjas
- Hero section impactante con call-to-actions
- Secciones de características, proceso y planes
- Navegación smooth scroll
- Totalmente responsiva

### 🎨 Diseñador Visual de Estrategias
**Crea estrategias de trading con una interfaz visual intuitiva:**

- **Configuración de Timeframe**: Selecciona el período temporal (1m, 5m, 15m, 1h, 4h, 1d)
- **Position Sizing**: Define el tamaño de tus posiciones con tres métodos:
  - Lotes Fijos
  - Porcentaje del Balance
  - Porcentaje de Riesgo
- **Variables Personalizadas**: Crea y gestiona variables reutilizables en toda tu estrategia
- **Indicadores Técnicos**: Más de 15 indicadores disponibles
  - Medias Móviles (SMA, EMA, WMA)
  - Osciladores (RSI, Stochastic, CCI, Williams %R)
  - Tendencia (MACD, ADX, Parabolic SAR, Ichimoku)
  - Volatilidad (Bollinger Bands, ATR, Keltner Channels)
  - Volumen e indicadores especializados
- **Condiciones de Entrada/Salida**: Define reglas precisas con operadores lógicos
- **Gestión de Riesgo Completa**:
  - Stop Loss (pips, porcentaje, ATR, trailing)
  - Take Profit (pips, porcentaje, ratio R:R)
  - Trailing Stop
  - Breakeven automático
- **Drag & Drop** (en desarrollo): Arrastra indicadores y acciones para crear tu estrategia

### 💻 Exportación de Código
**Genera código listo para usar en múltiples plataformas:**

- **Python (Backtrader)**: Para backtesting profesional en Python
- **MQL5**: Para Expert Advisors en MetaTrader 5
- **Pine Script v5**: Para estrategias en TradingView
- **ProRealCode**: Para ProRealTime (popular en Europa)

Cada exportación incluye:
- Todos los indicadores configurados
- Lógica completa de entrada y salida
- Gestión de riesgo (SL, TP, Trailing)
- Position sizing
- Variables personalizadas
- Comentarios explicativos

### 📚 Biblioteca de Plantillas
**Más de 25 estrategias predefinidas listas para usar:**

- **Categorías**: Momentum, Tendencia, Reversión, Volatilidad, Scalping, Swing
- **Niveles**: Básico, Intermedio, Avanzado
- **Filtros inteligentes**: Por categoría, dificultad e indicadores
- **Uso inmediato**: Carga cualquier plantilla en el diseñador con un clic

Estrategias incluidas:
- RSI Básico, Cruce de Medias, Bollinger Bands
- Golden/Death Cross, Triple EMA, ADX Fuerza
- Breakout de Bollinger, RSI Divergencia
- MACD Scalping, Stochastic Scalping
- London Breakout, Range Breakout
- Y muchas más...

### 📊 Mis Estrategias
- Gestiona todas tus estrategias personalizadas
- Visualiza métricas de rendimiento (win rate, total de trades, profit factor)
- Edita y modifica estrategias existentes
- Ejecuta backtesting con un clic
- Exporta a cualquier plataforma

### 🎓 Academia
**Aprende trading algorítmico desde cero:**

**Bloque: Introducción al Trading Algorítmico** (Completo)
1. ¿Qué es el Trading Algorítmico?
2. Ventajas del Trading Automatizado
3. Componentes de una Estrategia
4. Indicadores Técnicos Básicos
5. Gestión de Riesgo
6. Backtesting: Validando tu Estrategia

Cada lección incluye:
- Explicaciones técnicas pero amigables
- Ejemplos de código real
- Ventajas del trading algorítmico vs manual
- Casos prácticos y comparaciones
- Sistema de progreso por lecciones

## 📁 Estructura del Proyecto

```
Kumo/
├── frontend/                    # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── ui/            # Componentes base (shadcn/ui)
│   │   │   ├── Layout.tsx     # Layout principal
│   │   │   ├── *Module.tsx    # Módulos de gestión de riesgo
│   │   │   ├── *ConfigModal.tsx  # Modales de configuración
│   │   │   ├── VariablesManager.tsx
│   │   │   ├── PositionSizingConfig.tsx
│   │   │   └── CodeViewer.tsx # Visor de código generado
│   │   ├── pages/             # Páginas de la aplicación
│   │   │   ├── Landing.tsx    # Landing page
│   │   │   ├── Designer.tsx   # Diseñador visual
│   │   │   ├── Templates.tsx  # Biblioteca de plantillas
│   │   │   ├── Strategies.tsx # Mis estrategias
│   │   │   └── Academy.tsx    # Academia educativa
│   │   ├── types/             # Definiciones TypeScript
│   │   │   ├── strategy.ts
│   │   │   └── variables.ts
│   │   ├── data/              # Datos y configuraciones
│   │   │   ├── indicators.ts  # Definición de indicadores
│   │   │   ├── actions.ts     # Acciones de trading
│   │   │   ├── conditions.ts  # Condiciones lógicas
│   │   │   └── templates.ts   # Plantillas predefinidas
│   │   ├── lib/               # Utilidades
│   │   │   └── utils.ts
│   │   ├── App.tsx            # Componente principal
│   │   └── main.tsx           # Entry point
│   ├── public/                # Archivos estáticos
│   ├── components.json        # Configuración shadcn/ui
│   ├── tailwind.config.js     # Configuración Tailwind
│   ├── vite.config.ts         # Configuración Vite
│   └── package.json           # Dependencias Node.js
│
├── backend/                    # API con FastAPI
│   ├── services/              # Servicios del backend
│   │   ├── __init__.py
│   │   └── code_generator.py # Generador de código
│   ├── templates/             # Templates Jinja2
│   │   └── code_templates/
│   │       ├── python_backtrader.jinja2
│   │       ├── mql5_ea.jinja2
│   │       ├── pinescript_v5.jinja2
│   │       └── prorealcode.jinja2
│   ├── main.py               # Aplicación principal FastAPI
│   ├── requirements.txt      # Dependencias Python
│   └── venv/                 # Entorno virtual (no incluido en git)
│
├── .gitignore                # Archivos ignorados por git
├── README.md                 # Este archivo
├── QUICKSTART.md            # Guía rápida de inicio
├── SETUP.md                 # Guía detallada de instalación
├── ESTRUCTURA.md            # Documentación de la estructura
└── COMANDOS.md              # Comandos útiles del proyecto
```

## 🔧 Instalación

### Requisitos previos

- **Node.js 18+** y npm (para el frontend)
- **Python 3.10+** y pip (para el backend)
- **Git** (para control de versiones)

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd Kumo
```

### 2. Configurar el Backend

```bash
# Navegar a la carpeta del backend
cd backend

# Crear un entorno virtual (recomendado)
python -m venv venv

# Activar el entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 3. Configurar el Frontend

```bash
# Navegar a la carpeta del frontend (desde la raíz)
cd frontend

# Instalar dependencias
npm install
```

## ▶️ Ejecución

### Desarrollo Local

**Terminal 1 - Backend:**
```bash
cd backend
# Activar entorno virtual
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Iniciar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en: **http://localhost:8000**
- API docs (Swagger): http://localhost:8000/docs
- Health check: http://localhost:8000/health

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

El frontend estará disponible en: **http://localhost:5173** (o 5174, 5175...)

> **Nota**: El puerto puede variar si el 5173 está ocupado. Verifica el puerto en la terminal.

### Producción

**Backend:**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 💻 Exportación de Código

Kumo puede generar código listo para producción en múltiples plataformas:

### Python (Backtrader)
```python
# Estrategia completa con Backtrader
# Incluye: indicadores, condiciones, gestión de riesgo
# Listo para backtesting profesional
```

### MQL5 (MetaTrader 5)
```mql5
// Expert Advisor para MT5
// Incluye: inputs configurables, gestión de órdenes
// Listo para usar en cuentas demo/real
```

### Pine Script v5 (TradingView)
```pinescript
//@version=5
// Strategy para TradingView
// Incluye: indicadores nativos, alertas
// Listo para publicar o usar
```

### ProRealCode (ProRealTime)
```prorealcode
// Código para ProRealTime
// Incluye: indicadores, condiciones, gestión de riesgo
// Listo para plataforma europea
```

### Uso del Generador

1. Diseña tu estrategia en el **Designer**
2. Haz clic en **"Exportar Código"**
3. Selecciona la plataforma de destino
4. Copia o descarga el código generado
5. Úsalo directamente en tu plataforma

## 📖 API Documentation

### Endpoints Principales

#### `GET /health`
Health check del servidor

**Respuesta:**
```json
{
  "status": "ok"
}
```

#### `GET /api/v1/strategies`
Obtiene la lista de estrategias del usuario

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Estrategia RSI + SMA",
    "description": "...",
    "type": "momentum",
    "indicators": ["RSI", "SMA"],
    "timeframe": "1h",
    "win_rate": 68.5,
    "total_trades": 152,
    "profit_factor": 1.85,
    "status": "active",
    "created_at": "2025-01-15T10:30:00Z"
  }
]
```

#### `GET /api/v1/templates`
Obtiene plantillas de estrategias predefinidas

#### `POST /api/v1/generate-code`
Genera código ejecutable a partir de una estrategia

**Request Body:**
```json
{
  "strategy": {
    "name": "Mi Estrategia",
    "timeframe": "1h",
    "positionSizing": {
      "type": "fixed_lots",
      "value": 0.1
    },
    "variables": [],
    "entryBlocks": [...],
    "exitBlocks": [...],
    "stopLoss": {...},
    "takeProfit": {...}
  },
  "target": "python"  // "python" | "mql5" | "pinescript" | "prorealcode"
}
```

**Response:**
```json
{
  "success": true,
  "code": "# Generated code here...",
  "language": "python",
  "filename": "Mi_Estrategia.py"
}
```

### CORS Configuration

El backend acepta peticiones desde:
- `localhost:5173`, `5174`, `5175` (Vite dev server)
- `localhost:3000` (alternativa común)
- `127.0.0.1` en los mismos puertos

## 🎨 Tema y Colores

Kumo utiliza un tema oscuro profesional con acentos vibrantes:

### Colores Principales
- **Primary**: `#4F46E5` (Violeta) - Color principal de la marca
- **Background**: `#0B1120` (Azul noche oscuro) - Fondo principal
- **Surface**: `#1e293b` (Gris oscuro) - Tarjetas y paneles
- **Orange**: `#FB923C` - Acentos e interacciones
- **Pink**: `#F472B6` - Gradientes destacados
- **Purple**: `#A78BFA` - Gradientes secundarios

### Gradientes Destacados
1. **Violeta → Púrpura**: Botones primarios estándar
2. **Naranja → Rosa**: CTAs muy destacados (Hero, acciones principales)
3. **Púrpura → Rosa → Naranja**: Títulos especiales y hero sections

### Interacciones
- **Hover principal**: Naranja (`#FB923C`)
- **Transiciones**: 200-300ms
- **Cards hover**: Borde naranja con glow sutil
- **Botones**: Gradientes con efecto hover

## 📚 Documentación Adicional

- **[QUICKSTART.md](QUICKSTART.md)**: Guía rápida para empezar
- **[SETUP.md](SETUP.md)**: Instalación detallada paso a paso
- **[ESTRUCTURA.md](ESTRUCTURA.md)**: Arquitectura del proyecto
- **[COMANDOS.md](COMANDOS.md)**: Comandos útiles para desarrollo
- **[frontend/DESIGNER_GUIDE.md](frontend/DESIGNER_GUIDE.md)**: Guía del diseñador visual
- **[frontend/VARIABLES_GUIDE.md](frontend/VARIABLES_GUIDE.md)**: Sistema de variables
- **[frontend/src/data/ACTIONS_GUIDE.md](frontend/src/data/ACTIONS_GUIDE.md)**: Guía de acciones

## 🛠️ Tecnologías y Herramientas

### Dependencias Backend
```txt
fastapi==0.115.0
uvicorn==0.31.0
pydantic==2.9.2
pydantic-settings==2.5.2
python-dotenv==1.0.1
jinja2==3.1.4
```

### Dependencias Frontend
```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "typescript": "~5.6.2",
  "tailwindcss": "^3.4.17",
  "lucide-react": "^0.468.0"
}
```

## 🚧 Roadmap

### En Desarrollo
- [ ] Sistema de backtesting integrado
- [ ] Drag & Drop completo para indicadores
- [ ] Optimización de parámetros
- [ ] Análisis de mercado en tiempo real

### Futuras Características
- [ ] Integración con brokers reales
- [ ] Trading paper (simulado)
- [ ] Alertas y notificaciones
- [ ] Dashboard de métricas avanzadas
- [ ] Marketplace de estrategias
- [ ] API pública para integraciones

## 🤝 Contribución

Este proyecto está en desarrollo activo. Las contribuciones son bienvenidas.

### Cómo Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de uso privado.

## 👨‍💻 Autor

Desarrollado con ❤️ para traders algorítmicos

---

**Kumo** - *Donde las estrategias toman forma*

🌥️ Diseña • 🧪 Valida • 🚀 Exporta
