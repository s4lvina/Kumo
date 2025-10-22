/**
 * Tipos para la construcción de estrategias de trading
 */

import { NumericValue } from './variables'

// Parámetros configurables de un indicador
export interface IndicatorParameters {
  period?: NumericValue;           // Período (ej: 14 para RSI o Var1)
  shift?: NumericValue;            // Desplazamiento
  deviation?: NumericValue;        // Desviación estándar
  ma_method?: 'SMA' | 'EMA' | 'SMMA' | 'LWMA';  // Método de media móvil
  applied_price?: 'close' | 'open' | 'high' | 'low' | 'median' | 'typical' | 'weighted';
  fast_period?: NumericValue;      // Período rápido (MACD)
  slow_period?: NumericValue;      // Período lento (MACD)
  signal_period?: NumericValue;    // Período de señal (MACD)
  k_period?: NumericValue;         // %K período (Stochastic)
  d_period?: NumericValue;         // %D período (Stochastic)
  slowing?: NumericValue;          // Ralentización (Stochastic)
  [key: string]: any;              // Otros parámetros personalizados
}

// Instancia configurada de un indicador
export interface ConfiguredIndicator {
  indicator: string;        // Tipo de indicador (ej: 'rsi', 'sma')
  parameters: IndicatorParameters;
  label?: string;           // Etiqueta personalizada (ej: "RSI(14)")
}

// Valor de comparación: puede ser un número, variable o indicador
export interface ComparisonValue {
  type: 'number' | 'variable' | 'indicator';
  numericValue?: number;
  variableReference?: import('./variables').VariableReference;
  indicatorValue?: ConfiguredIndicator;
}

// Regla de estrategia
export interface StrategyRule {
  id: string;
  indicator: ConfiguredIndicator;  // Indicador configurado
  condition: string;               // Tipo de condición
  comparisonValue: ComparisonValue; // Valor o indicador de comparación
  logicalOperator?: 'and' | 'or';  // Para conectar con la siguiente regla
}

// Parámetros de acciones (pueden ser numéricos o variables)
export interface ActionParameters {
  pips?: NumericValue;           // Stop Loss / Take Profit en pips
  points?: NumericValue;         // En puntos
  percentage?: NumericValue;     // En porcentaje
  price?: NumericValue;          // Precio absoluto
  distance?: NumericValue;       // Distancia genérica
  size?: NumericValue;           // Tamaño de posición
  ratio?: NumericValue;          // Ratio (ej: risk/reward)
  trailing?: boolean;            // Si es trailing
  [key: string]: any;
}

// Acción con parámetros
export interface StrategyAction {
  id: string;
  action: string;
  parameters?: ActionParameters;
}

// Bloque de estrategia
export interface StrategyBlock {
  id: string;
  type: 'entry' | 'exit';
  name: string;
  rules: StrategyRule[];
  actions: StrategyAction[];
  enabled: boolean;
}

// Configuración de Stop Loss
export interface StopLossConfig {
  enabled: boolean;
  type: 'pips' | 'points' | 'percentage' | 'price';
  value: NumericValue;
}

// Configuración de Take Profit
export interface TakeProfitConfig {
  enabled: boolean;
  type: 'pips' | 'points' | 'percentage' | 'price' | 'ratio';
  value: NumericValue;
}

// Configuración de Trailing Stop
export interface TrailingStopConfig {
  enabled: boolean;
  distance: NumericValue;  // Distancia en pips
  step: NumericValue;      // Paso de actualización
}

// Configuración de Breakeven
export interface BreakevenConfig {
  enabled: boolean;
  trigger: NumericValue;   // Pips en ganancia para activar
  offset: NumericValue;    // Pips adicionales sobre breakeven
}

// Configuración de Position Sizing
export interface PositionSizingConfig {
  type: 'fixed_lots' | 'percent_balance' | 'risk_percent';
  value: NumericValue;  // Puede ser: lotes (0.1), porcentaje (2), o risk% (1)
}

// Estrategia completa
export interface Strategy {
  id?: number;
  name: string;
  description?: string;
  timeframe: string;
  positionSizing?: PositionSizingConfig;  // Tamaño de posición
  variables?: import('./variables').StrategyVariable[];  // Variables de la estrategia
  entryBlocks: StrategyBlock[];
  exitBlocks: StrategyBlock[];
  stopLoss?: StopLossConfig;         // Stop Loss independiente
  takeProfit?: TakeProfitConfig;     // Take Profit independiente
  trailingStop?: TrailingStopConfig; // Trailing Stop independiente
  breakeven?: BreakevenConfig;       // Breakeven independiente
  createdAt?: string;
  updatedAt?: string;
}

// Timeframes disponibles
export const TIMEFRAMES = [
  { value: '1m', label: '1 Minuto' },
  { value: '5m', label: '5 Minutos' },
  { value: '15m', label: '15 Minutos' },
  { value: '30m', label: '30 Minutos' },
  { value: '1h', label: '1 Hora' },
  { value: '4h', label: '4 Horas' },
  { value: '1d', label: '1 Día' },
  { value: '1w', label: '1 Semana' },
  { value: '1M', label: '1 Mes' },
];

