/**
 * Parámetros por defecto para cada tipo de indicador
 */

import { IndicatorParameters } from '@/types/strategy'

export interface IndicatorDefaultConfig {
  indicator: string;
  defaultParams: IndicatorParameters;
  configurableParams: {
    key: keyof IndicatorParameters;
    label: string;
    type: 'number' | 'select';
    min?: number;
    max?: number;
    step?: number;
    options?: { value: string; label: string }[];
  }[];
}

export const INDICATOR_DEFAULTS: Record<string, IndicatorDefaultConfig> = {
  // Medias Móviles
  ma: {
    indicator: 'ma',
    defaultParams: {
      period: 14,
      shift: 0,
      ma_method: 'SMA',
      applied_price: 'close'
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 1, max: 500, step: 1 },
      { key: 'shift', label: 'Desplazamiento', type: 'number', min: 0, max: 100, step: 1 },
      { 
        key: 'ma_method', 
        label: 'Método', 
        type: 'select',
        options: [
          { value: 'SMA', label: 'SMA (Simple)' },
          { value: 'EMA', label: 'EMA (Exponencial)' },
          { value: 'SMMA', label: 'SMMA (Suavizada)' },
          { value: 'LWMA', label: 'LWMA (Ponderada Lineal)' }
        ]
      },
      {
        key: 'applied_price',
        label: 'Aplicado a',
        type: 'select',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'median', label: 'Median (HL/2)' },
          { value: 'typical', label: 'Typical (HLC/3)' },
          { value: 'weighted', label: 'Weighted (HLCC/4)' }
        ]
      }
    ]
  },

  // RSI
  rsi: {
    indicator: 'rsi',
    defaultParams: {
      period: 14,
      applied_price: 'close'
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 2, max: 100, step: 1 },
      {
        key: 'applied_price',
        label: 'Aplicado a',
        type: 'select',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' }
        ]
      }
    ]
  },

  // MACD
  macd: {
    indicator: 'macd',
    defaultParams: {
      fast_period: 12,
      slow_period: 26,
      signal_period: 9,
      applied_price: 'close'
    },
    configurableParams: [
      { key: 'fast_period', label: 'Período Rápido', type: 'number', min: 2, max: 100, step: 1 },
      { key: 'slow_period', label: 'Período Lento', type: 'number', min: 2, max: 100, step: 1 },
      { key: 'signal_period', label: 'Período Señal', type: 'number', min: 2, max: 50, step: 1 },
      {
        key: 'applied_price',
        label: 'Aplicado a',
        type: 'select',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' }
        ]
      }
    ]
  },

  // Stochastic
  stochastic: {
    indicator: 'stochastic',
    defaultParams: {
      k_period: 5,
      d_period: 3,
      slowing: 3
    },
    configurableParams: [
      { key: 'k_period', label: '%K Período', type: 'number', min: 1, max: 100, step: 1 },
      { key: 'd_period', label: '%D Período', type: 'number', min: 1, max: 100, step: 1 },
      { key: 'slowing', label: 'Ralentización', type: 'number', min: 1, max: 50, step: 1 }
    ]
  },

  // Bollinger Bands
  bollinger: {
    indicator: 'bollinger',
    defaultParams: {
      period: 20,
      deviation: 2,
      shift: 0,
      applied_price: 'close'
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 2, max: 100, step: 1 },
      { key: 'deviation', label: 'Desviación', type: 'number', min: 0.1, max: 5, step: 0.1 },
      { key: 'shift', label: 'Desplazamiento', type: 'number', min: 0, max: 100, step: 1 },
      {
        key: 'applied_price',
        label: 'Aplicado a',
        type: 'select',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' }
        ]
      }
    ]
  },

  // ATR
  atr: {
    indicator: 'atr',
    defaultParams: {
      period: 14
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 1, max: 100, step: 1 }
    ]
  },

  // ADX
  adx: {
    indicator: 'adx',
    defaultParams: {
      period: 14
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 1, max: 100, step: 1 }
    ]
  },

  // CCI
  cci: {
    indicator: 'cci',
    defaultParams: {
      period: 14,
      applied_price: 'typical'
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 1, max: 100, step: 1 },
      {
        key: 'applied_price',
        label: 'Aplicado a',
        type: 'select',
        options: [
          { value: 'typical', label: 'Typical (HLC/3)' },
          { value: 'close', label: 'Close' },
          { value: 'weighted', label: 'Weighted (HLCC/4)' }
        ]
      }
    ]
  },

  // Momentum
  momentum: {
    indicator: 'momentum',
    defaultParams: {
      period: 14,
      applied_price: 'close'
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 1, max: 100, step: 1 },
      {
        key: 'applied_price',
        label: 'Aplicado a',
        type: 'select',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' }
        ]
      }
    ]
  },

  // MFI
  mfi: {
    indicator: 'mfi',
    defaultParams: {
      period: 14
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 2, max: 100, step: 1 }
    ]
  },

  // Williams %R
  wpr: {
    indicator: 'wpr',
    defaultParams: {
      period: 14
    },
    configurableParams: [
      { key: 'period', label: 'Período', type: 'number', min: 2, max: 100, step: 1 }
    ]
  }
};

// Función para obtener parámetros por defecto de un indicador
export const getDefaultParameters = (indicator: string): IndicatorParameters => {
  return INDICATOR_DEFAULTS[indicator]?.defaultParams || { period: 14 };
};

// Función para obtener configuración de parámetros
export const getIndicatorConfig = (indicator: string): IndicatorDefaultConfig | undefined => {
  return INDICATOR_DEFAULTS[indicator];
};

import { isVariableReference } from '@/types/variables'
import type { NumericValue } from '@/types/variables'

// Helper para formatear valor (número o variable)
const formatValue = (value: NumericValue | undefined, defaultValue: number = 0): string => {
  if (value === undefined) return String(defaultValue);
  if (isVariableReference(value)) {
    return value.variableName;
  }
  return String(value);
};

// Función para generar etiqueta legible del indicador
export const generateIndicatorLabel = (indicator: string, params: IndicatorParameters): string => {
  const config = INDICATOR_DEFAULTS[indicator];
  if (!config) return indicator.toUpperCase();

  // Crear etiqueta basada en los parámetros más relevantes
  switch (indicator) {
    case 'ma':
      return `${params.ma_method || 'SMA'}(${formatValue(params.period, 14)})`;
    case 'rsi':
      return `RSI(${formatValue(params.period, 14)})`;
    case 'macd':
      return `MACD(${formatValue(params.fast_period, 12)},${formatValue(params.slow_period, 26)},${formatValue(params.signal_period, 9)})`;
    case 'stochastic':
      return `Stoch(${formatValue(params.k_period, 5)},${formatValue(params.d_period, 3)},${formatValue(params.slowing, 3)})`;
    case 'bollinger':
      return `BB(${formatValue(params.period, 20)},${formatValue(params.deviation, 2)})`;
    case 'atr':
      return `ATR(${formatValue(params.period, 14)})`;
    case 'adx':
      return `ADX(${formatValue(params.period, 14)})`;
    case 'cci':
      return `CCI(${formatValue(params.period, 14)})`;
    case 'momentum':
      return `Momentum(${formatValue(params.period, 14)})`;
    case 'mfi':
      return `MFI(${formatValue(params.period, 14)})`;
    case 'wpr':
      return `%R(${formatValue(params.period, 14)})`;
    default:
      return `${indicator.toUpperCase()}(${formatValue(params.period)})`;
  }
};

