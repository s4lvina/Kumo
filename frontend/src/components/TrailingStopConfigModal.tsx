import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, TrendingUp } from 'lucide-react'
import { TrailingStopConfig } from '@/types/strategy'
import { StrategyVariable, NumericValue } from '@/types/variables'
import NumericValueSelector from './NumericValueSelector'

interface TrailingStopConfigModalProps {
  config: TrailingStopConfig | undefined
  variables: StrategyVariable[]
  onSave: (config: TrailingStopConfig) => void
  onClose: () => void
}

/**
 * Modal para configurar Trailing Stop
 */
export default function TrailingStopConfigModal({
  config,
  variables,
  onSave,
  onClose
}: TrailingStopConfigModalProps) {
  const [enabled, setEnabled] = useState(config?.enabled ?? true)
  const [distance, setDistance] = useState<NumericValue>(config?.distance ?? 30)
  const [step, setStep] = useState<NumericValue>(config?.step ?? 10)

  const handleSave = () => {
    onSave({
      enabled,
      distance,
      step
    })
    onClose()
  }

  const handleDisable = () => {
    onSave({
      enabled: false,
      distance: 30,
      step: 10
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-surface border-blue-500/30">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Configurar Trailing Stop
                </span>
              </CardTitle>
              <CardDescription className="mt-2">
                Stop loss dinámico que sigue el precio cuando va a tu favor
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
              className="w-5 h-5 rounded border-slate-700 text-blue-500 focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {enabled ? '✅ Trailing Stop Activado' : '❌ Trailing Stop Desactivado'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {enabled 
                  ? 'El stop se moverá automáticamente siguiendo el precio favorable'
                  : 'El stop permanecerá fijo en su posición inicial'
                }
              </p>
            </div>
          </div>

          {enabled && (
            <>
              {/* Distancia */}
              <NumericValueSelector
                value={distance}
                onChange={setDistance}
                variables={variables}
                label="Distancia (pips)"
                min={1}
                max={1000}
                step={1}
              />

              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-medium text-foreground mb-1">💡 ¿Qué es la distancia?</p>
                <p>Es la separación en pips entre el precio actual y el trailing stop.</p>
                <p className="mt-1">Ejemplo: Con 30 pips, si el precio sube de 1.1000 a 1.1050, el stop se mueve de 1.0970 a 1.1020.</p>
              </div>

              {/* Paso */}
              <NumericValueSelector
                value={step}
                onChange={setStep}
                variables={variables}
                label="Paso (pips)"
                min={1}
                max={500}
                step={1}
              />

              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-medium text-foreground mb-1">💡 ¿Qué es el paso?</p>
                <p>Es cada cuántos pips se actualiza el trailing stop.</p>
                <p className="mt-1">Ejemplo: Con paso de 10 pips, el stop solo se mueve cuando el precio avanza 10 pips o más.</p>
              </div>

              {/* Vista previa */}
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
                <p className="text-xl font-bold text-blue-400">
                  📊 Trailing Stop: {typeof distance === 'object' ? distance.variableName : distance} pips
                </p>
                <p className="text-sm text-cyan-400 mt-1">
                  Paso: {typeof step === 'object' ? step.variableName : step} pips
                </p>
              </div>

              {/* Ejemplo visual */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-xs">
                <p className="font-medium text-foreground mb-2">📈 Ejemplo de funcionamiento:</p>
                <div className="space-y-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">↗️</span>
                    <span>Entrada en 1.1000, SL inicial en 1.0970 (30 pips)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">↗️</span>
                    <span>Precio sube a 1.1030 → SL se mueve a 1.1000 (mantiene 30 pips)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">↗️</span>
                    <span>Precio sube a 1.1050 → SL se mueve a 1.1020</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">↘️</span>
                    <span>Precio baja a 1.1040 → SL se mantiene en 1.1020 (no retrocede)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">↘️</span>
                    <span>Precio baja a 1.1020 → SL ejecutado, ganancia de +20 pips</span>
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-sm">
                <p className="font-medium text-blue-400 mb-2">💡 Recomendaciones:</p>
                <ul className="text-slate-400 space-y-1 text-xs">
                  <li>✅ Úsalo en tendencias fuertes y claras</li>
                  <li>✅ Distancia típica: 20-50 pips para day trading</li>
                  <li>✅ Paso menor = más ajustado (más riesgo de salida prematura)</li>
                  <li>✅ Paso mayor = más espacio (deja correr más la operación)</li>
                  <li>❌ No usar en mercados laterales (choppy)</li>
                  <li>❌ No usar con distancia muy ajustada (ruido del mercado)</li>
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
                className="border-slate-700 hover:border-blue-400 hover:text-blue-400"
              >
                Desactivar
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
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50"
            >
              Guardar Trailing Stop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

