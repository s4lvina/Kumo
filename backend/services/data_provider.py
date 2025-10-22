"""
Proveedor de datos históricos para backtesting
Integración con Alpha Vantage API
"""
import requests
import time
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import os

class DataProvider:
    """Proveedor de datos históricos"""
    
    def __init__(self):
        self.api_key = os.getenv('ALPHA_VANTAGE_API_KEY', 'demo')
        self.base_url = 'https://www.alphavantage.co/query'
        self.rate_limit_delay = 12  # 5 calls per minute = 12 seconds between calls
        
    def get_forex_data(self, symbol: str, timeframe: str, start_date: str, end_date: str) -> List[Dict[str, Any]]:
        """
        Obtiene datos históricos de forex desde Alpha Vantage
        
        Args:
            symbol: Par de divisas (ej: 'EURUSD')
            timeframe: Temporalidad ('1h', '4h', '1d')
            start_date: Fecha inicio (YYYY-MM-DD)
            end_date: Fecha fin (YYYY-MM-DD)
            
        Returns:
            Lista de barras OHLC
        """
        try:
            # Mapear timeframe a formato Alpha Vantage
            interval_map = {
                '1': '1min',
                '5': '5min', 
                '15': '15min',
                '30': '30min',
                '60': '60min',
                '1h': '60min',
                '240': '240min',
                '4h': '240min',
                'D': 'daily',
                '1d': 'daily'
            }
            
            interval = interval_map.get(timeframe, '60min')
            
            # Construir URL para forex
            params = {
                'function': 'FX_INTRADAY' if interval != 'daily' else 'FX_DAILY',
                'from_symbol': symbol[:3],  # EUR
                'to_symbol': symbol[3:],    # USD
                'interval': interval,
                'apikey': self.api_key,
                'outputsize': 'full'
            }
            
            print(f"[DATA_PROVIDER] Obteniendo datos: {symbol} {timeframe} desde {start_date} hasta {end_date}")
            
            response = requests.get(self.base_url, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            # Verificar si hay error en la respuesta
            if 'Error Message' in data:
                raise Exception(f"Error Alpha Vantage: {data['Error Message']}")
            
            if 'Note' in data:
                raise Exception(f"Rate limit Alpha Vantage: {data['Note']}")
            
            # Extraer datos de la respuesta
            if interval != 'daily':
                time_series_key = f'Time Series FX ({interval})'
            else:
                time_series_key = 'Time Series (FX)'
                
            if time_series_key not in data:
                raise Exception(f"No se encontraron datos en la respuesta: {list(data.keys())}")
            
            time_series = data[time_series_key]
            
            # Convertir a formato estándar
            bars = []
            start_dt = datetime.fromisoformat(start_date)
            end_dt = datetime.fromisoformat(end_date)
            
            for timestamp, ohlc in time_series.items():
                try:
                    # Parsear timestamp
                    if ' ' in timestamp:
                        bar_time = datetime.fromisoformat(timestamp.replace(' ', 'T'))
                    else:
                        bar_time = datetime.fromisoformat(timestamp)
                    
                    # Filtrar por rango de fechas
                    if start_dt <= bar_time <= end_dt:
                        bars.append({
                            'time': bar_time,
                            'open': float(ohlc['1. open']),
                            'high': float(ohlc['2. high']),
                            'low': float(ohlc['3. low']),
                            'close': float(ohlc['4. close']),
                            'volume': 1000  # Alpha Vantage no proporciona volumen para forex
                        })
                except (ValueError, KeyError) as e:
                    print(f"[DATA_PROVIDER] Error procesando barra {timestamp}: {e}")
                    continue
            
            # Ordenar por tiempo
            bars.sort(key=lambda x: x['time'])
            
            print(f"[DATA_PROVIDER] Obtenidos {len(bars)} barras de datos reales")
            return bars
            
        except requests.exceptions.RequestException as e:
            print(f"[DATA_PROVIDER] Error de red: {e}")
            return self._generate_fallback_data(symbol, timeframe, start_date, end_date)
        except Exception as e:
            print(f"[DATA_PROVIDER] Error: {e}")
            return self._generate_fallback_data(symbol, timeframe, start_date, end_date)
    
    def _generate_fallback_data(self, symbol: str, timeframe: str, start_date: str, end_date: str) -> List[Dict[str, Any]]:
        """Genera datos de fallback si la API falla"""
        print(f"[DATA_PROVIDER] Generando datos de fallback para {symbol}")
        
        # Calcular número de barras basado en timeframe
        timeframe_map = {
            '1': 1, '5': 5, '15': 15, '30': 30,
            '60': 60, '1h': 60, '240': 240, '4h': 240,
            'D': 1440, '1d': 1440
        }
        
        minutes = timeframe_map.get(timeframe, 60)
        start_dt = datetime.fromisoformat(start_date)
        end_dt = datetime.fromisoformat(end_date)
        total_minutes = int((end_dt - start_dt).total_seconds() / 60)
        num_bars = total_minutes // minutes
        
        # Generar datos más realistas que el random walk anterior
        bars = []
        base_price = 1.1000 if 'EUR' in symbol else 1.0000
        current_price = base_price
        
        for i in range(num_bars):
            # Movimiento más realista con tendencias y reversiones
            if i % 200 < 100:  # Tendencia alcista
                change = 0.0001 + (i % 10) * 0.00001
            else:  # Tendencia bajista
                change = -0.0001 - (i % 10) * 0.00001
                
            current_price += change
            
            # Generar OHLC más realista
            high = current_price + abs(change) * 2
            low = current_price - abs(change) * 2
            open_price = current_price - change * 0.5
            close = current_price
            
            bar_time = start_dt + timedelta(minutes=i * minutes)
            
            bars.append({
                'time': bar_time,
                'open': open_price,
                'high': high,
                'low': low,
                'close': close,
                'volume': 1000
            })
        
        print(f"[DATA_PROVIDER] Generados {len(bars)} barras de fallback")
        return bars

# Instancia global
data_provider = DataProvider()
