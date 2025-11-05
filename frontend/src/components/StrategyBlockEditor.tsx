import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Settings, Play, ChevronDown, ChevronRight, Code2 } from 'lucide-react'
import { StrategyBlock, StrategyRule, StrategyAction } from '@/types/strategy'
import { StrategyVariable } from '@/types/variables'
import SimpleConditionBuilder from './SimpleConditionBuilder'
import StrategyActionConfigModal from './StrategyActionConfigModal'

interface StrategyBlockEditorProps {
  block: StrategyBlock
  blockType: 'entry' | 'exit'
  variables: StrategyVariable[]
  onUpdate: (updatedBlock: StrategyBlock) => void
  onDelete: () => void
}

/**
 * Editor para bloques de estrategia (entrada/salida)
 * Integra el constructor avanzado de condiciones
 */
export default function StrategyBlockEditor({ 
  block, 
  blockType, 
  variables, 
  onUpdate, 
  onDelete 
}: StrategyBlockEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [editingAction, setEditingAction] = useState<string | null>(null)

  const updateRules = (rules: StrategyRule[]) => {
    onUpdate({ ...block, rules })
  }

  const addAction = () => {
    const newAction: StrategyAction = {
      id: `action-${Date.now()}`,
      action: 'buy_market',
      parameters: {}
    }
    onUpdate({ ...block, actions: [...block.actions, newAction] })
    setEditingAction(newAction.id)
  }

  const updateAction = (actionId: string, updates: Partial<StrategyAction>) => {
    const updatedActions = block.actions.map(action =>
      action.id === actionId ? { ...action, ...updates } : action
    )
    onUpdate({ ...block, actions: updatedActions })
  }

  const deleteAction = (actionId: string) => {
    const updatedActions = block.actions.filter(action => action.id !== actionId)
    onUpdate({ ...block, actions: updatedActions })
    setEditingAction(null)
  }

  const getBlockIcon = () => {
    return blockType === 'entry' ? '📈' : '📉'
  }

  const getBlockColor = () => {
    return blockType === 'entry' ? 'green' : 'red'
  }

  const getBlockGradient = () => {
    return blockType === 'entry' 
      ? 'from-green-400 to-emerald-500' 
      : 'from-red-400 to-orange-500'
  }

  return (
    <Card className={`border-2 transition-all ${
      block.enabled 
        ? `border-${getBlockColor()}-500/50 bg-${getBlockColor()}-500/5` 
        : 'border-slate-700 bg-surface'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-6 w-6"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">{getBlockIcon()}</span>
              <span className={`bg-gradient-to-r ${getBlockGradient()} bg-clip-text text-transparent`}>
                {block.name}
              </span>
              <Badge 
                variant="outline" 
                className={`border-${getBlockColor()}-500/50 text-${getBlockColor()}-400`}
              >
                {blockType === 'entry' ? 'ENTRADA' : 'SALIDA'}
              </Badge>
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onUpdate({ ...block, enabled: !block.enabled })}
              size="sm"
              variant={block.enabled ? "default" : "outline"}
              className={block.enabled 
                ? `bg-gradient-to-r from-${getBlockColor()}-500 to-${getBlockColor()}-600 hover:from-${getBlockColor()}-600 hover:to-${getBlockColor()}-700`
                : `border-${getBlockColor()}-500/50 hover:bg-${getBlockColor()}-500/10`
              }
            >
              <Play className="h-4 w-4 mr-2" />
              {block.enabled ? 'Activo' : 'Inactivo'}
            </Button>
            <Button
              onClick={onDelete}
              size="sm"
              variant="outline"
              className="border-red-500/50 hover:bg-red-500/10 text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Nombre del bloque */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Nombre del Bloque
            </label>
            <Input
              value={block.name}
              onChange={(e) => onUpdate({ ...block, name: e.target.value })}
              placeholder="Ej: Entrada RSI Oversold"
              className="border-slate-700 bg-slate-800/50"
            />
          </div>

          {/* Constructor de condiciones */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-semibold text-white">Condiciones</h4>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                {block.rules.length} condición{block.rules.length !== 1 ? 'es' : ''}
              </Badge>
            </div>
            <SimpleConditionBuilder
              rules={block.rules}
              variables={variables}
              onRulesChange={updateRules}
            />
          </div>

          {/* Acciones */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-semibold text-white">Acciones</h4>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                  {block.actions.length} acción{block.actions.length !== 1 ? 'es' : ''}
                </Badge>
                <Button
                  onClick={addAction}
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Acción
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {block.actions.map((action, index) => (
                <Card key={action.id} className="border-slate-700 bg-slate-800/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-medium text-white">{action.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {action.parameters && Object.keys(action.parameters).length > 0 
                              ? `${Object.keys(action.parameters).length} parámetros`
                              : 'Sin parámetros'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setEditingAction(action.id)}
                          size="sm"
                          variant="outline"
                          className="border-purple-500/50 hover:bg-purple-500/10"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteAction(action.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {block.actions.length === 0 && (
                <Card className="border-2 border-dashed border-slate-700 bg-slate-800/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-muted-foreground mb-4">
                      <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No hay acciones configuradas</p>
                      <p className="text-xs">Añade acciones para ejecutar cuando se cumplan las condiciones</p>
                    </div>
                    <Button
                      onClick={addAction}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Primera Acción
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      )}

      {/* Modal de configuración de acción */}
      {editingAction && block.actions.find(a => a.id === editingAction) && (
        <StrategyActionConfigModal
          action={block.actions.find(a => a.id === editingAction)}
          variables={variables}
          onSave={(updatedAction) => {
            updateAction(editingAction, updatedAction)
            setEditingAction(null)
          }}
          onCancel={() => setEditingAction(null)}
        />
      )}
    </Card>
  )
}
