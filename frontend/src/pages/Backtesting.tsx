import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Loader2, BarChart3, Calendar, DollarSign, Settings } from 'lucide-react'
import { BacktestResult, BacktestConfig } from '@/types/backtesting'
import BacktestMetricsPanel from '@/components/BacktestMetricsPanel'
import EquityCurveChart from '@/components/EquityCurveChart'
import EquityLineChart from '@/components/EquityLineChart'
import TradeDistributionChart from '@/components/TradeDistributionChart'
import TradesList from '@/components/TradesList'
import BacktestDiagnostic from '@/components/BacktestDiagnostic'
import { getAllStrategies, StoredStrategy } from '@/lib/strategyStorage'

/**
 * Página: Backtesting
 * Panel completo de backtesting con análisis de resultados
 */
export default function Backtesting() {
  const [strategies, setStrategies] = useState<StoredStrategy[]>([])
  const [selectedStrategy, setSelectedStrategy] = useState<StoredStrategy | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null)
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  
  const [config, setConfig] = useState<BacktestConfig>({
    symbol: 'EURUSD',
    timeframe: '1h',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    initialBalance: 10000,
    commission: 0.02, // 0.02%
    slippage: 2 // 2 pips
  })

  // Cargar estrategias guardadas
  useEffect(() => {
    const loadedStrategies = getAllStrategies()
    setStrategies(loadedStrategies)
    if (loadedStrategies.length > 0) {
      setSelectedStrategy(loadedStrategies[0])
    }
  }, [])

  // Transformar estrategia del Designer al formato del BacktestEngine
  const transformStrategyForBacktest = (strategy: any) => {
    console.log('[TRANSFORM] Original strategy:', strategy)
    
    const transformed = {
      name: strategy.name,
      entryBlocks: strategy.entryBlocks?.map((block: any) => {
        // Si no tiene acciones, añadir una acción por defecto basada en la configuración
        let actions = block.actions || []
        
        if (actions.length === 0) {
          // Añadir acción por defecto: "Comprar a Mercado" para estrategias de cruce
          actions = [{
            id: `action-${Date.now()}`,
            type: 'buy_market',
            enabled: true
          }]
          console.log('[TRANSFORM] Añadiendo acción por defecto:', actions)
        }
        
        return {
          id: block.id,
          enabled: true,
          rules: block.rules || [],
          actions: actions
        }
      }) || [],
      exitBlocks: strategy.exitBlocks?.map((block: any) => ({
        id: block.id,
        enabled: true,
        rules: block.rules || [],
        actions: block.actions || []
      })) || [],
      stopLoss: strategy.stopLoss,
      takeProfit: strategy.takeProfit,
      positionSizing: strategy.positionSizing
    }
    
    console.log('[TRANSFORM] Transformed strategy:', transformed)
    return transformed
  }

  // Ejecutar backtest
  const runBacktest = async () => {
    if (!selectedStrategy) {
      alert('Selecciona una estrategia primero')
      return
    }

    setIsRunning(true)
    setBacktestResult(null) // Limpiar resultados anteriores
    
    try {
      const transformedStrategy = transformStrategyForBacktest(selectedStrategy)
      
      console.log('[BACKTEST] Enviando request...', {
        strategy: transformedStrategy.name,
        config
      })
      
      const response = await fetch('http://localhost:8000/api/v1/backtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strategy: transformedStrategy,
          config: config
        })
      })
      
      console.log('[BACKTEST] Response status:', response.status, response.statusText)
      
      // Leer el texto de la respuesta una sola vez
      const responseText = await response.text()
      console.log('[BACKTEST] Response text length:', responseText.length)
      
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        let errorMessage = `Error HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.detail || errorData.error || errorMessage
        } catch (e) {
          // Si no se puede parsear el error como JSON, usar el texto
          if (responseText) {
            errorMessage = responseText
          }
        }
        console.error('[BACKTEST] HTTP Error:', errorMessage)
        alert(`Error en el servidor: ${errorMessage}`)
        setIsRunning(false)
        return
      }
      
      // Parsear JSON solo si la respuesta es exitosa
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('[BACKTEST] Error parsing JSON:', parseError)
        console.error('[BACKTEST] Response text preview:', responseText.substring(0, 500))
        alert('Error al procesar la respuesta del servidor. La respuesta no es JSON válido.')
        setIsRunning(false)
        return
      }
      
      console.log('[BACKTEST] Response data:', data)
      
      // Validar estructura básica de la respuesta
      if (!data || typeof data !== 'object') {
        console.error('[BACKTEST] Invalid response structure:', data)
        alert('Error: La respuesta del servidor tiene un formato inválido.')
        setIsRunning(false)
        return
      }
      
      if (data.success) {
        // Validar que tenga las propiedades necesarias
        if (!data.metrics || !data.trades || !data.equityCurve) {
          console.error('[BACKTEST] Missing required fields:', {
            hasMetrics: !!data.metrics,
            hasTrades: !!data.trades,
            hasEquityCurve: !!data.equityCurve
          })
          alert('Error: La respuesta del servidor está incompleta. Faltan datos del backtest.')
          setIsRunning(false)
          return
        }
        
        // Usar setTimeout para permitir que el UI se actualice antes de procesar datos grandes
        setTimeout(() => {
          setBacktestResult(data)
          console.log('[BACKTEST] Success! Total trades:', data.metrics?.totalTrades)
          
          // Mostrar diagnóstico automáticamente si no hay trades o hay problemas
          if (data.metrics?.totalTrades === 0 || 
              data.metrics?.winRate < 30 || 
              data.metrics?.netProfit < 0) {
            setShowDiagnostic(true)
          }
        }, 0)
      } else {
        const errorMsg = data.error || 'Error desconocido en el backtest'
        console.error('[BACKTEST] Backtest failed:', data)
        alert(`Error en backtest: ${errorMsg}`)
      }
    } catch (error: any) {
      console.error('[BACKTEST] Exception:', error)
      const errorMessage = error?.message || 'Error desconocido'
      console.error('[BACKTEST] Error details:', {
        name: error?.name,
        message: errorMessage,
        stack: error?.stack
      })
      alert(`Error al conectar con el servidor: ${errorMessage}\n\nAsegúrate de que el backend esté ejecutándose en http://localhost:8000`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-orange-400" />
            <h1 className="text-3xl font-bold">Panel de Backtesting</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Prueba tus estrategias con datos históricos y analiza resultados detallados
          </p>
        </div>
      </div>

      {/* Gráfico Temporal de Equity - Parte Superior */}
      {backtestResult && 
       backtestResult.success && 
       backtestResult.equityCurve && 
       backtestResult.equityCurve.length > 0 && 
       backtestResult.metrics && 
       backtestResult.metrics.initialBalance !== undefined && (
        <EquityLineChart 
          data={backtestResult.equityCurve} 
          initialBalance={backtestResult.metrics.initialBalance}
          trades={backtestResult.trades || []}
        />
      )}

      {/* Configuración del Backtest */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-400" />
              Configuración del Backtest
            </CardTitle>
            <Button 
              onClick={runBacktest}
              disabled={isRunning || !selectedStrategy}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ejecutando...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Ejecutar Backtest
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {/* Selector de Estrategia */}
            <div className="space-y-1.5 col-span-2 md:col-span-1">
              <label className="text-xs font-medium text-muted-foreground">Estrategia</label>
              <select
                value={selectedStrategy?.id || ''}
                onChange={(e) => {
                  const strategy = strategies.find(s => s.id === parseInt(e.target.value))
                  setSelectedStrategy(strategy || null)
                }}
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              >
                {strategies.length === 0 ? (
                  <option>No hay estrategias guardadas</option>
                ) : (
                  strategies.map(strategy => (
                    <option key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Símbolo */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Símbolo</label>
              <input
                type="text"
                value={config.symbol}
                onChange={(e) => setConfig({ ...config, symbol: e.target.value.toUpperCase() })}
                placeholder="EURUSD"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Timeframe */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Temporalidad</label>
              <select
                value={config.timeframe}
                onChange={(e) => setConfig({ ...config, timeframe: e.target.value })}
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              >
                <option value="1">1 Min</option>
                <option value="5">5 Min</option>
                <option value="15">15 Min</option>
                <option value="30">30 Min</option>
                <option value="60">1 Hora</option>
                <option value="240">4 Horas</option>
                <option value="D">1 Día</option>
                <option value="W">1 Semana</option>
              </select>
            </div>

            {/* Fecha Inicio */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Inicio
              </label>
              <input
                type="date"
                value={config.startDate}
                onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Fecha Fin */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Fin
              </label>
              <input
                type="date"
                value={config.endDate}
                onChange={(e) => setConfig({ ...config, endDate: e.target.value })}
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Balance Inicial */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Balance
              </label>
              <input
                type="number"
                value={config.initialBalance}
                onChange={(e) => setConfig({ ...config, initialBalance: parseFloat(e.target.value) })}
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Comisión */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Comisión (%)</label>
              <input
                type="number"
                step="0.01"
                value={config.commission}
                onChange={(e) => setConfig({ ...config, commission: parseFloat(e.target.value) })}
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Slippage */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Slippage (pips)</label>
              <input
                type="number"
                value={config.slippage}
                onChange={(e) => setConfig({ ...config, slippage: parseFloat(e.target.value) })}
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados del Backtest */}
      {backtestResult && backtestResult.success && (
        <div className="space-y-6">
          {/* Resumen de Estrategia */}
          {backtestResult.metrics && backtestResult.metrics.finalBalance !== undefined && (
            <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/30">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-orange-400">{backtestResult.strategyName || 'Estrategia'}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {backtestResult.symbol || 'N/A'} • {backtestResult.timeframe || 'N/A'} • 
                      {' '}{backtestResult.startDate ? new Date(backtestResult.startDate).toLocaleDateString() : 'N/A'} - {backtestResult.endDate ? new Date(backtestResult.endDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400">
                      ${backtestResult.metrics.finalBalance.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Balance Final
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Panel de Métricas */}
          {backtestResult.metrics && (
            <BacktestMetricsPanel metrics={backtestResult.metrics} />
          )}

          {/* Gráficos */}
          {backtestResult.equityCurve && 
           backtestResult.equityCurve.length > 0 && 
           backtestResult.metrics && 
           backtestResult.metrics.initialBalance !== undefined && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EquityCurveChart 
                data={backtestResult.equityCurve} 
                initialBalance={backtestResult.metrics.initialBalance}
              />
              <TradeDistributionChart trades={backtestResult.trades || []} />
            </div>
          )}

          {/* Lista de Trades */}
          {backtestResult.trades && backtestResult.trades.length > 0 && (
            <TradesList trades={backtestResult.trades} />
          )}
        </div>
      )}

      {/* Mensaje de sin resultados */}
      {!backtestResult && (
        <Card className="bg-slate-50 dark:bg-surface/50 border-dashed border-2 border-slate-300 dark:border-slate-700">
          <CardContent className="py-16">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">No hay resultados aún</p>
              <p className="text-sm text-muted-foreground">
                Configura los parámetros y ejecuta un backtest para ver los resultados
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botón de diagnóstico manual */}
      {backtestResult && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowDiagnostic(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Ver Diagnóstico Detallado
          </Button>
        </div>
      )}

      {/* Popup de diagnóstico */}
      <BacktestDiagnostic
        result={backtestResult}
        isVisible={showDiagnostic}
        onClose={() => setShowDiagnostic(false)}
      />
    </div>
  )
}

