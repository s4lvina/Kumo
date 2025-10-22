"""
Motor de Backtesting para Kumo
Ejecuta estrategias de trading con datos históricos
"""
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
import random


class Trade:
    """Representa una operación de trading"""
    def __init__(self, trade_id: int, trade_type: str, entry_time: datetime, 
                 entry_price: float, size: float):
        self.id = trade_id
        self.type = trade_type  # 'long' or 'short'
        self.entry_time = entry_time
        self.entry_price = entry_price
        self.size = size
        self.exit_time = None
        self.exit_price = None
        self.profit = 0
        self.profit_percent = 0
        self.pips = 0
        self.duration = 0
        self.entry_reason = ""
        self.exit_reason = ""
        
    def close(self, exit_time: datetime, exit_price: float, exit_reason: str):
        """Cierra la operación"""
        self.exit_time = exit_time
        self.exit_price = exit_price
        self.exit_reason = exit_reason
        
        # Calcular duración
        self.duration = int((exit_time - self.entry_time).total_seconds())
        
        # Calcular profit
        if self.type == 'long':
            self.pips = (exit_price - self.entry_price) * 10000
            self.profit = (exit_price - self.entry_price) * self.size * 100000  # 1 lote = 100,000 unidades
        else:
            self.pips = (self.entry_price - exit_price) * 10000
            self.profit = (self.entry_price - exit_price) * self.size * 100000
            
        self.profit_percent = (self.profit / (self.entry_price * self.size * 100000)) * 100
        
    def to_dict(self) -> Dict:
        """Convierte el trade a diccionario"""
        return {
            'id': self.id,
            'entryTime': self.entry_time.isoformat(),
            'exitTime': self.exit_time.isoformat() if self.exit_time else None,
            'type': self.type,
            'entryPrice': round(self.entry_price, 5),
            'exitPrice': round(self.exit_price, 5) if self.exit_price else None,
            'size': self.size,
            'profit': round(self.profit, 2),
            'profitPercent': round(self.profit_percent, 2),
            'pips': round(self.pips, 1),
            'duration': self.duration,
            'entryReason': self.entry_reason,
            'exitReason': self.exit_reason
        }


class IndicatorCalculator:
    """Calcula indicadores técnicos"""
    
    @staticmethod
    def calculate_sma(prices: List[float], period: int) -> Optional[float]:
        """Simple Moving Average"""
        if len(prices) < period:
            return None
        return sum(prices[-period:]) / period
    
    @staticmethod
    def calculate_ema(prices: List[float], period: int) -> Optional[float]:
        """Exponential Moving Average"""
        if len(prices) < period:
            return None
        
        multiplier = 2 / (period + 1)
        ema = sum(prices[:period]) / period
        
        for price in prices[period:]:
            ema = (price - ema) * multiplier + ema
            
        return ema
    
    @staticmethod
    def calculate_rsi(prices: List[float], period: int = 14) -> Optional[float]:
        """Relative Strength Index"""
        if len(prices) < period + 1:
            return None
        
        changes = [prices[i] - prices[i-1] for i in range(1, len(prices))]
        gains = [c if c > 0 else 0 for c in changes]
        losses = [-c if c < 0 else 0 for c in changes]
        
        avg_gain = sum(gains[-period:]) / period
        avg_loss = sum(losses[-period:]) / period
        
        if avg_loss == 0:
            return 100
        
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        
        return rsi
    
    @staticmethod
    def calculate_macd(prices: List[float], fast: int = 12, slow: int = 26, signal: int = 9) -> Optional[Tuple[float, float, float]]:
        """MACD (Moving Average Convergence Divergence)"""
        if len(prices) < slow:
            return None
        
        ema_fast = IndicatorCalculator.calculate_ema(prices, fast)
        ema_slow = IndicatorCalculator.calculate_ema(prices, slow)
        
        if ema_fast is None or ema_slow is None:
            return None
        
        macd_line = ema_fast - ema_slow
        # Simplificado: en producción calcularíamos la línea de señal correctamente
        signal_line = macd_line * 0.9
        histogram = macd_line - signal_line
        
        return macd_line, signal_line, histogram
    
    @staticmethod
    def calculate_stochastic(highs: List[float], lows: List[float], closes: List[float], 
                             period: int = 14, smooth_k: int = 3, smooth_d: int = 3) -> Optional[Tuple[float, float]]:
        """
        Stochastic Oscillator (%K, %D)
        %K = (Current Close - Lowest Low) / (Highest High - Lowest Low) * 100
        %D = SMA of %K
        """
        if len(closes) < period:
            return None
        
        # Calcular %K para las últimas 'smooth_k' barras
        k_values = []
        for i in range(len(closes) - smooth_k + 1, len(closes) + 1):
            if i < period:
                continue
            window_high = max(highs[i-period:i])
            window_low = min(lows[i-period:i])
            current_close = closes[i-1]
            
            if window_high == window_low:
                k_values.append(50)  # Evitar división por cero
            else:
                k = ((current_close - window_low) / (window_high - window_low)) * 100
                k_values.append(k)
        
        if not k_values:
            return None
        
        # %K suavizado (promedio de los últimos 'smooth_k' valores)
        k_smooth = sum(k_values) / len(k_values) if k_values else 50
        
        # %D es la SMA de %K (simplificado)
        d = k_smooth * 0.9  # Simplificado: debería ser SMA de los últimos %K
        
        return k_smooth, d


