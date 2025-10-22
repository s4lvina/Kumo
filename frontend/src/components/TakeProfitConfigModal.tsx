import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Target } from 'lucide-react'
import { TakeProfitConfig } from '@/types/strategy'
import { StrategyVariable, NumericValue } from '@/types/variables'
import NumericValueSelector from './NumericValueSelector'

interface TakeProfitConfigModalProps {
  config: TakeProfitConfig | undefined
  variables: StrategyVariable[]
  onSave: (config: TakeProfitConfig) => void
  onClose: () => void
}

/**
 * Modal para configurar Take Profit
 */
export default function TakeProfitConfigModal({
  config,
  variables,
  onSave,
  onClose
}: TakeProfitConfigModalProps) {
  const [enabled, setEnabled] = useState(config?.enabled ?? true)
  const [type, setType] = useState<'pips' | 'points' | 'percentage' | 'price' | 'ratio'>(
    config?.type ?? 'pips'
  )
  const [value, setValue] = useState<NumericValue>(config?.value ?? 100)

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
      value: 100
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-surface border-green-500/30">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-6 w-6 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Configurar Take Profit
                </span>
              </CardTitle>
              <CardDescription className="mt-2">
                Asegura tus ganancias estableciendo un objetivo de cierre
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
              className="w-5 h-5 rounded border-slate-700 text-green-500 focus:ring-green-500"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {enabled ? '✅ Take Profit Activado' : '❌ Take Profit Desactivado'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {enabled 
                  ? 'El take profit se aplicará a todas las operaciones'
                  : 'Sin TP, necesitas condiciones de salida manuales'
                }
              </p>
            </div>
          </div>

          {enabled && (
            <>
              {/* Tipo de Take Profit */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Tipo de Take Profit
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-green-400 focus:outline-none transition-colors"
                >
                  <option value="pips">Pips (distancia en pips)</option>
                  <option value="points">Puntos (distancia en puntos)</option>
                  <option value="percentage">Porcentaje (% de ganancia)</option>
                  <option value="price">Precio Absoluto (nivel de precio)</option>
                  <option value="ratio">Risk/Reward Ratio (multiplicador del SL)</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  {type === 'pips' && '💡 Recomendado para Forex. Ejemplo: 100 pips = 0.0100'}
                  {type === 'points' && '💡 Recomendado para índices y acciones'}
                  {type === 'percentage' && '💡 Porcentaje de ganancia sobre el capital o precio'}
                  {type === 'price' && '💡 Nivel de precio específico para el objetivo'}
                  {type === 'ratio' && '💡 Múltiplo del Stop Loss. Ej: 2 = TP es 2× el SL'}
                </p>
              </div>

              {/* Valor */}
              <NumericValueSelector
                value={value}
                onChange={setValue}
                variables={variables}
                label={type === 'ratio' ? 'Ratio (multiplicador)' : `Objetivo (${type})`}
                min={type === 'ratio' ? 0.5 : type === 'percentage' ? 0.1 : 1}
                max={type === 'ratio' ? 10 : type === 'percentage' ? 100 : 10000}
                step={type === 'ratio' ? 0.1 : type === 'percentage' ? 0.5 : 1}
              />

              {/* Vista previa */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
                <p className="text-xl font-bold text-green-400">
                  🎯 Take Profit: {typeof value === 'object' ? value.variableName : value} {type === 'ratio' ? 'R/R' : type}
                </p>
              </div>

              {/* Ejemplos según el tipo */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm">
                <p className="font-medium text-foreground mb-2">💡 Ejemplos recomendados:</p>
                <ul className="text-slate-400 space-y-1 text-xs">
                  {type === 'pips' && (
                    <>
                      <li>• Scalping: 5-20 pips</li>
                      <li>• Day Trading: 30-100 pips</li>
                      <li>• Swing Trading: 100-300 pips</li>
                      <li>• Position Trading: 300-1000 pips</li>
                    </>
                  )}
                  {type === 'ratio' && (
                    <>
                      <li>• 1:1 - Conservador (50% winrate necesario)</li>
                      <li>• 1:1.5 - Equilibrado (40% winrate necesario)</li>
                      <li>• 1:2 - Estándar (33% winrate necesario) ⭐</li>
                      <li>• 1:3 - Agresivo (25% winrate necesario)</li>
                      <li>• 1:5+ - Muy agresivo (20% winrate necesario)</li>
                    </>
                  )}
                  {type === 'percentage' && (
                    <>
                      <li>• Conservador: 1-2%</li>
                      <li>• Moderado: 2-5%</li>
                      <li>• Agresivo: 5-10%</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Consejo Risk/Reward */}
              {type === 'ratio' && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs">
                  <p className="text-blue-400 font-medium">💎 Pro Tip: Risk/Reward Ratio</p>
                  <p className="text-slate-400 mt-1">
                    Un ratio 1:2 significa que si tu SL es 50 pips, tu TP será 100 pips.
                    Con este ratio, solo necesitas ganar 1 de cada 3 operaciones para ser rentable.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t border-slate-800">
            {config?.enabled && (
              <Button
                variant="outline"
                onClick={handleDisable}
                className="border-slate-700 hover:border-green-400 hover:text-green-400"
              >
                Desactivar TP
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
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
            >
              Guardar Take Profit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

