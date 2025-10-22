"""
Code Generator Service
Genera código ejecutable a partir de estrategias definidas en JSON
"""

from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from typing import Dict, Any
import os


class CodeGenerator:
    """
    Generador de código para múltiples plataformas de trading
    """
    
    def __init__(self):
        # Configurar Jinja2
        template_dir = Path(__file__).parent.parent / "templates" / "code_templates"
        self.env = Environment(
            loader=FileSystemLoader(str(template_dir)),
            autoescape=select_autoescape(['html', 'xml']),
            trim_blocks=True,
            lstrip_blocks=True
        )
        
        # Registrar filtros personalizados
        self.env.filters['to_operator'] = self._to_operator
        self.env.filters['format_indicator'] = self._format_indicator
        self.env.filters['format_value'] = self._format_value
        self.env.filters['snake_case'] = self._snake_case
        self.env.filters['camel_case'] = self._camel_case
    
    def generate_python(self, strategy: Dict[str, Any]) -> str:
        """
        Genera código Python para Backtrader
        """
        template = self.env.get_template('python_backtrader.jinja2')
        return template.render(strategy=strategy)
    
    def generate_mql5(self, strategy: Dict[str, Any]) -> str:
        """
        Genera código MQL5 para MetaTrader 5
        """
        template = self.env.get_template('mql5_ea.jinja2')
        return template.render(strategy=strategy)
    
    def generate_pinescript(self, strategy: Dict[str, Any]) -> str:
        """
        Genera Pine Script v5 para TradingView
        """
        template = self.env.get_template('pinescript_v5.jinja2')
        return template.render(strategy=strategy)
    
    def generate_prorealcode(self, strategy: Dict[str, Any]) -> str:
        """
        Genera ProRealCode para ProRealTime
        """
        template = self.env.get_template('prorealcode.jinja2')
        return template.render(strategy=strategy)
    
    # Filtros personalizados para Jinja2
    
    @staticmethod
    def _to_operator(condition: str) -> str:
        """Convierte condiciones a operadores"""
        operators = {
            'greater_than': '>',
            'less_than': '<',
            'greater_equal': '>=',
            'less_equal': '<=',
            'equal': '==',
            'not_equal': '!=',
            'crosses_above': '>',  # Simplificado
            'crosses_below': '<',  # Simplificado
        }
        return operators.get(condition, '==')
    
    @staticmethod
    def _format_indicator(indicator_name: str) -> str:
        """Formatea el nombre del indicador para código"""
        return indicator_name.upper().replace('_', '')
    
    @staticmethod
    def _format_value(value: Any) -> str:
        """Formatea valores para código"""
        if isinstance(value, dict):
            # Si es una referencia a variable
            if 'variableName' in value:
                return f"self.params.{value['variableName']}"
            # Si es un valor numérico encapsulado
            if 'type' in value and value['type'] == 'number':
                return str(value.get('numericValue', 0))
        return str(value)
    
    @staticmethod
    def _snake_case(text: str) -> str:
        """Convierte texto a snake_case"""
        return text.lower().replace(' ', '_').replace('-', '_')
    
    @staticmethod
    def _camel_case(text: str) -> str:
        """Convierte texto a CamelCase"""
        words = text.replace('_', ' ').replace('-', ' ').split()
        return ''.join(word.capitalize() for word in words)


def get_file_extension(target: str) -> str:
    """Obtiene la extensión de archivo según el target"""
    extensions = {
        "python": "py",
        "mql5": "mq5",
        "pinescript": "pine",
        "prorealcode": "prc"
    }
    return extensions.get(target, "txt")

