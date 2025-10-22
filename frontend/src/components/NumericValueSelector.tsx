import { NumericValue, StrategyVariable, isVariableReference } from '@/types/variables'
import { ChevronDown } from 'lucide-react'

interface NumericValueSelectorProps {
  value: NumericValue
  onChange: (value: NumericValue) => void
  variables: StrategyVariable[]
  label?: string
  min?: number
  max?: number
  step?: number
}

/**
 * Selector que permite elegir entre un valor numérico fijo o una variable
 * Diseño horizontal: [Input número] [Selector de variable]
 */
export default function NumericValueSelector({
  value,
  onChange,
  variables,
  label,
  min,
  max,
  step = 1
}: NumericValueSelectorProps) {
  const isVariable = isVariableReference(value)
  const enabledVars = variables.filter(v => v.enabled)
  const hasVariables = enabledVars.length > 0

  const handleVariableSelect = (variableId: string) => {
    if (variableId === 'number') {
      // Cambiar a valor numérico
      onChange(typeof value === 'number' ? value : 0)
    } else {
      // Cambiar a variable
      const variable = variables.find(v => v.id === variableId)
      if (variable) {
        onChange({
          type: 'variable',
          variableId: variable.id,
          variableName: variable.name
        })
      }
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      
      <div className="flex gap-2">
        {/* Input numérico principal */}
        <input
          type="number"
          value={isVariable ? variables.find(v => v.id === value.variableId)?.value || 0 : (value as number)}
          onChange={(e) => !isVariable && onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          disabled={isVariable}
          className={`flex-1 bg-white dark:bg-background border rounded px-3 py-2 text-sm focus:outline-none transition-colors ${
            isVariable 
              ? 'border-orange-500 text-orange-400 cursor-not-allowed' 
              : 'border-slate-700 focus:border-orange-400'
          }`}
        />

        {/* Selector de variable (siempre visible si hay variables) */}
        {hasVariables && (
          <div className="relative flex-shrink-0 w-[140px]">
            <select
              value={isVariable ? value.variableId : 'number'}
              onChange={(e) => handleVariableSelect(e.target.value)}
              className={`w-full appearance-none bg-white dark:bg-background border rounded px-3 py-2 pr-8 text-sm focus:border-orange-400 focus:outline-none transition-colors ${
                isVariable 
                  ? 'border-orange-500 text-orange-400 font-mono font-bold' 
                  : 'border-slate-700 text-slate-400'
              }`}
            >
              <option value="number" className="bg-background text-foreground">
                Valor Fijo
              </option>
              <optgroup label="Variables" className="bg-background">
                {enabledVars.map((variable) => (
                  <option 
                    key={variable.id} 
                    value={variable.id}
                    className="bg-background text-orange-400 font-mono"
                  >
                    {variable.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Info adicional según el tipo */}
      {isVariable ? (
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Variable: <span className="font-mono text-orange-400">{value.variableName}</span>
          </span>
          <span className="text-slate-500">
            Valor: {variables.find(v => v.id === value.variableId)?.value || 0}
          </span>
        </div>
      ) : hasVariables && (
        <div className="text-xs text-slate-500">
          Puedes usar una variable para optimización →
        </div>
      )}
    </div>
  )
}