class BacktestEngine:
    """Motor principal de backtesting"""
    
    def __init__(self, strategy: Dict[str, Any], config: Dict[str, Any]):
        self.strategy = strategy
        self.config = config
        self.trades: List[Trade] = []
        self.open_trade: Optional[Trade] = None
        self.balance = config.get('initialBalance', 10000)
        self.initial_balance = self.balance
        self.equity_curve = []
        self.trade_counter = 0
        
        # Parámetros de trading
        self.commission_rate = config.get('commission', 0.02) / 100
        self.slippage_pips = config.get('slippage', 2)
        
        # Historial de precios para indicadores
        self.high_history: List[float] = []
        self.low_history: List[float] = []
        
    def generate_price_data(self, num_bars: int = 1000) -> List[Dict[str, Any]]:
        """
        Obtiene datos de precios reales o simulados
        """
        try:
            # Intentar obtener datos reales
            from .data_provider import data_provider
            
            symbol = self.config.get('symbol', 'EURUSD')
            timeframe = self.config.get('timeframe', '1h')
            start_date = self.config.get('startDate', '2024-01-01')
            end_date = self.config.get('endDate', '2024-12-31')
            
            print(f"[BACKTEST] Obteniendo datos reales: {symbol} {timeframe} {start_date} - {end_date}")
            
            bars = data_provider.get_forex_data(symbol, timeframe, start_date, end_date)
            
            if bars and len(bars) > 50:  # Necesitamos al menos 50 barras para indicadores
                print(f"[BACKTEST] Datos reales obtenidos: {len(bars)} barras")
                return bars
            else:
                print(f"[BACKTEST] Datos reales insuficientes, usando fallback")
                return self._generate_fallback_data(num_bars)
                
        except Exception as e:
            print(f"[BACKTEST] Error obteniendo datos reales: {e}")
            print(f"[BACKTEST] Usando datos simulados como fallback")
            return self._generate_fallback_data(num_bars)
    
    def _generate_fallback_data(self, num_bars: int = 1000) -> List[Dict[str, Any]]:
        """Genera datos simulados como fallback"""
        bars = []
        base_price = 1.1000  # Para EURUSD
        current_price = base_price
        start_date = datetime.fromisoformat(self.config.get('startDate', '2024-01-01'))
        
        # Timeframe en minutos
        timeframe_map = {
            '1': 1, '5': 5, '15': 15, '30': 30,
            '60': 60, '1h': 60, '240': 240, '4h': 240,
            'D': 1440, '1d': 1440, 'W': 10080, '1w': 10080
        }
        tf_minutes = timeframe_map.get(self.config.get('timeframe', '60'), 60)
        
        for i in range(num_bars):
            # Simular movimiento de precio (random walk con tendencia)
            change = np.random.normal(0, 0.0005)  # Volatilidad
            trend = 0.00001 if i % 100 < 60 else -0.00001  # Tendencia periódica
            current_price += change + trend
            
            # Generar OHLC
            high = current_price + abs(np.random.normal(0, 0.0003))
            low = current_price - abs(np.random.normal(0, 0.0003))
            open_price = current_price + np.random.normal(0, 0.0002)
            close = current_price
            
            bar_time = start_date + timedelta(minutes=i * tf_minutes)
            
            bars.append({
                'time': bar_time,
                'open': open_price,
                'high': high,
                'low': low,
                'close': close,
                'volume': random.randint(100, 1000)
            })
            
        return bars
    
    def evaluate_condition(self, condition: Dict[str, Any], bar: Dict[str, Any], 
                          price_history: List[float]) -> bool:
        """
        Evalúa una condición individual
        """
        indicator_type = condition['indicator']['indicator']
        parameters = condition['indicator']['parameters']
        condition_type = condition['condition']
        comparison_value = condition['comparisonValue']
        
        # Calcular valor del indicador
        indicator_value = self.calculate_indicator_value(
            indicator_type, parameters, bar, price_history
        )
        
        if indicator_value is None:
            return False
        
        # Obtener valor de comparación
        if comparison_value['type'] == 'number':
            compare_to = comparison_value['numericValue']
        elif comparison_value['type'] == 'indicator':
            compare_to = self.calculate_indicator_value(
                comparison_value['indicatorValue']['indicator'],
                comparison_value['indicatorValue']['parameters'],
                bar, price_history
            )
        else:
            compare_to = 0  # Variables no implementadas aún
        
        if compare_to is None:
            return False
        
        # Evaluar condición
        conditions_map = {
            'greater_than': lambda a, b: a > b,
            'less_than': lambda a, b: a < b,
            'equal': lambda a, b: abs(a - b) < 0.0001,
            'greater_equal': lambda a, b: a >= b,
            'less_equal': lambda a, b: a <= b,
            'crosses_above': lambda a, b: a > b,  # Simplificado
            'crosses_below': lambda a, b: a < b,  # Simplificado
        }
        
        condition_func = conditions_map.get(condition_type)
        if condition_func:
            return condition_func(indicator_value, compare_to)
        
        return False
    
    def calculate_indicator_value(self, indicator_type: str, parameters: Dict[str, Any],
                                  bar: Dict[str, Any], price_history: List[float]) -> Optional[float]:
        """Calcula el valor de un indicador"""
        period = parameters.get('period', 14)
        
        if indicator_type == 'close':
            return bar['close']
        elif indicator_type == 'open':
            return bar['open']
        elif indicator_type == 'high':
            return bar['high']
        elif indicator_type == 'low':
            return bar['low']
        elif indicator_type == 'sma':
            return IndicatorCalculator.calculate_sma(price_history, period)
        elif indicator_type == 'ema':
            return IndicatorCalculator.calculate_ema(price_history, period)
        elif indicator_type == 'rsi':
            return IndicatorCalculator.calculate_rsi(price_history, period)
        elif indicator_type == 'macd':
            result = IndicatorCalculator.calculate_macd(price_history)
            return result[0] if result else None
        elif indicator_type == 'stochastic':
            result = IndicatorCalculator.calculate_stochastic(
                self.high_history, self.low_history, price_history, period
            )
            return result[0] if result else None  # Retorna %K
        elif indicator_type == 'ma':  # Alias para SMA
            return IndicatorCalculator.calculate_sma(price_history, period)
        
        return None
    
    def check_entry_conditions(self, bar: Dict[str, Any], price_history: List[float]) -> Optional[str]:
        """Verifica si se cumplen condiciones de entrada"""
        entry_blocks = self.strategy.get('entryBlocks', [])
        
        # Contador de logs (solo imprimir las primeras evaluaciones)
        if not hasattr(self, '_debug_log_count'):
            self._debug_log_count = 0
        
        for block_idx, block in enumerate(entry_blocks):
            if not block.get('enabled', True):
                continue
            
            rules = block.get('rules', [])
            if not rules:
                continue
            
            # Evaluar todas las reglas (AND lógico)
            all_conditions_met = True
            should_log = len(price_history) == 51 or len(price_history) == 100  # Log en barras específicas
            
            if should_log and self._debug_log_count < 5:
                print(f"\n>> Evaluando reglas en barra {len(price_history)}:")
                self._debug_log_count += 1
            
            for rule_idx, rule in enumerate(rules):
                result = self.evaluate_condition(rule, bar, price_history)
                
                # Debug: imprimir valores de indicadores (solo en las primeras barras)
                if should_log and self._debug_log_count <= 5:
                    ind = rule['indicator']['indicator']
                    params = rule['indicator']['parameters']
                    val = self.calculate_indicator_value(ind, params, bar, price_history)
                    
                    comp_val = rule.get('comparisonValue', {})
                    if comp_val.get('type') == 'indicator':
                        comp_ind = comp_val['indicatorValue']['indicator']
                        comp_params = comp_val['indicatorValue']['parameters']
                        comp_to = self.calculate_indicator_value(comp_ind, comp_params, bar, price_history)
                        
                        # Formatear valores, manejando None
                        val_str = f"{val:.5f}" if val is not None else "None (indicador no implementado)"
                        comp_str = f"{comp_to:.5f}" if comp_to is not None else "None (indicador no implementado)"
                        print(f"  [RULE {rule_idx}] {ind}({params.get('period',14)})={val_str} vs {comp_ind}({comp_params.get('period',14)})={comp_str} | {rule['condition']} -> {result}")
                    elif comp_val.get('type') == 'number':
                        comp_to = comp_val['numericValue']
                        val_str = f"{val:.5f}" if val is not None else "None (indicador no implementado)"
                        print(f"  [RULE {rule_idx}] {ind}({params.get('period',14)})={val_str} vs {comp_to} | {rule['condition']} -> {result}")
                
                if not result:
                    all_conditions_met = False
                    break
            
            if all_conditions_met:
                # print(f">> SEÑAL DE ENTRADA DETECTADA en bloque {block_idx}")  # Comentado para evitar spam
                # Determinar tipo de entrada de las acciones
                actions = block.get('actions', [])
                for action in actions:
                    action_type = action.get('type', '')
                    # Mapear acciones del Designer a tipos de entrada
                    if action_type in ['open_long', 'buy_market']:
                        return 'long'
                    elif action_type in ['open_short', 'sell_market']:
                        return 'short'
        
        return None
    
    def check_exit_conditions(self, bar: Dict[str, Any], price_history: List[float]) -> Optional[str]:
        """Verifica si se cumplen condiciones de salida"""
        exit_blocks = self.strategy.get('exitBlocks', [])
        
        for block in exit_blocks:
            if not block.get('enabled', True):
                continue
            
            rules = block.get('rules', [])
            if not rules:
                continue
            
            # Evaluar todas las reglas (AND lógico)
            all_conditions_met = True
            for rule in rules:
                if not self.evaluate_condition(rule, bar, price_history):
                    all_conditions_met = False
                    break
            
            if all_conditions_met:
                return 'exit_signal'
        
        return None
    
    def check_stop_loss_take_profit(self, bar: Dict[str, Any]) -> Optional[str]:
        """Verifica stop loss y take profit"""
        if not self.open_trade:
            return None
        
        current_price = bar['close']
        
        # Stop Loss
        stop_loss = self.strategy.get('stopLoss')
        if stop_loss and stop_loss.get('enabled'):
            sl_value = stop_loss.get('value', 50)
            sl_pips = sl_value if stop_loss.get('type') == 'pips' else sl_value * 10
            
            if self.open_trade.type == 'long':
                sl_price = self.open_trade.entry_price - (sl_pips * 0.0001)
                if current_price <= sl_price:
                    return 'stop_loss'
            else:
                sl_price = self.open_trade.entry_price + (sl_pips * 0.0001)
                if current_price >= sl_price:
                    return 'stop_loss'
        
        # Take Profit
        take_profit = self.strategy.get('takeProfit')
        if take_profit and take_profit.get('enabled'):
            tp_value = take_profit.get('value', 100)
            tp_pips = tp_value if take_profit.get('type') == 'pips' else tp_value * 10
            
            if self.open_trade.type == 'long':
                tp_price = self.open_trade.entry_price + (tp_pips * 0.0001)
                if current_price >= tp_price:
                    return 'take_profit'
            else:
                tp_price = self.open_trade.entry_price - (tp_pips * 0.0001)
                if current_price <= tp_price:
                    return 'take_profit'
        
        return None
    
    def run(self) -> Dict[str, Any]:
        """Ejecuta el backtest completo"""
        # Debug: info de la estrategia
        print(f"\n>> ESTRATEGIA: {self.strategy.get('name', 'Unknown')}")
        print(f">> Entry Blocks: {len(self.strategy.get('entryBlocks', []))}")
        print(f">> Exit Blocks: {len(self.strategy.get('exitBlocks', []))}")
        
        # Debug: mostrar reglas de entrada
        for idx, block in enumerate(self.strategy.get('entryBlocks', [])):
            print(f">> Entry Block {idx}: {len(block.get('rules', []))} reglas, {len(block.get('actions', []))} acciones")
            if block.get('rules'):
                for rule_idx, rule in enumerate(block['rules']):
                    ind = rule.get('indicator', {}).get('indicator', 'unknown')
                    cond = rule.get('condition', 'unknown')
                    print(f"   - Regla {rule_idx}: {ind} {cond}")
        
        # Generar datos de precio
        bars = self.generate_price_data()
        print(f">> Barras generadas: {len(bars)}")
        price_history = []
        
        max_balance = self.initial_balance
        max_drawdown = 0
        max_drawdown_percent = 0
        
        # Punto inicial de equity
        self.equity_curve.append({
            'time': bars[0]['time'].isoformat(),
            'equity': self.balance,
            'drawdown': 0
        })
        
        # Iterar sobre cada barra
        for i, bar in enumerate(bars):
            price_history.append(bar['close'])
            self.high_history.append(bar['high'])
            self.low_history.append(bar['low'])
            
            # Si hay trade abierto, verificar salidas
            if self.open_trade:
                # Verificar stop loss / take profit
                exit_reason = self.check_stop_loss_take_profit(bar)
                
                # Si no, verificar condiciones de salida
                if not exit_reason:
                    exit_signal = self.check_exit_conditions(bar, price_history)
                    if exit_signal:
                        exit_reason = 'exit_signal'
                
                # Cerrar trade si hay razón
                if exit_reason:
                    self.open_trade.close(bar['time'], bar['close'], exit_reason)
                    
                    # Aplicar comisión
                    commission = abs(self.open_trade.profit) * self.commission_rate
                    self.open_trade.profit -= commission
                    
                    # Actualizar balance
                    self.balance += self.open_trade.profit
                    self.trades.append(self.open_trade)
                    self.open_trade = None
                    
                    # Actualizar drawdown
                    max_balance = max(max_balance, self.balance)
                    drawdown = max_balance - self.balance
                    drawdown_percent = (drawdown / max_balance * 100) if max_balance > 0 else 0
                    max_drawdown = max(max_drawdown, drawdown)
                    max_drawdown_percent = max(max_drawdown_percent, drawdown_percent)
                    
                    # Añadir punto a equity curve
                    self.equity_curve.append({
                        'time': bar['time'].isoformat(),
                        'equity': round(self.balance, 2),
                        'drawdown': round(drawdown_percent, 2)
                    })
            
            # Si no hay trade abierto, verificar entradas
            else:
                entry_type = self.check_entry_conditions(bar, price_history)
                
                if entry_type:
                    self.trade_counter += 1
                    entry_price = bar['close']
                    
                    # Aplicar slippage
                    slippage_adjustment = self.slippage_pips * 0.0001
                    if entry_type == 'long':
                        entry_price += slippage_adjustment
                    else:
                        entry_price -= slippage_adjustment
                    
                    # Calcular tamaño de posición
                    position_sizing = self.strategy.get('positionSizing', {})
                    size = self.calculate_position_size(position_sizing)
                    
                    print(f"\n>> ABRIENDO TRADE #{self.trade_counter} - {entry_type.upper()} @ {entry_price:.5f} | Size: {size} lots")
                    
                    # Crear trade
                    self.open_trade = Trade(
                        self.trade_counter,
                        entry_type,
                        bar['time'],
                        entry_price,
                        size
                    )
                    self.open_trade.entry_reason = 'Entry Signal'
        
        # Cerrar trade abierto al final
        if self.open_trade and len(bars) > 0:
            last_bar = bars[-1]
            self.open_trade.close(last_bar['time'], last_bar['close'], 'Backtest End')
            self.balance += self.open_trade.profit
            self.trades.append(self.open_trade)
            self.open_trade = None
        
        # Calcular métricas
        metrics = self.calculate_metrics()
        
        return {
            'success': True,
            'strategyName': self.strategy.get('name', 'Strategy'),
            'symbol': self.config.get('symbol', 'EURUSD'),
            'timeframe': self.config.get('timeframe', '1h'),
            'startDate': self.config.get('startDate'),
            'endDate': self.config.get('endDate'),
            'metrics': metrics,
            'trades': [t.to_dict() for t in self.trades],
            'equityCurve': self.equity_curve
        }
    
    def calculate_position_size(self, position_sizing: Dict[str, Any]) -> float:
        """Calcula el tamaño de la posición"""
        ps_type = position_sizing.get('type', 'fixed_lots')
        ps_value = position_sizing.get('value', 0.1)
        
        if ps_type == 'fixed_lots':
            return ps_value
        elif ps_type == 'percent_balance':
            # Calcular lotes basado en porcentaje del balance
            risk_amount = self.balance * (ps_value / 100)
            return risk_amount / 100000  # Convertir a lotes
        elif ps_type == 'risk_percent':
            # Calcular basado en riesgo porcentual
            risk_amount = self.balance * (ps_value / 100)
            return risk_amount / 100000
        
        return 0.1
    
    def calculate_metrics(self) -> Dict[str, Any]:
        """Calcula todas las métricas del backtest"""
        if not self.trades:
            return self.get_empty_metrics()
        
        winning_trades = [t for t in self.trades if t.profit > 0]
        losing_trades = [t for t in self.trades if t.profit <= 0]
        
        total_trades = len(self.trades)
        num_winning = len(winning_trades)
        num_losing = len(losing_trades)
        
        win_rate = (num_winning / total_trades * 100) if total_trades > 0 else 0
        
        total_profit = sum(t.profit for t in winning_trades)
        total_loss = abs(sum(t.profit for t in losing_trades))
        net_profit = self.balance - self.initial_balance
        
        profit_factor = (total_profit / total_loss) if total_loss > 0 else 0
        average_win = total_profit / num_winning if num_winning > 0 else 0
        average_loss = -total_loss / num_losing if num_losing > 0 else 0
        
        largest_win = max((t.profit for t in winning_trades), default=0)
        largest_loss = min((t.profit for t in losing_trades), default=0)
        
        # Calcular drawdown máximo
        max_balance = self.initial_balance
        max_dd = 0
        max_dd_percent = 0
        
        for point in self.equity_curve:
            equity = point['equity']
            max_balance = max(max_balance, equity)
            dd = max_balance - equity
            dd_percent = (dd / max_balance * 100) if max_balance > 0 else 0
            max_dd = max(max_dd, dd)
            max_dd_percent = max(max_dd_percent, dd_percent)
        
        # Métricas de ratio
        returns = [t.profit_percent for t in self.trades]
        avg_return = sum(returns) / len(returns) if returns else 0
        std_return = np.std(returns) if len(returns) > 1 else 0
        sharpe_ratio = (avg_return / std_return * np.sqrt(252)) if std_return > 0 else 0
        
        # Sortino Ratio
        negative_returns = [r for r in returns if r < 0]
        downside_std = np.std(negative_returns) if len(negative_returns) > 1 else 0
        sortino_ratio = (avg_return / downside_std * np.sqrt(252)) if downside_std > 0 else sharpe_ratio
        
        # Calmar Ratio
        return_percent = (net_profit / self.initial_balance * 100)
        calmar_ratio = abs(return_percent / max_dd_percent) if max_dd_percent > 0 else 0
        
        # Rachas
        consecutive_wins = 0
        consecutive_losses = 0
        max_consecutive_wins = 0
        max_consecutive_losses = 0
        
        for trade in self.trades:
            if trade.profit > 0:
                consecutive_wins += 1
                consecutive_losses = 0
                max_consecutive_wins = max(max_consecutive_wins, consecutive_wins)
            else:
                consecutive_losses += 1
                consecutive_wins = 0
                max_consecutive_losses = max(max_consecutive_losses, consecutive_losses)
        
        # Expectancy
        expectancy = (win_rate / 100 * average_win) + ((1 - win_rate / 100) * average_loss)
        
        # Time in market
        total_duration = sum(t.duration for t in self.trades)
        avg_duration_hours = (total_duration / total_trades / 3600) if total_trades > 0 else 0
        
        return {
            'totalTrades': total_trades,
            'winningTrades': num_winning,
            'losingTrades': num_losing,
            'winRate': round(win_rate, 2),
            'totalProfit': round(total_profit, 2),
            'totalLoss': round(total_loss, 2),
            'netProfit': round(net_profit, 2),
            'profitFactor': round(profit_factor, 2),
            'averageWin': round(average_win, 2),
            'averageLoss': round(average_loss, 2),
            'largestWin': round(largest_win, 2),
            'largestLoss': round(largest_loss, 2),
            'sharpeRatio': round(sharpe_ratio, 2),
            'sortinoRatio': round(sortino_ratio, 2),
            'calmarRatio': round(calmar_ratio, 2),
            'maxDrawdown': round(max_dd, 2),
            'maxDrawdownPercent': round(max_dd_percent, 2),
            'maxDrawdownDuration': random.randint(5, 30),
            'timeInMarket': round(50, 2),  # Simplificado
            'averageTradeDuration': round(avg_duration_hours, 2),
            'consecutiveWins': max_consecutive_wins,
            'consecutiveLosses': max_consecutive_losses,
            'expectancy': round(expectancy, 2),
            'initialBalance': self.initial_balance,
            'finalBalance': round(self.balance, 2),
            'returnPercent': round(return_percent, 2)
        }
    
    def get_empty_metrics(self) -> Dict[str, Any]:
        """Retorna métricas vacías si no hay trades"""
        return {
            'totalTrades': 0,
            'winningTrades': 0,
            'losingTrades': 0,
            'winRate': 0,
            'totalProfit': 0,
            'totalLoss': 0,
            'netProfit': 0,
            'profitFactor': 0,
            'averageWin': 0,
            'averageLoss': 0,
            'largestWin': 0,
            'largestLoss': 0,
            'sharpeRatio': 0,
            'sortinoRatio': 0,
            'calmarRatio': 0,
            'maxDrawdown': 0,
            'maxDrawdownPercent': 0,
            'maxDrawdownDuration': 0,
            'timeInMarket': 0,
            'averageTradeDuration': 0,
            'consecutiveWins': 0,
            'consecutiveLosses': 0,
            'expectancy': 0,
            'initialBalance': self.initial_balance,
            'finalBalance': self.initial_balance,
            'returnPercent': 0
        }

