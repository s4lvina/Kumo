"""
Kumo - Trading Strategy Platform API
Backend principal con FastAPI
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from pydantic import BaseModel
from services.code_generator import CodeGenerator, get_file_extension

# Inicializar la aplicación FastAPI
app = FastAPI(
    title="Kumo API",
    description="API para diseñar, validar y exportar estrategias de trading algorítmico",
    version="1.0.0"
)

# Inicializar servicios
code_generator = CodeGenerator()

# Configurar CORS para permitir peticiones desde el frontend
# En desarrollo, el frontend puede correr en diferentes puertos
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Puerto por defecto de Vite
        "http://localhost:5174",  # Puerto alternativo de Vite
        "http://localhost:5175",  # Puerto alternativo de Vite
        "http://localhost:3000",  # Puerto alternativo común
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)


# ============================================
# ENDPOINTS
# ============================================

@app.get("/")
async def root():
    """Endpoint raíz de bienvenida"""
    return {
        "message": "Bienvenido a Kumo API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Endpoint de health check para verificar que el servidor está funcionando"""
    return {"status": "ok"}


@app.get("/api/v1/strategies")
async def get_strategies() -> List[Dict[str, Any]]:
    """
    Obtiene la lista de estrategias de trading disponibles
    
    Por ahora devuelve datos mock (falsos) para testing
    """
    # Mock data - estrategias de trading falsas
    mock_strategies = [
        {
            "id": 1,
            "name": "Estrategia RSI + SMA",
            "description": "Compra cuando RSI < 30 y precio > SMA(200), vende cuando RSI > 70",
            "type": "momentum",
            "indicators": ["RSI", "SMA"],
            "timeframe": "1h",
            "win_rate": 68.5,
            "total_trades": 152,
            "status": "active",
            "created_at": "2025-01-15T10:30:00Z"
        },
        {
            "id": 2,
            "name": "Cruce de Medias Móviles",
            "description": "Estrategia clásica: compra cuando SMA(50) cruza por encima de SMA(200)",
            "type": "trend_following",
            "indicators": ["SMA"],
            "timeframe": "4h",
            "win_rate": 62.3,
            "total_trades": 89,
            "status": "active",
            "created_at": "2025-02-01T14:20:00Z"
        },
        {
            "id": 3,
            "name": "Bollinger Bands Breakout",
            "description": "Compra en ruptura de banda inferior, vende en banda superior",
            "type": "volatility",
            "indicators": ["Bollinger Bands", "Volume"],
            "timeframe": "15m",
            "win_rate": 71.2,
            "total_trades": 234,
            "status": "testing",
            "created_at": "2025-03-10T09:45:00Z"
        }
    ]
    
    return mock_strategies


@app.get("/api/v1/templates")
async def get_templates() -> List[Dict[str, Any]]:
    """
    Obtiene plantillas de estrategias predefinidas
    """
    mock_templates = [
        {
            "id": 1,
            "name": "Plantilla RSI Básica",
            "category": "momentum",
            "complexity": "beginner",
            "description": "Plantilla simple usando el indicador RSI"
        },
        {
            "id": 2,
            "name": "Plantilla Tendencial Avanzada",
            "category": "trend",
            "complexity": "advanced",
            "description": "Combinación de múltiples indicadores de tendencia"
        }
    ]
    
    return mock_templates


# ============================================
# CODE GENERATION
# ============================================

class CodeGenerationRequest(BaseModel):
    """Modelo para la solicitud de generación de código"""
    strategy: Dict[str, Any]
    target: str  # 'python', 'mql5', 'pinescript'


class CodeGenerationResponse(BaseModel):
    """Modelo para la respuesta de generación de código"""
    success: bool
    code: str | None = None
    language: str | None = None
    filename: str | None = None
    error: str | None = None


@app.post("/api/v1/generate-code", response_model=CodeGenerationResponse)
async def generate_code(request: CodeGenerationRequest):
    """
    Genera código ejecutable a partir de una estrategia
    
    Soporta los siguientes targets:
    - python: Genera código para Backtrader
    - mql5: Genera código para MetaTrader 5
    - pinescript: Genera código para TradingView
    - prorealcode: Genera código para ProRealTime
    """
    try:
        strategy = request.strategy
        target = request.target.lower()
        
        # Validar target
        valid_targets = ['python', 'mql5', 'pinescript', 'prorealcode']
        if target not in valid_targets:
            raise HTTPException(
                status_code=400,
                detail=f"Target '{target}' no soportado. Usa: {', '.join(valid_targets)}"
            )
        
        # Generar código según el target
        if target == 'python':
            code = code_generator.generate_python(strategy)
        elif target == 'mql5':
            code = code_generator.generate_mql5(strategy)
        elif target == 'pinescript':
            code = code_generator.generate_pinescript(strategy)
        elif target == 'prorealcode':
            code = code_generator.generate_prorealcode(strategy)
        else:
            raise HTTPException(status_code=400, detail=f"Target no implementado: {target}")
        
        # Generar nombre de archivo
        strategy_name = strategy.get('name', 'strategy').replace(' ', '_')
        filename = f"{strategy_name}.{get_file_extension(target)}"
        
        return CodeGenerationResponse(
            success=True,
            code=code,
            language=target,
            filename=filename
        )
        
    except Exception as e:
        return CodeGenerationResponse(
            success=False,
            error=str(e)
        )


if __name__ == "__main__":
    import uvicorn
    # Ejecutar el servidor en el puerto 8000
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

