# 📊 Sistema de Diseñador de Estrategias

Este directorio contiene los datos y estructuras para el diseñador visual de estrategias de trading de Kumo.

## 📁 Estructura de Archivos

### `indicators.ts`
Define todos los indicadores técnicos disponibles, organizados en categorías:

- **Indicadores de Tendencia**: ADX, Bollinger Bands, CCI, Envelopes, Ichimoku, MA, SAR, StdDev
- **Osciladores**: ATR, Bears/Bulls Power, Chaikin, DeMarker, Force Index, MACD, Momentum, OsMA, RSI, RVI, Stochastic, Williams %R
- **Indicadores de Volumen**: A/D, MFI, OBV, Volumes
- **Bill Williams**: AC, Alligator, AO, Fractals, Gator, BW MFI

```typescript
export interface Indicator {
  value: string;        // Identificador único
  label: string;        // Nombre completo
  description?: string; // Descripción del indicador
}
```

### `conditions.ts`
Define las condiciones lógicas para comparar indicadores:

- **Comparadores**: Mayor que, Menor que, Igual a, Mayor/Menor o igual
- **Cruces**: Cruza por encima, Cruza por debajo
- **Rangos**: Entre, Fuera de rango

```typescript
export interface Condition {
  value: string;        // Identificador único
  label: string;        // Nombre de la condición
  symbol: string;       // Símbolo matemático (>, <, =, etc.)
  description?: string;
}
```

### `actions.ts`
Define las acciones que se ejecutan cuando se cumplen las condiciones:

- **Acciones de Entrada**: Comprar/Vender a mercado, límite o stop
- **Acciones de Salida**: Cerrar posiciones (todas, compras, ventas, parcial)
- **Gestión de Riesgo**: Stop Loss, Take Profit, Trailing Stop, Breakeven, Modificar posición

```typescript
export interface Action {
  value: string;
  label: string;
  icon: string;        // Emoji/icono
  description: string;
  category: 'entry' | 'exit' | 'management';
}
```

## 🔧 Tipos en `/types/strategy.ts`

### StrategyRule
Una regla individual que compara un indicador con un valor:

```typescript
{
  id: string;
  indicator: string;      // e.g., 'rsi'
  condition: string;      // e.g., 'greater_than'
  value: string | number; // e.g., 70
  logicalOperator?: 'and' | 'or';
}
```

### StrategyBlock
Un bloque de condiciones y acciones:

```typescript
{
  id: string;
  type: 'entry' | 'exit';
  name: string;
  rules: StrategyRule[];    // Condiciones
  actions: StrategyAction[]; // Acciones a ejecutar
  enabled: boolean;
}
```

### Strategy
La estrategia completa:

```typescript
{
  id?: number;
  name: string;
  description?: string;
  timeframe: string;        // '1h', '4h', '1d', etc.
  entryBlocks: StrategyBlock[];
  exitBlocks: StrategyBlock[];
}
```

## 🎨 Cómo Funciona el Diseñador

### 1. Añadir Indicadores
El usuario selecciona indicadores del panel lateral. Cada indicador se añade como una nueva regla al bloque activo.

### 2. Configurar Condiciones
Para cada indicador, el usuario:
- Selecciona una condición (>, <, cruza por encima, etc.)
- Define un valor de comparación
- Puede añadir múltiples reglas conectadas con AND/OR

### 3. Definir Acciones
Cuando las condiciones se cumplen, se ejecutan las acciones configuradas:
- Entradas: Comprar/Vender
- Salidas: Cerrar posiciones
- Gestión: Stop Loss, Take Profit, etc.

## 📋 Ejemplo de Estrategia

**Estrategia RSI Sobrevendido:**

```json
{
  "name": "RSI Sobrevendido + MACD",
  "timeframe": "1h",
  "entryBlocks": [
    {
      "name": "Condición de Entrada",
      "rules": [
        {
          "indicator": "rsi",
          "condition": "less_than",
          "value": 30,
          "logicalOperator": "and"
        },
        {
          "indicator": "macd",
          "condition": "crosses_above",
          "value": "signal_line"
        }
      ],
      "actions": [
        {
          "action": "buy_market"
        },
        {
          "action": "set_stop_loss",
          "parameters": { "pips": 50 }
        },
        {
          "action": "set_take_profit",
          "parameters": { "pips": 100 }
        }
      ]
    }
  ]
}
```

## ✅ Funcionalidades Implementadas

- [x] **Bloques de salida (exit)** - Condiciones para cerrar posiciones
- [x] **Parámetros avanzados** - Configuración completa de indicadores (períodos, desviaciones, métodos MA, etc.)
- [x] **Comparación entre indicadores** - Comparar un indicador con otro (ej: SMA(3) cruza SMA(10))
- [x] **Modal de configuración** - UI intuitiva para ajustar parámetros de indicadores
- [x] **Selector de valor** - Elegir entre valor numérico u otro indicador como comparación

## 🚀 Próximas Funcionalidades

- [ ] Validación de estrategias
- [ ] Templates de estrategias populares
- [ ] Exportación a MQL5/ProRealTime
- [ ] Backtesting integrado
- [ ] Optimización de parámetros
- [ ] Operadores OR entre reglas
- [ ] Parámetros de acciones (pips para SL/TP, etc.)

## 🎯 UI/UX

El diseñador sigue el esquema de colores de Kumo:
- **Indicadores**: Hover naranja
- **Reglas**: Fondo oscuro con borde naranja en hover
- **Acciones**: Verde para acciones positivas, Rojo para salidas
- **Bloques**: Cards con gradientes sutiles

