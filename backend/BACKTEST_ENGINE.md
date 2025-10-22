# 🚀 Motor de Backtesting - Kumo

## Descripción General

El motor de backtesting de Kumo es un sistema completo que procesa estrategias diseñadas visualmente y las ejecuta contra datos históricos para generar resultados precisos.

## Arquitectura

### Componentes Principales

#### 1. **BacktestEngine**
Clase principal que orquesta todo el proceso de backtesting.

**Responsabilidades:**
- Generar/cargar datos históricos
- Iterar sobre cada barra de precio
- Evaluar condiciones de entrada/salida
- Gestionar trades abiertos
- Calcular métricas

#### 2. **Trade**
Representa una operación individual de trading.

**Atributos:**
- `id`: Identificador único
- `type`: 'long' o 'short'
- `entry_time`, `exit_time`: Timestamps
- `entry_price`, `exit_price`: Precios
- `size`: Tamaño en lotes
- `profit`, `profit_percent`: Resultados
- `pips`: Ganancia en pips
- `duration`: Duración en segundos
- `entry_reason`, `exit_reason`: Descripción

#### 3. **IndicatorCalculator**
Calcula indicadores técnicos.

**Indicadores Soportados:**
- SMA (Simple Moving Average)
- EMA (Exponential Moving Average)
- RSI (Relative Strength Index)
- MACD (Moving Average Convergence Divergence)

## Flujo de Ejecución

```
1. Inicialización
   ├── Cargar estrategia
   ├── Cargar configuración
   └── Inicializar balance

2. Generación de Datos
   ├── Crear/cargar barras OHLCV
   ├── Aplicar timeframe
   └── Rango de fechas

3. Bucle Principal
   ├── Por cada barra:
   │   ├── Actualizar historial de precios
   │   ├── ¿Hay trade abierto?
   │   │   ├── Sí → Verificar salidas
   │   │   │   ├── Check Stop Loss
   │   │   │   ├── Check Take Profit
   │   │   │   ├── Check señales salida
   │   │   │   └── Cerrar si corresponde
   │   │   └── No → Verificar entradas
   │   │       ├── Evaluar condiciones
   │   │       ├── Aplicar slippage
   │   │       └── Abrir trade si señal
   │   └── Actualizar equity curve

4. Finalización
   ├── Cerrar trades pendientes
   ├── Calcular métricas
   └── Retornar resultados
```

## Evaluación de Estrategias

### 1. Procesamiento de Bloques

Cada estrategia tiene:
- **Entry Blocks**: Condiciones de entrada
- **Exit Blocks**: Condiciones de salida

### 2. Evaluación de Reglas

Cada bloque contiene múltiples reglas que se evalúan con lógica AND:

```python
for rule in block.rules:
    indicator_value = calculate_indicator(rule.indicator)
    comparison_value = get_comparison_value(rule.comparisonValue)
    
    if not condition_met(indicator_value, rule.condition, comparison_value):
        return False  # Una regla falló
        
return True  # Todas las reglas se cumplieron
```

### 3. Indicadores Soportados

```python
# Precio básico
- close, open, high, low

# Medias móviles
- sma(period)
- ema(period)

# Osciladores
- rsi(period)

# Tendencia
- macd(fast, slow, signal)
```

### 4. Condiciones Soportadas

```python
- greater_than (>)
- less_than (<)
- equal (==)
- greater_equal (>=)
- less_equal (<=)
- crosses_above (cruce alcista)
- crosses_below (cruce bajista)
```

## Gestión de Riesgo

### Stop Loss

```python
if stop_loss.enabled:
    sl_pips = stop_loss.value
    
    if trade.type == 'long':
        sl_price = entry_price - (sl_pips * 0.0001)
        if current_price <= sl_price:
            close_trade('stop_loss')
    else:
        sl_price = entry_price + (sl_pips * 0.0001)
        if current_price >= sl_price:
            close_trade('stop_loss')
```

### Take Profit

