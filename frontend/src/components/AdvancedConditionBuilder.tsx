import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Settings, Zap } from 'lucide-react'
import { CONDITIONS, LOGICAL_OPERATORS, VALUE_TYPES, VALUE_TYPES_BY_CATEGORY } from '@/data/conditions'
import { INDICATOR_CATEGORIES } from '@/data/indicators'
import { getDefaultParameters, generateIndicatorLabel } from '@/data/indicatorDefaults'
import { StrategyRule } from '@/types/strategy'
import { StrategyVariable } from '@/types/variables'

interface AdvancedConditionBuilderProps {
  rules: StrategyRule[]
  variables: StrategyVariable[]
  onRulesChange: (rules: StrategyRule[]) => void
}

/**
 * Constructor avanzado de condiciones que soporta:
 * - Indicadores técnicos
 * - Valores de mercado (precios, volumen)
 * - Estados de posición
 * - Condiciones de tiempo
 * - Operadores lógicos AND/OR
 * - Variables personalizadas
 */
export default function AdvancedConditionBuilder({ 
  rules, 
  variables, 
  onRulesChange 
}: AdvancedConditionBuilderProps) {
  const [editingRule, setEditingRule] = useState<string | null>(null)

  const addNewRule = () => {
    const newRule: StrategyRule = {
      id: `rule_${Date.now()}`,
      valueType: 'market_value',
      marketValue: 'close_price',
      condition: 'greater_than',
      comparisonValue: {
        type: 'number',
        numericValue: 0
      }
    }
    onRulesChange([...rules, newRule])
    setEditingRule(newRule.id)
  }

  const updateRule = (ruleId: string, updates: Partial<StrategyRule>) => {
    const updatedRules = rules.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    )
    onRulesChange(updatedRules)
  }

  const deleteRule = (ruleId: string) => {
    onRulesChange(rules.filter(rule => rule.id !== ruleId))
    setEditingRule(null)
  }

  const getValueTypeOptions = (valueType: string) => {
    switch (valueType) {
      case 'market_value':
        return [
          ...VALUE_TYPES_BY_CATEGORY.price,
          ...VALUE_TYPES_BY_CATEGORY.volume
        ]
      case 'position_state':
        return VALUE_TYPES_BY_CATEGORY.position
      case 'time_condition':
        return VALUE_TYPES_BY_CATEGORY.time
      case 'indicator':
        return [] // Los indicadores se manejan por separado
      default:
        return []
    }
  }

  const getConditionOptions = (valueType: string, selectedValue?: string) => {
    // Para indicadores técnicos, mostrar todas las condiciones
    if (valueType === 'indicator') {
      return CONDITIONS
    }
    
    const valueTypeData = VALUE_TYPES.find(v => v.value === selectedValue)
    
    // Para valores booleanos, solo mostrar condiciones de verdadero/falso
    if (valueTypeData?.unit === 'booleano') {
      return CONDITIONS.filter(c => ['is_true', 'is_false'].includes(c.value))
    }
    
    // Para valores numéricos, mostrar todas las condiciones
    return CONDITIONS
  }

  const renderRuleEditor = (rule: StrategyRule) => {
    const valueTypeOptions = [
      { value: 'market_value', label: 'Valor de Mercado', icon: '📊' },
      { value: 'position_state', label: 'Estado de Posición', icon: '💼' },
      { value: 'time_condition', label: 'Condición de Tiempo', icon: '⏰' },
      { value: 'indicator', label: 'Indicador Técnico', icon: '📈' }
    ]

    const availableValues = getValueTypeOptions(rule.valueType)
    const availableConditions = getConditionOptions(rule.valueType, rule.marketValue || rule.positionState || rule.timeCondition)

    return (
      <Card className="border-2 border-orange-500/50 bg-orange-500/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-400" />
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                Configurar Condición
              </span>
            </CardTitle>
            <Button
              onClick={() => setEditingRule(null)}
              size="sm"
              variant="outline"
              className="border-orange-500/50 hover:bg-orange-500/10"
            >
              Cerrar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tipo de valor */}
          <div>
            <Label className="text-sm font-medium text-orange-400">Tipo de Valor</Label>
            <Select
              value={rule.valueType}
              onValueChange={(value) => updateRule(rule.id, { 
                valueType: value as any,
                marketValue: undefined,
                positionState: undefined,
                timeCondition: undefined,
                indicator: undefined
              })}
            >
              <SelectTrigger className="mt-1 border-orange-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {valueTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valor específico */}
          {rule.valueType === 'indicator' ? (
            <div>
              <Label className="text-sm font-medium text-orange-400">Indicador Técnico</Label>
              <Select
                value={rule.indicator?.indicator || ''}
                onValueChange={(value) => {
                  const defaultParams = getDefaultParameters(value)
                  updateRule(rule.id, {
                    indicator: {
                      indicator: value,
                      parameters: defaultParams,
                      label: generateIndicatorLabel(value, defaultParams)
                    }
                  })
                }}
              >
                <SelectTrigger className="mt-1 border-orange-500/50">
                  <SelectValue placeholder="Seleccionar indicador..." />
                </SelectTrigger>
                <SelectContent>
                  {INDICATOR_CATEGORIES.map(category => (
                    <div key={category.name}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        {category.name}
                      </div>
                      {category.indicators.map(indicator => (
                        <SelectItem key={indicator.value} value={indicator.value}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">📈</span>
                            <div className="flex flex-col">
                              <span className="font-medium">{indicator.label}</span>
                              <span className="text-xs text-muted-foreground">{indicator.description}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              {rule.indicator && (
                <p className="text-xs text-muted-foreground mt-1">
                  {rule.indicator.label}
                </p>
              )}
            </div>
          ) : (
            <div>
              <Label className="text-sm font-medium text-orange-400">
                {rule.valueType === 'market_value' && 'Valor de Mercado'}
                {rule.valueType === 'position_state' && 'Estado de Posición'}
                {rule.valueType === 'time_condition' && 'Condición de Tiempo'}
              </Label>
              <Select
                value={rule.marketValue || rule.positionState || rule.timeCondition || ''}
                onValueChange={(value) => {
                  const updates: any = {}
                  if (rule.valueType === 'market_value') updates.marketValue = value
                  if (rule.valueType === 'position_state') updates.positionState = value
                  if (rule.valueType === 'time_condition') updates.timeCondition = value
                  updateRule(rule.id, updates)
                }}
              >
                <SelectTrigger className="mt-1 border-orange-500/50">
                  <SelectValue placeholder="Seleccionar valor..." />
                </SelectTrigger>
                <SelectContent>
                  {availableValues.map(value => (
                    <SelectItem key={value.value} value={value.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{value.label}</span>
                        <span className="text-xs text-muted-foreground">{value.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Condición */}
          <div>
            <Label className="text-sm font-medium text-orange-400">Condición</Label>
            <Select
              value={rule.condition}
              onValueChange={(value) => updateRule(rule.id, { condition: value })}
            >
              <SelectTrigger className="mt-1 border-orange-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableConditions.map(condition => (
                  <SelectItem key={condition.value} value={condition.value}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{condition.symbol}</span>
                      <span>{condition.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valor de comparación */}
          <div>
            <Label className="text-sm font-medium text-orange-400">Valor de Comparación</Label>
            <div className="flex gap-2 mt-1">
              <Select
                value={rule.comparisonValue.type}
                onValueChange={(value) => updateRule(rule.id, { 
                  comparisonValue: { 
                    ...rule.comparisonValue, 
                    type: value as any,
                    numericValue: value === 'number' ? 0 : undefined,
                    variableReference: value === 'variable' ? { variableName: '' } : undefined,
                    indicatorValue: value === 'indicator' ? { indicator: '', parameters: {} } : undefined,
                    marketValue: value === 'market_value' ? '' : undefined
                  }
                })}
              >
                <SelectTrigger className="border-orange-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="variable">Variable</SelectItem>
                  <SelectItem value="indicator">Indicador</SelectItem>
                  <SelectItem value="market_value">Valor de Mercado</SelectItem>
                </SelectContent>
              </Select>

              {rule.comparisonValue.type === 'number' && (
                <Input
                  type="number"
                  value={rule.comparisonValue.numericValue || 0}
                  onChange={(e) => updateRule(rule.id, {
                    comparisonValue: {
                      ...rule.comparisonValue,
                      numericValue: parseFloat(e.target.value) || 0
                    }
                  })}
                  className="border-orange-500/50"
                  placeholder="Valor numérico"
                />
              )}

              {rule.comparisonValue.type === 'variable' && (
                <Select
                  value={rule.comparisonValue.variableReference?.variableName || ''}
                  onValueChange={(value) => updateRule(rule.id, {
                    comparisonValue: {
                      ...rule.comparisonValue,
                      variableReference: { 
                        type: 'variable',
                        variableId: value,
                        variableName: value 
                      }
                    }
                  })}
                >
                  <SelectTrigger className="border-orange-500/50">
                    <SelectValue placeholder="Seleccionar variable..." />
                  </SelectTrigger>
                  <SelectContent>
                    {variables.map(variable => (
                      <SelectItem key={variable.name} value={variable.name}>
                        {variable.name} = {variable.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Operador lógico */}
          {rules.length > 1 && (
            <div>
              <Label className="text-sm font-medium text-orange-400">Operador Lógico</Label>
              <Select
                value={rule.logicalOperator || 'and'}
                onValueChange={(value) => updateRule(rule.id, { logicalOperator: value as 'and' | 'or' })}
              >
                <SelectTrigger className="mt-1 border-orange-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOGICAL_OPERATORS.map(op => (
                    <SelectItem key={op.value} value={op.value}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{op.symbol}</span>
                        <span>{op.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => setEditingRule(null)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              <Zap className="h-4 w-4 mr-2" />
              Guardar Condición
            </Button>
            <Button
              onClick={() => deleteRule(rule.id)}
              variant="outline"
              className="border-red-500/50 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderRuleSummary = (rule: StrategyRule, index: number) => {
    const getValueLabel = () => {
      if (rule.valueType === 'market_value' && rule.marketValue) {
        const valueData = VALUE_TYPES.find(v => v.value === rule.marketValue)
        return valueData?.label || rule.marketValue
      }
      if (rule.valueType === 'position_state' && rule.positionState) {
        const valueData = VALUE_TYPES.find(v => v.value === rule.positionState)
        return valueData?.label || rule.positionState
      }
      if (rule.valueType === 'time_condition' && rule.timeCondition) {
        const valueData = VALUE_TYPES.find(v => v.value === rule.timeCondition)
        return valueData?.label || rule.timeCondition
      }
      if (rule.valueType === 'indicator' && rule.indicator) {
        return rule.indicator.label || `${rule.indicator.indicator}(${rule.indicator.parameters.period || ''})`
      }
      return 'No configurado'
    }

    const getConditionLabel = () => {
      const condition = CONDITIONS.find(c => c.value === rule.condition)
      return condition?.symbol || rule.condition
    }

    const getComparisonLabel = () => {
      if (rule.comparisonValue.type === 'number') {
        return rule.comparisonValue.numericValue?.toString() || '0'
      }
      if (rule.comparisonValue.type === 'variable' && rule.comparisonValue.variableReference) {
        const variable = variables.find(v => v.name === rule.comparisonValue.variableReference?.variableName)
        return `${rule.comparisonValue.variableReference.variableName} (${variable?.value || '?'})`
      }
      if (rule.comparisonValue.type === 'market_value' && rule.comparisonValue.marketValue) {
        const valueData = VALUE_TYPES.find(v => v.value === rule.comparisonValue.marketValue)
        return valueData?.label || rule.comparisonValue.marketValue
      }
      return 'No configurado'
    }

    return (
      <Card 
        key={rule.id}
        className={`border-2 transition-all cursor-pointer hover:border-orange-500/50 ${
          editingRule === rule.id 
            ? 'border-orange-500/50 bg-orange-500/5' 
            : 'border-slate-700 bg-surface'
        }`}
        onClick={() => setEditingRule(rule.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                {index + 1}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="font-medium text-orange-400">{getValueLabel()}</span>
                <span className="text-lg text-slate-400">{getConditionLabel()}</span>
                <span className="font-medium text-slate-300">{getComparisonLabel()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {rule.logicalOperator && (
                <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                  {LOGICAL_OPERATORS.find(op => op.value === rule.logicalOperator)?.symbol} {rule.logicalOperator.toUpperCase()}
                </Badge>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditingRule(rule.id)
                }}
                className="text-orange-400 hover:text-orange-300"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Condiciones de Estrategia</h3>
          <p className="text-sm text-muted-foreground">
            Construye condiciones complejas usando indicadores, precios, estados de posición y tiempo
          </p>
        </div>
        <Button
          onClick={addNewRule}
          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir Condición
        </Button>
      </div>

      <div className="space-y-3">
        {rules.map((rule, index) => (
          <div key={rule.id}>
            {editingRule === rule.id ? renderRuleEditor(rule) : renderRuleSummary(rule, index)}
          </div>
        ))}
        
        {rules.length === 0 && (
          <Card className="border-2 border-dashed border-slate-700 bg-slate-800/50">
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground mb-4">
                <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-lg font-medium">No hay condiciones configuradas</p>
                <p className="text-sm">Añade condiciones para definir cuándo ejecutar acciones</p>
              </div>
              <Button
                onClick={addNewRule}
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Condición
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
