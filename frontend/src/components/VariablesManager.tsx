import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Plus, Variable, TrendingUp, Settings2 } from 'lucide-react'
import { StrategyVariable, createDefaultVariable } from '@/types/variables'

interface VariablesManagerProps {
  variables: StrategyVariable[]
  onChange: (variables: StrategyVariable[]) => void
}

/**
 * Componente para gestionar las variables de la estrategia
 * Permite crear hasta 10 variables con configuración de optimización
 */
export default function VariablesManager({ variables, onChange }: VariablesManagerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const addVariable = () => {
    if (variables.length >= 10) return
    
    const newVar = createDefaultVariable(variables.length + 1)
    onChange([...variables, newVar])
  }

  const updateVariable = (index: number, updates: Partial<StrategyVariable>) => {
    const newVars = variables.map((v, i) => i === index ? { ...v, ...updates } : v)
    onChange(newVars)
  }

  const deleteVariable = (index: number) => {
    onChange(variables.filter((_, i) => i !== index))
  }

  const enabledCount = variables.filter(v => v.enabled).length

  return (
    <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center justify-between hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Variable className="h-4 w-4 text-orange-400" />
              <CardTitle className="text-xs font-medium text-muted-foreground">Variables de Estrategia</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {enabledCount > 0 && (
                <span className="text-sm font-semibold text-orange-400">
                  {enabledCount} activas
                </span>
              )}
              <span className="text-xs text-muted-foreground">{isExpanded ? '▼' : '▶'}</span>
            </div>
          </button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          {/* Lista de variables */}
          {variables.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {variables.map((variable, index) => (
                <div
                  key={variable.id}
                  className={`bg-slate-50 dark:bg-background/50 rounded-lg p-3 space-y-3 border ${
                    variable.enabled ? 'border-orange-500/30' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {/* Header de variable */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={variable.enabled}
                      onChange={(e) => updateVariable(index, { enabled: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 text-orange-500 focus:ring-orange-500"
                    />
                    <span className={`font-mono font-bold ${variable.enabled ? 'text-orange-400' : 'text-slate-500'}`}>
                      {variable.name}
                    </span>
                    <input
                      type="text"
                      value={variable.description || ''}
                      onChange={(e) => updateVariable(index, { description: e.target.value })}
                      placeholder="Descripción..."
                      className="flex-1 bg-transparent border-none text-xs text-slate-500 dark:text-slate-400 focus:outline-none focus:text-gray-900 dark:focus:text-foreground"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteVariable(index)}
                      className="h-7 text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Valor actual */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Valor Actual</label>
                      <input
                        type="number"
                        value={variable.value}
                        onChange={(e) => updateVariable(index, { value: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm focus:border-orange-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Configuración de optimización */}
                  <details className="group">
                    <summary className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer hover:text-orange-400 transition-colors">
                      <Settings2 className="h-3 w-3" />
                      Configuración de Optimización
                    </summary>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Mínimo</label>
                        <input
                          type="number"
                          value={variable.min || 0}
                          onChange={(e) => updateVariable(index, { min: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs focus:border-orange-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Máximo</label>
                        <input
                          type="number"
                          value={variable.max || 100}
                          onChange={(e) => updateVariable(index, { max: parseFloat(e.target.value) || 100 })}
                          className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs focus:border-orange-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Paso</label>
                        <input
                          type="number"
                          value={variable.step || 1}
                          onChange={(e) => updateVariable(index, { step: parseFloat(e.target.value) || 1 })}
                          className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs focus:border-orange-400 focus:outline-none"
                          step="0.1"
                        />
                      </div>
                    </div>
                    {variable.min !== undefined && variable.max !== undefined && variable.step !== undefined && (
                      <div className="mt-2 text-xs text-slate-500">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {Math.floor((variable.max - variable.min) / variable.step) + 1} valores posibles
                      </div>
                    )}
                  </details>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground py-4">
              No hay variables definidas
            </p>
          )}

          {/* Botón añadir variable */}
          <Button
            onClick={addVariable}
            disabled={variables.length >= 10}
            variant="outline"
            size="sm"
            className="w-full border-slate-700 hover:border-orange-400 hover:text-orange-400"
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir Variable {variables.length < 10 && `(${variables.length}/10)`}
          </Button>

          {/* Info sobre optimización */}
          {enabledCount > 0 && (
            <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-lg p-3 text-xs space-y-1">
              <p className="font-medium text-orange-400">💡 Optimización Activada</p>
              <p className="text-slate-400">
                Con {enabledCount} variable{enabledCount > 1 ? 's' : ''} activa{enabledCount > 1 ? 's' : ''}, el backtest probará
                diferentes combinaciones para encontrar los mejores valores.
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

