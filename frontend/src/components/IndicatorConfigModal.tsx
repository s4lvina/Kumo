import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { IndicatorParameters } from '@/types/strategy'
import { StrategyVariable } from '@/types/variables'
import { getIndicatorConfig, generateIndicatorLabel } from '@/data/indicatorDefaults'
import NumericValueSelector from './NumericValueSelector'

interface IndicatorConfigModalProps {
  indicator: string
  initialParams: IndicatorParameters
  variables: StrategyVariable[]
  onSave: (params: IndicatorParameters) => void
  onClose: () => void
}

/**
 * Modal para configurar parámetros avanzados de un indicador
 */
export default function IndicatorConfigModal({
  indicator,
  initialParams,
  variables,
  onSave,
  onClose
}: IndicatorConfigModalProps) {
  const [params, setParams] = useState<IndicatorParameters>(initialParams)
  const config = getIndicatorConfig(indicator)

  useEffect(() => {
    setParams(initialParams)
  }, [initialParams])

  if (!config) return null

  const handleSave = () => {
    onSave(params)
    onClose()
  }

  const updateParam = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-surface border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                ⚙️ Configurar Indicador
              </CardTitle>
              <CardDescription className="mt-2">
                {generateIndicatorLabel(indicator, params)}
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
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
            <p className="text-lg font-bold text-orange-400">
              {generateIndicatorLabel(indicator, params)}
            </p>
          </div>

          {/* Parámetros configurables */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Parámetros</h3>
            
            {config.configurableParams.map((paramConfig) => (
              <div key={String(paramConfig.key)}>
                {paramConfig.type === 'number' ? (
                  <NumericValueSelector
                    value={params[paramConfig.key] || 0}
                    onChange={(value) => updateParam(String(paramConfig.key), value)}
                    variables={variables}
                    label={paramConfig.label}
                    min={paramConfig.min}
                    max={paramConfig.max}
                    step={paramConfig.step}
                  />
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">
                      {paramConfig.label}
                    </label>
                    <select
                      value={params[paramConfig.key] as string || ''}
                      onChange={(e) => updateParam(String(paramConfig.key), e.target.value)}
                      className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      {paramConfig.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

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
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              Guardar Configuración
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

