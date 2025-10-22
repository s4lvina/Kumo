import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Shield } from 'lucide-react'
import { StopLossConfig } from '@/types/strategy'
import { StrategyVariable, isVariableReference } from '@/types/variables'

interface StopLossModuleProps {
  config: StopLossConfig | undefined
  variables: StrategyVariable[]
  onConfigure: () => void
}

/**
 * Módulo independiente para gestión de Stop Loss
 */
export default function StopLossModule({ config, variables, onConfigure }: StopLossModuleProps) {
  const formatValue = () => {
    if (!config || !config.enabled) return 'No configurado'
    
    const value = isVariableReference(config.value) 
      ? config.value.variableName 
      : config.value
    
    const typeLabels = {
      pips: 'pips',
      points: 'puntos',
      percentage: '%',
      price: 'precio'
    }
    
    return `${value} ${typeLabels[config.type] || config.type}`
  }

  return (
    <Card className={`border-2 transition-all ${
      config?.enabled 
        ? 'border-red-500/50 bg-red-500/5' 
        : 'border-slate-700 bg-surface'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              Stop Loss
            </span>
          </CardTitle>
          <Button
            onClick={onConfigure}
            size="sm"
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-center py-6 rounded-lg border ${
          config?.enabled 
            ? 'border-red-500/30 bg-red-500/10' 
            : 'border-slate-700/50 bg-slate-800/50'
        }`}>
          {config?.enabled ? (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Protección activa:</p>
              <p className="text-2xl font-bold text-red-400">
                {formatValue()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {config.type === 'pips' && 'Distancia en pips desde entrada'}
                {config.type === 'points' && 'Distancia en puntos desde entrada'}
                {config.type === 'percentage' && 'Porcentaje de pérdida máxima'}
                {config.type === 'price' && 'Precio absoluto de stop'}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-2">⚠️ Stop Loss no configurado</p>
              <p className="text-xs text-slate-500">
                Click en "Configurar" para proteger tu capital
              </p>
            </div>
          )}
        </div>
        
        {config?.enabled && isVariableReference(config.value) && (() => {
          const varRef = config.value
          return (
            <div className="mt-3 p-2 bg-orange-500/10 border border-orange-500/30 rounded text-xs text-orange-400">
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

