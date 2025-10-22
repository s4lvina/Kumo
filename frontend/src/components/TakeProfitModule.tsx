import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Target } from 'lucide-react'
import { TakeProfitConfig } from '@/types/strategy'
import { StrategyVariable, isVariableReference } from '@/types/variables'

interface TakeProfitModuleProps {
  config: TakeProfitConfig | undefined
  variables: StrategyVariable[]
  onConfigure: () => void
}

/**
 * Módulo independiente para gestión de Take Profit
 */
export default function TakeProfitModule({ config, variables, onConfigure }: TakeProfitModuleProps) {
  const formatValue = () => {
    if (!config || !config.enabled) return 'No configurado'
    
    const value = isVariableReference(config.value) 
      ? config.value.variableName 
      : config.value
    
    const typeLabels = {
      pips: 'pips',
      points: 'puntos',
      percentage: '%',
      price: 'precio',
      ratio: 'R/R'
    }
    
    return `${value} ${typeLabels[config.type] || config.type}`
  }

  return (
    <Card className={`border-2 transition-all ${
      config?.enabled 
        ? 'border-green-500/50 bg-green-500/5' 
        : 'border-slate-700 bg-surface'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Take Profit
            </span>
          </CardTitle>
          <Button
            onClick={onConfigure}
            size="sm"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-center py-6 rounded-lg border ${
          config?.enabled 
            ? 'border-green-500/30 bg-green-500/10' 
            : 'border-slate-700/50 bg-slate-800/50'
        }`}>
          {config?.enabled ? (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Objetivo establecido:</p>
              <p className="text-2xl font-bold text-green-400">
                {formatValue()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {config.type === 'pips' && 'Distancia en pips desde entrada'}
                {config.type === 'points' && 'Distancia en puntos desde entrada'}
                {config.type === 'percentage' && 'Porcentaje de ganancia objetivo'}
                {config.type === 'price' && 'Precio absoluto de objetivo'}
                {config.type === 'ratio' && 'Ratio Risk/Reward (multiplicador del SL)'}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-2">💰 Take Profit no configurado</p>
              <p className="text-xs text-slate-500">
                Click en "Configurar" para asegurar ganancias
              </p>
            </div>
          )}
        </div>
        
        {config?.enabled && isVariableReference(config.value) && (() => {
          const varRef = config.value
          return (
            <div className="mt-3 p-2 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">
              🔢 Usando variable: {varRef.variableName} = {
                variables.find(v => v.name === varRef.variableName)?.value || '?'
              }
            </div>
          )
        })()}
      </CardContent>
    </Card>
  )
}

