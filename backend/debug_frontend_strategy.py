"""
Debug de la estrategia que viene del frontend
"""
import sys
sys.path.append('.')

from services.backtest_engine import BacktestEngine
import json

# Simular la estrategia que viene del frontend
strategy = {
    "name": "Reversión Estocástica",
    "description": "Estrategia de reversión usando Stochastic",
    "timeframe": "1h",
    "entryBlocks": [
        {
            "id": 1,
            "name": "Entry Stochastic",
            "enabled": True,
            "rules": [
                {
                    "indicator": {
                        "indicator": "stochastic",
                        "parameters": {"period": 14}
                    },
                    "condition": "less_than",
                    "comparisonValue": {
                        "type": "number",
                        "numericValue": 20
                    }
                }
            ],
            "actions": [
                {
                    "action": "open_long",
                    "lotSize": 0.1,
                    "positionSizing": {
                        "type": "fixed_lots",
                        "value": 0.1
                    }
                }
            ]
        }
    ],
    "exitBlocks": [
        {
            "id": 2,
            "name": "Exit Stochastic",
            "enabled": True,
            "rules": [
                {
                    "indicator": {
                        "indicator": "stochastic",
                        "parameters": {"period": 14}
                    },
                    "condition": "greater_than",
                    "comparisonValue": {
                        "type": "number",
                        "numericValue": 80
                    }
                }
            ],
            "actions": [
                {
                    "action": "close_position"
                }
            ]
        }
    ],
    "stopLoss": {"enabled": True, "type": "pips", "value": 50},
    "takeProfit": {"enabled": True, "type": "pips", "value": 100}
}

config = {
    "symbol": "EURUSD",
    "timeframe": "1h",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "initialBalance": 10000,
    "commission": 0.02,
    "slippage": 2
}

print("="*60)
print("DEBUG: Estrategia del Frontend")
print("="*60)

# Debug: mostrar estructura de la estrategia
print(f"Nombre: {strategy['name']}")
print(f"Entry Blocks: {len(strategy['entryBlocks'])}")
print(f"Exit Blocks: {len(strategy['exitBlocks'])}")

for i, block in enumerate(strategy['entryBlocks']):
    print(f"\nEntry Block {i}:")
    print(f"  - Enabled: {block.get('enabled', True)}")
    print(f"  - Rules: {len(block.get('rules', []))}")
    print(f"  - Actions: {len(block.get('actions', []))}")
    
    for j, rule in enumerate(block.get('rules', [])):
        ind = rule.get('indicator', {}).get('indicator', 'unknown')
        cond = rule.get('condition', 'unknown')
        comp = rule.get('comparisonValue', {})
        print(f"    Rule {j}: {ind} {cond} {comp.get('numericValue', comp.get('type', 'unknown'))}")
    
    for j, action in enumerate(block.get('actions', [])):
        act = action.get('action', 'unknown')
        lot = action.get('lotSize', 'unknown')
        print(f"    Action {j}: {act} {lot}")

print("\n" + "="*60)
print("EJECUTANDO BACKTEST:")
print("="*60)

# Ejecutar backtest
engine = BacktestEngine(strategy, config)
result = engine.run()

print(f"\nTotal Trades: {result['metrics']['totalTrades']}")
print(f"Win Rate: {result['metrics']['winRate']:.2f}%")
print(f"Net Profit: ${result['metrics']['netProfit']:.2f}")

if result['metrics']['totalTrades'] > 0:
    print(f"\n>> EXITO! Se generaron {result['metrics']['totalTrades']} trades")
else:
    print("\n>> ERROR: No se generaron trades")
    print("Posibles causas:")
    print("1. Las reglas nunca se cumplen")
    print("2. Las acciones no están configuradas")
    print("3. Problema con el position sizing")

print("\n" + "="*60)
