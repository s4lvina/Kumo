/**
 * Sistema de variables para optimización de estrategias
 */

// Variable de estrategia
export interface StrategyVariable {
  id: string;
  name: string;              // "Var1", "Var2", etc.
  value: number;             // Valor actual
  description?: string;      // Descripción opcional
  min?: number;              // Valor mínimo para optimización
  max?: number;              // Valor máximo para optimización
  step?: number;             // Paso para optimización
  enabled: boolean;          // Si está activa
}

// Referencia a una variable
export interface VariableReference {
  type: 'variable';
  variableId: string;
  variableName: string;      // Para mostrar en UI
}

// Valor que puede ser numérico o variable
export type NumericValue = number | VariableReference;

// Configuración de optimización
export interface OptimizationConfig {
  variables: {
    variableId: string;
    min: number;
    max: number;
    step: number;
  }[];
  maxCombinations?: number;  // Límite de combinaciones
}

// Resultado de optimización
export interface OptimizationResult {
  variables: Record<string, number>;  // Valores de variables usadas
  metrics: {
    winRate: number;
    totalTrades: number;
    profitFactor: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
  score: number;  // Score compuesto
}

// Helper para crear variables por defecto
export const createDefaultVariable = (index: number): StrategyVariable => ({
  id: `var${index}`,
  name: `Var${index}`,
  value: 0,
  description: '',
  min: 1,
  max: 100,
  step: 1,
  enabled: false
});

// Helper para verificar si un valor es variable
export const isVariableReference = (value: any): value is VariableReference => {
  return typeof value === 'object' && value?.type === 'variable';
};

// Helper para obtener el valor real (número o valor de variable)
export const resolveValue = (
  value: NumericValue,
  variables: StrategyVariable[]
): number => {
  if (isVariableReference(value)) {
    const variable = variables.find(v => v.id === value.variableId);
    return variable?.value || 0;
  }
  return value;
};

// Generar todas las combinaciones para optimización
export const generateCombinations = (
  config: OptimizationConfig
): Record<string, number>[] => {
  const combinations: Record<string, number>[] = [];
  
  const generate = (index: number, current: Record<string, number>) => {
    if (index === config.variables.length) {
      combinations.push({ ...current });
      return;
    }
    
    const varConfig = config.variables[index];
    const { variableId, min, max, step } = varConfig;
    
    for (let value = min; value <= max; value += step) {
      current[variableId] = value;
      generate(index + 1, current);
    }
  };
  
  generate(0, {});
  
  // Limitar combinaciones si es necesario
  if (config.maxCombinations && combinations.length > config.maxCombinations) {
    return combinations.slice(0, config.maxCombinations);
  }
  
  return combinations;
};

// Calcular número total de combinaciones sin generarlas
export const countCombinations = (config: OptimizationConfig): number => {
  return config.variables.reduce((total, varConfig) => {
    const steps = Math.floor((varConfig.max - varConfig.min) / varConfig.step) + 1;
    return total * steps;
  }, 1);
};

