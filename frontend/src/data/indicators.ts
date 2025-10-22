/**
 * Definición de indicadores técnicos para el diseñador de estrategias
 * Incluye categorías de tendencia, osciladores, volumen y Bill Williams
 */

export interface Indicator {
  value: string; // e.g., 'ema', 'rsi'
  label: string; // e.g., 'Media Móvil Exponencial (EMA)'
  description?: string; // Descripción opcional del indicador
}

export interface IndicatorCategory {
  name: string; // e.g., 'Indicadores de Tendencia'
  indicators: Indicator[];
}

export const INDICATOR_CATEGORIES: IndicatorCategory[] = [
  {
    name: "Indicadores de Tendencia",
    indicators: [
      { 
        value: "adx", 
        label: "Average Directional Movement Index (ADX)",
        description: "Mide la fuerza de una tendencia"
      },
      { 
        value: "bollinger", 
        label: "Bollinger Bands",
        description: "Bandas de volatilidad alrededor de una media móvil"
      },
      { 
        value: "cci", 
        label: "Commodity Channel Index (CCI)",
        description: "Identifica niveles cíclicos en el precio"
      },
      { 
        value: "envelopes", 
        label: "Envelopes",
        description: "Bandas porcentuales alrededor de una media móvil"
      },
      { 
        value: "ichimoku", 
        label: "Ichimoku Kinko Hyo",
        description: "Sistema completo de análisis de tendencia y soporte/resistencia"
      },
      { 
        value: "ma", 
        label: "Moving Average (MA, SMA, EMA, etc.)",
        description: "Media móvil simple o exponencial"
      },
      { 
        value: "sar", 
        label: "Parabolic SAR",
        description: "Identifica potenciales reversiones en el precio"
      },
      { 
        value: "stddev", 
        label: "Standard Deviation",
        description: "Mide la volatilidad del mercado"
      },
    ],
  },
  {
    name: "Osciladores",
    indicators: [
      { 
        value: "atr", 
        label: "Average True Range (ATR)",
        description: "Mide la volatilidad del mercado"
      },
      { 
        value: "bears", 
        label: "Bears Power",
        description: "Mide el poder de los vendedores"
      },
      { 
        value: "bulls", 
        label: "Bulls Power",
        description: "Mide el poder de los compradores"
      },
      { 
        value: "chaikin", 
        label: "Chaikin Oscillator",
        description: "Oscilador basado en el volumen"
      },
      { 
        value: "demarker", 
        label: "DeMarker",
        description: "Identifica zonas de sobrecompra/sobreventa"
      },
      { 
        value: "force", 
        label: "Force Index",
        description: "Combina precio y volumen para medir la fuerza"
      },
      { 
        value: "macd", 
        label: "MACD",
        description: "Moving Average Convergence Divergence"
      },
      { 
        value: "momentum", 
        label: "Momentum",
        description: "Mide la velocidad del cambio de precio"
      },
      { 
        value: "osma", 
        label: "Moving Average of Oscillator (OsMA)",
        description: "Diferencia entre MACD y su señal"
      },
      { 
        value: "rsi", 
        label: "Relative Strength Index (RSI)",
        description: "Oscilador de momento que mide velocidad y magnitud"
      },
      { 
        value: "rvi", 
        label: "Relative Vigor Index (RVI)",
        description: "Mide la fuerza de una tendencia comparando cierre y apertura"
      },
      { 
        value: "stochastic", 
        label: "Stochastic Oscillator",
        description: "Compara el precio de cierre con su rango de precio"
      },
      { 
        value: "wpr", 
        label: "Williams' Percent Range (%R)",
        description: "Oscilador de momento similar al estocástico"
      },
    ],
  },
  {
    name: "Indicadores de Volumen",
    indicators: [
      { 
        value: "ad", 
        label: "Accumulation/Distribution",
        description: "Relaciona cambios en precio y volumen"
      },
      { 
        value: "mfi", 
        label: "Money Flow Index (MFI)",
        description: "RSI ponderado por volumen"
      },
      { 
        value: "obv", 
        label: "On Balance Volume (OBV)",
        description: "Relaciona volumen con cambio de precio"
      },
      { 
        value: "volumes", 
        label: "Volumes",
        description: "Volumen de operaciones"
      },
    ],
  },
  {
    name: "Indicadores de Bill Williams",
    indicators: [
      { 
        value: "ac", 
        label: "Accelerator Oscillator (AC)",
        description: "Mide la aceleración de la fuerza motriz"
      },
      { 
        value: "alligator", 
        label: "Alligator",
        description: "Combina tres medias móviles suavizadas"
      },
      { 
        value: "ao", 
        label: "Awesome Oscillator (AO)",
        description: "Mide el momento del mercado"
      },
      { 
        value: "fractals", 
        label: "Fractals",
        description: "Identifica puntos de reversión"
      },
      { 
        value: "gator", 
        label: "Gator Oscillator",
        description: "Complemento del Alligator"
      },
      { 
        value: "bw_mfi", 
        label: "Market Facilitation Index (BW MFI)",
        description: "Mide la eficiencia del movimiento de precio"
      },
    ],
  },
];

// Función auxiliar para buscar un indicador por su valor
export const getIndicatorByValue = (value: string): Indicator | undefined => {
  for (const category of INDICATOR_CATEGORIES) {
    const indicator = category.indicators.find(ind => ind.value === value);
    if (indicator) return indicator;
  }
  return undefined;
};

// Función auxiliar para obtener todos los indicadores en un array plano
export const getAllIndicators = (): Indicator[] => {
  return INDICATOR_CATEGORIES.flatMap(category => category.indicators);
};

