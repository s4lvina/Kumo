# 🔢 Sistema de Variables - Guía Completa

## 📋 Concepto

El sistema de variables de Kumo permite **optimizar estrategias** probando múltiples valores de parámetros automáticamente.

### ¿Por qué usar variables?

```
❌ SIN VARIABLES:
- SMA(10) cruza SMA(50)
- Para probar otros valores → Cambiar manualmente y ejecutar de nuevo
- Lento y tedioso

✅ CON VARIABLES:
- SMA(Var1) cruza SMA(Var2)
- Var1: probar de 5 a 20 en pasos de 5 → [5, 10, 15, 20]
- Var2: probar de 30 a 60 en pasos de 10 → [30, 40, 50, 60]
- Sistema prueba TODAS las combinaciones (4 × 4 = 16)
- Encuentra automáticamente los mejores valores
```

---

## 🎯 Casos de Uso

### 1. Optimización de Stop Loss y Take Profit

**Objetivo**: Encontrar la mejor combinación de SL/TP

```
Variable: Var1 = "Stop Loss"
Rango: 30 a 100, paso 10
Valores: [30, 40, 50, 60, 70, 80, 90, 100]

Variable: Var2 = "Take Profit"
Rango: 50 a 200, paso 25
Valores: [50, 75, 100, 125, 150, 175, 200]

Acciones:
- 🛡️ Stop Loss: Var1 pips
- 🎯 Take Profit: Var2 pips

Sistema prueba 8 × 7 = 56 combinaciones
```

### 2. Optimización de Período de Indicador

**Objetivo**: Encontrar el mejor período para el RSI

```
Variable: Var1 = "Período RSI"
Rango: 10 a 20, paso 2
Valores: [10, 12, 14, 16, 18, 20]

Regla: RSI(Var1) < 30 → Comprar

Sistema prueba 6 versiones de la estrategia
```

### 3. Cruce de Medias Móviles

**Objetivo**: Optimizar períodos de medias móviles

```
Variable: Var1 = "SMA Rápida"  (5-20, paso 5)
Variable: Var2 = "SMA Lenta"   (30-100, paso 10)

Regla: SMA(Var1) cruza por encima de SMA(Var2)

Combinaciones: 4 × 8 = 32 estrategias
```

### 4. Múltiples Indicadores

**Objetivo**: Optimizar estrategia compleja

```
Var1 = Período RSI        (10-20, paso 2)
Var2 = Nivel Sobreventa   (20-35, paso 5)
Var3 = SMA Período        (10-50, paso 10)

Reglas:
- RSI(Var1) < Var2
- Precio > SMA(Var3)

Combinaciones: 6 × 4 × 5 = 120 estrategias
```

---

## 🚀 Cómo Usar Variables

### Paso 1: Crear Variables

1. En el Diseñador, localiza el módulo "**Variables de Estrategia**"
2. Click en "**Añadir Variable**"
3. La variable se crea como **Var1, Var2, Var3...**

### Paso 2: Configurar Variable

```
☑️ Activar checkbox (debe estar activada para usar)

Nombre: Var1 (automático)
Descripción: "Período RSI" (opcional, para recordar qué es)
Valor Actual: 14

📊 Configuración de Optimización:
- Mínimo: 10
- Máximo: 20
- Paso: 2
```

**Resultado**: La variable probará [10, 12, 14, 16, 18, 20]

### Paso 3: Usar en Indicador o Acción

**Opción A: En parámetro de indicador**
1. Añadir RSI al bloque
2. Click en ⚙️ (configurar)
3. En "Período" → Click botón **"Var"**
4. Seleccionar **Var1** del dropdown
5. Guardar

**Resultado**: `RSI(Var1)` en lugar de `RSI(14)`

**Opción B: En valor de comparación**
1. Crear regla: RSI(14) < ...
2. En selector de valor → Click **"Variable"**
3. Seleccionar variable
4. Guardar

**Resultado**: `RSI(14) < Var2`