```python
if take_profit.enabled:
    tp_pips = take_profit.value
    
    if trade.type == 'long':
        tp_price = entry_price + (tp_pips * 0.0001)
        if current_price >= tp_price:
            close_trade('take_profit')
    else:
        tp_price = entry_price - (tp_pips * 0.0001)
        if current_price <= tp_price:
            close_trade('take_profit')
```

### Position Sizing

```python
if sizing.type == 'fixed_lots':
    size = sizing.value  # Ej: 0.1 lotes
    
elif sizing.type == 'percent_balance':
    risk_amount = balance * (sizing.value / 100)
    size = risk_amount / 100000  # Convertir a lotes
    
elif sizing.type == 'risk_percent':
    risk_amount = balance * (sizing.value / 100)
    size = risk_amount / 100000
```

## Cálculo de Métricas

### Métricas Básicas

```python
win_rate = (winning_trades / total_trades) * 100
profit_factor = total_profit / abs(total_loss)
net_profit = final_balance - initial_balance
return_percent = (net_profit / initial_balance) * 100
```

### Drawdown

```python
for each equity point:
    max_balance = max(max_balance, current_equity)
    drawdown = max_balance - current_equity
    drawdown_percent = (drawdown / max_balance) * 100
    max_drawdown = max(max_drawdown, drawdown)
```

### Sharpe Ratio

```python
returns = [trade.profit_percent for trade in trades]
avg_return = mean(returns)
std_return = std_deviation(returns)
sharpe_ratio = (avg_return / std_return) * sqrt(252)
```

### Sortino Ratio

```python
negative_returns = [r for r in returns if r < 0]
downside_std = std_deviation(negative_returns)
sortino_ratio = (avg_return / downside_std) * sqrt(252)
```

### Calmar Ratio

```python
calmar_ratio = abs(annual_return / max_drawdown_percent)
```

### Expectancy

```python
expectancy = (win_rate * avg_win) + ((1 - win_rate) * avg_loss)
```

## Datos de Precio

### Generación Simulada (Actual)

```python
# Random walk con tendencia periódica
for i in range(num_bars):
    change = np.random.normal(0, 0.0005)  # Volatilidad
    trend = 0.00001 if i % 100 < 60 else -0.00001
    current_price += change + trend
    
    # Generar OHLC
    bar = {
        'time': start_date + timedelta(minutes=i * tf_minutes),
        'open': price + random_noise,
        'high': price + abs(random_noise),
        'low': price - abs(random_noise),
        'close': price,
        'volume': random(100, 1000)
    }
```

### Integración con Datos Reales (Futuro)

Para datos reales, reemplazar `generate_price_data()` con:

```python
def load_real_data(self, symbol: str, timeframe: str, 
                   start_date: str, end_date: str) -> List[Dict]:
    """
    Cargar datos desde proveedor externo
    Opciones:
    - yfinance (Yahoo Finance)
    - Alpha Vantage
    - Polygon.io
    - Interactive Brokers
    - MetaTrader 5
    """
    import yfinance as yf
    
    ticker = yf.Ticker(symbol)
    df = ticker.history(start=start_date, end=end_date, interval=timeframe)
    
    bars = []
    for index, row in df.iterrows():
        bars.append({
            'time': index,
            'open': row['Open'],
            'high': row['High'],
            'low': row['Low'],
            'close': row['Close'],
            'volume': row['Volume']
        })
    
    return bars
```

## Comisiones y Slippage

### Comisiones

```python
commission_rate = 0.0002  # 0.02%
commission = abs(trade.profit) * commission_rate
trade.profit -= commission
```

### Slippage

```python
slippage_pips = 2  # pips
slippage_adjustment = slippage_pips * 0.0001

if entry_type == 'long':
    entry_price += slippage_adjustment
else:
    entry_price -= slippage_adjustment
```

## Limitaciones Actuales

### 1. Datos Simulados
- No son datos reales del mercado
- No reflejan condiciones exactas
- Volatilidad simplificada

### 2. Indicadores Básicos
- Solo indicadores principales implementados
- Sin indicadores personalizados
- Cálculos simplificados

