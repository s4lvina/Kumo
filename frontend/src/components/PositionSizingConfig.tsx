import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign } from 'lucide-react'
import { PositionSizingConfig } from '@/types/strategy'
import { StrategyVariable, isVariableReference } from '@/types/variables'

interface PositionSizingConfigProps {
  config?: PositionSizingConfig
  variables: StrategyVariable[]
  onChange: (config: PositionSizingConfig) => void
}

/**
 * Componente para configurar el tamaño de posición
 * Soporta: Fixed Lots, % Balance, Risk %
 */
export default function PositionSizingConfigComponent({ config, variables, onChange }: PositionSizingConfigProps) {
  const [showVariableSelector, setShowVariableSelector] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentType = config?.type || 'fixed_lots'
  const currentValue = config?.value || 0.1

  const handleTypeChange = (type: 'fixed_lots' | 'percent_balance' | 'risk_percent') => {
    // Valores por defecto según el tipo
    const defaultValues = {
      fixed_lots: 0.1,
      percent_balance: 2,
      risk_percent: 1
    }
    
    onChange({
      type,
      value: defaultValues[type]
    })
  }

  const handleValueChange = (value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      onChange({
        type: currentType,
        value: numValue
      })
    }
  }

  const handleVariableSelect = (variable: StrategyVariable) => {
    onChange({
      type: currentType,
      value: {
        type: 'variable',
        variableId: variable.id,
        variableName: variable.name
      }
    })
    setShowVariableSelector(false)
  }

  const getLabel = () => {
    switch (currentType) {
      case 'fixed_lots':
        return 'Lotes'
      case 'percent_balance':
        return '% Balance'
      case 'risk_percent':
        return '% Riesgo'
    }
  }

  const getPlaceholder = () => {
    switch (currentType) {
      case 'fixed_lots':
        return '0.1'
      case 'percent_balance':
        return '2'
      case 'risk_percent':
        return '1'
    }
  }

  const getDescription = () => {
    switch (currentType) {
      case 'fixed_lots':
        return 'Cantidad fija de lotes por operación'
      case 'percent_balance':
        return 'Porcentaje del balance de la cuenta'
      case 'risk_percent':
        return 'Porcentaje a arriesgar basado en Stop Loss'
    }
  }

  // Mostrar valor colapsado
  const getCollapsedDisplay = () => {
    const typeLabels = {
      fixed_lots: 'Lotes',
      percent_balance: '% Balance',
      risk_percent: '% Riesgo'
    }
    
    if (isVariableReference(currentValue)) {
      const variable = variables.find(v => v.id === currentValue.variableId)
      return `${variable?.value || '?'} ${typeLabels[currentType]}`
    }
    return `${currentValue} ${typeLabels[currentType]}`
  }

  return (
    <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 h-full">
      <CardContent className="py-4 h-full flex flex-col">
        <div className="space-y-3">
          {/* Header colapsable */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-400" />
              <label className="text-xs font-medium text-muted-foreground">Tamaño de Posición</label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-orange-400">{getCollapsedDisplay()}</span>
              <span className="text-xs text-muted-foreground">{isExpanded ? '▼' : '▶'}</span>
            </div>
          </button>

          {/* Contenido expandible */}
          {isExpanded && (
            <>
              {/* Selector de tipo */}
              <div className="flex gap-2 pt-2">
            <Button
              variant={currentType === 'fixed_lots' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTypeChange('fixed_lots')}
              className={currentType === 'fixed_lots' 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'border-slate-700 hover:border-orange-400 hover:text-orange-400'}
            >
              Lotes Fijos
            </Button>
            <Button
              variant={currentType === 'percent_balance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTypeChange('percent_balance')}
              className={currentType === 'percent_balance' 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'border-slate-700 hover:border-orange-400 hover:text-orange-400'}
            >
              % Balance
            </Button>
            <Button
              variant={currentType === 'risk_percent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTypeChange('risk_percent')}
              className={currentType === 'risk_percent' 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'border-slate-700 hover:border-orange-400 hover:text-orange-400'}
            >
              % Riesgo
            </Button>
          </div>

          {/* Input de valor */}
          <div className="flex gap-2 items-center">
            {isVariableReference(currentValue) ? (
              <div className="flex-1 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded text-sm text-orange-400">
                🔢 {currentValue.variableName} = {variables.find(v => v.id === currentValue.variableId)?.value || '?'}
              </div>
            ) : (
              <input
                type="number"
                value={currentValue}
                onChange={(e) => handleValueChange(e.target.value)}
                step={currentType === 'fixed_lots' ? '0.01' : '0.1'}
                min="0"
                placeholder={getPlaceholder()}
                className="flex-1 bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none transition-colors"
              />
            )}
            <span className="text-sm text-muted-foreground min-w-[80px]">
              {getLabel()}
            </span>
          </div>

          {/* Botón para usar variable */}
          {variables.length > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVariableSelector(!showVariableSelector)}
                className="w-full border-slate-700 hover:border-orange-400 hover:text-orange-400 text-xs"
              >
                {isVariableReference(currentValue) ? 'Cambiar variable' : 'Usar variable'}
              </Button>

              {showVariableSelector && (
                <div className="absolute top-full mt-1 w-full bg-white dark:bg-surface border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10 max-h-40 overflow-auto">
                  <div className="p-1">
                    {!isVariableReference(currentValue) && (
                      <button
                        onClick={() => {
                          handleValueChange(currentValue.toString())
                          setShowVariableSelector(false)
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs rounded hover:bg-slate-800 text-slate-400"
                      >
                        Usar valor fijo
                      </button>
                    )}
                    {variables.map(variable => (
                      <button
                        key={variable.id}
                        onClick={() => handleVariableSelect(variable)}
                        className="w-full text-left px-3 py-1.5 text-xs rounded hover:bg-slate-800 transition-colors"
                      >
                        <span className="text-orange-400">{variable.name}</span>
                        <span className="text-muted-foreground"> = {variable.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Descripción */}
          <p className="text-xs text-muted-foreground">
            {getDescription()}
          </p>

              {/* Info adicional para Risk % */}
              {currentType === 'risk_percent' && (
                <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-400">
                  ℹ️ El tamaño se calculará automáticamente según el Stop Loss configurado
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

