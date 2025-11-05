/**
 * Definición de condiciones lógicas para comparar indicadores, precios y estados
 */

export interface Condition {
  value: string;
  label: string;
  symbol: string;
  description?: string;
}

export const CONDITIONS: Condition[] = [
  {
    value: "greater_than",
    label: "Mayor que",
    symbol: ">",
    description: "El valor es mayor que el especificado"
  },
  {
    value: "less_than",
    label: "Menor que",
    symbol: "<",
    description: "El valor es menor que el especificado"
  },
  {
    value: "equal_to",
    label: "Igual a",
    symbol: "=",
    description: "El valor es igual al especificado"
  },
  {
    value: "greater_or_equal",
    label: "Mayor o igual que",
    symbol: "≥",
    description: "El valor es mayor o igual que el especificado"
  },
  {
    value: "less_or_equal",
    label: "Menor o igual que",
    symbol: "≤",
    description: "El valor es menor o igual que el especificado"
  },
  {
    value: "crosses_above",
    label: "Cruza por encima",
    symbol: "↗",
    description: "El valor cruza por encima del especificado"
  },
  {
    value: "crosses_below",
    label: "Cruza por debajo",
    symbol: "↘",
    description: "El valor cruza por debajo del especificado"
  },
  {
    value: "between",
    label: "Entre",
    symbol: "⇔",
    description: "El valor está entre dos valores especificados"
  },
  {
    value: "outside",
    label: "Fuera de rango",
    symbol: "⇎",
    description: "El valor está fuera de dos valores especificados"
  },
  {
    value: "not_equal",
    label: "Diferente de",
    symbol: "≠",
    description: "El valor es diferente al especificado"
  },
  {
    value: "is_true",
    label: "Es verdadero",
    symbol: "✓",
    description: "La condición es verdadera"
  },
  {
    value: "is_false",
    label: "Es falso",
    symbol: "✗",
    description: "La condición es falsa"
  }
];

// Operadores lógicos para combinar condiciones
export interface LogicalOperator {
  value: string;
  label: string;
  symbol: string;
}

export const LOGICAL_OPERATORS: LogicalOperator[] = [
  {
    value: "and",
    label: "Y (AND)",
    symbol: "∧"
  },
  {
    value: "or",
    label: "O (OR)",
    symbol: "∨"
  }
];

// Tipos de valores que se pueden usar en condiciones
export interface ValueType {
  value: string;
  label: string;
  category: 'price' | 'indicator' | 'position' | 'market' | 'time' | 'volume';
  description?: string;
  unit?: string;
}

