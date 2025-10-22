import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PenTool, Plus, Settings, Play, Trash2, ChevronDown, ChevronRight, Code2, Loader2, Save } from 'lucide-react'
import { INDICATOR_CATEGORIES } from '@/data/indicators'
import { CONDITIONS } from '@/data/conditions'
import { ACTION_CATEGORIES, Action } from '@/data/actions'
import { StrategyBlock, StrategyRule, StrategyAction, TIMEFRAMES, ConfiguredIndicator, ActionParameters, StopLossConfig, TakeProfitConfig, TrailingStopConfig, BreakevenConfig, PositionSizingConfig } from '@/types/strategy'
import { StrategyVariable, isVariableReference } from '@/types/variables'
import { getDefaultParameters, generateIndicatorLabel } from '@/data/indicatorDefaults'
import IndicatorConfigModal from '@/components/IndicatorConfigModal'
import ComparisonValueSelector from '@/components/ComparisonValueSelector'
import VariablesManager from '@/components/VariablesManager'
import ActionConfigModal from '@/components/ActionConfigModal'
import StopLossModule from '@/components/StopLossModule'
import TakeProfitModule from '@/components/TakeProfitModule'
import TrailingStopModule from '@/components/TrailingStopModule'
import BreakevenModule from '@/components/BreakevenModule'
import StopLossConfigModal from '@/components/StopLossConfigModal'
import TakeProfitConfigModal from '@/components/TakeProfitConfigModal'
import TrailingStopConfigModal from '@/components/TrailingStopConfigModal'
import BreakevenConfigModal from '@/components/BreakevenConfigModal'
import CodeViewer from '@/components/CodeViewer'
import PositionSizingConfigComponent from '@/components/PositionSizingConfig'
import { saveStrategy, updateStrategy, StoredStrategy } from '@/lib/strategyStorage'

/**
 * Página: Diseñador Manual
 * Permite crear estrategias de trading personalizadas
 */
