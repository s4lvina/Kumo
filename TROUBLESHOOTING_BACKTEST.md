# 🔧 Solución de Problemas - Backtesting

## Error: "undefined"

Este error típicamente ocurre cuando la estrategia no está configurada correctamente.

### ✅ **Solución Rápida:**

1. **Verifica que el Backend esté corriendo:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   Deberías ver: `Uvicorn running on http://0.0.0.0:8000`

2. **Crea una Estrategia Válida:**
   
   **Ir al Designer y configurar:**
   - ✅ Al menos 1 bloque de ENTRADA con:
     * 1 regla (ej: RSI < 30)
     * 1 acción (ej: Open Long)
   
   - ✅ Opcional: bloques de salida
   - ✅ Opcional: Stop Loss / Take Profit

3. **Guarda la Estrategia** (botón "Guardar")

4. **Ve a Backtesting** y ejecuta

---

## Checklist de Verificación

### ☑️ Backend
```bash
# Verificar que el backend está corriendo
curl http://localhost:8000/health

# Debería responder: {"status":"ok"}
```

### ☑️ Estrategia Mínima Válida

Tu estrategia DEBE tener:

```javascript
{
  "name": "Mi Estrategia",
  "timeframe": "1h",
  "entryBlocks": [  // ← CRÍTICO: Al menos 1 bloque
    {
      "id": "entry-1",
      "type": "entry",
      "enabled": true,
      "rules": [  // ← CRÍTICO: Al menos 1 regla
        {
          "indicator": {
            "indicator": "rsi",
            "parameters": {"period": 14}
          },
          "condition": "less_than",
          "comparisonValue": {
            "type": "number",
            "numericValue": 30
          }
        }
      ],
      "actions": [  // ← CRÍTICO: Al menos 1 acción
        {
          "action": "open_long"
        }
      ]
    }
  ]
}
```

---

## Errores Comunes

### 1. "La estrategia debe tener al menos un bloque de entrada"

**Causa:** No hay bloques de entrada o están vacíos

**Solución:**
- Ve al Designer
- Click "Añadir Entrada"
- Añade al menos 1 indicador
- Añade al menos 1 acción
- Guarda

### 2. Sin bloques de salida

**Causa:** Solo tiene bloques de entrada

**Solución:**
- Añadir bloques de salida, O
- Configurar Stop Loss / Take Profit

### 3. Sin reglas en los bloques

**Causa:** Bloques vacíos sin condiciones

**Solución:**
- Seleccionar indicadores del panel lateral
- Se añadirán automáticamente al último bloque

### 4. Backend no responde

**Síntomas:**
- "Error al conectar con el servidor"
- Timeout

**Solución:**
```bash
# Verificar puerto
netstat -ano | findstr :8000

# Reiniciar backend
cd backend
venv\Scripts\activate
uvicorn main:app --reload
```

---

## Testing Manual

### Test 1: Crear Estrategia Simple

```
1. Designer → "Añadir Entrada"
2. Panel lateral → Click "RSI"
3. En la regla: 
   - Condición: "menor que (<)"
   - Valor: 30
4. Panel lateral → Click "Open Long"
5. Guardar estrategia
6. Backtesting → Ejecutar
```

**Resultado esperado:**
- ✅ Gráfico de TradingView cargado
- ✅ Configuración visible
- ✅ Botón "Ejecutar Backtest" habilitado
- ✅ Tras ejecutar: métricas y trades visibles

### Test 2: Verificar Logs

**Console del Navegador (F12):**
```javascript
// Deberías ver:
"📊 Backtest response: {success: true, ...}"

// NO deberías ver:
"❌ Error en backtest"
```

**Terminal del Backend:**
```
>> Ejecutando backtest para: Mi Estrategia
>> Iniciando motor de backtest...
>> Backtest completado: 12 trades
```

---

## Logs de Debugging

### Frontend (Navegador)

Abre consola (F12) y busca:

```javascript
// Estrategia enviada
📊 Backtest response: {
  success: boolean,
  strategyName: string,
  metrics: {...},
  trades: [...],
  equityCurve: [...]
}
```

### Backend (Terminal)

```
📊 Ejecutando backtest para: [Nombre]
🚀 Iniciando motor de backtest...
✅ Backtest completado: [N] trades
```

Si ves errores:
```
❌ Error en backtest: [Mensaje]
Traceback: [Stack trace completo]
```

---

## Script de Test Independiente

Prueba el motor directamente sin frontend:

```bash
cd backend
python test_backtest_simple.py
```

**Salida esperada:**
```
>> Backtest completado exitosamente!
>> RESULTADOS:
  Total Trades: 12
  Win Rate: 58.33%
  Net Profit: $-0.69
  ...
```

---

## Solución Definitiva

Si nada funciona:

### Opción 1: Estrategia desde Cero

1. **Borrar todas las estrategias:**
   - Abrir DevTools (F12)
   - Console: `localStorage.clear()`
   - Recargar página

2. **Crear nueva estrategia simple:**
   - Designer → Nueva
   - Añadir: RSI < 30 → Open Long
   - Añadir: RSI > 70 → Close Position
   - SL: 50 pips, TP: 100 pips
   - Guardar

3. **Probar backtest**

### Opción 2: Reiniciar Todo

```bash
# Backend
cd backend
# Ctrl+C para parar
venv\Scripts\activate
uvicorn main:app --reload

# Frontend (nueva terminal)
cd frontend  
npm run dev
```

### Opción 3: Verificar Versiones

```bash
# Python
python --version  # Debería ser 3.11+

# Node
node --version   # Debería ser 18+

# Dependencias backend
cd backend
pip list | findstr numpy  # numpy 1.26.4
```

---

## Contacto

Si el problema persiste:

1. **Copiar logs completos:**
   - Console del navegador (F12)
   - Terminal del backend

2. **Exportar estrategia:**
   - Designer → Estrategia
   - Copiar JSON completo

3. **Información del sistema:**
   - OS: Windows/Mac/Linux
   - Python version
   - Node version

4. **Reportar issue con toda la información**

---

## FAQ

**P: ¿Por qué dice "undefined"?**  
R: La estrategia no tiene bloques de entrada válidos.

**P: ¿Cuántos trades debería generar?**  
R: Depende de la estrategia. Entre 10-100 es normal.

**P: ¿Por qué el profit es negativo?**  
R: Es normal en backtesting. No todas las estrategias son rentables.

**P: ¿Los datos son reales?**  
R: Actualmente son simulados. Próximamente integraremos datos reales.

**P: ¿Puedo optimizar parámetros?**  
R: Aún no está implementado. Es una funcionalidad futura.

---

**Última actualización**: Octubre 2025  
**Versión del motor**: 1.0.0