**Opción C: En parámetros de acciones (SL/TP)**
1. Añadir acción "Establecer Stop Loss"
2. Click en ⚙️ (configurar)
3. En "Distancia" → Click botón **"Var"**
4. Seleccionar variable
5. Guardar

**Resultado**: `🛡️ Stop Loss: Var1 pips`

---

## 📊 Visualización de Variables

### En el Diseñador

```
Variables de Estrategia [2 activas]
├─ ☑️ Var1 = 10  "SMA Rápida"
│   └─ Optimización: 5 → 20, paso 5 (4 valores)
│
└─ ☑️ Var2 = 50  "SMA Lenta"
    └─ Optimización: 30 → 70, paso 10 (5 valores)

💡 Optimización Activada
Con 2 variables activas, el backtest probará diferentes
combinaciones para encontrar los mejores valores.
```

### En las Reglas

```
Regla 1: SMA(Var1) cruza por encima de SMA(Var2)
         ^^^^                          ^^^^
         10 actualmente                50 actualmente
```

---

## 🧮 Cálculo de Combinaciones

El sistema calcula automáticamente cuántas simulaciones se ejecutarán:

```
Var1: Min=5, Max=20, Paso=5    → 4 valores [5, 10, 15, 20]
Var2: Min=10, Max=30, Paso=10  → 3 valores [10, 20, 30]

Combinaciones = 4 × 3 = 12 simulaciones
```

### Ejemplo Real

```
Var1 (RSI Período):       10 → 20, paso 2     = 6 valores
Var2 (RSI Sobreventa):    20 → 35, paso 5     = 4 valores
Var3 (SMA Período):       10 → 50, paso 10    = 5 valores
Var4 (Stop Loss Pips):    20 → 60, paso 10    = 5 valores

Total: 6 × 4 × 5 × 5 = 600 combinaciones
```

⚠️ **Advertencia**: Muchas combinaciones = más tiempo de cálculo

---

## 🎨 Interfaz Visual

### Estados de Variable

```
☐ Var1 = 10          → Desactivada (no se usa en optimización)
☑️ Var1 = 10         → Activada (se usará en optimización)
🔢 Var1              → Ícono en selector (número/variable)
Var1 = 10 (SMA)      → En dropdown con descripción
```

### Colores

- **Naranja**: Variable seleccionada
- **Gris**: Valor numérico normal
- **Verde**: Variable en uso (en reglas)

---

## 💡 Tips y Mejores Prácticas

### ✅ Hacer

1. **Usar variables para parámetros críticos**
   - Períodos de indicadores
   - Niveles de sobrecompra/sobreventa
   - **Stop Loss / Take Profit** (muy importante)
   - Trailing Stop
   - Breakeven trigger

2. **Rangos razonables**
   ```
   ✅ RSI Período: 10-20 (rango pequeño)
   ❌ RSI Período: 1-100 (demasiado amplio)
   ```

3. **Pasos adecuados**
   ```
   ✅ SMA: 10, 15, 20, 25 (paso 5)
   ❌ SMA: 10, 11, 12, 13... (demasiados valores)
   ```

4. **Nombrar variables claramente**
   ```
   ✅ Var1: "RSI Período"
   ✅ Var2: "SMA Rápida"
   ❌ Var1: (sin descripción)
   ```

5. **Empezar con pocas variables**
   - Primera vez: 1-2 variables
   - Cuando domines: hasta 4-5
   - Máximo recomendado: 6

### ❌ Evitar

1. **Demasiadas combinaciones**
   ```
   10 variables con 10 valores cada una
   = 10^10 = 10 mil millones de combinaciones
   → Imposible de calcular
   ```

2. **Pasos muy pequeños**
   ```
   ❌ Período: 10-20, paso 0.1 → 100 valores
   ✅ Período: 10-20, paso 2   → 6 valores
   ```

3. **Variables sin activar**
   - Si no está ☑️ activada, no se optimiza

---

## 🔍 Ejemplo Completo: Estrategia RSI + MA

### Configuración

