import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComparisonValue } from '@/types/strategy'
import { StrategyVariable } from '@/types/variables'
import { INDICATOR_CATEGORIES } from '@/data/indicators'
import { getDefaultParameters, generateIndicatorLabel } from '@/data/indicatorDefaults'
import { Settings, ChevronDown, ChevronRight } from 'lucide-react'
import IndicatorConfigModal from './IndicatorConfigModal'

interface ComparisonValueSelectorProps {
  value: ComparisonValue
  onChange: (value: ComparisonValue) => void
  variables: StrategyVariable[]
}

/**
 * Selector que permite elegir entre un valor numérico o un indicador como comparación
 */
export default function ComparisonValueSelector({
  value,
  onChange,
  variables
}: ComparisonValueSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [showIndicatorConfig, setShowIndicatorConfig] = useState(false)
  
  const enabledVars = variables.filter(v => v.enabled)
  const hasVariables = enabledVars.length > 0

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  const selectIndicator = (indicatorValue: string) => {
    const defaultParams = getDefaultParameters(indicatorValue)
    const label = generateIndicatorLabel(indicatorValue, defaultParams)
    
    onChange({
      type: 'indicator',
      indicatorValue: {
        indicator: indicatorValue,
        parameters: defaultParams,
        label
      }
    })
  }

  const updateIndicatorParams = (params: any) => {
    if (value.indicatorValue) {
      const label = generateIndicatorLabel(value.indicatorValue.indicator, params)
      onChange({
        type: 'indicator',
        indicatorValue: {
          ...value.indicatorValue,
          parameters: params,
          label
        }
      })
    }
  }

  const handleVariableSelect = (variableId: string) => {
    const variable = variables.find(v => v.id === variableId)
    if (variable) {
      onChange({
        type: 'variable',
        variableReference: {
          type: 'variable',
          variableId: variable.id,
          variableName: variable.name
        }
      })
    }
  }

  return (
    <div className="space-y-2">
      {/* Selector de tipo */}
      <div className="flex gap-2 flex-wrap">
        <Button
          type="button"
          size="sm"
          variant={value.type === 'number' ? 'default' : 'outline'}
          onClick={() => onChange({ type: 'number', numericValue: 0 })}
          className={value.type === 'number' 
            ? 'bg-primary' 
            : 'border-slate-700 hover:border-orange-400 hover:text-orange-400'}
        >
          Valor Numérico
        </Button>
        {hasVariables && (
          <Button
            type="button"
            size="sm"
            variant={value.type === 'variable' ? 'default' : 'outline'}
            onClick={() => {
              if (enabledVars.length > 0) {
                handleVariableSelect(enabledVars[0].id)
              }
            }}
            className={value.type === 'variable' 
              ? 'bg-orange-500 hover:bg-orange-600' 
              : 'border-slate-700 hover:border-orange-400 hover:text-orange-400'}
          >
            Variable
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant={value.type === 'indicator' ? 'default' : 'outline'}
          onClick={() => onChange({ type: 'indicator', indicatorValue: undefined })}
          className={value.type === 'indicator' 
            ? 'bg-primary' 
            : 'border-slate-700 hover:border-orange-400 hover:text-orange-400'}
        >
          Otro Indicador
        </Button>
      </div>

      {/* Input según el tipo seleccionado */}
      {value.type === 'number' ? (
        <input
          type="number"
          value={value.numericValue || ''}
          onChange={(e) => onChange({ type: 'number', numericValue: parseFloat(e.target.value) || 0 })}
          placeholder="Introduce un valor..."
          className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none transition-colors"
        />
      ) : value.type === 'variable' ? (
        <div className="space-y-2">
          <select
            value={value.variableReference?.variableId || ''}
            onChange={(e) => handleVariableSelect(e.target.value)}
            className="w-full bg-white dark:bg-background border border-orange-500 text-orange-400 rounded px-3 py-2 text-sm focus:border-orange-400 focus:outline-none font-mono font-bold"
          >
            {enabledVars.map((variable) => (
              <option key={variable.id} value={variable.id}>
                {variable.name} = {variable.value} {variable.description && `(${variable.description})`}
              </option>
            ))}
          </select>
          {value.variableReference && (
            <div className="text-xs text-slate-500">
              Valor actual: {variables.find(v => v.id === value.variableReference?.variableId)?.value || 0}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {value.indicatorValue ? (
            // Indicador seleccionado
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-md p-2">
              <span className="text-sm font-medium text-primary flex-1">
                {value.indicatorValue.label}
              </span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setShowIndicatorConfig(true)}
                className="h-7 text-orange-400 hover:text-orange-300"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            // Selector de indicador
            <div className="border border-slate-300 dark:border-slate-700 rounded-md p-2 max-h-[200px] overflow-y-auto bg-slate-50 dark:bg-background">
              <p className="text-xs text-muted-foreground mb-2">Selecciona un indicador:</p>
              {INDICATOR_CATEGORIES.map((category) => (
                <div key={category.name} className="mb-1">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center justify-between p-1.5 rounded hover:bg-slate-800/50 transition-colors text-left"
                  >
                    <span className="text-xs font-medium">{category.name}</span>
                    {expandedCategories.includes(category.name) ? (
                      <ChevronDown className="h-3 w-3 text-orange-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </button>
                  
                  {expandedCategories.includes(category.name) && (
                    <div className="pl-2 space-y-0.5 mt-0.5">
                      {category.indicators.map((indicator) => (
                        <button
                          key={indicator.value}
                          type="button"
                          onClick={() => selectIndicator(indicator.value)}
                          className="w-full text-left text-xs px-2 py-1 rounded hover:bg-orange-500/10 hover:text-orange-400 transition-colors"
                        >
                          {indicator.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de configuración */}
      {showIndicatorConfig && value.indicatorValue && (
        <IndicatorConfigModal
          indicator={value.indicatorValue.indicator}
          initialParams={value.indicatorValue.parameters}
          variables={variables}
          onSave={updateIndicatorParams}
          onClose={() => setShowIndicatorConfig(false)}
        />
      )}
    </div>
  )
}

