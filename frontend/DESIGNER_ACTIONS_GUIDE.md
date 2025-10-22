# 🎯 Guía de Acciones en el Designer

## 🚨 **Problema Identificado**

Las estrategias detectan señales pero **NO generan trades** porque faltan acciones configuradas.

### **Síntomas:**
- ✅ **Señales detectadas**: `crosses_above -> True`
- ❌ **0 trades generados**: Sin acciones = Sin trades
- ❌ **Logs muestran**: `Entry Block: 1 reglas, 0 acciones`

---

## 🔧 **Solución: Configurar Acciones**

### **1. Ve al Designer**
- Abre la página del Designer
- Selecciona tu estrategia (ej: "Cruce SMA 14 - 50")

### **2. Configura Entry Block**
- **Entry Block** → **Añadir Acción**
- Selecciona una de estas opciones:
  - **"Comprar a Mercado"** → Para posiciones largas (LONG)
  - **"Vender a Mercado"** → Para posiciones cortas (SHORT)

### **3. Configura Exit Block (Opcional)**
- **Exit Block** → **Añadir Acción**
- Selecciona:
  - **"Cerrar Posición"** → Para cerrar todas las posiciones

### **4. Guarda la Estrategia**
- Click en **"Guardar"**
- La estrategia ahora tendrá acciones configuradas

---

## 📊 **Mapeo de Acciones**

| Acción en Designer | Mapeo en BacktestEngine | Resultado |
|-------------------|-------------------------|-----------|
| **"Comprar a Mercado"** | `buy_market` → `long` | Abre posición larga |
| **"Vender a Mercado"** | `sell_market` → `short` | Abre posición corta |
| **"Cerrar Posición"** | `close_position` → `exit` | Cierra posiciones |

---

## 🎯 **Ejemplo Práctico**

### **Estrategia "Cruce SMA 14 - 50"**

#### **Antes (Sin Acciones):**
```json
{
  "entryBlocks": [{
    "rules": [{"indicator": "sma", "condition": "crosses_above"}],
    "actions": []  // ← PROBLEMA: Sin acciones
  }]
}
```
**Resultado**: 0 trades (aunque las señales se detecten)

#### **Después (Con Acciones):**
```json
{
  "entryBlocks": [{
    "rules": [{"indicator": "sma", "condition": "crosses_above"}],
    "actions": [{"type": "buy_market"}]  // ← SOLUCION: Con acciones
  }]
}
```
**Resultado**: Trades generados cuando se detecten señales

---

## 🔍 **Verificación**

### **1. Revisar Logs del Backend**
```
>> Entry Block 0: 1 reglas, 1 acciones  ← ✅ Con acciones
   - Regla 0: ma crosses_above
>> ABRIENDO TRADE #1 - LONG @ 1.10638  ← ✅ Trade abierto
```

### **2. Verificar en el Frontend**
- El backtest debe mostrar trades generados
- Las métricas deben mostrar `totalTrades > 0`

---

## 🚀 **Pasos Completos**

### **1. Abrir Designer**
```
Frontend → Designer → Seleccionar Estrategia
```

### **2. Configurar Entry Block**
```
Entry Block → Añadir Acción → "Comprar a Mercado"
```

### **3. Configurar Exit Block (Opcional)**
```
Exit Block → Añadir Acción → "Cerrar Posición"
```

### **4. Guardar**
```
Click "Guardar" → Estrategia actualizada
```

### **5. Probar Backtest**
```
Backtesting → Ejecutar Backtest → Ver resultados
```

---

## 📋 **Checklist de Verificación**

- [ ] **Entry Block configurado**
  - [ ] Al menos 1 regla
  - [ ] Al menos 1 acción ("Comprar a Mercado" o "Vender a Mercado")

- [ ] **Exit Block configurado** (opcional)
  - [ ] Al menos 1 regla de salida
  - [ ] Al menos 1 acción ("Cerrar Posición")

- [ ] **Estrategia guardada**
  - [ ] Cambios guardados en localStorage
  - [ ] Estrategia disponible en Backtesting

- [ ] **Backtest ejecutado**
  - [ ] Trades generados > 0
  - [ ] Métricas mostradas correctamente

---

## 🔧 **Troubleshooting**

### **Problema: "0 trades" después de configurar acciones**
- **Causa**: Las reglas no se cumplen en el período de backtesting
- **Solución**: Relajar las condiciones o cambiar el período

### **Problema: "Acciones no se guardan"**
- **Causa**: No se hizo click en "Guardar"
- **Solución**: Guardar la estrategia después de cada cambio

### **Problema: "Señales detectadas pero no trades"**
- **Causa**: Faltan acciones en el Entry Block
- **Solución**: Añadir "Comprar a Mercado" o "Vender a Mercado"

---

## 📚 **Archivos Relacionados**

- **`frontend/src/data/actions.ts`**: Definición de acciones disponibles
- **`backend/services/backtest_engine.py`**: Mapeo de acciones a tipos de trade
- **`frontend/src/components/BacktestDiagnostic.tsx`**: Diagnóstico automático

---

**¡Ahora las estrategias pueden generar trades con las acciones del Designer!** 🎉

**Última actualización**: 22 de octubre de 2025
**Estado**: ✅ Mapeo de acciones implementado
