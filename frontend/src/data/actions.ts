/**
 * Definición de acciones que se ejecutan cuando se cumplen las condiciones
 */

import { NumericValue } from '@/types/variables'

// Parámetro configurable de una acción
export interface ActionParameter {
  key: string;
  label: string;
  type: 'number' | 'select' | 'boolean';
  required: boolean;
  defaultValue?: NumericValue | string | boolean;
  unit?: string;  // ej: "pips", "%", "puntos"
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
}

export interface Action {
  value: string;
  label: string;
  icon: string;
  description: string;
  category: 'entry' | 'exit' | 'management';
  parameters?: ActionParameter[];  // Parámetros configurables
}

export interface ActionCategory {
  name: string;
  value: string;
  actions: Action[];
}

export const ACTION_CATEGORIES: ActionCategory[] = [
  {
    name: "Acciones de Entrada",
    value: "entry",
    actions: [
      {
        value: "buy_market",
        label: "Comprar a Mercado",
        icon: "📈",
        description: "Abrir posición larga al precio de mercado actual",
        category: "entry"
      },
      {
        value: "sell_market",
        label: "Vender a Mercado",
        icon: "📉",
        description: "Abrir posición corta al precio de mercado actual",
        category: "entry"
      },
      {
        value: "buy_limit",
        label: "Comprar con Límite",
        icon: "🎯",
        description: "Orden de compra límite a precio específico",
        category: "entry"
      },
      {
        value: "sell_limit",
        label: "Vender con Límite",
        icon: "🎯",
        description: "Orden de venta límite a precio específico",
        category: "entry"
      },
      {
        value: "buy_stop",
        label: "Comprar Stop",
        icon: "⏸️",
        description: "Orden de compra stop por encima del precio actual",
        category: "entry"
      },
      {
        value: "sell_stop",
        label: "Vender Stop",
        icon: "⏸️",
        description: "Orden de venta stop por debajo del precio actual",
        category: "entry"
      }
    ]
  },
  {
    name: "Acciones de Salida",
    value: "exit",
    actions: [
      {
        value: "close_position",
        label: "Cerrar Posición",
        icon: "✖️",
        description: "Cerrar todas las posiciones abiertas",
        category: "exit"
      },
      {
        value: "close_buy",
        label: "Cerrar Compras",
        icon: "⬇️",
        description: "Cerrar solo posiciones largas",
        category: "exit"
      },
      {
        value: "close_sell",
        label: "Cerrar Ventas",
        icon: "⬆️",
        description: "Cerrar solo posiciones cortas",
        category: "exit"
      },
      {
        value: "partial_close",
        label: "Cierre Parcial",
        icon: "⚖️",
        description: "Cerrar un porcentaje de la posición",
        category: "exit"
      }
    ]
  },
  {
    name: "Gestión de Riesgo",
    value: "management",
    actions: [
      {
        value: "modify_position",
        label: "Modificar Posición",
        icon: "⚙️",
        description: "Ajustar tamaño de posición o parámetros",
        category: "management",
        parameters: [
          {
            key: "action",
            label: "Acción",
            type: "select",
            required: true,
            defaultValue: "partial_close",
            options: [
              { value: "partial_close", label: "Cierre Parcial" },
              { value: "scale_in", label: "Aumentar Posición" },
              { value: "scale_out", label: "Reducir Posición" }
            ]
          },
          {
            key: "percentage",
            label: "Porcentaje",
            type: "number",
            required: true,
            defaultValue: 50,
            min: 1,
            max: 100,
            step: 1,
            unit: "%"
          }
        ]
      }
    ]
  }
];

// Función auxiliar para obtener todas las acciones
export const getAllActions = (): Action[] => {
  return ACTION_CATEGORIES.flatMap(category => category.actions);
};

// Función auxiliar para buscar una acción por su valor
export const getActionByValue = (value: string): Action | undefined => {
  return getAllActions().find(action => action.value === value);
};

