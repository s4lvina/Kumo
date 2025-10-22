import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, TrendingUp } from 'lucide-react'
import { StoredStrategy } from '@/lib/strategyStorage'

interface BacktestMetricsModalProps {
  strategyId: number
  strategyName: string
  currentMetrics?: StoredStrategy['backtestMetrics']
  onSave: (metrics: StoredStrategy['backtestMetrics']) => void
  onClose: () => void
}

/**
 * Modal para editar métricas de backtest manualmente
 * Útil para registrar resultados de simulaciones
 */
export default function BacktestMetricsModal({ 
  strategyName, 
  currentMetrics, 
  onSave, 
  onClose 
}: BacktestMetricsModalProps) {
  const [metrics, setMetrics] = useState({
    winRate: currentMetrics?.winRate || 0,
    totalTrades: currentMetrics?.totalTrades || 0,
    profitFactor: currentMetrics?.profitFactor || 0,
    sharpeRatio: currentMetrics?.sharpeRatio || 0,
    maxDrawdown: currentMetrics?.maxDrawdown || 0,
    avgWin: currentMetrics?.avgWin || 0,
    avgLoss: currentMetrics?.avgLoss || 0
  })

  const handleSave = () => {
    onSave(metrics)
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-400" />
                Métricas de Backtest
              </CardTitle>
              <CardDescription className="mt-1">
                {strategyName}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-red-500/10 hover:text-red-400"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Win Rate */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Win Rate (%)
              </label>
              <input
                type="number"
                value={metrics.winRate}
                onChange={(e) => setMetrics({ ...metrics, winRate: parseFloat(e.target.value) || 0 })}
                step="0.1"
                min="0"
                max="100"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Total Trades */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Total Trades
              </label>
              <input
                type="number"
                value={metrics.totalTrades}
                onChange={(e) => setMetrics({ ...metrics, totalTrades: parseInt(e.target.value) || 0 })}
                min="0"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Profit Factor */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Profit Factor
              </label>
              <input
                type="number"
                value={metrics.profitFactor}
                onChange={(e) => setMetrics({ ...metrics, profitFactor: parseFloat(e.target.value) || 0 })}
                step="0.01"
                min="0"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Sharpe Ratio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Sharpe Ratio
              </label>
              <input
                type="number"
                value={metrics.sharpeRatio}
                onChange={(e) => setMetrics({ ...metrics, sharpeRatio: parseFloat(e.target.value) || 0 })}
                step="0.01"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Max Drawdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Max Drawdown (%)
              </label>
              <input
                type="number"
                value={metrics.maxDrawdown}
                onChange={(e) => setMetrics({ ...metrics, maxDrawdown: parseFloat(e.target.value) || 0 })}
                step="0.1"
                min="0"
                max="100"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Avg Win */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Avg Win ($)
              </label>
              <input
                type="number"
                value={metrics.avgWin}
                onChange={(e) => setMetrics({ ...metrics, avgWin: parseFloat(e.target.value) || 0 })}
                step="0.01"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* Avg Loss */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Avg Loss ($)
              </label>
              <input
                type="number"
                value={metrics.avgLoss}
                onChange={(e) => setMetrics({ ...metrics, avgLoss: parseFloat(e.target.value) || 0 })}
                step="0.01"
                className="w-full bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 hover:border-red-400 hover:text-red-400"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              Guardar Métricas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

