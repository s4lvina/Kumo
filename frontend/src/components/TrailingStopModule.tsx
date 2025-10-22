import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, TrendingUp } from 'lucide-react'
import { TrailingStopConfig } from '@/types/strategy'
import { StrategyVariable, isVariableReference } from '@/types/variables'

interface TrailingStopModuleProps {
  config: TrailingStopConfig | undefined
  variables: StrategyVariable[]
  onConfigure: () => void
}

/**
 * Módulo independiente para Trailing Stop
 */
export default function TrailingStopModule({ config, variables, onConfigure }: TrailingStopModuleProps) {
  const formatValue = (value: any, label: string) => {
    if (isVariableReference(value)) {
      return `${value.variableName} (${variables.find(v => v.name === value.variableName)?.value || '?'})`
    }
    return `${value} ${label}`
  }

  return (
    <Card className={`border-2 transition-all ${
      config?.enabled 
        ? 'border-blue-500/50 bg-blue-500/5' 
        : 'border-slate-700 bg-surface'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Trailing Stop
            </span>
          </CardTitle>
          <Button
            onClick={onConfigure}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-center py-6 rounded-lg border ${
          config?.enabled 
            ? 'border-blue-500/30 bg-blue-500/10' 
            : 'border-slate-700/50 bg-slate-800/50'
        }`}>
          {config?.enabled ? (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Seguimiento activo:</p>
              <p className="text-xl font-bold text-blue-400">
                📊 {formatValue(config.distance, 'pips')}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Paso: {formatValue(config.step, 'pips')}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Sigue el precio cuando va a favor
              </p>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-2">📊 Trailing Stop no configurado</p>
              <p className="text-xs text-slate-500">
                Maximiza ganancias en tendencias fuertes
              </p>
            </div>
          )}
        </div>
        
        {config?.enabled && (isVariableReference(config.distance) || isVariableReference(config.step)) && (
          <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-400">
            🔢 Usando variables optimizables
          </div>
        )}
      </CardContent>
    </Card>
  )
}