export default function Designer() {
  const navigate = useNavigate()
  const [editingStrategyId, setEditingStrategyId] = useState<number | null>(null)
  const [strategyName, setStrategyName] = useState('Nueva Estrategia')
  const [timeframe, setTimeframe] = useState('1h')
  const [positionSizing, setPositionSizing] = useState<PositionSizingConfig>({
    type: 'fixed_lots',
    value: 0.1
  })
  const [variables, setVariables] = useState<StrategyVariable[]>([])
  const [entryBlocks, setEntryBlocks] = useState<StrategyBlock[]>([])
  const [exitBlocks, setExitBlocks] = useState<StrategyBlock[]>([])
  const [stopLoss, setStopLoss] = useState<StopLossConfig | undefined>(undefined)
  const [takeProfit, setTakeProfit] = useState<TakeProfitConfig | undefined>(undefined)
  const [trailingStop, setTrailingStop] = useState<TrailingStopConfig | undefined>(undefined)
  const [breakeven, setBreakeven] = useState<BreakevenConfig | undefined>(undefined)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Osciladores'])
  const [isSaving, setIsSaving] = useState(false)
  
  const [configuringIndicator, setConfiguringIndicator] = useState<{
    blockId: string
    ruleId: string
    indicator: ConfiguredIndicator
  } | null>(null)
  
  const [configuringAction, setConfiguringAction] = useState<{
    blockId: string
    actionId: string
    action: Action
    currentParams: ActionParameters
  } | null>(null)
  
  const [configuringStopLoss, setConfiguringStopLoss] = useState(false)
  const [configuringTakeProfit, setConfiguringTakeProfit] = useState(false)
  const [configuringTrailingStop, setConfiguringTrailingStop] = useState(false)
  const [configuringBreakeven, setConfiguringBreakeven] = useState(false)
  
  // Estado para generación de código
  const [generatedCode, setGeneratedCode] = useState<{
    code: string
    language: string
    filename: string
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Cargar estrategia si se está editando O plantilla si se está usando
  useEffect(() => {
    // Primero verificar si hay una estrategia para editar
    const editingStrategyJson = sessionStorage.getItem('editingStrategy')
    if (editingStrategyJson) {
      try {
        const strategy: StoredStrategy = JSON.parse(editingStrategyJson)
        
        // Cargar todos los datos de la estrategia
        setEditingStrategyId(strategy.id)
        setStrategyName(strategy.name)
        setTimeframe(strategy.timeframe)
        setPositionSizing(strategy.positionSizing || { type: 'fixed_lots', value: 0.1 })
        setVariables(strategy.variables || [])
        setEntryBlocks(strategy.entryBlocks || [])
        setExitBlocks(strategy.exitBlocks || [])
        setStopLoss(strategy.stopLoss)
        setTakeProfit(strategy.takeProfit)
        setTrailingStop(strategy.trailingStop)
        setBreakeven(strategy.breakeven)
        
        // Limpiar sessionStorage después de cargar
        sessionStorage.removeItem('editingStrategy')
        
        console.log('✅ Estrategia cargada para editar:', strategy.name)
      } catch (error) {
        console.error('Error al cargar estrategia:', error)
      }
      return
    }
    
    // Si no hay estrategia, verificar si hay una plantilla para cargar
    const loadingTemplateJson = sessionStorage.getItem('loadingTemplate')
    if (loadingTemplateJson) {
      try {
        const template = JSON.parse(loadingTemplateJson)
        
        // Cargar todos los datos de la plantilla (sin ID, es nueva)
        setEditingStrategyId(null)
        setStrategyName(template.name)
        setTimeframe(template.timeframe)
        setPositionSizing(template.positionSizing || { type: 'fixed_lots', value: 0.1 })
        setVariables(template.variables || [])
        setEntryBlocks(template.entryBlocks || [])
        setExitBlocks(template.exitBlocks || [])
        setStopLoss(template.stopLoss)
        setTakeProfit(template.takeProfit)
        setTrailingStop(template.trailingStop)
        setBreakeven(template.breakeven)
        
        // Limpiar sessionStorage después de cargar
        sessionStorage.removeItem('loadingTemplate')
        
        console.log('✅ Plantilla cargada:', template.name)
      } catch (error) {
        console.error('Error al cargar plantilla:', error)
      }
    }
  }, [])

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  // Guardar estrategia
  const handleSaveStrategy = async () => {
    setIsSaving(true)
    
    try {
      const strategyData = {
        name: strategyName,
        timeframe: timeframe,
        positionSizing: positionSizing,
        variables: variables,
        entryBlocks: entryBlocks,
        exitBlocks: exitBlocks,
        stopLoss: stopLoss,
        takeProfit: takeProfit,
        trailingStop: trailingStop,
        breakeven: breakeven,
        status: 'testing' as const
      }
      
      if (editingStrategyId) {
        // Actualizar estrategia existente
        updateStrategy(editingStrategyId, strategyData)
        alert('✅ Estrategia actualizada correctamente')
      } else {
        // Crear nueva estrategia
        const saved = saveStrategy(strategyData)
        setEditingStrategyId(saved.id)
        alert('✅ Estrategia guardada correctamente')
      }
    } catch (error) {
      console.error('Error al guardar:', error)
      alert('❌ Error al guardar la estrategia')
    } finally {
      setIsSaving(false)
    }
  }

  // Generar código
  const generateCode = async (target: 'python' | 'mql5' | 'pinescript' | 'prorealcode') => {
    setIsGenerating(true)
    setShowExportMenu(false)
    
    try {
      // Construir objeto de estrategia
      const strategy = {
        name: strategyName,
        timeframe: timeframe,
        positionSizing: positionSizing,
        variables: variables,
        entryBlocks: entryBlocks,
        exitBlocks: exitBlocks,
        stopLoss: stopLoss,
        takeProfit: takeProfit,
        trailingStop: trailingStop,
        breakeven: breakeven
      }
      
      // Llamar a la API
      const response = await fetch('http://localhost:8000/api/v1/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strategy: strategy,
          target: target
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setGeneratedCode({
          code: data.code,
          language: data.language,
          filename: data.filename
        })
      } else {
        alert(`Error al generar código: ${data.error}`)
      }
    } catch (error) {
      console.error('Error al generar código:', error)
      alert('Error al conectar con el servidor. Asegúrate de que el backend esté ejecutándose.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Añadir nuevo bloque
  const addBlock = (type: 'entry' | 'exit') => {
    const blocks = type === 'entry' ? entryBlocks : exitBlocks
    const setBlocks = type === 'entry' ? setEntryBlocks : setExitBlocks
    
    const newBlock: StrategyBlock = {
      id: `${type}-${Date.now()}`,
      type,
      name: `Condición de ${type === 'entry' ? 'Entrada' : 'Salida'} ${blocks.length + 1}`,
      rules: [],
      actions: [],
      enabled: true
    }
    setBlocks([...blocks, newBlock])
  }

  // Añadir regla a un bloque
  const addRuleToBlock = (blockId: string, indicatorValue: string, blockType: 'entry' | 'exit') => {
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    
    setBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        const defaultParams = getDefaultParameters(indicatorValue)
        const label = generateIndicatorLabel(indicatorValue, defaultParams)
        
        const newRule: StrategyRule = {
          id: `rule-${Date.now()}`,
          indicator: {
            indicator: indicatorValue,
            parameters: defaultParams,
            label
          },
          condition: 'greater_than',
          comparisonValue: {
            type: 'number',
            numericValue: 0
          },
          logicalOperator: block.rules.length > 0 ? 'and' : undefined
        }
        return { ...block, rules: [...block.rules, newRule] }
      }
      return block
    }))
  }

  // Añadir acción a un bloque
  const addActionToBlock = (blockId: string, actionValue: string, blockType: 'entry' | 'exit') => {
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    const actionDef = ACTION_CATEGORIES.flatMap(cat => cat.actions).find(a => a.value === actionValue)
    
    // Crear parámetros por defecto
    const defaultParams: ActionParameters = {}
    actionDef?.parameters?.forEach(param => {
      if (param.defaultValue !== undefined) {
        defaultParams[param.key] = param.defaultValue
      }
    })
    
    setBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        const newAction: StrategyAction = {
          id: `action-${Date.now()}`,
          action: actionValue,
          parameters: defaultParams
        }
        return { ...block, actions: [...block.actions, newAction] }
      }
      return block
    }))
  }
  
  // Abrir modal de configuración de acción
  const openActionConfig = (blockId: string, actionId: string, blockType: 'entry' | 'exit') => {
    const blocks = blockType === 'entry' ? entryBlocks : exitBlocks
    const block = blocks.find(b => b.id === blockId)
    const stratAction = block?.actions.find(a => a.id === actionId)
    const actionDef = ACTION_CATEGORIES.flatMap(cat => cat.actions).find(a => a.value === stratAction?.action)
    
    if (stratAction && actionDef) {
      setConfiguringAction({
        blockId,
        actionId,
        action: actionDef,
        currentParams: stratAction.parameters || {}
      })
    }
  }
  
  // Guardar configuración de acción
  const saveActionConfig = (params: ActionParameters, blockType: 'entry' | 'exit') => {
    if (!configuringAction) return
    
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    
    setBlocks(prev => prev.map(block => {
      if (block.id === configuringAction.blockId) {
        return {
          ...block,
          actions: block.actions.map(a => 
            a.id === configuringAction.actionId 
              ? { ...a, parameters: params }
              : a
          )
        }
      }
      return block
    }))
    
    setConfiguringAction(null)
  }
  
  // Eliminar acción
  const deleteAction = (blockId: string, actionId: string, blockType: 'entry' | 'exit') => {
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    setBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        return { ...block, actions: block.actions.filter(a => a.id !== actionId) }
      }
      return block
    }))
  }
  
  // Formatear parámetros de acción para mostrar
  const formatActionParams = (action: StrategyAction): string => {
    if (!action.parameters) return ''
    
    const parts: string[] = []
    const params = action.parameters
    
    // Formatear valor (puede ser número o variable)
    const formatValue = (val: any) => {
      return isVariableReference(val) ? val.variableName : val
    }
    
    // Para Stop Loss y Take Profit
    if (params.value !== undefined) {
      const value = formatValue(params.value)
      const type = params.type || 'pips'
      parts.push(`${value} ${type}`)
    }
    
    // Para Trailing Stop
    if (params.distance !== undefined) {
      const value = formatValue(params.distance)
      parts.push(`${value} pips`)
      if (params.step !== undefined) {
        parts.push(`step: ${formatValue(params.step)}`)
      }
    }
    
    // Para Breakeven
    if (params.trigger !== undefined) {
      parts.push(`trigger: ${formatValue(params.trigger)} pips`)
      if (params.offset !== undefined) {
        parts.push(`offset: ${formatValue(params.offset)}`)
      }
    }
    
    // Para Modify Position
    if (params.action) {
      parts.push(params.action as string)
      if (params.percentage !== undefined) {
        parts.push(`${formatValue(params.percentage)}%`)
      }
    }
    
    return parts.length > 0 ? `: ${parts.join(', ')}` : ''
  }

  // Eliminar bloque
  const deleteBlock = (blockId: string, blockType: 'entry' | 'exit') => {
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    setBlocks(prev => prev.filter(block => block.id !== blockId))
  }

  // Eliminar regla
  const deleteRule = (blockId: string, ruleId: string, blockType: 'entry' | 'exit') => {
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    setBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        return { ...block, rules: block.rules.filter(r => r.id !== ruleId) }
      }
      return block
    }))
  }

  // Actualizar condición de una regla
  const updateRuleCondition = (blockId: string, ruleId: string, condition: string, blockType: 'entry' | 'exit') => {
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    setBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          rules: block.rules.map(r => r.id === ruleId ? { ...r, condition } : r)
        }
      }
      return block
    }))
  }

  // Actualizar valor de comparación de una regla
  const updateRuleComparisonValue = (blockId: string, ruleId: string, comparisonValue: any, blockType: 'entry' | 'exit') => {
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    setBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          rules: block.rules.map(r => r.id === ruleId ? { ...r, comparisonValue } : r)
        }
      }
      return block
    }))
  }

  // Abrir modal de configuración de indicador
  const openIndicatorConfig = (blockId: string, ruleId: string, blockType: 'entry' | 'exit') => {
    const blocks = blockType === 'entry' ? entryBlocks : exitBlocks
    const block = blocks.find(b => b.id === blockId)
    const rule = block?.rules.find(r => r.id === ruleId)
    
    if (rule) {
      setConfiguringIndicator({
        blockId,
        ruleId,
        indicator: rule.indicator
      })
    }
  }

  // Guardar configuración de indicador
  const saveIndicatorConfig = (params: any, blockType: 'entry' | 'exit') => {
    if (!configuringIndicator) return
    
    const setBlocks = blockType === 'entry' ? setEntryBlocks : setExitBlocks
    const label = generateIndicatorLabel(configuringIndicator.indicator.indicator, params)
    
    setBlocks(prev => prev.map(block => {
      if (block.id === configuringIndicator.blockId) {
        return {
          ...block,
          rules: block.rules.map(r => 
            r.id === configuringIndicator.ruleId 
              ? { ...r, indicator: { ...r.indicator, parameters: params, label } }
              : r
          )
        }
      }
      return block
    }))
    
    setConfiguringIndicator(null)
  }

  // Renderizar bloque
  const renderBlock = (block: StrategyBlock, blockType: 'entry' | 'exit') => (
    <Card key={block.id} className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{block.name}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteBlock(block.id, blockType)}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Reglas */}
        {block.rules.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase">Reglas</p>
            {block.rules.map((rule, index) => (
              <div key={rule.id} className="space-y-2">
                <div className="bg-slate-50 dark:bg-background/50 rounded-lg p-3 space-y-3">
                  {/* Indicador con botón de configuración */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-orange-400 flex-1">
                      {rule.indicator.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openIndicatorConfig(block.id, rule.id, blockType)}
                      className="h-7 text-slate-400 hover:text-orange-400"
                      title="Configurar parámetros"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRule(block.id, rule.id, blockType)}
                      className="h-7 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Condición */}
                  <div className="flex items-center gap-2">
                    <select
                      value={rule.condition}
                      onChange={(e) => updateRuleCondition(block.id, rule.id, e.target.value, blockType)}
                      className="bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-2 py-1.5 text-sm focus:border-orange-400 focus:outline-none flex-1"
                    >
                      {CONDITIONS.map(cond => (
                        <option key={cond.value} value={cond.value}>
                          {cond.symbol} {cond.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selector de valor de comparación */}
                  <ComparisonValueSelector
                    value={rule.comparisonValue}
                    onChange={(value) => updateRuleComparisonValue(block.id, rule.id, value, blockType)}
                    variables={variables}
                  />
                </div>

                {index < block.rules.length - 1 && (
                  <div className="text-center">
                    <span className="text-xs font-bold text-primary">Y (AND)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Acciones */}
        {block.actions.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-700">
            <p className="text-xs font-medium text-muted-foreground uppercase">Acciones</p>
            {block.actions.map((action) => {
              const actionData = ACTION_CATEGORIES
                .flatMap(cat => cat.actions)
                .find(a => a.value === action.action);
              
              const hasParams = actionData?.parameters && actionData.parameters.length > 0
              
              return (
                <div key={action.id} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{actionData?.icon}</span>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-green-400">
                        {actionData?.label || action.action}
                      </span>
                      {hasParams && (
                        <span className="text-xs text-green-400/70">
                          {formatActionParams(action)}
                        </span>
                      )}
                    </div>
                    {hasParams && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openActionConfig(block.id, action.id, blockType)}
                        className="h-7 text-slate-400 hover:text-green-400"
                        title="Configurar parámetros"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAction(block.id, action.id, blockType)}
                      className="h-7 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {block.rules.length === 0 && block.actions.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Selecciona indicadores y acciones del panel lateral →
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <PenTool className="h-8 w-8 text-orange-400" />
            <input
              type="text"
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              className="text-3xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-foreground focus:text-orange-400 transition-colors"
            />
          </div>
          <p className="text-muted-foreground mt-2">
            Construye tu estrategia combinando indicadores, condiciones y acciones
          </p>
        </div>
        <div className="flex gap-3">
          {/* Botón Guardar Estrategia */}
          <Button 
            onClick={handleSaveStrategy}
            disabled={isSaving || entryBlocks.length === 0}
            variant="outline" 
            className="border-green-700 hover:border-green-400 hover:text-green-400"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {editingStrategyId ? 'Actualizar' : 'Guardar'}
              </>
            )}
          </Button>
          
          {/* Botón Exportar Código con menú desplegable */}
          <div className="relative">
            <Button 
              variant="outline"
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isGenerating || entryBlocks.length === 0}
              className="border-violet-700 hover:border-violet-400 hover:text-violet-400"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Code2 className="h-4 w-4 mr-2" />
                  Exportar Código
                </>
              )}
            </Button>
            
            {showExportMenu && !isGenerating && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-surface border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10">
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => generateCode('python')}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-medium text-orange-400">Python</span>
                    <span className="block text-xs text-muted-foreground">Backtrader</span>
                  </button>
                  <button
                    onClick={() => generateCode('mql5')}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-medium text-orange-400">MQL5</span>
                    <span className="block text-xs text-muted-foreground">MetaTrader 5</span>
                  </button>
                  <button
                    onClick={() => generateCode('pinescript')}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-medium text-orange-400">Pine Script</span>
                    <span className="block text-xs text-muted-foreground">TradingView</span>
                  </button>
                  <button
                    onClick={() => generateCode('prorealcode')}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-medium text-orange-400">ProRealCode</span>
                    <span className="block text-xs text-muted-foreground">ProRealTime</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            onClick={() => {
              // Guardar estrategia si no está guardada antes de ir a backtesting
              if (!editingStrategyId && entryBlocks.length > 0) {
                handleSaveStrategy()
              }
              navigate('/backtesting')
            }}
            disabled={entryBlocks.length === 0}
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
          >
            <Play className="h-4 w-4 mr-2" />
            Ejecutar Backtest
          </Button>
        </div>
      </div>

      {/* Configuración General */}
      <div className="flex gap-4 items-stretch">
        {/* Timeframe Selector - Compacto */}
        <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 w-48 h-full">
          <CardContent className="py-4 flex flex-col gap-3">
            <label className="text-xs font-medium text-muted-foreground block">Temporalidad</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none transition-colors"
            >
              {TIMEFRAMES.map(tf => (
                <option key={tf.value} value={tf.value}>{tf.label}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Position Sizing */}
        <div className="flex-[0.7]">
          <PositionSizingConfigComponent
            config={positionSizing}
            variables={variables}
            onChange={setPositionSizing}
          />
        </div>

        {/* Variables Manager */}
        <div className="flex-[1.3]">
          <VariablesManager
            variables={variables}
            onChange={setVariables}
          />
        </div>
      </div>

      {/* Área de trabajo del diseñador */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Panel lateral IZQUIERDO - Indicadores y Acciones */}
        <div className="space-y-4">
          {/* Indicadores */}
          <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-orange-400">📊 Indicadores</CardTitle>
              <CardDescription className="text-xs">
                Click para añadir al último bloque
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 max-h-[500px] overflow-y-auto">
              {INDICATOR_CATEGORIES.map((category) => (
                <div key={category.name} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-xs font-medium">{category.name}</span>
                    {expandedCategories.includes(category.name) ? (
                      <ChevronDown className="h-3 w-3 text-orange-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </button>
                  
                  {expandedCategories.includes(category.name) && (
                    <div className="pl-2 space-y-1">
                      {category.indicators.map((indicator) => (
                        <Button
                          key={indicator.value}
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const lastEntry = entryBlocks[entryBlocks.length - 1]
                            const lastExit = exitBlocks[exitBlocks.length - 1]
                            
                            if (lastEntry) {
                              addRuleToBlock(lastEntry.id, indicator.value, 'entry')
                            } else if (lastExit) {
                              addRuleToBlock(lastExit.id, indicator.value, 'exit')
                            } else {
                              addBlock('entry')
                              setTimeout(() => addRuleToBlock(`entry-${Date.now()}`, indicator.value, 'entry'), 100)
                            }
                          }}
                          className="w-full justify-start h-7 text-xs hover:bg-orange-500/10 hover:text-orange-400"
                          title={indicator.description}
                        >
                          {indicator.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-orange-400">⚡ Acciones</CardTitle>
              <CardDescription className="text-xs">
                Click para añadir al último bloque
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ACTION_CATEGORIES.map((category) => (
                <div key={category.value} className="space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{category.name}</p>
                  {category.actions.slice(0, 2).map((action) => (
                    <Button
                      key={action.value}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const lastEntry = entryBlocks[entryBlocks.length - 1]
                        const lastExit = exitBlocks[exitBlocks.length - 1]
                        
                        if (category.value === 'entry' && lastEntry) {
                          addActionToBlock(lastEntry.id, action.value, 'entry')
                        } else if ((category.value === 'exit' || category.value === 'management') && lastExit) {
                          addActionToBlock(lastExit.id, action.value, 'exit')
                        }
                      }}
                      className="w-full justify-start h-7 text-xs hover:bg-green-500/10 hover:text-green-400"
                      title={action.description}
                    >
                      <span className="mr-2 text-sm">{action.icon}</span>
                      {action.label}
                    </Button>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Panel principal CENTRAL - Bloques de estrategia */}
        <div className="lg:col-span-3 space-y-6">
          {/* Bloques de entrada */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-green-400">📈</span>
                Condiciones de Entrada
              </h3>
              <Button
                onClick={() => addBlock('entry')}
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir Entrada
              </Button>
            </div>

            {entryBlocks.length === 0 ? (
              <Card className="bg-slate-50 dark:bg-surface/50 border-dashed border-2 border-slate-300 dark:border-slate-700">
                <CardContent className="py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Sin condiciones de entrada</p>
                    <Button onClick={() => addBlock('entry')} variant="outline" className="border-green-400 text-green-400 hover:bg-green-500/10">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Primera Condición
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              entryBlocks.map((block) => renderBlock(block, 'entry'))
            )}
          </div>

          {/* Bloques de salida */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-red-400">📉</span>
                Condiciones de Salida
              </h3>
              <Button
                onClick={() => addBlock('exit')}
                size="sm"
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir Salida
              </Button>
            </div>

            {exitBlocks.length === 0 ? (
              <Card className="bg-slate-50 dark:bg-surface/50 border-dashed border-2 border-slate-300 dark:border-slate-700">
                <CardContent className="py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Sin condiciones de salida</p>
                    <Button onClick={() => addBlock('exit')} variant="outline" className="border-red-400 text-red-400 hover:bg-red-500/10">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Primera Condición
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              exitBlocks.map((block) => renderBlock(block, 'exit'))
            )}
          </div>

          {/* Gestión de Riesgo: Stop Loss y Take Profit */}
          <div className="space-y-4 pt-6 border-t-2 border-slate-700">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-orange-400">🛡️</span>
              Gestión de Riesgo
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Stop Loss Module */}
              <StopLossModule
                config={stopLoss}
                variables={variables}
                onConfigure={() => setConfiguringStopLoss(true)}
              />
              
              {/* Take Profit Module */}
              <TakeProfitModule
                config={takeProfit}
                variables={variables}
                onConfigure={() => setConfiguringTakeProfit(true)}
              />

              {/* Trailing Stop Module */}
              <TrailingStopModule
                config={trailingStop}
                variables={variables}
                onConfigure={() => setConfiguringTrailingStop(true)}
              />

              {/* Breakeven Module */}
              <BreakevenModule
                config={breakeven}
                variables={variables}
                onConfigure={() => setConfiguringBreakeven(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de configuración de indicador */}
      {configuringIndicator && (
        <IndicatorConfigModal
          indicator={configuringIndicator.indicator.indicator}
          initialParams={configuringIndicator.indicator.parameters}
          variables={variables}
          onSave={(params) => {
            const blockType = configuringIndicator.blockId.startsWith('entry') ? 'entry' : 'exit'
            saveIndicatorConfig(params, blockType)
          }}
          onClose={() => setConfiguringIndicator(null)}
        />
      )}

      {/* Modal de configuración de acción */}
      {configuringAction && (
        <ActionConfigModal
          action={configuringAction.action}
          initialParams={configuringAction.currentParams}
          variables={variables}
          onSave={(params) => {
            const blockType = configuringAction.blockId.startsWith('entry') ? 'entry' : 'exit'
            saveActionConfig(params, blockType)
          }}
          onClose={() => setConfiguringAction(null)}
        />
      )}

      {/* Modal de configuración de Stop Loss */}
      {configuringStopLoss && (
        <StopLossConfigModal
          config={stopLoss}
          variables={variables}
          onSave={setStopLoss}
          onClose={() => setConfiguringStopLoss(false)}
        />
      )}

      {/* Modal de configuración de Take Profit */}
      {configuringTakeProfit && (
        <TakeProfitConfigModal
          config={takeProfit}
          variables={variables}
          onSave={setTakeProfit}
          onClose={() => setConfiguringTakeProfit(false)}
        />
      )}

      {/* Modal de configuración de Trailing Stop */}
      {configuringTrailingStop && (
        <TrailingStopConfigModal
          config={trailingStop}
          variables={variables}
          onSave={setTrailingStop}
          onClose={() => setConfiguringTrailingStop(false)}
        />
      )}

      {/* Modal de configuración de Breakeven */}
      {configuringBreakeven && (
        <BreakevenConfigModal
          config={breakeven}
          variables={variables}
          onSave={setBreakeven}
          onClose={() => setConfiguringBreakeven(false)}
        />
      )}

      {/* Visor de código generado */}
      {generatedCode && (
        <CodeViewer
          code={generatedCode.code}
          language={generatedCode.language}
          filename={generatedCode.filename}
          onClose={() => setGeneratedCode(null)}
        />
      )}
    </div>
  )
}
