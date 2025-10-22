#!/usr/bin/env python3
"""
Script para analizar la estructura de las estrategias del frontend
y verificar si tienen acciones configuradas
"""
import json
import sys
import os

# Agregar el directorio actual al path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def analyze_frontend_strategy():
    """Analiza una estrategia típica del frontend"""
    print("ANALIZANDO ESTRUCTURA DE ESTRATEGIA DEL FRONTEND...")
    
    # Estrategia típica del frontend (basada en la imagen)
    frontend_strategy = {
        "id": "strategy_1",
        "name": "Cruce SMA 14 - 50",
        "description": "Estrategia de cruce de medias móviles",
        "entryBlocks": [{
            "id": "entry_1",
            "enabled": True,
            "rules": [{
                "id": "rule_1",
                "indicator": {
                    "indicator": "sma",
                    "parameters": {"period": 14}
                },
                "condition": "crosses_above",
                "comparisonValue": {
                    "type": "indicator",
                    "indicatorValue": {
                        "indicator": "sma",
                        "parameters": {"period": 50}
                    }
                }
            }],
            "actions": [{
                "id": "action_1",
                "type": "buy_market",
                "enabled": True
            }]
        }],
        "exitBlocks": [],
        "riskManagement": {
            "stopLoss": {
                "enabled": True,
                "type": "percentage",
                "value": 2
            },
            "takeProfit": {
                "enabled": True,
                "type": "percentage", 
                "value": 5
            }
        }
    }
    
    print(f"\nEstrategia: {frontend_strategy['name']}")
    
    # Analizar Entry Blocks
    entry_blocks = frontend_strategy.get('entryBlocks', [])
    print(f"\nENTRY BLOCKS: {len(entry_blocks)}")
    
    for i, block in enumerate(entry_blocks):
        rules = block.get('rules', [])
        actions = block.get('actions', [])
        
        print(f"\n  Entry Block {i}:")
        print(f"    ID: {block.get('id', 'N/A')}")
        print(f"    Enabled: {block.get('enabled', True)}")
        print(f"    Reglas: {len(rules)}")
        print(f"    Acciones: {len(actions)}")
        
        # Analizar reglas
        for j, rule in enumerate(rules):
            print(f"      Regla {j}:")
            print(f"        ID: {rule.get('id', 'N/A')}")
            print(f"        Indicador: {rule.get('indicator', {}).get('indicator', 'unknown')}")
            print(f"        Condición: {rule.get('condition', 'unknown')}")
        
        # Analizar acciones
        for j, action in enumerate(actions):
            print(f"      Acción {j}:")
            print(f"        ID: {action.get('id', 'N/A')}")
            print(f"        Tipo: {action.get('type', 'unknown')}")
            print(f"        Enabled: {action.get('enabled', True)}")
    
    # Analizar Risk Management
    risk_mgmt = frontend_strategy.get('riskManagement', {})
    print(f"\nGESTION DE RIESGO:")
    print(f"  Stop Loss: {risk_mgmt.get('stopLoss', {}).get('enabled', False)}")
    print(f"  Take Profit: {risk_mgmt.get('takeProfit', {}).get('enabled', False)}")
    
    # Verificar si puede funcionar
    total_entry_rules = sum(len(block.get('rules', [])) for block in entry_blocks)
    total_entry_actions = sum(len(block.get('actions', [])) for block in entry_blocks)
    
    print(f"\nDIAGNOSTICO:")
    print(f"  Reglas de entrada: {total_entry_rules}")
    print(f"  Acciones de entrada: {total_entry_actions}")
    
    can_work = total_entry_rules > 0 and total_entry_actions > 0
    print(f"  Estrategia puede funcionar: {'SI' if can_work else 'NO'}")
    
    if can_work:
        print(f"\nESTRATEGIA CONFIGURADA CORRECTAMENTE")
        print(f"   - Tiene reglas de entrada")
        print(f"   - Tiene acciones de entrada")
        print(f"   - Deberia generar trades")
    else:
        print(f"\nPROBLEMAS EN LA ESTRATEGIA")
        if total_entry_rules == 0:
            print(f"   - Sin reglas de entrada")
        if total_entry_actions == 0:
            print(f"   - Sin acciones de entrada")

def test_backtest_with_frontend_strategy():
    """Prueba el backtest con una estrategia del frontend"""
    print(f"\n" + "="*60)
    print("PROBANDO BACKTEST CON ESTRATEGIA DEL FRONTEND...")
    
    try:
        import requests
        
        # Estrategia del frontend
        strategy = {
            "id": "strategy_1",
            "name": "Cruce SMA 14 - 50",
            "entryBlocks": [{
                "id": "entry_1",
                "enabled": True,
                "rules": [{
                    "id": "rule_1",
                    "indicator": {
                        "indicator": "sma",
                        "parameters": {"period": 14}
                    },
                    "condition": "crosses_above",
                    "comparisonValue": {
                        "type": "indicator",
                        "indicatorValue": {
                            "indicator": "sma",
                            "parameters": {"period": 50}
                        }
                    }
                }],
                "actions": [{
                    "id": "action_1",
                    "type": "buy_market",
                    "enabled": True
                }]
            }],
            "exitBlocks": []
        }
        
        config = {
            "symbol": "EURUSD",
            "timeframe": "1h",
            "startDate": "2024-01-01",
            "endDate": "2024-12-31",
            "initialBalance": 10000,
            "positionSize": 1,
            "positionSizing": "fixed_lots"
        }
        
        response = requests.post('http://localhost:8000/api/v1/backtest', json={
            "strategy": strategy,
            "config": config
        })
        
        if response.status_code == 200:
            data = response.json()
            print(f"Backtest exitoso!")
            print(f"   Total trades: {data.get('metrics', {}).get('totalTrades', 0)}")
            print(f"   Net profit: {data.get('metrics', {}).get('netProfit', 0)}")
        else:
            print(f"Error en backtest: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("ANALIZADOR DE ESTRATEGIAS DEL FRONTEND")
    print("=" * 60)
    
    analyze_frontend_strategy()
    test_backtest_with_frontend_strategy()
    
    print(f"\n" + "="*60)
    print("CONCLUSION:")
    print("Si la estrategia tiene acciones configuradas pero sigue")
    print("mostrando '0 trades', el problema puede estar en:")
    print("1. La estrategia no se está enviando correctamente desde el frontend")
    print("2. Las condiciones no se cumplen en el período de backtesting")
    print("3. Hay un problema en el mapeo de acciones")
