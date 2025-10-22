# 📊 Indicadores Soportados - Backtest Engine

## ✅ Indicadores Implementados

### **1. SMA (Simple Moving Average)**
- **Parámetro**: `period` (por defecto: 14)
- **Uso**: Promedio simple de los últimos N cierres
- **Ejemplo**: SMA(50) = promedio de los últimos 50 cierres

### **2. EMA (Exponential Moving Average)**
- **Parámetro**: `period` (por defecto: 14)
- **Uso**: Promedio exponencial que da más peso a precios recientes
- **Ejemplo**: EMA(21) da más peso a las últimas 21 velas

### **3. RSI (Relative Strength Index)**
- **Parámetro**: `period` (por defecto: 14)
- **Uso**: Oscilador de momentum entre 0-100
- **Valores típicos**: 
  - RSI < 30 → Sobreventa
  - RSI > 70 → Sobrecompra
- **Ejemplo**: RSI(14) < 30 para entrada en sobreventa

### **4. MACD (Moving Average Convergence Divergence)**
- **Parámetros**: fast=12, slow=26, signal=9
- **Uso**: Indicador de tendencia y momentum
- **Retorna**: MACD Line (diferencia entre EMAs)
- **Nota**: Actualmente simplificado, retorna solo la línea MACD

### **5. Stochastic Oscillator** ✨ (NUEVO)
- **Parámetro**: `period` (por defecto: 14)
- **Uso**: Oscilador que compara el cierre con el rango de precios
- **Fórmula**: %K = (Close - Low) / (High - Low) * 100
- **Valores**: 0-100
  - Stochastic < 20 → Sobreventa
  - Stochastic > 80 → Sobrecompra
- **Ejemplo**: Stochastic(14) < 20 para entrada en sobreventa

### **6. Precios Directos**
- **close**: Precio de cierre de la vela actual
- **open**: Precio de apertura
- **high**: Precio máximo
- **low**: Precio mínimo

---

## 📋 Condiciones Soportadas

### **Comparadores:**
- `greater_than` (>)
- `less_than` (<)
- `equal` (=)
- `greater_equal` (>=)
- `less_equal` (<=)
- `crosses_above` (cruza por encima) - Simplificado como `>`
- `crosses_below` (cruza por debajo) - Simplificado como `<`

---

## 💡 Ejemplos de Estrategias

### **Estrategia 1: Cruce de Medias Móviles**
```
Entry:
  - SMA(14) > SMA(50)
Actions:
  - Open Long
```

### **Estrategia 2: RSI Sobreventa**
```
Entry:
  - RSI(14) < 30
Actions:
  - Open Long

Exit:
  - RSI(14) > 70
Actions:
  - Close Position
```

### **Estrategia 3: Stochastic Reversión**
```
Entry:
  - Stochastic(14) < 20
Actions:
  - Open Long

Exit:
  - Stochastic(14) > 80
Actions:
  - Close Position
```

### **Estrategia 4: Combinada (AND lógico)**
```
Entry:
  - RSI(14) < 30
  - Close > SMA(50)
Actions:
  - Open Long
```

---

## ⚠️ Limitaciones Actuales

### **Datos Simulados**
- El motor actualmente usa datos de precio **simulados** (random walk)
- En producción, se debe reemplazar con datos reales de un proveedor (MT5, OANDA, etc.)

### **Indicadores Simplificados**
- **MACD**: Solo retorna la línea MACD, no la línea de señal completa
- **Stochastic**: %D simplificado
- **Cruces**: No verifican el cruce entre barras consecutivas, solo comparan valores

### **No Implementados Aún**
- Bollinger Bands
- ATR (Average True Range)
- Ichimoku
- Volume indicators
- Custom indicators

---

## 🚀 Cómo Funciona Internamente

### **1. Cálculo de Indicadores**
Cada indicador necesita un **período de "calentamiento"**:
- SMA(50) necesita 50 barras para calcular
- RSI(14) necesita 14 barras
- Stochastic(14) necesita 14 barras

Por eso, las primeras barras del backtest no generarán señales.

### **2. Historial de Precios**
El motor mantiene tres historiales:
- `price_history`: Cierres
- `high_history`: Máximos
- `low_history`: Mínimos

Esto permite calcular indicadores que necesitan más que solo el cierre (como Stochastic).

### **3. Evaluación de Reglas**
Cada regla se evalúa en cada barra:
1. Se calcula el valor del indicador
2. Se calcula el valor de comparación (número o indicador)
3. Se aplica la condición (>, <, etc.)
4. Si todas las reglas son TRUE (AND lógico), se genera señal

---

## 📊 Próximos Indicadores Planeados

- [ ] Bollinger Bands
- [ ] ATR (Average True Range)
- [ ] ADX (Average Directional Index)
- [ ] Volume Profile
- [ ] Ichimoku Cloud
- [ ] Parabolic SAR
- [ ] Williams %R

---

## 🔧 Cómo Añadir un Nuevo Indicador

### **Paso 1: Implementar el Cálculo**
En `IndicatorCalculator`, añade un método estático:

```python
@staticmethod
def calculate_my_indicator(prices: List[float], period: int = 14) -> Optional[float]:
    if len(prices) < period:
        return None
    
    # Tu lógica aquí
    result = sum(prices[-period:]) / period
    
    return result
```

### **Paso 2: Añadir al Switch**
En `calculate_indicator_value`:

```python
elif indicator_type == 'my_indicator':
    return IndicatorCalculator.calculate_my_indicator(price_history, period)
```

### **Paso 3: Actualizar el Frontend**
En `frontend/src/config/indicators.ts`, añade:

```typescript
{
  id: 'my_indicator',
  name: 'Mi Indicador',
  category: 'trend',
  parameters: [
    { name: 'period', type: 'number', default: 14, min: 1, max: 200 }
  ]
}
```

---

**Última actualización**: 22 de octubre de 2025
**Versión**: 1.1.0 (con Stochastic)