export const VALUE_TYPES: ValueType[] = [
  // Precios de la vela
  {
    value: "close_price",
    label: "Precio de Cierre",
    category: "price",
    description: "Precio de cierre de la vela actual",
    unit: "precio"
  },
  {
    value: "open_price",
    label: "Precio de Apertura",
    category: "price",
    description: "Precio de apertura de la vela actual",
    unit: "precio"
  },
  {
    value: "high_price",
    label: "Precio Máximo",
    category: "price",
    description: "Precio máximo de la vela actual",
    unit: "precio"
  },
  {
    value: "low_price",
    label: "Precio Mínimo",
    category: "price",
    description: "Precio mínimo de la vela actual",
    unit: "precio"
  },
  {
    value: "volume",
    label: "Volumen",
    category: "volume",
    description: "Volumen de la vela actual",
    unit: "unidades"
  },
  
  // Comparaciones de precios
  {
    value: "close_vs_open",
    label: "Cierre vs Apertura",
    category: "price",
    description: "Diferencia entre precio de cierre y apertura",
    unit: "pips"
  },
  {
    value: "high_vs_low",
    label: "Máximo vs Mínimo",
    category: "price",
    description: "Rango de la vela (máximo - mínimo)",
    unit: "pips"
  },
  
  // Comparaciones temporales
  {
    value: "close_vs_previous_close",
    label: "Cierre vs Cierre Anterior",
    category: "price",
    description: "Comparar cierre actual con cierre anterior",
    unit: "pips"
  },
  {
    value: "high_vs_previous_high",
    label: "Máximo vs Máximo Anterior",
    category: "price",
    description: "Comparar máximo actual con máximo anterior",
    unit: "pips"
  },
  {
    value: "low_vs_previous_low",
    label: "Mínimo vs Mínimo Anterior",
    category: "price",
    description: "Comparar mínimo actual con mínimo anterior",
    unit: "pips"
  },
  
  // Estados de posición
  {
    value: "position_profitable",
    label: "Posición Beneficiosa",
    category: "position",
    description: "Si la posición actual es beneficiosa",
    unit: "booleano"
  },
  {
    value: "position_losing",
    label: "Posición Perdedora",
    category: "position",
    description: "Si la posición actual es perdedora",
    unit: "booleano"
  },
  {
    value: "no_short_positions",
    label: "Sin Posiciones Cortas",
    category: "position",
    description: "Si no hay posiciones cortas abiertas",
    unit: "booleano"
  },
  {
    value: "no_long_positions",
    label: "Sin Posiciones Largas",
    category: "position",
    description: "Si no hay posiciones largas abiertas",
    unit: "booleano"
  },
  {
    value: "last_trade_winner",
    label: "Última Operación Ganadora",
    category: "position",
    description: "Si la última operación cerrada fue ganadora",
    unit: "booleano"
  },
  {
    value: "last_trade_loser",
    label: "Última Operación Perdedora",
    category: "position",
    description: "Si la última operación cerrada fue perdedora",
    unit: "booleano"
  },
  {
    value: "consecutive_wins",
    label: "Ganancias Consecutivas",
    category: "position",
    description: "Número de operaciones ganadoras consecutivas",
    unit: "número"
  },
  {
    value: "consecutive_losses",
    label: "Pérdidas Consecutivas",
    category: "position",
    description: "Número de operaciones perdedoras consecutivas",
    unit: "número"
  },
  
  // Estados del mercado
  {
    value: "market_trending_up",
    label: "Mercado Alcista",
    category: "market",
    description: "Si el mercado está en tendencia alcista",
    unit: "booleano"
  },
  {
    value: "market_trending_down",
    label: "Mercado Bajista",
    category: "market",
    description: "Si el mercado está en tendencia bajista",
    unit: "booleano"
  },
  {
    value: "market_ranging",
    label: "Mercado Lateral",
    category: "market",
    description: "Si el mercado está en rango lateral",
    unit: "booleano"
  },
  {
    value: "high_volatility",
    label: "Alta Volatilidad",
    category: "market",
    description: "Si la volatilidad es alta",
    unit: "booleano"
  },
  {
    value: "low_volatility",
    label: "Baja Volatilidad",
    category: "market",
    description: "Si la volatilidad es baja",
    unit: "booleano"
  },
  
  // Tiempo
  {
    value: "is_london_session",
    label: "Sesión de Londres",
    category: "time",
    description: "Si estamos en la sesión de Londres",
    unit: "booleano"
  },
  {
    value: "is_new_york_session",
    label: "Sesión de Nueva York",
    category: "time",
    description: "Si estamos en la sesión de Nueva York",
    unit: "booleano"
  },
  {
    value: "is_asian_session",
    label: "Sesión Asiática",
    category: "time",
    description: "Si estamos en la sesión asiática",
    unit: "booleano"
  },
  {
    value: "is_weekend",
    label: "Fin de Semana",
    category: "time",
    description: "Si es fin de semana",
    unit: "booleano"
  },
  {
    value: "hour_of_day",
    label: "Hora del Día",
    category: "time",
    description: "Hora actual del día",
    unit: "horas"
  },
  {
    value: "day_of_week",
    label: "Día de la Semana",
    category: "time",
    description: "Día de la semana (1-7)",
    unit: "días"
  }
];

// Agrupar tipos de valores por categoría
export const VALUE_TYPES_BY_CATEGORY = {
  price: VALUE_TYPES.filter(v => v.category === 'price'),
  indicator: VALUE_TYPES.filter(v => v.category === 'indicator'),
  position: VALUE_TYPES.filter(v => v.category === 'position'),
  market: VALUE_TYPES.filter(v => v.category === 'market'),
  time: VALUE_TYPES.filter(v => v.category === 'time'),
  volume: VALUE_TYPES.filter(v => v.category === 'volume')
};

