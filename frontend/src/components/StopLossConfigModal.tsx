import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Shield } from 'lucide-react'
import { StopLossConfig } from '@/types/strategy'
import { StrategyVariable, NumericValue } from '@/types/variables'
import NumericValueSelector from './NumericValueSelector'

interface StopLossConfigModalProps {
  config: StopLossConfig | undefined
  variables: StrategyVariable[]
  onSave: (config: StopLossConfig) => void
  onClose: () => void
}

/**
 * Modal para configurar Stop Loss
 */
export default function StopLossConfigModal({
  config,
  variables,
  onSave,
  onClose
}: StopLossConfigModalProps) {
  const [enabled, setEnabled] = useState(config?.enabled ?? true)
  const [type, setType] = useState<'pips' | 'points' | 'percentage' | 'price'>(
    config?.type ?? 'pips'
  )
  const [value, setValue] = useState<NumericValue>(config?.value ?? 50)

  const handleSave = () => {
    onSave({
      enabled,
      type,
      value
    })
    onClose()
  }

  const handleDisable = () => {
    onSave({
      enabled: false,
      type: 'pips',
      value: 50
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-surface border-red-500/30">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                  Configurar Stop Loss
                </span>
              </CardTitle>
              <CardDescription className="mt-2">
                Protege tu capital estableciendo un límite de pérdida máxima
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
          {/* Estado */}
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 text-red-500 focus:ring-red-500"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {enabled ? '✅ Stop Loss Activado' : '❌ Stop Loss Desactivado'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {enabled 
                  ? 'El stop loss se aplicará a todas las operaciones'
                  : 'Operar sin stop loss es muy arriesgado'
                }
              </p>
            </div>
          </div>

          {enabled && (
            <>
              {/* Tipo de Stop Loss */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Tipo de Stop Loss
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-red-400 focus:outline-none transition-colors"
                >
                  <option value="pips">Pips (distancia en pips)</option>
                  <option value="points">Puntos (distancia en puntos)</option>
                  <option value="percentage">Porcentaje (% de pérdida)</option>
                  <option value="price">Precio Absoluto (nivel de precio)</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  {type === 'pips' && '💡 Recomendado para Forex. Ejemplo: 50 pips = 0.0050'}
                  {type === 'points' && '💡 Recomendado para índices y acciones'}
                  {type === 'percentage' && '💡 Porcentaje del capital o del precio de entrada'}
                  {type === 'price' && '💡 Nivel de precio específico para el stop'}
                </p>
              </div>

              {/* Valor */}
              <NumericValueSelector
                value={value}
                onChange={setValue}
                variables={variables}
                label={`Distancia (${type})`}
                min={type === 'percentage' ? 0.1 : 1}
                max={type === 'percentage' ? 100 : 10000}
                step={type === 'percentage' ? 0.5 : 1}
              />

              {/* Vista previa */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
                <p className="text-xl font-bold text-red-400">
                  🛡️ Stop Loss: {typeof value === 'object' ? value.variableName : value} {type}
                </p>
              </div>

              {/* Ejemplos según el tipo */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm">
                <p className="font-medium text-foreground mb-2">💡 Ejemplos recomendados:</p>
                <ul className="text-slate-400 space-y-1 text-xs">
                  {type === 'pips' && (
                    <>
                      <li>• Scalping: 5-15 pips</li>
                      <li>• Day Trading: 20-50 pips</li>
                      <li>• Swing Trading: 50-150 pips</li>
                      <li>• Position Trading: 200-500 pips</li>
                    </>
                  )}
                  {type === 'points' && (
                    <>
                      <li>• Índices: 10-50 puntos</li>
                      <li>• Acciones volátiles: 1-5% del precio</li>
                      <li>• Acciones estables: 0.5-2% del precio</li>
                    </>
                  )}
                  {type === 'percentage' && (
                    <>
                      <li>• Conservador: 0.5-1%</li>
                      <li>• Moderado: 1-2%</li>
                      <li>• Agresivo: 2-5%</li>
                      <li>• ⚠️ Nunca más del 5% por operación</li>
                    </>
                  )}
                </ul>
              </div>
            </>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t border-slate-800">
            {config?.enabled && (
              <Button
                variant="outline"
                onClick={handleDisable}
                className="border-slate-700 hover:border-red-400 hover:text-red-400"
              >
                Desactivar SL
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-700 hover:border-orange-400 hover:text-orange-400"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!enabled}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 disabled:opacity-50"
            >
              Guardar Stop Loss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

