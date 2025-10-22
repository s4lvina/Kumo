# Kumo Backend

Backend de la aplicación Kumo construido con FastAPI.

## 🚀 Inicio Rápido

### Requisitos previos
- Python 3.10 o superior
- pip (gestor de paquetes de Python)

### Instalación

1. Crear un entorno virtual (recomendado):
```bash
python -m venv venv
```

2. Activar el entorno virtual:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

### Ejecución

Iniciar el servidor de desarrollo:
```bash
uvicorn main:app --reload
```

El servidor estará disponible en: http://localhost:8000

## 📚 Documentación API

FastAPI genera documentación automática:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔗 Endpoints Disponibles

- `GET /` - Endpoint raíz de bienvenida
- `GET /health` - Health check del servidor
- `GET /api/v1/strategies` - Obtener lista de estrategias
- `GET /api/v1/templates` - Obtener plantillas de estrategias

## 🛠️ Estructura del Proyecto

```
backend/
├── main.py              # Aplicación principal
├── requirements.txt     # Dependencias
├── .env.example        # Variables de entorno de ejemplo
└── README.md           # Este archivo
```

