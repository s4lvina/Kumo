#!/usr/bin/env python3
"""
Script para capturar exactamente qué está enviando el frontend
"""
import json
import sys
import os

# Agregar el directorio actual al path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def simulate_exact_frontend_request():
    """Simula exactamente lo que envía el frontend"""
    print("SIMULANDO PETICION EXACTA DEL FRONTEND...")
    
    # Esta es la estructura EXACTA que debería enviar el frontend
    # basada en lo que vemos en la imagen del Designer
    frontend_request = {
        "strategy": {
            "id": "strategy_1",
            "name": "Golden/Death Cross",
            "description": "Estrategia de cruce de medias móviles",
            "entryBlocks": [{
                "id": "entry_1",
                "enabled": True,
                "rules": [{
                    "id": "rule_1",
                    "indicator": {
                        "indicator": "sma",
                        "parameters": {"period": 50}
                    },
                    "condition": "crosses_above",
                    "comparisonValue": {
                        "type": "indicator",
                        "indicatorValue": {
                            "indicator": "sma",
                            "parameters": {"period": 200}
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
        },
        "config": {
            "symbol": "EURUSD",
            "timeframe": "1h",
            "startDate": "2024-01-01",
            "endDate": "2024-12-31",
            "initialBalance": 10000,
            "positionSize": 1,
            "positionSizing": "fixed_lots"
        }
    }
    
    print(f"Estructura de la peticion:")
    print(f"  Strategy name: {frontend_request['strategy']['name']}")
    print(f"  Entry blocks: {len(frontend_request['strategy']['entryBlocks'])}")
    
    entry_block = frontend_request['strategy']['entryBlocks'][0]
    print(f"  Entry block rules: {len(entry_block['rules'])}")
    print(f"  Entry block actions: {len(entry_block['actions'])}")
    
    if entry_block['actions']:
        action = entry_block['actions'][0]
        print(f"  Action type: {action['type']}")
        print(f"  Action enabled: {action.get('enabled', True)}")
        print(f"  Action ID: {action.get('id', 'N/A')}")
    
    return frontend_request

def test_backend_with_exact_request():
    """Prueba el backend con la petición exacta"""
    print(f"\n" + "="*60)
    print("PROBANDO BACKEND CON PETICION EXACTA...")
    
    try:
        import requests
        
        request_data = simulate_exact_frontend_request()
        
        print(f"\nEnviando peticion al backend...")
        response = requests.post('http://localhost:8000/api/v1/backtest', json=request_data)
        
        if response.status_code == 200:
            data = response.json()
            print(f"Backtest exitoso!")
            print(f"  Success: {data.get('success', False)}")
            print(f"  Total trades: {data.get('metrics', {}).get('totalTrades', 0)}")
            print(f"  Net profit: {data.get('metrics', {}).get('netProfit', 0)}")
            
            if data.get('metrics', {}).get('totalTrades', 0) > 0:
                print(f"  RESULTADO: ESTRATEGIA FUNCIONA - Genera trades")
            else:
                print(f"  RESULTADO: ESTRATEGIA NO FUNCIONA - 0 trades")
                print(f"  Posibles causas:")
                print(f"    - Las condiciones no se cumplen en el periodo")
                print(f"    - Los indicadores no estan implementados")
                print(f"    - Hay un problema en el BacktestEngine")
                
        else:
            print(f"Error en backtest: {response.status_code}")
            print(f"  Response: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

def analyze_possible_causes():
    """Analiza las posibles causas del problema"""
    print(f"\n" + "="*60)
    print("ANALISIS DE POSIBLES CAUSAS:")
    
    print(f"\n1. PROBLEMA: Estrategia del localStorage no tiene acciones")
    print(f"   Verificacion: Revisar en DevTools -> Application -> Local Storage")
    print(f"   Buscar la estrategia y verificar que tenga 'actions' array")
    
    print(f"\n2. PROBLEMA: Acciones no se envian en el JSON")
    print(f"   Verificacion: Revisar en DevTools -> Network -> Request payload")
    print(f"   Verificar que el JSON contenga 'actions' array")
    
    print(f"\n3. PROBLEMA: BacktestEngine no procesa las acciones")
    print(f"   Verificacion: Revisar logs del backend")
    print(f"   Buscar 'Entry Block: X reglas, Y acciones'")
    
    print(f"\n4. PROBLEMA: Condiciones no se cumplen")
    print(f"   Verificacion: Cambiar el periodo de backtesting")
    print(f"   Probar con fechas mas recientes o diferentes simbolos")

if __name__ == "__main__":
    print("ANALIZADOR DE PETICIONES EXACTAS")
    print("=" * 60)
    
    simulate_exact_frontend_request()
    test_backend_with_exact_request()
    analyze_possible_causes()
    
    print(f"\n" + "="*60)
    print("RECOMENDACIONES INMEDIATAS:")
    print("1. Abrir DevTools (F12) en el navegador")
    print("2. Ir a Network tab")
    print("3. Ejecutar un backtest")
    print("4. Ver el request payload y verificar que tenga 'actions'")
    print("5. Si no tiene 'actions', el problema esta en el frontend")
    print("6. Si tiene 'actions' pero sigue dando 0 trades, el problema esta en el backend")
