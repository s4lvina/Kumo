import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Settings } from 'lucide-react'
import { StrategyAction, ActionParameters } from '@/types/strategy'
import { StrategyVariable } from '@/types/variables'
import { ACTION_CATEGORIES, getAllActions } from '@/data/actions'
import NumericValueSelector from './NumericValueSelector'

interface StrategyActionConfigModalProps {
  action: StrategyAction | undefined
  variables: StrategyVariable[]
  onSave: (updatedAction: StrategyAction) => void
  onCancel: () => void
}

/**
 * Modal para configurar acciones de estrategia
 */
export default function StrategyActionConfigModal({
  action,
  variables,
  onSave,
  onCancel
}: StrategyActionConfigModalProps) {
  const [selectedActionType, setSelectedActionType] = useState(action?.action || 'buy_market')
  const [parameters, setParameters] = useState<ActionParameters>(action?.parameters || {})
  const [isLoading, setIsLoading] = useState(false)

  const allActions = getAllActions()
  const selectedAction = allActions.find(a => a.value === selectedActionType)

  useEffect(() => {
    if (action) {
      setSelectedActionType(action.action)
      setParameters(action.parameters || {})
    }
  }, [action])

  const handleSave = async () => {
    if (!action) return

    setIsLoading(true)
    
    const updatedAction: StrategyAction = {
      ...action,
      action: selectedActionType,
      parameters
    }

    try {
      await onSave(updatedAction)
    } finally {
      setIsLoading(false)
    }
  }

  const updateParameter = (key: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const renderParameterInput = (paramKey: string, paramConfig: any) => {
    const value = parameters[paramKey] || paramConfig.defaultValue

    switch (paramConfig.type) {
      case 'number':
        return (
          <NumericValueSelector
            value={value}
            onChange={(newValue) => updateParameter(paramKey, newValue)}
            variables={variables}
            min={paramConfig.min}
            max={paramConfig.max}
            step={paramConfig.step}
          />
        )
      
      case 'select':
        return (
          <Select
            value={value || paramConfig.defaultValue}
            onValueChange={(newValue) => updateParameter(paramKey, newValue)}
          >
            <SelectTrigger className="border-orange-500/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {paramConfig.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case 'boolean':
        return (
          <Select
            value={value ? 'true' : 'false'}
            onValueChange={(newValue) => updateParameter(paramKey, newValue === 'true')}
          >
            <SelectTrigger className="border-orange-500/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Sí</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        )
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateParameter(paramKey, e.target.value)}
            className="border-orange-500/50"
            placeholder={paramConfig.placeholder || ''}
          />
        )
    }
  }

  if (!action) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-2 border-orange-500/50 bg-surface">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-400" />
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                Configurar Acción
              </span>
            </CardTitle>
            <Button
              onClick={onCancel}
              size="sm"
              variant="ghost"
              className="text-slate-400 hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tipo de acción */}
          <div>
            <Label className="text-sm font-medium text-orange-400">Tipo de Acción</Label>
            <Select
              value={selectedActionType}
              onValueChange={setSelectedActionType}
            >
              <SelectTrigger className="mt-1 border-orange-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACTION_CATEGORIES.map(category => (
                  <div key={category.value}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      {category.name}
                    </div>
                    {category.actions.map(action => (
                      <SelectItem key={action.value} value={action.value}>
                        <div className="flex items-center gap-2">
                          <span>{action.icon}</span>
                          <span>{action.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
            {selectedAction && (
              <p className="text-xs text-muted-foreground mt-1">
                {selectedAction.description}
              </p>
            )}
          </div>

          {/* Parámetros de la acción */}
          {selectedAction?.parameters && selectedAction.parameters.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-orange-400">Parámetros</Label>
              <div className="space-y-4 mt-2">
                {selectedAction.parameters.map(param => (
                  <div key={param.key}>
                    <Label className="text-sm text-slate-300 mb-1 block">
                      {param.label}
                      {param.required && <span className="text-red-400 ml-1">*</span>}
                    </Label>
                    {renderParameterInput(param.key, param)}
                    {param.unit && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Unidad: {param.unit}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              {isLoading ? 'Guardando...' : 'Guardar Acción'}
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="border-slate-500/50 hover:bg-slate-500/10"
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
