/**
 * Definición de condiciones lógicas para comparar indicadores
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
    description: "El indicador es mayor que el valor especificado"
  },
  {
    value: "less_than",
    label: "Menor que",
    symbol: "<",
    description: "El indicador es menor que el valor especificado"
  },
  {
    value: "equal_to",
    label: "Igual a",
    symbol: "=",
    description: "El indicador es igual al valor especificado"
  },
  {
    value: "greater_or_equal",
    label: "Mayor o igual que",
    symbol: "≥",
    description: "El indicador es mayor o igual que el valor especificado"
  },
  {
    value: "less_or_equal",
    label: "Menor o igual que",
    symbol: "≤",
    description: "El indicador es menor o igual que el valor especificado"
  },
  {
    value: "crosses_above",
    label: "Cruza por encima",
    symbol: "↗",
    description: "El indicador cruza por encima del valor/indicador"
  },
  {
    value: "crosses_below",
    label: "Cruza por debajo",
    symbol: "↘",
    description: "El indicador cruza por debajo del valor/indicador"
  },
  {
    value: "between",
    label: "Entre",
    symbol: "⇔",
    description: "El indicador está entre dos valores"
  },
  {
    value: "outside",
    label: "Fuera de rango",
    symbol: "⇎",
    description: "El indicador está fuera de dos valores"
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