### 3. Ejecución Simplificada
- Asume ejecución perfecta
- No considera spread bid/ask real
- No modela gaps de mercado

### 4. Sin Optimización
- No hay búsqueda de parámetros óptimos
- No hay walk-forward analysis
- No hay validación cruzada

## Próximas Mejoras

### Fase 1: Datos Reales
```python
# Integrar proveedores de datos
- yfinance para acciones
- CCXT para crypto
- MetaTrader 5 para forex
- Alpha Vantage API
```

### Fase 2: Indicadores Avanzados
```python
# Más indicadores técnicos
- Bollinger Bands
- ATR (Average True Range)
- Stochastic
- ADX (Average Directional Index)
- Ichimoku
- Volume indicators
```

### Fase 3: Ejecución Realista
```python
# Modelado más preciso
- Spread bid/ask dinámico
- Gaps de mercado
- Liquidez y slippage variable
- Horarios de mercado
- Eventos económicos
```

### Fase 4: Optimización
```python
# Búsqueda de parámetros
- Grid search
- Genetic algorithms
- Walk-forward optimization
- Monte Carlo simulation
```

### Fase 5: Análisis Avanzado
```python
# Análisis profundo
- Robustness testing
- Sensibilidad a parámetros
- Correlación entre estrategias
- Portfolio backtesting
```

## Ejemplo de Uso

### Estrategia Simple: RSI Oversold/Overbought

```python
strategy = {
    'name': 'RSI Extremos',
    'timeframe': '1h',
    'positionSizing': {'type': 'fixed_lots', 'value': 0.1},
    'entryBlocks': [{
        'id': 'entry-1',
        'type': 'entry',
        'rules': [{
            'indicator': {
                'indicator': 'rsi',
                'parameters': {'period': 14}
            },
            'condition': 'less_than',
            'comparisonValue': {
                'type': 'number',
                'numericValue': 30
            }
        }],
        'actions': [{'action': 'open_long'}]
    }],
    'exitBlocks': [{
        'id': 'exit-1',
        'type': 'exit',
        'rules': [{
            'indicator': {
                'indicator': 'rsi',
                'parameters': {'period': 14}
            },
            'condition': 'greater_than',
            'comparisonValue': {
                'type': 'number',
                'numericValue': 70
            }
        }],
        'actions': [{'action': 'close_position'}]
    }],
    'stopLoss': {
        'enabled': True,
        'type': 'pips',
        'value': 50
    },
    'takeProfit': {
        'enabled': True,
        'type': 'pips',
        'value': 100
    }
}

config = {
    'symbol': 'EURUSD',
    'timeframe': '1h',
    'startDate': '2024-01-01',
    'endDate': '2024-12-31',
    'initialBalance': 10000,
    'commission': 0.02,
    'slippage': 2
}

engine = BacktestEngine(strategy, config)
results = engine.run()
```

### Resultado Esperado

```python
{
    'success': True,
    'strategyName': 'RSI Extremos',
    'symbol': 'EURUSD',
    'timeframe': '1h',
    'metrics': {
        'totalTrades': 45,
        'winRate': 62.22,
        'netProfit': 1234.56,
        'profitFactor': 1.85,
        'maxDrawdown': 345.67,
        'sharpeRatio': 1.42,
        ...
    },
    'trades': [...],
    'equityCurve': [...]
}
```

## Debugging

### Logs Útiles

```python
# Añadir al código
print(f"Evaluando entrada en {bar['time']}")
print(f"RSI = {rsi_value}, Condición: < 30")
print(f"Condición cumplida: {rsi_value < 30}")
```

### Verificar Estrategia

```python
# Antes del backtest
print(f"Bloques de entrada: {len(strategy['entryBlocks'])}")
print(f"Bloques de salida: {len(strategy['exitBlocks'])}")
print(f"Stop Loss: {strategy.get('stopLoss', {}).get('enabled', False)}")
```

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Estado**: Beta - Motor funcional con datos simulados

