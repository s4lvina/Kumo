import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Zap } from 'lucide-react'
import { BreakevenConfig } from '@/types/strategy'
import { StrategyVariable, isVariableReference } from '@/types/variables'

interface BreakevenModuleProps {
  config: BreakevenConfig | undefined
  variables: StrategyVariable[]
  onConfigure: () => void
}

/**
 * Módulo independiente para Breakeven
 */
export default function BreakevenModule({ config, variables, onConfigure }: BreakevenModuleProps) {
  const formatValue = (value: any, label: string) => {
    if (isVariableReference(value)) {
      return `${value.variableName} (${variables.find(v => v.name === value.variableName)?.value || '?'})`
    }
    return `${value} ${label}`
  }

  return (
    <Card className={`border-2 transition-all ${
      config?.enabled 
        ? 'border-yellow-500/50 bg-yellow-500/5' 
        : 'border-slate-700 bg-surface'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Breakeven
            </span>
          </CardTitle>
          <Button
            onClick={onConfigure}
            size="sm"
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-center py-6 rounded-lg border ${
          config?.enabled 
            ? 'border-yellow-500/30 bg-yellow-500/10' 
            : 'border-slate-700/50 bg-slate-800/50'
        }`}>
          {config?.enabled ? (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Activación configurada:</p>
              <p className="text-xl font-bold text-yellow-400">
                ⚡ {formatValue(config.trigger, 'pips')}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Offset: +{formatValue(config.offset, 'pips')}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Mueve SL a entrada cuando alcanza el trigger
              </p>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-2">⚡ Breakeven no configurado</p>
              <p className="text-xs text-slate-500">
                Protege operaciones ganadoras automáticamente
              </p>
            </div>
          )}
        </div>
        
        {config?.enabled && (isVariableReference(config.trigger) || isVariableReference(config.offset)) && (
          <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400">
            🔢 Usando variables optimizables
          </div>
        )}
      </CardContent>
    </Card>
  )
}

