# 🎨 Guía del Diseñador de Estrategias Kumo

## 📋 Índice

1. [Introducción](#introducción)
2. [Conceptos Básicos](#conceptos-básicos)
3. [Bloques de Entrada y Salida](#bloques-de-entrada-y-salida)
4. [Configuración de Indicadores](#configuración-de-indicadores)
5. [Comparación de Valores](#comparación-de-valores)
6. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🚀 Introducción

El Diseñador de Estrategias de Kumo permite crear sistemas de trading complejos sin escribir código. Utiliza un sistema visual de bloques, reglas y acciones.

### Flujo de Trabajo

```
1. Seleccionar Temporalidad (1h, 4h, 1d, etc.)
   ↓
2. Crear Bloques de Entrada
   ↓
3. Añadir Indicadores y Configurarlos
   ↓
4. Definir Condiciones de Comparación
   ↓
5. Asignar Acciones
   ↓
6. Crear Bloques de Salida
   ↓
7. Ejecutar Backtest
```

---

## 📊 Conceptos Básicos

### Bloques

Un **bloque** es una unidad lógica que contiene:
- **Reglas**: Condiciones que deben cumplirse
- **Acciones**: Qué hacer cuando las reglas se cumplen

Hay dos tipos de bloques:
- **📈 Entrada**: Definen cuándo abrir posiciones
- **📉 Salida**: Definen cuándo cerrar posiciones

### Reglas

Una **regla** compara un indicador con un valor:

```
[Indicador] [Condición] [Valor]
    ↓           ↓           ↓
  RSI(14)   Menor que      30
```

### Acciones

Las **acciones** se ejecutan cuando todas las reglas se cumplen:
- 📈 Comprar a Mercado
- 📉 Vender a Mercado
- 🛡️ **Establecer Stop Loss** (configurable)
- 🎯 **Establecer Take Profit** (configurable)
- 📊 Trailing Stop (configurable)
- ⚡ Mover a Breakeven (configurable)

---

## 🏗️ Bloques de Entrada y Salida

### Bloque de Entrada

Define las condiciones para **abrir** una posición:

```typescript
Condición de Entrada 1
├─ Regla 1: RSI(14) < 30
├─ Regla 2: MACD cruza por encima de Signal
└─ Acción: Comprar a Mercado
└─ Acción: Establecer Stop Loss
```

### Bloque de Salida

Define las condiciones para **cerrar** una posición:

```typescript
Condición de Salida 1
├─ Regla 1: RSI(14) > 70
└─ Acción: Cerrar Posición
```

### Crear Bloques

1. Click en "**Añadir Entrada**" o "**Añadir Salida**"
2. El bloque aparece vacío
3. Selecciona indicadores del panel lateral
4. Configura las reglas
5. Añade acciones

---

## ⚙️ Configuración de Indicadores

Cada indicador tiene **parámetros configurables**:

### Ejemplo: Media Móvil (MA)

```
Parámetros:
- Período: 14 (cuántas velas considerar)
- Desplazamiento: 0 (shift hacia adelante/atrás)
- Método: SMA, EMA, SMMA, LWMA
- Aplicado a: Close, Open, High, Low, etc.
```

### Cómo Configurar

1. Añade un indicador a una regla
2. Click en el icono **⚙️** junto al indicador
3. Ajusta los parámetros en el modal
4. La etiqueta se actualiza automáticamente: `SMA(20)`

### Indicadores con Parámetros

| Indicador | Parámetros Principales |
|-----------|------------------------|
| **MA** | Período, Método (SMA/EMA/SMMA/LWMA), Aplicado a |
| **RSI** | Período (típico: 14) |
| **MACD** | Fast Period (12), Slow Period (26), Signal (9) |
| **Bollinger** | Período (20), Desviación (2) |
| **Stochastic** | %K Período (5), %D Período (3), Slowing (3) |
| **ATR** | Período (14) |

---

## 🔄 Comparación de Valores

Una regla puede comparar un indicador con:

### 1. Valor Numérico

```
RSI(14) < 30
```

**Uso**: Cuando quieres comparar con un número fijo.

### 2. Otro Indicador

```
SMA(3) cruza por encima de SMA(10)
```

**Uso**: Para detectar cruces o comparaciones entre indicadores.

### Cómo Usar

En el selector de valor de comparación:

1. **Valor Numérico**: Introduce un número (ej: 30, 70, 1.5)
2. **Otro Indicador**: 
   - Click en "Otro Indicador"
   - Selecciona el indicador de la lista
   - Configura sus parámetros (⚙️)

---

## 📚 Ejemplos Prácticos

### Ejemplo 1: RSI Sobrevendido Básico

**Estrategia**: Comprar cuando RSI está sobrevendido.

```
📈 Entrada:
  RSI(14) < 30
  → Comprar a Mercado

📉 Salida:
  RSI(14) > 70
  → Cerrar Posición
```

**Pasos**:
1. Añadir bloque de entrada
2. Seleccionar RSI del panel
3. Condición: "Menor que (<)"
4. Valor: 30
5. Acción: "Comprar a Mercado"
6. Añadir bloque de salida
7. RSI > 70 → Cerrar Posición

---

### Ejemplo 2: Cruce de Medias Móviles

**Estrategia**: Comprar cuando SMA rápida cruza por encima de SMA lenta.

```
📈 Entrada:
  SMA(10) cruza por encima de SMA(50)
  → Comprar a Mercado
  → 🛡️ Stop Loss: 50 pips
  → 🎯 Take Profit: 100 pips

📉 Salida:
  SMA(10) cruza por debajo de SMA(50)
  → Cerrar Posición
```

**Pasos**:
1. Añadir bloque de entrada
2. Seleccionar "Moving Average"
3. Configurar: Período 10, Método SMA
4. Condición: "Cruza por encima (↗)"
5. Tipo de comparación: "Otro Indicador"
6. Seleccionar "Moving Average"
7. Configurar: Período 50, Método SMA
8. Añadir acciones

---

### Ejemplo 3: Estrategia Multi-Indicador

**Estrategia**: Combinar RSI, MACD y Bollinger Bands.

```
📈 Entrada:
  Regla 1: RSI(14) < 30
  Y (AND)
  Regla 2: MACD cruza por encima de Signal Line
  Y (AND)
  Regla 3: Precio < Bollinger Band Inferior
  → Comprar a Mercado
  → Stop Loss
  → Take Profit

📉 Salida:
  RSI(14) > 70
  O (OR)
  Precio > Bollinger Band Superior
  → Cerrar Posición
```

**Pasos**:
1. Crear bloque de entrada
2. Añadir RSI(14) < 30
3. Añadir MACD (configura períodos)
4. MACD cruza por encima de otro indicador (Signal Line)
5. Añadir Bollinger Bands
6. Precio < Banda Inferior
7. Todas las reglas se conectan con AND
8. Añadir múltiples acciones

---

### Ejemplo 4: Optimización de Stop Loss y Take Profit

**Estrategia**: Usar variables para encontrar la mejor combinación de SL/TP.

```
📊 Variables:
  Var1 = "Stop Loss" (30-100, paso 10)
  Var2 = "Take Profit" (50-200, paso 25)

📈 Entrada:
  RSI(14) < 30
  → Comprar a Mercado
  → 🛡️ Stop Loss: Var1 pips
  → 🎯 Take Profit: Var2 pips

📉 Salida:
  RSI(14) > 70
  → Cerrar Posición

Combinaciones: 8 × 7 = 56 estrategias diferentes
```

**Pasos**:
1. Añadir 2 variables en "Variables de Estrategia"
2. Var1: Valor=50, Min=30, Max=100, Paso=10
3. Var2: Valor=100, Min=50, Max=200, Paso=25
4. Activar ambas variables ☑️
5. Crear entrada con RSI < 30
6. Añadir acción "Establecer Stop Loss"
7. Click en ⚙️ → En "Distancia" → Click "Var" → Seleccionar Var1
8. Añadir acción "Establecer Take Profit"
9. Click en ⚙️ → En "Objetivo" → Click "Var" → Seleccionar Var2
10. Ejecutar Backtest para probar todas las combinaciones

**Resultado**: El sistema encuentra la mejor combinación SL/TP para tu estrategia

---

## 🎯 Tips y Mejores Prácticas

### ✅ Hacer

- **Probar con datos históricos** antes de operar en real
- **Usar Stop Loss** en todas las estrategias (configúralo con el botón ⚙️)
- **Usar Take Profit** para asegurar ganancias
- **Configurar parámetros** en lugar de usar valores por defecto
- **Combinar indicadores** de diferentes categorías (tendencia + oscilador)
- **Crear bloques de salida** explícitos
- **Usar variables** para optimizar SL/TP automáticamente

### ❌ Evitar

- Demasiadas reglas en un bloque (máx 3-4)
- Usar solo un indicador
- No establecer Stop Loss
- Condiciones contradictorias

---

## 🔧 Atajos y Trucos

### Añadir Indicador Rápido

Los indicadores se añaden al **último bloque creado**. Si no hay bloques, se crea uno automáticamente.

### Copiar Configuración

Para usar el mismo indicador con diferentes parámetros:
1. Añádelo dos veces
2. Configura cada uno por separado

### Guardar Tiempo

Los **valores por defecto** son estándar del trading:
- RSI: 14
- MACD: 12, 26, 9
- Bollinger: 20, 2
- Stop Loss: 50 pips
- Take Profit: 100 pips

Solo ajústalos si tienes una razón específica.

### Configurar Acciones Rápidamente

**Stop Loss y Take Profit:**
1. Añade la acción al bloque
2. Click en ⚙️ junto a la acción
3. Selecciona el tipo (pips, puntos, %, precio)
4. Ingresa valor o selecciona una variable
5. Guardar

**Trailing Stop:**
- Distancia: Qué tan lejos está del precio actual
- Paso: Cada cuánto se mueve el stop

**Breakeven:**
- Trigger: Cuántos pips en ganancia antes de activar
- Offset: Pips extra por encima del breakeven

---

## 📊 Estructura de Datos Generada

Cuando creas una estrategia, Kumo genera esta estructura:

```json
{
  "name": "RSI Sobrevendido",
  "timeframe": "1h",
  "entryBlocks": [
    {
      "name": "Condición de Entrada 1",
      "rules": [
        {
          "indicator": {
            "indicator": "rsi",
            "parameters": { "period": 14 },
            "label": "RSI(14)"
          },
          "condition": "less_than",
          "comparisonValue": {
            "type": "number",
            "numericValue": 30
          }
        }
      ],
      "actions": [
        { "action": "buy_market" }
      ]
    }
  ],
  "exitBlocks": [...]
}
```

Esta estructura se usará para:
- Ejecutar backtests
- Exportar a MQL5/ProRealTime
- Guardar en el backend

---

## 🎨 Interfaz Visual

### Colores

- **🟢 Verde**: Acciones de entrada, bloques positivos
- **🔴 Rojo**: Acciones de salida, alertas
- **🟠 Naranja**: Indicadores, hover states, elementos activos
- **🟣 Violeta**: Botones primarios, gradientes

### Iconos

- **📈**: Entrada
- **📉**: Salida
- **⚙️**: Configuración
- **🗑️**: Eliminar
- **➕**: Añadir

---

## 🆘 Solución de Problemas

### "No puedo añadir un indicador"

**Solución**: Primero crea un bloque de entrada o salida.

### "La comparación entre indicadores no funciona"

**Solución**: Asegúrate de seleccionar "Otro Indicador" en el selector de valor.

### "Los parámetros no se guardan"

**Solución**: Después de configurar, click en "Guardar Configuración" en el modal.

### "No veo el botón de configuración (⚙️)"

**Solución**: El botón aparece junto a cada regla añadida.

---

## 🚀 Próximos Pasos

1. **Practicar** con las estrategias de ejemplo
2. **Experimentar** con diferentes combinaciones
3. **Ejecutar backtests** para validar
4. **Exportar** el código cuando estés satisfecho

---

**¡Feliz Trading! 🌥️✨**

