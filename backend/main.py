"""
Kumo - Trading Strategy Platform API
Backend principal con FastAPI
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from pydantic import BaseModel
from services.code_generator import CodeGenerator, get_file_extension
from services.backtest_engine import BacktestEngine
import random
from datetime import datetime, timedelta

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



# ============================================
# BACKTESTING
# ============================================

class BacktestRequest(BaseModel):
    """Modelo para la solicitud de backtesting"""
    strategy: Dict[str, Any]
    config: Dict[str, Any]


class BacktestResponse(BaseModel):
    """Modelo para la respuesta de backtesting"""
    success: bool
    strategyName: str
    symbol: str
    timeframe: str
    startDate: str
    endDate: str
    metrics: Dict[str, Any]
    trades: List[Dict[str, Any]]
    equityCurve: List[Dict[str, Any]]
    error: str | None = None


def generate_mock_backtest_data(strategy: Dict[str, Any], config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Genera datos de backtest simulados para demostración
    En producción, esto sería reemplazado por un motor de backtesting real
    """
    symbol = config.get('symbol', 'EURUSD')
    timeframe = config.get('timeframe', '1h')
    start_date = datetime.fromisoformat(config.get('startDate', '2024-01-01'))
    end_date = datetime.fromisoformat(config.get('endDate', '2024-12-31'))
    initial_balance = config.get('initialBalance', 10000)
    commission = config.get('commission', 0.02) / 100
    slippage = config.get('slippage', 2)
    
    # Generar trades simulados
    num_trades = random.randint(50, 200)
    trades = []
    equity_curve = []
    
    current_balance = initial_balance
    max_balance = initial_balance
    max_drawdown = 0
    max_drawdown_percent = 0
    
    consecutive_wins = 0
    consecutive_losses = 0
    max_consecutive_wins = 0
    max_consecutive_losses = 0
    
    winning_trades = 0
    losing_trades = 0
    total_profit = 0
    total_loss = 0
    
    largest_win = 0
    largest_loss = 0
    
    time_in_market_seconds = 0
    
    # Fecha inicial para equity curve
    equity_curve.append({
        'time': start_date.isoformat(),
        'equity': initial_balance,
        'drawdown': 0
    })
    
    # Generar trades
    current_date = start_date
    for i in range(num_trades):
        # Calcular fecha de entrada (distribuir uniformemente)
        days_range = (end_date - start_date).days
        trade_day_offset = (days_range / num_trades) * i
        entry_time = start_date + timedelta(days=trade_day_offset)
        
        # Duración del trade (random entre 1 hora y 7 días)
        duration_seconds = random.randint(3600, 604800)
        exit_time = entry_time + timedelta(seconds=duration_seconds)
        
        time_in_market_seconds += duration_seconds
        
        # Tipo de trade
        trade_type = random.choice(['long', 'short'])
        
        # Simular precio (alrededor de 1.1000 para EURUSD)
        base_price = 1.1000
        entry_price = base_price + random.uniform(-0.02, 0.02)
        
        # Probabilidad de ganar (60% para simular una estrategia decente)
        is_win = random.random() < 0.60
        
        if is_win:
            # Ganancia entre 10 y 200 pips
            pips = random.uniform(10, 200)
            if trade_type == 'long':
                exit_price = entry_price + (pips * 0.0001)
            else:
                exit_price = entry_price - (pips * 0.0001)
        else:
            # Pérdida entre 5 y 100 pips
            pips = -random.uniform(5, 100)
            if trade_type == 'long':
                exit_price = entry_price + (pips * 0.0001)
            else:
                exit_price = entry_price - (pips * 0.0001)
        
        # Calcular profit
        size = 1.0  # 1 lote estándar
        pip_value = 10  # $10 por pip para lote estándar
        
        if trade_type == 'long':
            profit_pips = (exit_price - entry_price) / 0.0001
        else:
            profit_pips = (entry_price - exit_price) / 0.0001
        
        gross_profit = profit_pips * pip_value
        commission_cost = abs(gross_profit) * commission
        profit = gross_profit - commission_cost
        
        profit_percent = (profit / current_balance) * 100
        
        # Actualizar balance
        current_balance += profit
        
        # Actualizar métricas
        if profit > 0:
            winning_trades += 1
            total_profit += profit
            consecutive_wins += 1
            consecutive_losses = 0
            max_consecutive_wins = max(max_consecutive_wins, consecutive_wins)
            largest_win = max(largest_win, profit)
        else:
            losing_trades += 1
            total_loss += abs(profit)
            consecutive_losses += 1
            consecutive_wins = 0
            max_consecutive_losses = max(max_consecutive_losses, consecutive_losses)
            largest_loss = min(largest_loss, profit)
        
        # Actualizar drawdown
        max_balance = max(max_balance, current_balance)
        drawdown = max_balance - current_balance
        drawdown_percent = (drawdown / max_balance) * 100 if max_balance > 0 else 0
        max_drawdown = max(max_drawdown, drawdown)
        max_drawdown_percent = max(max_drawdown_percent, drawdown_percent)
        
        # Crear trade
        trade = {
            'id': i + 1,
            'entryTime': entry_time.isoformat(),
            'exitTime': exit_time.isoformat(),
            'type': trade_type,
            'entryPrice': round(entry_price, 5),
            'exitPrice': round(exit_price, 5),
            'size': size,
            'profit': round(profit, 2),
            'profitPercent': round(profit_percent, 2),
            'pips': round(profit_pips, 1),
            'duration': duration_seconds,
            'entryReason': random.choice(['RSI Oversold', 'MA Crossover', 'Breakout', 'Support Level']),
            'exitReason': random.choice(['Take Profit', 'Stop Loss', 'Trailing Stop', 'Signal Reversal'])
        }
        
        trades.append(trade)
        
        # Añadir punto a la curva de equity
        equity_curve.append({
            'time': exit_time.isoformat(),
            'equity': round(current_balance, 2),
            'drawdown': round(drawdown_percent, 2)
        })
    
    # Calcular métricas finales
    total_trades = num_trades
    win_rate = (winning_trades / total_trades * 100) if total_trades > 0 else 0
    profit_factor = (total_profit / total_loss) if total_loss > 0 else 0
    average_win = total_profit / winning_trades if winning_trades > 0 else 0
    average_loss = -total_loss / losing_trades if losing_trades > 0 else 0
    net_profit = current_balance - initial_balance
    return_percent = (net_profit / initial_balance) * 100
    
    # Expectancy
    expectancy = (win_rate / 100 * average_win) + ((1 - win_rate / 100) * average_loss)
    
    # Time in market
    total_period_seconds = (end_date - start_date).total_seconds()
    time_in_market_percent = (time_in_market_seconds / total_period_seconds) * 100
    
    # Average trade duration
    average_trade_duration_hours = (time_in_market_seconds / total_trades / 3600) if total_trades > 0 else 0
    
    # Sharpe Ratio (simplificado)
    if total_trades > 0:
        returns = [t['profitPercent'] for t in trades]
        avg_return = sum(returns) / len(returns)
        std_dev = (sum((r - avg_return) ** 2 for r in returns) / len(returns)) ** 0.5
        sharpe_ratio = (avg_return / std_dev * (252 ** 0.5)) if std_dev > 0 else 0
    else:
        sharpe_ratio = 0
    
    # Sortino Ratio (simplificado - solo desviación de pérdidas)
    losing_returns = [t['profitPercent'] for t in trades if t['profit'] < 0]
    if losing_returns:
        downside_std = (sum(r ** 2 for r in losing_returns) / len(losing_returns)) ** 0.5
        sortino_ratio = (return_percent / downside_std * (252 ** 0.5)) if downside_std > 0 else 0
    else:
        sortino_ratio = sharpe_ratio
    
    # Calmar Ratio
    calmar_ratio = abs(return_percent / max_drawdown_percent) if max_drawdown_percent > 0 else 0
    
    metrics = {
        'totalTrades': total_trades,
        'winningTrades': winning_trades,
        'losingTrades': losing_trades,
        'winRate': round(win_rate, 2),
        'totalProfit': round(total_profit, 2),
        'totalLoss': round(total_loss, 2),
        'netProfit': round(net_profit, 2),
        'profitFactor': round(profit_factor, 2),
        'averageWin': round(average_win, 2),
        'averageLoss': round(average_loss, 2),
        'largestWin': round(largest_win, 2),
        'largestLoss': round(largest_loss, 2),
        'sharpeRatio': round(sharpe_ratio, 2),
        'sortinoRatio': round(sortino_ratio, 2),
        'calmarRatio': round(calmar_ratio, 2),
        'maxDrawdown': round(max_drawdown, 2),
        'maxDrawdownPercent': round(max_drawdown_percent, 2),
        'maxDrawdownDuration': random.randint(5, 30),  # días (simplificado)
        'timeInMarket': round(time_in_market_percent, 2),
        'averageTradeDuration': round(average_trade_duration_hours, 2),
        'consecutiveWins': max_consecutive_wins,
        'consecutiveLosses': max_consecutive_losses,
        'expectancy': round(expectancy, 2),
        'initialBalance': initial_balance,
        'finalBalance': round(current_balance, 2),
        'returnPercent': round(return_percent, 2)
    }
    
    return {
        'success': True,
        'strategyName': strategy.get('name', 'Strategy'),
        'symbol': symbol,
        'timeframe': timeframe,
        'startDate': start_date.isoformat(),
        'endDate': end_date.isoformat(),
        'metrics': metrics,
        'trades': trades,
        'equityCurve': equity_curve
    }


