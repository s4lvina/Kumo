# 🧪 Testing del Motor de Backtesting

## Cómo Probar el Motor

### 1. Probar Manualmente con curl

```bash
curl -X POST http://localhost:8000/api/v1/backtest \
  -H "Content-Type: application/json" \
  -d '{
    "strategy": {
      "name": "Test RSI",
      "timeframe": "1h",
      "positionSizing": {"type": "fixed_lots", "value": 0.1},
      "entryBlocks": [{
        "id": "entry-1",
        "type": "entry",
        "enabled": true,
        "rules": [{
          "id": "rule-1",
          "indicator": {
            "indicator": "rsi",
            "parameters": {"period": 14}
          },
          "condition": "less_than",
          "comparisonValue": {
            "type": "number",
            "numericValue": 30
          }
        }],
        "actions": [{"action": "open_long"}]
      }],
      "exitBlocks": [{
        "id": "exit-1",
        "type": "exit",
        "enabled": true,
        "rules": [{
          "id": "rule-2",
          "indicator": {
            "indicator": "rsi",
            "parameters": {"period": 14}
          },
          "condition": "greater_than",
          "comparisonValue": {
            "type": "number",
            "numericValue": 70
          }
        }],
        "actions": [{"action": "close_position"}]
      }],
      "stopLoss": {"enabled": true, "type": "pips", "value": 50},
      "takeProfit": {"enabled": true, "type": "pips", "value": 100}
    },
    "config": {
      "symbol": "EURUSD",
      "timeframe": "1h",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "initialBalance": 10000,
      "commission": 0.02,
      "slippage": 2
    }
  }'
```

### 2. Probar desde Frontend

1. Ve al Designer
2. Crea una estrategia simple:
   - Entrada: RSI < 30
   - Salida: RSI > 70
   - Stop Loss: 50 pips
   - Take Profit: 100 pips
3. Guarda la estrategia
4. Ve a Backtesting
5. Selecciona la estrategia
6. Click "Ejecutar Backtest"

### 3. Verificar Resultados

Deberías ver:
- ✅ Total de trades > 0
- ✅ Win rate entre 40-70%
- ✅ Profit factor > 0
- ✅ Curva de equity
- ✅ Lista de trades con detalles

## Casos de Prueba

### Caso 1: Estrategia Rentable

**Setup:**
- RSI oversold/overbought
- Stop Loss: 50 pips
- Take Profit: 100 pips (2:1 ratio)

**Esperado:**
- Win rate: ~50-65%
- Profit factor: > 1.5
- Net profit: positivo

### Caso 2: Estrategia con Solo Entradas

**Setup:**
- Solo bloques de entrada
- Sin bloques de salida
- Sin SL/TP

**Esperado:**
- Trades no se cierran
- Mensaje de error o warning

### Caso 3: Stop Loss Ajustado

**Setup:**
- Stop Loss muy estrecho (10 pips)
- Take Profit amplio (200 pips)

**Esperado:**
- Muchos trades perdedores
- Win rate bajo (~30%)
- Net profit negativo

### Caso 4: Sin Condiciones

**Setup:**
- Bloques vacíos
- Sin reglas

**Esperado:**
- 0 trades
- Error o warning

## Debugging

### Si no hay trades:

```python
# Verificar en backend/services/backtest_engine.py
# Añadir prints en check_entry_conditions:

def check_entry_conditions(self, bar, price_history):
    print(f"Checking entry at {bar['time']}")
    print(f"Entry blocks: {len(self.strategy.get('entryBlocks', []))}")
    
    for block in entry_blocks:
        print(f"Block {block['id']}: {len(block['rules'])} rules")
        for rule in block['rules']:
            indicator_value = self.calculate_indicator_value(...)
            print(f"  {rule['indicator']['indicator']} = {indicator_value}")
```

### Si métricas son raras:

```python
# Verificar cálculos en calculate_metrics()
print(f"Trades: {len(self.trades)}")
print(f"Winning: {len(winning_trades)}")
print(f"Losing: {len(losing_trades)}")
print(f"Total profit: {total_profit}")
print(f"Total loss: {total_loss}")
```

---

**Estado**: Motor funcionando con datos simulados ✅  
**Próximo**: Integrar datos reales 🔜

