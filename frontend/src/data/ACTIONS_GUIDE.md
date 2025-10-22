# 🎯 Guía de Acciones Configurables

## 📋 Introducción

Las acciones en Kumo definen **qué hacer** cuando se cumplen las condiciones de una estrategia. Muchas acciones tienen **parámetros configurables** que permiten personalizar su comportamiento.

---

## 🛡️ Stop Loss (Establecer Stop Loss)

### Descripción
Coloca un stop loss a una distancia especificada del precio de entrada.

### Parámetros Configurables

| Parámetro | Tipo | Descripción | Valores |
|-----------|------|-------------|---------|
| **Tipo** | Select | Forma de medir la distancia | Pips / Puntos / Porcentaje / Precio Absoluto |
| **Distancia** | Número o Variable | Cuánto colocar el SL | 1-10000 |

### Ejemplos

**1. Stop Loss fijo:**
```
🛡️ Stop Loss
├─ Tipo: Pips
└─ Distancia: 50
```

**2. Stop Loss con variable (optimizable):**
```
🛡️ Stop Loss
├─ Tipo: Pips
└─ Distancia: Var1 (30-100, paso 10)

Resultado: El backtest prueba SL de 30, 40, 50...100 pips
```

**3. Stop Loss en porcentaje:**
```
🛡️ Stop Loss
├─ Tipo: Porcentaje (%)
└─ Distancia: 2
```

### Casos de Uso

- **Scalping**: 10-20 pips
- **Day Trading**: 30-50 pips
- **Swing Trading**: 100-200 pips
- **Position Trading**: 500+ pips

---

## 🎯 Take Profit (Establecer Take Profit)

### Descripción
Coloca un take profit a una distancia especificada o basado en un ratio risk/reward.

### Parámetros Configurables

| Parámetro | Tipo | Descripción | Valores |
|-----------|------|-------------|---------|
| **Tipo** | Select | Forma de medir el objetivo | Pips / Puntos / % / Precio Absoluto / Risk/Reward Ratio |
| **Objetivo** | Número o Variable | Dónde colocar el TP | 1-10000 |

### Ejemplos

**1. Take Profit fijo:**
```
🎯 Take Profit
├─ Tipo: Pips
└─ Objetivo: 100
```

**2. Take Profit con Risk/Reward 1:2:**
```
🎯 Take Profit
├─ Tipo: Risk/Reward Ratio
└─ Objetivo: 2

Si SL = 50 pips → TP = 100 pips (2× el riesgo)
```

**3. Take Profit optimizable:**
```
🎯 Take Profit
├─ Tipo: Pips
└─ Objetivo: Var2 (50-200, paso 25)

Combinado con SL variable:
- Var1 (SL): 30-100, paso 10 → 8 valores
- Var2 (TP): 50-200, paso 25 → 7 valores
- Total: 56 combinaciones SL/TP
```

### Ratios Risk/Reward Comunes

- **1:1** - Conservador, alta tasa de acierto necesaria
- **1:1.5** - Equilibrado para day trading
- **1:2** - Estándar recomendado
- **1:3** - Agresivo, menor tasa de acierto necesaria

---

## 📊 Trailing Stop

### Descripción
Stop loss que sigue el precio cuando va a favor, pero no retrocede cuando va en contra.

### Parámetros Configurables

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| **Distancia** | Número o Variable | Distancia del precio actual | 30 pips |
| **Paso** | Número o Variable | Cada cuánto mover el stop | 10 pips |

### Ejemplo Visual

```
Precio entra a 1.1000
├─ Sube a 1.1030 → SL se mueve a 1.1000 (distancia 30 pips)
├─ Sube a 1.1050 → SL se mueve a 1.1020 (distancia 30 pips)
├─ Baja a 1.1040 → SL se mantiene en 1.1020 (no retrocede)
└─ Baja a 1.1020 → SL se activa, cierra en BE+20 pips
```

### Ejemplos

**1. Trailing Stop estándar:**
```
📊 Trailing Stop
├─ Distancia: 30 pips
└─ Paso: 10 pips
```

**2. Trailing Stop optimizable:**
```
📊 Trailing Stop
├─ Distancia: Var3 (20-60, paso 10)
└─ Paso: 10 pips

Prueba diferentes distancias para maximizar ganancias
```

### Cuándo Usar

✅ **Usar en:**
- Tendencias fuertes
- Breakouts con impulso
- Operaciones con gran potencial de ganancia

❌ **No usar en:**
- Mercados laterales (choppy)
- Reversiones rápidas
- Scalping ultra-corto

---

## ⚡ Mover a Breakeven

### Descripción
Mueve el stop loss al precio de entrada (±offset) cuando la operación gana cierta cantidad.

### Parámetros Configurables

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| **Trigger** | Número o Variable | Pips en ganancia para activar | 20 pips |
| **Offset** | Número o Variable | Pips extra por encima del BE | 5 pips |

### Ejemplo Visual

```
Compra en 1.1000, SL en 1.0950 (-50 pips)
├─ Precio sube a 1.1020 (trigger alcanzado)
├─ SL se mueve a 1.1005 (BE + 5 pips offset)
└─ Operación ahora es "risk-free"
```

### Ejemplos

**1. Breakeven conservador:**
```
⚡ Mover a Breakeven
├─ Trigger: 20 pips
└─ Offset: 5 pips
```

**2. Breakeven agresivo:**
```
⚡ Mover a Breakeven
├─ Trigger: 10 pips
└─ Offset: 2 pips
```

