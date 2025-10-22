# 🔧 Solución de Problemas por Estrategia

## 📊 Análisis de Logs del Backend

### **Problema 1: "Cruce SMA 14 - 50" - 0 Acciones**
```
>> Entry Block 0: 1 reglas, 0 acciones
   - Regla 0: ma crosses_above
>> Backtest completado: 0 trades
```

**Causa**: La estrategia tiene reglas pero **NO tiene acciones** (Open Long/Short)
**Solución**: 
1. Ve al Designer
2. Añade una acción "Open Long" al Entry Block
3. Guarda la estrategia

### **Problema 2: "Golden/Death Cross" - Indicador no implementado**
```
[RULE 0] sma(50)=1.10044 vs sma(200)=None (indicador no implementado)
```

**Causa**: SMA(200) no está implementado en el backend
**Solución**: 
1. Usa períodos más cortos: SMA(50) vs SMA(100)
2. O cambia a otra estrategia que use períodos implementados

### **Problema 3: "Reversión Estocástica" - Condiciones no se cumplen**
```
[RULE 0] stochastic(14)=50.37606 vs 20 | less_than -> False
```

**Causa**: Stochastic = 50.38 (NO es < 20)
**Solución**:
1. Relaja la condición: Stochastic < 30 en lugar de < 20
2. O espera a que el mercado esté en sobreventa

---

## 🎯 Diagnóstico Específico por Estrategia

### **Estrategias de Cruce de Medias**
**Problemas comunes:**
- ❌ Usar `ma` en lugar de `sma`
- ❌ Períodos no implementados (SMA(200))
- ❌ Falta de acciones (Open Long/Short)
- ❌ Condiciones incorrectas

**Solución:**
```javascript
// ✅ Correcto
Entry Block:
  - Regla: SMA(14) crosses_above SMA(50)
  - Acción: Open Long

// ❌ Incorrecto  
Entry Block:
  - Regla: MA(14) crosses_above MA(200)  // MA no existe, SMA(200) no implementado
  - Sin acciones
```

### **Estrategias de Stochastic**
**Problemas comunes:**
- ❌ Condiciones muy restrictivas (Stochastic < 20)
- ❌ Falta de Stop Loss/Take Profit
- ❌ Sin Exit Block

**Solución:**
```javascript
// ✅ Correcto
Entry Block:
  - Regla: Stochastic(14) < 30  // Más permisivo
  - Acción: Open Long
  - Stop Loss: 50 pips
  - Take Profit: 100 pips

Exit Block:
  - Regla: Stochastic(14) > 70
  - Acción: Close Position
```

### **Estrategias de RSI**
**Problemas comunes:**
- ❌ Condiciones muy restrictivas
- ❌ Sin gestión de riesgo

**Solución:**
```javascript
// ✅ Correcto
Entry Block:
  - Regla: RSI(14) < 35  // Más permisivo que < 30
  - Acción: Open Long
  - Stop Loss: 40 pips
  - Take Profit: 80 pips
```

---

## 🔍 Códigos de Error Específicos

### **"0 acciones"**
```
>> Entry Block 0: 1 reglas, 0 acciones
```
**Significado**: La estrategia tiene reglas pero no tiene acciones
**Solución**: Añadir acciones "Open Long" o "Open Short"

### **"indicador no implementado"**
```
sma(200)=None (indicador no implementado)
```
**Significado**: El indicador o período no está soportado
**Solución**: Usar indicadores implementados (SMA, EMA, RSI, MACD, Stochastic)

### **"less_than -> False"**
```
stochastic(14)=50.37606 vs 20 | less_than -> False
```
**Significado**: La condición no se cumple (50.38 NO es < 20)
**Solución**: Relajar la condición o esperar mejores condiciones de mercado

---

## 📋 Checklist de Verificación

### **Antes de ejecutar un backtest:**

- [ ] **Entry Block configurado**
  - [ ] Al menos 1 regla válida
  - [ ] Al menos 1 acción (Open Long/Short)
  - [ ] Indicadores implementados (SMA, EMA, RSI, MACD, Stochastic)

- [ ] **Exit Block configurado** (recomendado)
  - [ ] Al menos 1 regla de salida
  - [ ] Acción "Close Position"

- [ ] **Gestión de Riesgo**
  - [ ] Stop Loss configurado (30-50 pips)
  - [ ] Take Profit configurado (60-100 pips)

- [ ] **Períodos válidos**
  - [ ] SMA: máximo 100 (SMA(200) no implementado)
  - [ ] RSI: 14-21 recomendado
  - [ ] Stochastic: 14-21 recomendado

---

## 🚀 Estrategias que Funcionan

### **1. Cruce SMA Simple**
```
Entry: SMA(14) crosses_above SMA(50) → Open Long
Exit: SMA(14) crosses_below SMA(50) → Close Position
Stop Loss: 50 pips
Take Profit: 100 pips
```

### **2. Stochastic Reversión**
```
Entry: Stochastic(14) < 30 → Open Long
Exit: Stochastic(14) > 70 → Close Position
Stop Loss: 50 pips
Take Profit: 100 pips
```

### **3. RSI Sobreventa**
```
Entry: RSI(14) < 35 → Open Long
Exit: RSI(14) > 65 → Close Position
Stop Loss: 40 pips
Take Profit: 80 pips
```

---

## 🔧 Comandos de Debug

### **Ver logs del backend:**
```bash
# En la terminal donde corre uvicorn
# Busca líneas que empiecen con ">>"
```

### **Probar estrategia específica:**
```bash
cd backend
python test_strategy_debug.py
```

### **Verificar indicadores:**
```bash
cd backend
python test_stochastic.py
```

---

**Última actualización**: 22 de octubre de 2025
**Estado**: ✅ Diagnóstico mejorado con mensajes específicos
