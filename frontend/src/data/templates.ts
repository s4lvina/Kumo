/**
 * Plantillas de estrategias predefinidas
 * Basadas en sistemas clásicos y populares de trading
 */

import { Strategy } from '@/types/strategy'

export interface StrategyTemplate {
  id: string
  name: string
  description: string
  category: 'momentum' | 'trend' | 'volatility' | 'reversal' | 'breakout' | 'scalping'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeframes: string[]
  indicators: string[]
  winRateExpected: number
  strategy: Omit<Strategy, 'id' | 'createdAt' | 'updatedAt'>
}

export const STRATEGY_TEMPLATES: StrategyTemplate[] = [
  // ==================== MOMENTUM ====================
  {
    id: 'rsi-oversold-overbought',
    name: 'RSI Sobrecompra/Sobreventa',
    description: 'Estrategia clásica de RSI. Compra cuando RSI < 30 (sobreventa) y vende cuando RSI > 70 (sobrecompra). Ideal para mercados laterales.',
    category: 'momentum',
    difficulty: 'beginner',
    timeframes: ['15m', '1h', '4h'],
    indicators: ['RSI'],
    winRateExpected: 65,
    strategy: {
      name: 'RSI Sobrecompra/Sobreventa',
      timeframe: '1h',
      positionSizing: { type: 'fixed_lots', value: 0.1 },
      variables: [
        { id: 'var1', name: 'RSI_Period', value: 14, enabled: true, min: 10, max: 20, step: 1 },
        { id: 'var2', name: 'Oversold_Level', value: 30, enabled: true, min: 20, max: 35, step: 1 },
        { id: 'var3', name: 'Overbought_Level', value: 70, enabled: true, min: 65, max: 80, step: 1 }
      ],
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Entrada en Sobreventa',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'rsi',
                label: 'RSI(14)',
                parameters: { period: { type: 'variable', variableId: 'var1', variableName: 'RSI_Period' } }
              },
              condition: 'less_than',
              comparisonValue: { type: 'variable', variableReference: { type: 'variable', variableId: 'var2', variableName: 'Oversold_Level' } }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Salida en Sobrecompra',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'rsi',
                label: 'RSI(14)',
                parameters: { period: { type: 'variable', variableId: 'var1', variableName: 'RSI_Period' } }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'variable', variableReference: { type: 'variable', variableId: 'var3', variableName: 'Overbought_Level' } }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 50 },
      takeProfit: { enabled: true, type: 'pips', value: 100 }
    }
  },

  {
    id: 'macd-crossover',
    name: 'Cruce de MACD',
    description: 'Compra cuando la línea MACD cruza por encima de la señal, vende cuando cruza por debajo. Excelente para tendencias fuertes.',
    category: 'momentum',
    difficulty: 'beginner',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['MACD'],
    winRateExpected: 58,
    strategy: {
      name: 'Cruce de MACD',
      timeframe: '4h',
      positionSizing: { type: 'percent_balance', value: 2 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'MACD Cruza Arriba',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'macd',
                label: 'MACD(12,26,9)',
                parameters: { fast_period: 12, slow_period: 26, signal_period: 9 }
              },
              condition: 'crosses_above',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'MACD Cruza Abajo',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'macd',
                label: 'MACD(12,26,9)',
                parameters: { fast_period: 12, slow_period: 26, signal_period: 9 }
              },
              condition: 'crosses_below',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 2 },
      takeProfit: { enabled: true, type: 'ratio', value: 2 }
    }
  },

  {
    id: 'stochastic-reversal',
    name: 'Reversión Estocástica',
    description: 'Busca reversiones usando el oscilador estocástico. Compra en sobreventa (%K < 20) y vende en sobrecompra (%K > 80).',
    category: 'momentum',
    difficulty: 'intermediate',
    timeframes: ['15m', '1h', '4h'],
    indicators: ['Stochastic'],
    winRateExpected: 62,
    strategy: {
      name: 'Reversión Estocástica',
      timeframe: '1h',
      positionSizing: { type: 'risk_percent', value: 1 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Estocástico en Sobreventa',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'stochastic',
                label: 'Stochastic(14,3,3)',
                parameters: { k_period: 14, d_period: 3, slowing: 3 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 20 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Estocástico en Sobrecompra',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'stochastic',
                label: 'Stochastic(14,3,3)',
                parameters: { k_period: 14, d_period: 3, slowing: 3 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 80 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 40 },
      takeProfit: { enabled: true, type: 'pips', value: 80 }
    }
  },

  // ==================== TREND FOLLOWING ====================
  {
    id: 'golden-death-cross',
    name: 'Golden/Death Cross',
    description: 'Clásico cruce de medias móviles. Golden Cross (SMA50 > SMA200) para compra, Death Cross (SMA50 < SMA200) para venta.',
    category: 'trend',
    difficulty: 'beginner',
    timeframes: ['1d', '1w'],
    indicators: ['SMA'],
    winRateExpected: 55,
    strategy: {
      name: 'Golden/Death Cross',
      timeframe: '1d',
      positionSizing: { type: 'percent_balance', value: 5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Golden Cross',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'sma',
                label: 'SMA(50)',
                parameters: { period: 50 }
              },
              condition: 'crosses_above',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'sma',
                  label: 'SMA(200)',
                  parameters: { period: 200 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Death Cross',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'sma',
                label: 'SMA(50)',
                parameters: { period: 50 }
              },
              condition: 'crosses_below',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'sma',
                  label: 'SMA(200)',
                  parameters: { period: 200 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 5 },
      trailingStop: { enabled: true, distance: 100, step: 20 }
    }
  },

  {
    id: 'triple-ema',
    name: 'Triple EMA Trend',
    description: 'Sistema de tres EMAs (9, 21, 55). Compra cuando están alineadas alcista y precio > EMA9. Fuerte filtro de tendencia.',
    category: 'trend',
    difficulty: 'intermediate',
    timeframes: ['15m', '1h', '4h'],
    indicators: ['EMA'],
    winRateExpected: 60,
    strategy: {
      name: 'Triple EMA Trend',
      timeframe: '1h',
      positionSizing: { type: 'risk_percent', value: 1.5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'EMAs Alineadas Alcista',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'ema',
                label: 'EMA(9)',
                parameters: { period: 9 }
              },
              condition: 'greater_than',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'ema',
                  label: 'EMA(21)',
                  parameters: { period: 21 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Cruce de EMA9 debajo EMA21',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'ema',
                label: 'EMA(9)',
                parameters: { period: 9 }
              },
              condition: 'crosses_below',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'ema',
                  label: 'EMA(21)',
                  parameters: { period: 21 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 60 },
      trailingStop: { enabled: true, distance: 50, step: 15 }
    }
  },

  {
    id: 'adx-trend-strength',
    name: 'ADX Fuerza de Tendencia',
    description: 'Usa ADX para confirmar tendencias fuertes (ADX > 25). Entra con +DI/-DI y filtra con ADX. Solo opera tendencias confirmadas.',
    category: 'trend',
    difficulty: 'advanced',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['ADX'],
    winRateExpected: 68,
    strategy: {
      name: 'ADX Fuerza de Tendencia',
      timeframe: '4h',
      positionSizing: { type: 'risk_percent', value: 2 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Tendencia Fuerte Alcista',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'adx',
                label: 'ADX(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 25 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Tendencia se Debilita',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'adx',
                label: 'ADX(14)',
                parameters: { period: 14 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 20 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 80 },
      takeProfit: { enabled: true, type: 'ratio', value: 3 }
    }
  },

  // ==================== VOLATILITY ====================
  {
    id: 'bollinger-breakout',
    name: 'Breakout de Bollinger',
    description: 'Compra cuando el precio rompe la banda superior de Bollinger. Aprovecha expansiones de volatilidad y momentum.',
    category: 'volatility',
    difficulty: 'beginner',
    timeframes: ['15m', '1h', '4h'],
    indicators: ['Bollinger Bands'],
    winRateExpected: 56,
    strategy: {
      name: 'Breakout de Bollinger',
      timeframe: '1h',
      positionSizing: { type: 'fixed_lots', value: 0.1 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Precio Rompe Banda Superior',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'bollinger',
                label: 'BB(20,2)',
                parameters: { period: 20, deviation: 2 }
              },
              condition: 'crosses_above',
              comparisonValue: { type: 'number', numericValue: 1 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Precio Toca Media Móvil',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'sma',
                label: 'SMA(20)',
                parameters: { period: 20 }
              },
              condition: 'crosses_below',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 40 },
      takeProfit: { enabled: true, type: 'pips', value: 100 }
    }
  },

  {
    id: 'bollinger-squeeze',
    name: 'Bollinger Squeeze',
    description: 'Detecta consolidaciones (bandas estrechas) y opera el breakout. Alta precisión en rangos antes de movimientos fuertes.',
    category: 'volatility',
    difficulty: 'intermediate',
    timeframes: ['1h', '4h'],
    indicators: ['Bollinger Bands', 'ATR'],
    winRateExpected: 64,
    strategy: {
      name: 'Bollinger Squeeze',
      timeframe: '4h',
      positionSizing: { type: 'risk_percent', value: 1.5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Breakout después de Squeeze',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 50 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Volatilidad se Expande',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 100 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 50 },
      trailingStop: { enabled: true, distance: 60, step: 20 }
    }
  },

  {
    id: 'atr-volatility-breakout',
    name: 'Breakout de Volatilidad ATR',
    description: 'Opera breakouts cuando ATR aumenta significativamente. Captura inicios de movimientos explosivos.',
    category: 'volatility',
    difficulty: 'intermediate',
    timeframes: ['15m', '1h', '4h'],
    indicators: ['ATR'],
    winRateExpected: 59,
    strategy: {
      name: 'Breakout de Volatilidad ATR',
      timeframe: '1h',
      positionSizing: { type: 'risk_percent', value: 2 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'ATR Aumenta Rápidamente',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 80 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'ATR Vuelve a Niveles Bajos',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 40 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 60 },
      takeProfit: { enabled: true, type: 'ratio', value: 2.5 }
    }
  },

  // ==================== REVERSAL ====================
  {
    id: 'double-rsi',
    name: 'RSI Doble Confirmación',
    description: 'Usa dos RSI (rápido y lento) para confirmar reversiones. Mayor precisión que RSI simple.',
    category: 'reversal',
    difficulty: 'intermediate',
    timeframes: ['15m', '1h', '4h'],
    indicators: ['RSI'],
    winRateExpected: 67,
    strategy: {
      name: 'RSI Doble Confirmación',
      timeframe: '1h',
      positionSizing: { type: 'risk_percent', value: 1.5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Ambos RSI en Sobreventa',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'rsi',
                label: 'RSI(7)',
                parameters: { period: 7 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 30 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'RSI Rápido en Sobrecompra',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'rsi',
                label: 'RSI(7)',
                parameters: { period: 7 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 70 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 40 },
      takeProfit: { enabled: true, type: 'pips', value: 80 }
    }
  },

  {
    id: 'mean-reversion',
    name: 'Reversión a la Media',
    description: 'Compra cuando el precio está muy por debajo de la media móvil, esperando retorno. Ideal para mercados laterales.',
    category: 'reversal',
    difficulty: 'beginner',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['SMA', 'Bollinger Bands'],
    winRateExpected: 61,
    strategy: {
      name: 'Reversión a la Media',
      timeframe: '4h',
      positionSizing: { type: 'percent_balance', value: 3 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Precio Toca Banda Inferior',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'bollinger',
                label: 'BB(20,2)',
                parameters: { period: 20, deviation: 2 }
              },
              condition: 'crosses_below',
              comparisonValue: { type: 'number', numericValue: -1 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Precio Vuelve a la Media',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'sma',
                label: 'SMA(20)',
                parameters: { period: 20 }
              },
              condition: 'crosses_above',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 3 },
      takeProfit: { enabled: true, type: 'percentage', value: 5 }
    }
  },

  // ==================== BREAKOUT ====================
  {
    id: 'range-breakout',
    name: 'Breakout de Rango',
    description: 'Detecta consolidaciones y opera el breakout. Alta efectividad en mercados que salen de rangos.',
    category: 'breakout',
    difficulty: 'intermediate',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['ATR', 'SMA'],
    winRateExpected: 58,
    strategy: {
      name: 'Breakout de Rango',
      timeframe: '4h',
      positionSizing: { type: 'risk_percent', value: 2 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Precio Rompe Resistencia',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 50 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Breakout Falla',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'sma',
                label: 'SMA(20)',
                parameters: { period: 20 }
              },
              condition: 'crosses_below',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 50 },
      takeProfit: { enabled: true, type: 'ratio', value: 3 }
    }
  },

  {
    id: 'opening-range-breakout',
    name: 'Opening Range Breakout',
    description: 'Opera breakouts de la primera hora de trading. Popular en forex y futuros. Alta volatilidad en aperturas.',
    category: 'breakout',
    difficulty: 'advanced',
    timeframes: ['5m', '15m', '1h'],
    indicators: ['ATR'],
    winRateExpected: 55,
    strategy: {
      name: 'Opening Range Breakout',
      timeframe: '15m',
      positionSizing: { type: 'risk_percent', value: 1 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Breakout del Rango de Apertura',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 30 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Final de Sesión',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 15 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 20 },
      takeProfit: { enabled: true, type: 'pips', value: 60 }
    }
  },

  // ==================== SCALPING ====================
  {
    id: 'ema-scalping',
    name: 'Scalping con EMAs',
    description: 'Scalping rápido con EMA 5 y EMA 20. Para traders activos que buscan movimientos rápidos en timeframes bajos.',
    category: 'scalping',
    difficulty: 'advanced',
    timeframes: ['1m', '5m', '15m'],
    indicators: ['EMA'],
    winRateExpected: 54,
    strategy: {
      name: 'Scalping con EMAs',
      timeframe: '5m',
      positionSizing: { type: 'fixed_lots', value: 0.1 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'EMA5 Cruza Arriba EMA20',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'ema',
                label: 'EMA(5)',
                parameters: { period: 5 }
              },
              condition: 'crosses_above',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'ema',
                  label: 'EMA(20)',
                  parameters: { period: 20 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'EMA5 Cruza Abajo EMA20',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'ema',
                label: 'EMA(5)',
                parameters: { period: 5 }
              },
              condition: 'crosses_below',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'ema',
                  label: 'EMA(20)',
                  parameters: { period: 20 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 10 },
      takeProfit: { enabled: true, type: 'pips', value: 15 }
    }
  },

  // ==================== MOMENTUM (adicionales) ====================
  {
    id: 'cci-momentum',
    name: 'CCI Momentum',
    description: 'Commodity Channel Index para detectar extremos del mercado. Compra cuando CCI < -100 (sobreventa) y vende cuando CCI > 100 (sobrecompra).',
    category: 'momentum',
    difficulty: 'intermediate',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['CCI'],
    winRateExpected: 61,
    strategy: {
      name: 'CCI Momentum',
      timeframe: '4h',
      positionSizing: { type: 'percent_balance', value: 2 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'CCI en Sobreventa',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'cci',
                label: 'CCI(20)',
                parameters: { period: 20 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: -100 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'CCI en Sobrecompra',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'cci',
                label: 'CCI(20)',
                parameters: { period: 20 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 100 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 3 },
      takeProfit: { enabled: true, type: 'ratio', value: 2 }
    }
  },

  {
    id: 'williams-r',
    name: 'Williams %R',
    description: 'Oscilador Williams %R para timing preciso. Señales de reversión cuando alcanza niveles extremos (-80 o -20).',
    category: 'momentum',
    difficulty: 'intermediate',
    timeframes: ['15m', '1h', '4h'],
    indicators: ['Williams %R'],
    winRateExpected: 59,
    strategy: {
      name: 'Williams %R',
      timeframe: '1h',
      positionSizing: { type: 'risk_percent', value: 1.5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Williams %R Sobreventa',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'willr',
                label: 'WillR(14)',
                parameters: { period: 14 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: -80 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Williams %R Sobrecompra',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'willr',
                label: 'WillR(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: -20 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 45 },
      takeProfit: { enabled: true, type: 'pips', value: 90 }
    }
  },

  // ==================== TREND (adicionales) ====================
  {
    id: 'parabolic-sar',
    name: 'Parabolic SAR Trend',
    description: 'Sistema de seguimiento de tendencia con Parabolic SAR. Compra cuando SAR está debajo del precio, vende cuando está arriba.',
    category: 'trend',
    difficulty: 'beginner',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['Parabolic SAR'],
    winRateExpected: 57,
    strategy: {
      name: 'Parabolic SAR Trend',
      timeframe: '4h',
      positionSizing: { type: 'percent_balance', value: 3 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'SAR Debajo del Precio',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'sar',
                label: 'SAR(0.02,0.2)',
                parameters: { acceleration: 0.02, maximum: 0.2 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'SAR Arriba del Precio',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'sar',
                label: 'SAR(0.02,0.2)',
                parameters: { acceleration: 0.02, maximum: 0.2 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 4 },
      trailingStop: { enabled: true, distance: 70, step: 20 }
    }
  },

  {
    id: 'moving-average-ribbon',
    name: 'MA Ribbon Trend',
    description: 'Sistema de múltiples medias móviles (ribbon). Entra cuando todas están alineadas en la misma dirección.',
    category: 'trend',
    difficulty: 'advanced',
    timeframes: ['1h', '4h'],
    indicators: ['EMA'],
    winRateExpected: 63,
    strategy: {
      name: 'MA Ribbon Trend',
      timeframe: '4h',
      positionSizing: { type: 'risk_percent', value: 2 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Ribbon Alcista',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'ema',
                label: 'EMA(8)',
                parameters: { period: 8 }
              },
              condition: 'greater_than',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'ema',
                  label: 'EMA(13)',
                  parameters: { period: 13 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Ribbon Bajista',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'ema',
                label: 'EMA(8)',
                parameters: { period: 8 }
              },
              condition: 'crosses_below',
              comparisonValue: {
                type: 'indicator',
                indicatorValue: {
                  indicator: 'ema',
                  label: 'EMA(13)',
                  parameters: { period: 13 }
                }
              }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 70 },
      trailingStop: { enabled: true, distance: 80, step: 25 }
    }
  },

  {
    id: 'ichimoku-cloud',
    name: 'Ichimoku Cloud',
    description: 'Sistema completo Ichimoku. Compra cuando precio está sobre la nube y Tenkan cruza Kijun. Sistema japonés clásico.',
    category: 'trend',
    difficulty: 'advanced',
    timeframes: ['4h', '1d'],
    indicators: ['Ichimoku'],
    winRateExpected: 66,
    strategy: {
      name: 'Ichimoku Cloud',
      timeframe: '1d',
      positionSizing: { type: 'risk_percent', value: 2 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Precio Sobre Nube + Cruce TK',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'ichimoku',
                label: 'Ichimoku',
                parameters: { tenkan: 9, kijun: 26, senkou: 52 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Precio Bajo Nube',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'ichimoku',
                label: 'Ichimoku',
                parameters: { tenkan: 9, kijun: 26, senkou: 52 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 5 },
      trailingStop: { enabled: true, distance: 150, step: 50 }
    }
  },

  // ==================== VOLATILITY (adicionales) ====================
  {
    id: 'keltner-channel',
    name: 'Keltner Channel Breakout',
    description: 'Canales de Keltner para breakouts. Similar a Bollinger pero usa ATR. Opera rupturas de volatilidad.',
    category: 'volatility',
    difficulty: 'intermediate',
    timeframes: ['1h', '4h'],
    indicators: ['Keltner Channel', 'ATR'],
    winRateExpected: 60,
    strategy: {
      name: 'Keltner Channel Breakout',
      timeframe: '4h',
      positionSizing: { type: 'risk_percent', value: 1.5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Precio Rompe Canal Superior',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 60 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Precio Vuelve al Centro',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'ema',
                label: 'EMA(20)',
                parameters: { period: 20 }
              },
              condition: 'crosses_below',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 55 },
      takeProfit: { enabled: true, type: 'ratio', value: 2.5 }
    }
  },

  {
    id: 'donchian-breakout',
    name: 'Donchian Channel Breakout',
    description: 'Estrategia de las Tortugas de Richard Dennis. Opera breakouts de máximos/mínimos de N períodos.',
    category: 'breakout',
    difficulty: 'intermediate',
    timeframes: ['4h', '1d'],
    indicators: ['Donchian Channel'],
    winRateExpected: 58,
    strategy: {
      name: 'Donchian Channel Breakout',
      timeframe: '1d',
      positionSizing: { type: 'risk_percent', value: 2 },
      variables: [
        { id: 'var1', name: 'Breakout_Period', value: 20, enabled: true, min: 10, max: 50, step: 5 }
      ],
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Nuevo Máximo 20 Períodos',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'donchian',
                label: 'Donchian(20)',
                parameters: { period: { type: 'variable', variableId: 'var1', variableName: 'Breakout_Period' } }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Nuevo Mínimo 10 Períodos',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'donchian',
                label: 'Donchian(10)',
                parameters: { period: 10 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 2 },
      trailingStop: { enabled: true, distance: 200, step: 50 }
    }
  },

  // ==================== REVERSAL (adicionales) ====================
  {
    id: 'rsi-divergence',
    name: 'RSI Divergencia',
    description: 'Detecta divergencias entre precio y RSI. Señal poderosa de reversión cuando precio hace nuevo máximo pero RSI no.',
    category: 'reversal',
    difficulty: 'advanced',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['RSI'],
    winRateExpected: 70,
    strategy: {
      name: 'RSI Divergencia',
      timeframe: '4h',
      positionSizing: { type: 'risk_percent', value: 2 },
      variables: [
        { id: 'var1', name: 'RSI_Period', value: 14, enabled: true, min: 10, max: 20, step: 1 }
      ],
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Divergencia Alcista',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'rsi',
                label: 'RSI(14)',
                parameters: { period: { type: 'variable', variableId: 'var1', variableName: 'RSI_Period' } }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 35 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'RSI Vuelve a Zona Media',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'rsi',
                label: 'RSI(14)',
                parameters: { period: { type: 'variable', variableId: 'var1', variableName: 'RSI_Period' } }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 50 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'percentage', value: 2.5 },
      takeProfit: { enabled: true, type: 'ratio', value: 3 }
    }
  },

  {
    id: 'support-resistance-bounce',
    name: 'Rebote en Soporte/Resistencia',
    description: 'Price action puro. Opera rebotes en niveles clave identificados con máximos/mínimos históricos.',
    category: 'reversal',
    difficulty: 'intermediate',
    timeframes: ['1h', '4h', '1d'],
    indicators: ['SMA'],
    winRateExpected: 63,
    strategy: {
      name: 'Rebote en Soporte/Resistencia',
      timeframe: '4h',
      positionSizing: { type: 'risk_percent', value: 1.5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Rebote en Soporte',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'sma',
                label: 'SMA(200)',
                parameters: { period: 200 }
              },
              condition: 'crosses_above',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Alcanza Resistencia',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'rsi',
                label: 'RSI(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 70 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 50 },
      takeProfit: { enabled: true, type: 'pips', value: 120 }
    }
  },

  // ==================== SCALPING (adicionales) ====================
  {
    id: 'macd-scalping',
    name: 'MACD Scalping 5min',
    description: 'Scalping agresivo con MACD en 5 minutos. Requiere spreads bajos y ejecución rápida.',
    category: 'scalping',
    difficulty: 'advanced',
    timeframes: ['1m', '5m'],
    indicators: ['MACD', 'EMA'],
    winRateExpected: 52,
    strategy: {
      name: 'MACD Scalping 5min',
      timeframe: '5m',
      positionSizing: { type: 'fixed_lots', value: 0.1 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'MACD Cruza + EMA',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'macd',
                label: 'MACD(12,26,9)',
                parameters: { fast_period: 12, slow_period: 26, signal_period: 9 }
              },
              condition: 'crosses_above',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'MACD Cruza Abajo',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'macd',
                label: 'MACD(12,26,9)',
                parameters: { fast_period: 12, slow_period: 26, signal_period: 9 }
              },
              condition: 'crosses_below',
              comparisonValue: { type: 'number', numericValue: 0 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 8 },
      takeProfit: { enabled: true, type: 'pips', value: 12 }
    }
  },

  {
    id: 'stochastic-scalping',
    name: 'Stochastic Scalping',
    description: 'Scalping con Estocástico rápido. Opera cruces de %K y %D en zona de sobreventa/sobrecompra.',
    category: 'scalping',
    difficulty: 'advanced',
    timeframes: ['5m', '15m'],
    indicators: ['Stochastic'],
    winRateExpected: 53,
    strategy: {
      name: 'Stochastic Scalping',
      timeframe: '5m',
      positionSizing: { type: 'fixed_lots', value: 0.1 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Stoch Cruza en Sobreventa',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'stochastic',
                label: 'Stochastic(5,3,3)',
                parameters: { k_period: 5, d_period: 3, slowing: 3 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 20 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Stoch Alcanza Medio',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'stochastic',
                label: 'Stochastic(5,3,3)',
                parameters: { k_period: 5, d_period: 3, slowing: 3 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 50 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 7 },
      takeProfit: { enabled: true, type: 'pips', value: 14 }
    }
  },

  // ==================== BREAKOUT (adicionales) ====================
  {
    id: 'london-breakout',
    name: 'London Breakout',
    description: 'Opera el breakout de la sesión de Londres. Popular en pares EUR/USD y GBP/USD. Alta volatilidad en apertura.',
    category: 'breakout',
    difficulty: 'intermediate',
    timeframes: ['15m', '1h'],
    indicators: ['ATR'],
    winRateExpected: 57,
    strategy: {
      name: 'London Breakout',
      timeframe: '15m',
      positionSizing: { type: 'risk_percent', value: 1.5 },
      entryBlocks: [
        {
          id: 'entry-1',
          type: 'entry',
          name: 'Breakout con Volatilidad',
          enabled: true,
          rules: [
            {
              id: 'rule-1',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'greater_than',
              comparisonValue: { type: 'number', numericValue: 40 }
            }
          ],
          actions: [
            { id: 'action-1', action: 'market_buy', parameters: {} }
          ]
        }
      ],
      exitBlocks: [
        {
          id: 'exit-1',
          type: 'exit',
          name: 'Final Sesión Londres',
          enabled: true,
          rules: [
            {
              id: 'rule-2',
              indicator: {
                indicator: 'atr',
                label: 'ATR(14)',
                parameters: { period: 14 }
              },
              condition: 'less_than',
              comparisonValue: { type: 'number', numericValue: 20 }
            }
          ],
          actions: [
            { id: 'action-2', action: 'close_position', parameters: {} }
          ]
        }
      ],
      stopLoss: { enabled: true, type: 'pips', value: 30 },
      takeProfit: { enabled: true, type: 'pips', value: 70 }
    }
  }
]

// Funciones auxiliares
export const getTemplatesByCategory = (category: StrategyTemplate['category']) => {
  return STRATEGY_TEMPLATES.filter(t => t.category === category)
}

export const getTemplatesByDifficulty = (difficulty: StrategyTemplate['difficulty']) => {
  return STRATEGY_TEMPLATES.filter(t => t.difficulty === difficulty)
}

export const getTemplateById = (id: string) => {
  return STRATEGY_TEMPLATES.find(t => t.id === id)
}

