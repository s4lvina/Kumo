#!/usr/bin/env python3
"""
Script para simular una petición del frontend y ver qué estructura tiene
"""
import json
import sys
import os

# Agregar el directorio actual al path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def simulate_frontend_request():
    """Simula una petición típica del frontend"""
    print("SIMULANDO PETICION DEL FRONTEND...")
    
    # Estructura típica que envía el frontend
    frontend_request = {
        "strategy": {
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
    
    print(f"Estructura de la petición:")
    print(f"  Strategy name: {frontend_request['strategy']['name']}")
    print(f"  Entry blocks: {len(frontend_request['strategy']['entryBlocks'])}")
    
    entry_block = frontend_request['strategy']['entryBlocks'][0]
    print(f"  Entry block rules: {len(entry_block['rules'])}")
    print(f"  Entry block actions: {len(entry_block['actions'])}")
    
    if entry_block['actions']:
        action = entry_block['actions'][0]
        print(f"  Action type: {action['type']}")
        print(f"  Action enabled: {action.get('enabled', True)}")
    
    return frontend_request

def test_backend_with_frontend_request():
    """Prueba el backend con la petición del frontend"""
    print(f"\n" + "="*60)
    print("PROBANDO BACKEND CON PETICION DEL FRONTEND...")
    
    try:
        import requests
        
        request_data = simulate_frontend_request()
        
        response = requests.post('http://localhost:8000/api/v1/backtest', json=request_data)
        
        if response.status_code == 200:
            data = response.json()
            print(f"Backtest exitoso!")
            print(f"  Success: {data.get('success', False)}")
            print(f"  Total trades: {data.get('metrics', {}).get('totalTrades', 0)}")
            print(f"  Net profit: {data.get('metrics', {}).get('netProfit', 0)}")
            
            if data.get('metrics', {}).get('totalTrades', 0) > 0:
                print(f"  ✅ ESTRATEGIA FUNCIONA - Genera trades")
            else:
                print(f"  ❌ ESTRATEGIA NO FUNCIONA - 0 trades")
                
        else:
            print(f"Error en backtest: {response.status_code}")
            print(f"  Response: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

def analyze_possible_issues():
    """Analiza posibles problemas"""
    print(f"\n" + "="*60)
    print("ANALISIS DE POSIBLES PROBLEMAS:")
    
    print(f"\n1. PROBLEMA: Estrategia del localStorage no tiene acciones")
    print(f"   Solucion: Verificar que la estrategia se guarde con acciones")
    
    print(f"\n2. PROBLEMA: Acciones no se envían correctamente")
    print(f"   Solucion: Verificar el JSON que se envía al backend")
    
    print(f"\n3. PROBLEMA: Condiciones no se cumplen en el período")
    print(f"   Solucion: Cambiar el período de backtesting")
    
    print(f"\n4. PROBLEMA: Mapeo de acciones incorrecto")
    print(f"   Solucion: Verificar que 'buy_market' se mapee a 'long'")

if __name__ == "__main__":
    print("ANALIZADOR DE PETICIONES DEL FRONTEND")
    print("=" * 60)
    
    simulate_frontend_request()
    test_backend_with_frontend_request()
    analyze_possible_issues()
    
    print(f"\n" + "="*60)
    print("RECOMENDACIONES:")
    print("1. Verificar en el navegador qué estrategia se está enviando")
    print("2. Revisar los logs del backend para ver la estructura recibida")
    print("3. Asegurarse de que la estrategia tenga acciones configuradas")
