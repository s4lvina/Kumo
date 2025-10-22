#!/usr/bin/env python3
"""
Script para analizar la estructura de las estrategias del frontend
y identificar por qué no se generan trades
"""
import json
import sys
import os

# Agregar el directorio actual al path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def analyze_strategy_structure(strategy_data):
    """Analiza la estructura de una estrategia"""
    print(f"\n=== ANALISIS DE ESTRATEGIA: {strategy_data.get('name', 'Unknown')} ===")
    
    # Analizar Entry Blocks
    entry_blocks = strategy_data.get('entryBlocks', [])
    print(f"\nENTRY BLOCKS: {len(entry_blocks)}")
    
    for i, block in enumerate(entry_blocks):
        rules = block.get('rules', [])
        actions = block.get('actions', [])
        
        print(f"\n  Entry Block {i}:")
        print(f"    Reglas: {len(rules)}")
        print(f"    Acciones: {len(actions)}")
        
        if len(rules) == 0:
            print(f"    PROBLEMA: Sin reglas de entrada")
        else:
            print(f"    Reglas configuradas")
            for j, rule in enumerate(rules):
                indicator = rule.get('indicator', {}).get('indicator', 'unknown')
                condition = rule.get('condition', 'unknown')
                print(f"      - Regla {j}: {indicator} {condition}")
        
        if len(actions) == 0:
            print(f"    PROBLEMA CRITICO: Sin acciones (Open Long/Short)")
        else:
            print(f"    Acciones configuradas")
            for j, action in enumerate(actions):
                action_type = action.get('type', 'unknown')
                print(f"      - Accion {j}: {action_type}")
    
    # Analizar Exit Blocks
    exit_blocks = strategy_data.get('exitBlocks', [])
    print(f"\nEXIT BLOCKS: {len(exit_blocks)}")
    
    for i, block in enumerate(exit_blocks):
        rules = block.get('rules', [])
        actions = block.get('actions', [])
        
        print(f"\n  Exit Block {i}:")
        print(f"    Reglas: {len(rules)}")
        print(f"    Acciones: {len(actions)}")
        
        if len(rules) == 0:
            print(f"    Sin reglas de salida (opcional)")
        else:
            print(f"    Reglas de salida configuradas")
        
        if len(actions) == 0:
            print(f"    Sin acciones de salida (opcional)")
        else:
            print(f"    Acciones de salida configuradas")
    
    # Diagnóstico
    print(f"\nDIAGNOSTICO:")
    
    total_entry_rules = sum(len(block.get('rules', [])) for block in entry_blocks)
    total_entry_actions = sum(len(block.get('actions', [])) for block in entry_blocks)
    
    if total_entry_rules == 0:
        print(f"CRITICO: Sin reglas de entrada")
    else:
        print(f"Reglas de entrada: {total_entry_rules}")
    
    if total_entry_actions == 0:
        print(f"CRITICO: Sin acciones de entrada (Open Long/Short)")
        print(f"SOLUCION: Anadir acciones en el Designer")
    else:
        print(f"Acciones de entrada: {total_entry_actions}")
    
    # Verificar si la estrategia puede funcionar
    can_work = total_entry_rules > 0 and total_entry_actions > 0
    print(f"\nESTRATEGIA PUEDE FUNCIONAR: {'SI' if can_work else 'NO'}")
    
    if not can_work:
        print(f"\nPROBLEMAS IDENTIFICADOS:")
        if total_entry_rules == 0:
            print(f"   - Sin reglas de entrada")
        if total_entry_actions == 0:
            print(f"   - Sin acciones de entrada (Open Long/Short)")
        print(f"\nSOLUCION:")
        print(f"   1. Ve al Designer")
        print(f"   2. Selecciona tu estrategia")
        print(f"   3. Entry Block -> Anadir Accion -> 'Open Long' o 'Open Short'")
        print(f"   4. Guarda la estrategia")
        print(f"   5. Ejecuta el backtest de nuevo")

def test_sample_strategies():
    """Prueba con estrategias de ejemplo"""
    print("PROBANDO ESTRATEGIAS DE EJEMPLO...")
    
    # Estrategia que SÍ funciona
    working_strategy = {
        "name": "Cruce SMA Funcional",
        "entryBlocks": [{
            "rules": [{
                "indicator": {"indicator": "sma", "parameters": {"period": 14}},
                "condition": "crosses_above",
                "comparisonValue": {
                    "type": "indicator",
                    "indicatorValue": {"indicator": "sma", "parameters": {"period": 50}}
                }
            }],
            "actions": [{"type": "open_long"}]  # ACCION CONFIGURADA
        }],
        "exitBlocks": [{
            "rules": [{
                "indicator": {"indicator": "sma", "parameters": {"period": 14}},
                "condition": "crosses_below",
                "comparisonValue": {
                    "type": "indicator", 
                    "indicatorValue": {"indicator": "sma", "parameters": {"period": 50}}
                }
            }],
            "actions": [{"type": "close_position"}]  # ACCION CONFIGURADA
        }]
    }
    
    print(f"\nESTRATEGIA QUE SI FUNCIONA:")
    analyze_strategy_structure(working_strategy)
    
    # Estrategia que NO funciona (sin acciones)
    broken_strategy = {
        "name": "Cruce SMA Sin Acciones",
        "entryBlocks": [{
            "rules": [{
                "indicator": {"indicator": "sma", "parameters": {"period": 14}},
                "condition": "crosses_above",
                "comparisonValue": {
                    "type": "indicator",
                    "indicatorValue": {"indicator": "sma", "parameters": {"period": 50}}
                }
            }],
            "actions": []  # SIN ACCIONES
        }],
        "exitBlocks": []
    }
    
    print(f"\nESTRATEGIA QUE NO FUNCIONA:")
    analyze_strategy_structure(broken_strategy)

if __name__ == "__main__":
    print("ANALIZADOR DE ESTRUCTURA DE ESTRATEGIAS")
    print("=" * 50)
    
    # Probar estrategias de ejemplo
    test_sample_strategies()
    
    print(f"\n" + "=" * 50)
    print(f"RESUMEN:")
    print(f"   Estrategias necesitan REGLAS + ACCIONES")
    print(f"   Sin acciones = 0 trades (aunque las senales se detecten)")
    print(f"   Solucion: Anadir acciones en el Designer")