**3. Breakeven optimizable:**
```
⚡ Mover a Breakeven
├─ Trigger: Var4 (10-30, paso 5)
└─ Offset: 5 pips

Encuentra el mejor trigger para tu estrategia
```

---

## ⚙️ Modificar Posición

### Descripción
Ajusta el tamaño de la posición (cierre parcial, scale in, scale out).

### Parámetros Configurables

| Parámetro | Tipo | Descripción | Valores |
|-----------|------|-------------|---------|
| **Acción** | Select | Tipo de modificación | Cierre Parcial / Aumentar / Reducir |
| **Porcentaje** | Número o Variable | % de la posición | 1-100% |

### Ejemplos

**1. Cierre Parcial (Take Partial Profit):**
```
⚙️ Modificar Posición
├─ Acción: Cierre Parcial
└─ Porcentaje: 50%

Cuando RSI > 65:
- Cierra 50% de la posición
- Deja correr el resto con trailing stop
```

**2. Scale Out en niveles:**
```
Bloque 1 (RSI > 60):
⚙️ Modificar Posición → Cerrar 33%

Bloque 2 (RSI > 70):
⚙️ Modificar Posición → Cerrar 33%

Bloque 3 (RSI > 80):
⚙️ Cerrar Posición → 100%
```

**3. Scale In (añadir a ganadora):**
```
⚙️ Modificar Posición
├─ Acción: Aumentar Posición
└─ Porcentaje: 50%

Cuando la operación gana 30 pips, añade 50% más capital
```

---

## 🔄 Combinaciones Potentes

### Estrategia 1: SL/TP + Trailing

```
📈 Entrada:
  RSI < 30 → Comprar
  
Acciones:
├─ 🛡️ Stop Loss: 50 pips
├─ 🎯 Take Profit: 150 pips
├─ ⚡ Breakeven: Trigger 30 pips
└─ 📊 Trailing: Distancia 40 pips (cuando pasa 100 pips)
```

### Estrategia 2: Cierre Parcial Escalonado

```
📉 Salida Bloque 1:
  RSI > 60 → ⚙️ Cerrar 33%

📉 Salida Bloque 2:
  RSI > 70 → ⚙️ Cerrar 33%

📉 Salida Bloque 3:
  RSI > 80 → Cerrar 100%
```

### Estrategia 3: Optimización Completa

```
📊 Variables:
├─ Var1 = SL (30-80, paso 10)
├─ Var2 = TP (60-200, paso 20)
├─ Var3 = Trailing Distancia (20-60, paso 10)
└─ Var4 = Breakeven Trigger (10-30, paso 5)

📈 Entrada:
  MACD cruza Signal → Comprar
  
Acciones:
├─ 🛡️ Stop Loss: Var1 pips
├─ 🎯 Take Profit: Var2 pips
├─ ⚡ Breakeven: Var4 pips
└─ 📊 Trailing: Var3 pips

Combinaciones: 6 × 8 × 5 × 5 = 1200 estrategias
```

---

## 💡 Best Practices

### ✅ Hacer

1. **Siempre usar Stop Loss**
   - Protege tu capital
   - Limita pérdidas

2. **Ratio Risk/Reward mínimo 1:1.5**
   - Asegura rentabilidad a largo plazo
   - Compensa operaciones perdedoras

3. **Usar variables para optimizar**
   - Encuentra mejores valores automáticamente
   - Prueba múltiples combinaciones

4. **Combinar acciones**
   - SL + TP + Breakeven
   - O SL + TP + Trailing

5. **Ajustar a tu temporalidad**
   - Scalping: 10-20 pips
   - Day: 30-50 pips
   - Swing: 100-200 pips

### ❌ Evitar

1. **No usar Stop Loss**
   - ¡Nunca operes sin SL!

2. **SL muy ajustado**
   - Se activa por ruido del mercado
   - Dale espacio a la operación

3. **TP muy ambicioso**
   - Reduce tasa de acierto
   - Balance risk/reward vs probabilidad

4. **Demasiadas modificaciones**
   - Mantén simple
   - Máximo 2-3 acciones de gestión

5. **Ignorar las comisiones**
   - Cuenta spreads y fees
   - Especialmente en SL/TP cercanos

---

## 📊 Tabla Resumen de Parámetros

| Acción | Parámetros | Soporta Variables | Uso Principal |
|--------|------------|-------------------|---------------|
| 🛡️ Stop Loss | Tipo, Distancia | ✅ | Limitar pérdidas |
| 🎯 Take Profit | Tipo, Objetivo | ✅ | Asegurar ganancias |
| 📊 Trailing Stop | Distancia, Paso | ✅ | Maximizar tendencias |
| ⚡ Breakeven | Trigger, Offset | ✅ | Proteger ganancias |
| ⚙️ Modificar | Acción, % | ✅ | Gestión avanzada |

---

## 🚀 Ejemplos de Código Generado

### Stop Loss con Variable

```typescript
{
  action: "set_stop_loss",
  parameters: {
    type: "pips",
    value: {
      type: "variable",
      variableId: "Var1",
      variableName: "Var1"
    }
  }
}
```

### Take Profit Risk/Reward

```typescript
{
  action: "set_take_profit",
  parameters: {
    type: "ratio",
    value: 2  // 1:2 risk/reward
  }
}
```

### Trailing Stop

```typescript
{
  action: "trailing_stop",
  parameters: {
    distance: 30,
    step: 10
  }
}
```

---

**¡Gestiona tu riesgo como un profesional! 🎯🛡️**

