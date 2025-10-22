# 🔍 Debugging: 0 Trades Generados

## ❓ Problema
El backtest se ejecuta correctamente pero **no genera ninguna posición** (0 trades).

## 🎯 Causas Posibles

### 1. ⚠️ **La estrategia no tiene reglas de entrada**
- **Solución**: Ve al Designer y añade al menos un Entry Block con reglas y acciones.

### 2. ⚠️ **La estrategia no tiene acciones (Open Long/Short)**
- **Solución**: Asegúrate de que cada Entry Block tenga acciones definidas.

### 3. ⚠️ **Las condiciones son muy restrictivas**
- Los indicadores nunca cumplen las condiciones
- Ejemplo: SMA(14) > SMA(50) en un mercado bajista nunca se cumple

### 4. ⚠️ **Los indicadores necesitan tiempo para "calentarse"**
- SMA(50) necesita 50 barras para calcular correctamente
- Solución: Los primeros 50-100 bars no generarán señales

---

## 🔧 Logs de Debug Implementados

El BacktestEngine ahora muestra información detallada en la terminal:

```bash
>> ESTRATEGIA: Cruce SMA 14 - 50
>> Entry Blocks: 1
>> Exit Blocks: 0
>> Entry Block 0: 1 reglas, 1 acciones
   - Regla 0: sma crosses_above
>> Barras generadas: 1000

>> Evaluando reglas en barra 51:
  [RULE 0] sma(14)=1.09987 vs sma(50)=1.10012 | crosses_above -> False

>> Evaluando reglas en barra 100:
  [RULE 0] sma(14)=1.10234 vs sma(50)=1.10198 | crosses_above -> True
  
>> SEÑAL DE ENTRADA DETECTADA en bloque 0
>> ABRIENDO TRADE #1 - LONG @ 1.10234
```

---

## 📋 Checklist de Diagnóstico

### ✅ **Paso 1: Ver los logs del backend**

Mira la terminal donde corre `uvicorn`. Busca:

1. **Info de estrategia:**
   ```
   >> ESTRATEGIA: Cruce SMA 14 - 50
   >> Entry Blocks: 1
   >> Exit Blocks: 0
   ```
   - Si `Entry Blocks: 0` → **No hay bloques de entrada**

2. **Reglas definidas:**
   ```
   >> Entry Block 0: 1 reglas, 1 acciones
      - Regla 0: sma crosses_above
   ```
   - Si `0 reglas` → **No hay condiciones definidas**
   - Si `0 acciones` → **No hay acciones (Open Long/Short)**

3. **Evaluación de reglas:**
   ```
   >> Evaluando reglas en barra 51:
     [RULE 0] sma(14)=1.09987 vs sma(50)=1.10012 | crosses_above -> False
   ```
   - Verás los valores reales de los indicadores
   - `-> False` significa que la condición NO se cumple
   - `-> True` significa que SÍ se cumple

4. **Señales detectadas:**
   ```
   >> SEÑAL DE ENTRADA DETECTADA en bloque 0
   >> ABRIENDO TRADE #1 - LONG @ 1.10234
   ```
   - Si ves esto, el trade se abrió correctamente

---

### ✅ **Paso 2: Verificar la estrategia en el Designer**

Ve a `/designer` y verifica:

#### **Entry Block debe tener:**
1. ✅ Al menos una **regla** (condición)
   - Ejemplo: `SMA(14) > SMA(50)`
   - Ejemplo: `RSI(14) < 30`

2. ✅ Al menos una **acción**
   - `Open Long` o `Open Short`

#### **Ejemplo de estrategia válida:**
```
Entry Block:
  Reglas:
    - SMA(14) crosses_above SMA(50)
  Acciones:
    - Open Long with 0.1 lots
```

---

### ✅ **Paso 3: Entender los indicadores**

#### **SMA (Simple Moving Average)**
- Necesita `period` barras para calcular
- SMA(50) = promedio de los últimos 50 cierres
- Solo se calcula después de tener 50 barras

#### **Condiciones de cruce**
- `crosses_above`: Indicador cruza POR ENCIMA del valor de comparación
- `crosses_below`: Indicador cruza POR DEBAJO del valor de comparación

**Nota**: En la implementación actual, los cruces se simplifican a `>` y `<`. En producción, deberían verificar el cruce entre barras consecutivas.

---

## 🧪 Estrategia de Prueba Simple

Si sigues sin ver trades, prueba con una estrategia MUY simple:

```
Nombre: "Test Simple RSI"

Entry Block:
  Reglas:
    - RSI(14) < 30
  Acciones:
    - Open Long with 0.1 lots

Exit Block (opcional):
  Reglas:
    - RSI(14) > 70
  Acciones:
    - Close Position
```

Esta estrategia debería generar trades casi seguro porque RSI oscila entre 0-100.

---

## 🔥 Solución Rápida

### Si los logs muestran que las reglas NUNCA se cumplen:

1. **Cambia la condición**:
   - Si usas `crosses_above`, prueba con `greater_than`
   - Si usas valores específicos, hazlos más amplios

2. **Simplifica la estrategia**:
   - Empieza con 1 sola regla
   - Una vez funcione, añade más complejidad

3. **Verifica los períodos**:
   - SMA(14) es más rápido que SMA(50)
   - En un cruce alcista, SMA(14) debe estar por encima de SMA(50)

---

## 📊 Ejemplo Real de Log con Trades

```bash
>> ESTRATEGIA: Cruce SMA 14 - 50
>> Entry Blocks: 1
>> Exit Blocks: 0
>> Entry Block 0: 1 reglas, 1 acciones
   - Regla 0: sma crosses_above
>> Barras generadas: 1000

>> Evaluando reglas en barra 51:
  [RULE 0] sma(14)=1.09987 vs sma(50)=1.10012 | crosses_above -> False

>> Evaluando reglas en barra 100:
  [RULE 0] sma(14)=1.10234 vs sma(50)=1.10198 | crosses_above -> True

>> SEÑAL DE ENTRADA DETECTADA en bloque 0
>> ABRIENDO TRADE #1 - LONG @ 1.10234

>> Backtest completado: 1 trades
```

---

## 🎯 Próximos Pasos

1. **Ejecuta un backtest** en el frontend
2. **Mira la terminal del backend** (donde corre uvicorn)
3. **Copia y pega** los logs aquí si necesitas ayuda
4. **Ajusta tu estrategia** basándote en los valores reales de los indicadores

---

**Última actualización**: 22 de octubre de 2025

