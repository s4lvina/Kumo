import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Zap } from 'lucide-react'
import { BreakevenConfig } from '@/types/strategy'
import { StrategyVariable, NumericValue } from '@/types/variables'
import NumericValueSelector from './NumericValueSelector'

interface BreakevenConfigModalProps {
  config: BreakevenConfig | undefined
  variables: StrategyVariable[]
  onSave: (config: BreakevenConfig) => void
  onClose: () => void
}

/**
 * Modal para configurar Breakeven
 */
export default function BreakevenConfigModal({
  config,
  variables,
  onSave,
  onClose
}: BreakevenConfigModalProps) {
  const [enabled, setEnabled] = useState(config?.enabled ?? true)
  const [trigger, setTrigger] = useState<NumericValue>(config?.trigger ?? 20)
  const [offset, setOffset] = useState<NumericValue>(config?.offset ?? 5)

  const handleSave = () => {
    onSave({
      enabled,
      trigger,
      offset
    })
    onClose()
  }

  const handleDisable = () => {
    onSave({
      enabled: false,
      trigger: 20,
      offset: 5
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-surface border-yellow-500/30">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Configurar Breakeven
                </span>
              </CardTitle>
              <CardDescription className="mt-2">
                Mueve automáticamente el stop loss al punto de entrada cuando ganas X pips
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
              className="w-5 h-5 rounded border-slate-700 text-yellow-500 focus:ring-yellow-500"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {enabled ? '✅ Breakeven Activado' : '❌ Breakeven Desactivado'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {enabled 
                  ? 'El stop se moverá a breakeven cuando alcances el trigger'
                  : 'El stop permanecerá en su posición original'
                }
              </p>
            </div>
          </div>

          {enabled && (
            <>
              {/* Trigger */}
              <NumericValueSelector
                value={trigger}
                onChange={setTrigger}
                variables={variables}
                label="Trigger (pips en ganancia)"
                min={1}
                max={1000}
                step={1}
              />

              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-medium text-foreground mb-1">💡 ¿Qué es el trigger?</p>
                <p>Es cuántos pips debe ganar la operación para que se active el breakeven.</p>
                <p className="mt-1">Ejemplo: Con trigger de 20 pips, cuando la operación gane 20 pips, el SL se moverá automáticamente al precio de entrada.</p>
              </div>

              {/* Offset */}
              <NumericValueSelector
                value={offset}
                onChange={setOffset}
                variables={variables}
                label="Offset (pips adicionales)"
                min={0}
                max={100}
                step={1}
              />

              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-medium text-foreground mb-1">💡 ¿Qué es el offset?</p>
                <p>Son pips adicionales por encima del precio de entrada donde se coloca el stop.</p>
                <p className="mt-1">Ejemplo: Con offset de 5 pips, el SL no se coloca exactamente en entrada (0 pips), sino en entrada +5 pips (pequeña ganancia asegurada).</p>
              </div>

              {/* Vista previa */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
                <p className="text-xl font-bold text-yellow-400">
                  ⚡ Breakeven: Trigger {typeof trigger === 'object' ? trigger.variableName : trigger} pips
                </p>
                <p className="text-sm text-orange-400 mt-1">
                  Offset: +{typeof offset === 'object' ? offset.variableName : offset} pips
                </p>
              </div>

              {/* Ejemplo visual */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-xs">
                <p className="font-medium text-foreground mb-2">📈 Ejemplo de funcionamiento:</p>
                <div className="space-y-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📍</span>
                    <span>Entrada en 1.1000, SL inicial en 1.0950 (-50 pips)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">↗️</span>
                    <span>Precio sube a 1.1010 (ganancia: +10 pips) → SL sigue en 1.0950</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">↗️</span>
                    <span>Precio sube a 1.1020 (ganancia: +20 pips) → ⚡ TRIGGER ACTIVADO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⚡</span>
                    <span>SL se mueve a 1.1005 (entrada +5 pips offset)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Operación ahora es "risk-free" (mínimo +5 pips asegurados)</span>
                  </div>
                </div>
              </div>

              {/* Ventajas */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-sm">
                <p className="font-medium text-yellow-400 mb-2">💎 Ventajas del Breakeven:</p>
                <ul className="text-slate-400 space-y-1 text-xs">
                  <li>✅ Convierte operaciones en "risk-free" rápidamente</li>
                  <li>✅ Te permite dejar correr ganadores sin miedo</li>
                  <li>✅ Protege de reversiones bruscas después de ganancias iniciales</li>
                  <li>✅ Reduce el estrés emocional del trading</li>
                  <li>✅ Perfecto para day trading y scalping</li>
                </ul>
              </div>

              {/* Recomendaciones */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-sm">
                <p className="font-medium text-blue-400 mb-2">💡 Recomendaciones:</p>
                <ul className="text-slate-400 space-y-1 text-xs">
                  <li>• Trigger conservador: 30-50 pips (menos activaciones)</li>
                  <li>• Trigger agresivo: 10-20 pips (más activaciones)</li>
                  <li>• Offset típico: 3-10 pips (pequeña ganancia asegurada)</li>
                  <li>• Offset = 0 pips: Breakeven exacto (más riesgo de salida en ruido)</li>
                  <li>• Combina con Trailing Stop para máxima protección</li>
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
                className="border-slate-700 hover:border-yellow-400 hover:text-yellow-400"
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
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50"
            >
              Guardar Breakeven
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

