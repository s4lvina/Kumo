import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { ActionParameters } from '@/types/strategy'
import { StrategyVariable } from '@/types/variables'
import { Action } from '@/data/actions'
import NumericValueSelector from './NumericValueSelector'

interface ActionConfigModalProps {
  action: Action
  initialParams: ActionParameters
  variables: StrategyVariable[]
  onSave: (params: ActionParameters) => void
  onClose: () => void
}

/**
 * Modal para configurar parámetros de acciones (Stop Loss, Take Profit, etc.)
 */
export default function ActionConfigModal({
  action,
  initialParams,
  variables,
  onSave,
  onClose
}: ActionConfigModalProps) {
  const [params, setParams] = useState<ActionParameters>(initialParams)

  useEffect(() => {
    // Inicializar con valores por defecto si no existen
    const defaultParams: ActionParameters = {}
    action.parameters?.forEach(param => {
      if (param.defaultValue !== undefined && params[param.key] === undefined) {
        defaultParams[param.key] = param.defaultValue
      }
    })
    setParams({ ...defaultParams, ...initialParams })
  }, [action, initialParams])

  const handleSave = () => {
    onSave(params)
    onClose()
  }

  const updateParam = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  // Generar label descriptivo de la acción con parámetros
  const getActionLabel = () => {
    const parts = [action.label]
    
    if (params.type) {
      parts.push(`(${params.type})`)
    }
    
    if (params.value !== undefined) {
      const unit = action.parameters?.find(p => p.key === 'value')?.unit || ''
      parts.push(`${params.value}${unit}`)
    }
    
    return parts.join(' ')
  }

  if (!action.parameters || action.parameters.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-surface border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <span>{action.icon}</span>
                Configurar Acción
              </CardTitle>
              <CardDescription className="mt-2">
                {action.label}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Vista previa */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
            <p className="text-lg font-bold text-green-400">
              {getActionLabel()}
            </p>
          </div>

          {/* Parámetros configurables */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Parámetros</h3>
            
            {action.parameters.map((paramConfig) => (
              <div key={paramConfig.key}>
                {paramConfig.type === 'number' ? (
                  <NumericValueSelector
                    value={params[paramConfig.key] || paramConfig.defaultValue || 0}
                    onChange={(value) => updateParam(paramConfig.key, value)}
                    variables={variables}
                    label={`${paramConfig.label}${paramConfig.unit ? ` (${paramConfig.unit})` : ''}`}
                    min={paramConfig.min}
                    max={paramConfig.max}
                    step={paramConfig.step}
                  />
                ) : paramConfig.type === 'select' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {paramConfig.label}
                    </label>
                    <select
                      value={String(params[paramConfig.key] || paramConfig.defaultValue || '')}
                      onChange={(e) => updateParam(paramConfig.key, e.target.value)}
                      className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      {paramConfig.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={params[paramConfig.key] as boolean || false}
                      onChange={(e) => updateParam(paramConfig.key, e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 text-orange-500 focus:ring-orange-500"
                    />
                    <label className="text-sm font-medium text-foreground">
                      {paramConfig.label}
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info adicional según la acción */}
          {(action.value === 'set_stop_loss' || action.value === 'set_take_profit') && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm">
              <p className="text-slate-400">
                💡 <strong>Tip:</strong> Puedes usar variables para optimizar la distancia de{' '}
                {action.value === 'set_stop_loss' ? 'Stop Loss' : 'Take Profit'}.
              </p>
              <p className="text-slate-500 mt-2 text-xs">
                Por ejemplo: Var1 = 50 pips para probar diferentes valores (30-100 en pasos de 10)
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-700 hover:border-orange-400 hover:text-orange-400"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              Guardar Configuración
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