```typescript
VARIABLES:
├─ Var1 = 14   "Período RSI"
│   Min: 10, Max: 18, Paso: 2
│   Valores: [10, 12, 14, 16, 18]
│
├─ Var2 = 30   "Nivel Sobreventa RSI"
│   Min: 25, Max: 35, Paso: 5
│   Valores: [25, 30, 35]
│
└─ Var3 = 50   "Período SMA"
    Min: 30, Max: 60, Paso: 10
    Valores: [30, 40, 50, 60]

ESTRATEGIA:
📈 Entrada:
   - RSI(Var1) < Var2
   - Precio > SMA(Var3)
   → Comprar a Mercado

📉 Salida:
   - RSI(Var1) > 70
   → Cerrar Posición

COMBINACIONES: 5 × 3 × 4 = 60 estrategias
```

### Resultados Esperados

```
El sistema ejecuta 60 backtests y devuelve:

🥇 Mejor Combinación:
   Var1 = 12 (Período RSI)
   Var2 = 30 (Sobreventa)
   Var3 = 40 (SMA)
   
   Win Rate: 68.5%
   Profit Factor: 2.1
   Max Drawdown: -12.3%

🥈 Segunda Mejor:
   Var1 = 14, Var2 = 25, Var3 = 50
   Win Rate: 66.2%
   ...
```

---

## 🔬 Proceso de Optimización

### 1. Definir Variables
```
Identificar parámetros clave de tu estrategia
```

### 2. Establecer Rangos
```
Basarse en conocimiento del mercado
- RSI típico: 14 ± 4
- SMA rápida: 10-20
- SMA lenta: 50-200
```

### 3. Ejecutar Backtest
```
Sistema prueba todas las combinaciones
Guarda métricas de cada una
```

### 4. Analizar Resultados
```
Ordenar por:
- Win Rate
- Profit Factor
- Sharpe Ratio
- Max Drawdown
```

### 5. Seleccionar Mejor
```
Elegir combinación ganadora
Aplicar esos valores a la estrategia
```

### 6. Validar
```
Probar con datos out-of-sample
Confirmar que funciona en diferentes períodos
```

---

## ⚡ Shortcuts y Atajos

### Crear Variable Rápido
```
1. Click "Añadir Variable"
2. Activar checkbox
3. Poner descripción
4. Configurar Min/Max/Paso
5. Listo para usar
```

### Cambiar Número por Variable
```
En cualquier input numérico:
1. Click botón "Var" 🔢
2. Seleccionar variable
3. Done!
```

### Ver Valor Actual
```
Hover sobre variable → tooltip muestra valor actual
En dropdown → "Var1 = 14 (Descripción)"
```

---

## 🆘 Troubleshooting

### "No puedo seleccionar variable"
**Causa**: Variable no está activada
**Solución**: Activar checkbox ☑️ en el módulo de variables

### "Demasiadas combinaciones"
**Causa**: Rangos muy amplios o pasos muy pequeños
**Solución**: Reducir rangos o aumentar pasos

### "Variable no aparece en dropdown"
**Causa**: No hay variables activas
**Solución**: Crear y activar al menos una variable

### "El backtest no cambia valores"
**Causa**: Variables creadas pero no están en modo optimización
**Solución**: Asegurarse que Min/Max/Paso están configurados

---

## 📈 Ventajas del Sistema

✅ **Automatización**: No más cambios manuales
✅ **Exhaustivo**: Prueba TODAS las combinaciones
✅ **Objetivo**: Encuentra mejores valores matemáticamente
✅ **Rápido**: Múltiples simulaciones en paralelo
✅ **Visual**: Ve qué variables se están usando
✅ **Flexible**: Usa variables donde quieras (indicadores, condiciones)

---

## 🔮 Próximas Mejoras

- [ ] Walk-forward optimization
- [ ] Genetic algorithms
- [ ] Machine learning parameter selection
- [ ] Sensitivity analysis
- [ ] 3D visualization de resultados
- [ ] Monte Carlo simulation

---

**¡Happy Optimizing! 🎯✨**