@app.post("/api/v1/backtest", response_model=BacktestResponse)
async def run_backtest(request: BacktestRequest):
    """
    Ejecuta un backtest de una estrategia con configuración específica
    
    Parámetros:
    - strategy: Objeto de estrategia con todas las reglas
    - config: Configuración del backtest (símbolo, fechas, balance inicial, etc.)
    
    Retorna:
    - Resultados completos del backtest con métricas, trades y curva de equity
    """
    try:
        strategy = request.strategy
        config = request.config
        
        print(f">> Ejecutando backtest para: {strategy.get('name', 'Unknown')}")
        
        # Validar que haya estrategia
        if not strategy:
            raise HTTPException(status_code=400, detail="Estrategia no proporcionada")
        
        # Validar que haya bloques de entrada
        if not strategy.get('entryBlocks') or len(strategy.get('entryBlocks', [])) == 0:
            raise HTTPException(
                status_code=400, 
                detail="La estrategia debe tener al menos un bloque de entrada"
            )
        
        # Ejecutar backtest con el motor real
        print(f">> Iniciando motor de backtest...")
        engine = BacktestEngine(strategy, config)
        result = engine.run()
        
        print(f">> Backtest completado: {result.get('metrics', {}).get('totalTrades', 0)} trades")
        
        return BacktestResponse(**result)
        
    except HTTPException as he:
        print(f">> HTTPException: {he.detail}")
        raise he
    except Exception as e:
        import traceback
        error_detail = traceback.format_exc()
        print(f">> Error en backtest: {str(e)}")
        print(f"Traceback:\n{error_detail}")
        
        return BacktestResponse(
            success=False,
            strategyName=strategy.get('name', '') if strategy else '',
            symbol=config.get('symbol', '') if config else '',
            timeframe=config.get('timeframe', '') if config else '',
            startDate=config.get('startDate', '') if config else '',
            endDate=config.get('endDate', '') if config else '',
            metrics={},
            trades=[],
            equityCurve=[],
            error=f"{str(e)}\n\nVer logs del servidor para más detalles."
        )


if __name__ == "__main__":
    import uvicorn
    # Ejecutar el servidor en el puerto 8000
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

