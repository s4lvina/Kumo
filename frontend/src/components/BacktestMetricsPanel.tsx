import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BacktestMetrics } from '@/types/backtesting'
import { TrendingUp, TrendingDown, Target, Activity, Clock, DollarSign, Percent, Award } from 'lucide-react'

interface BacktestMetricsPanelProps {
  metrics: BacktestMetrics
}

export default function BacktestMetricsPanel({ metrics }: BacktestMetricsPanelProps) {
  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals)
  }

  const formatCurrency = (num: number) => {
    return `$${num.toFixed(2)}`
  }

  const formatPercent = (num: number) => {
    return `${num.toFixed(2)}%`
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Total Trades */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-400" />
            Total Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-400">{metrics.totalTrades}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {metrics.winningTrades}W / {metrics.losingTrades}L
          </p>
        </CardContent>
      </Card>

      {/* Win Rate */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-green-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4 text-green-400" />
            Win Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{formatPercent(metrics.winRate)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {metrics.consecutiveWins} racha máxima
          </p>
        </CardContent>
      </Card>

      {/* Net Profit */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            Net Profit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${metrics.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(metrics.netProfit)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatPercent(metrics.returnPercent)} ROI
          </p>
        </CardContent>
      </Card>

      {/* Profit Factor */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-400" />
            Profit Factor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${metrics.profitFactor >= 1.5 ? 'text-green-400' : metrics.profitFactor >= 1 ? 'text-orange-400' : 'text-red-400'}`}>
            {formatNumber(metrics.profitFactor)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(metrics.totalProfit)} ganados
          </p>
        </CardContent>
      </Card>

      {/* Max Drawdown */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-400" />
            Max Drawdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-400">{formatPercent(metrics.maxDrawdownPercent)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(metrics.maxDrawdown)}
          </p>
        </CardContent>
      </Card>

      {/* Sharpe Ratio */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            Sharpe Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${metrics.sharpeRatio >= 1.5 ? 'text-green-400' : metrics.sharpeRatio >= 1 ? 'text-orange-400' : 'text-red-400'}`}>
            {formatNumber(metrics.sharpeRatio)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Sortino: {formatNumber(metrics.sortinoRatio)}
          </p>
        </CardContent>
      </Card>

      {/* Average Win/Loss */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Percent className="h-4 w-4 text-orange-400" />
            Avg Win/Loss
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-green-400">{formatCurrency(metrics.averageWin)}</div>
          <div className="text-lg font-bold text-red-400">{formatCurrency(Math.abs(metrics.averageLoss))}</div>
        </CardContent>
      </Card>

      {/* Time in Market */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-400" />
            Time in Market
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-400">{formatPercent(metrics.timeInMarket)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Avg: {formatNumber(metrics.averageTradeDuration)}h
          </p>
        </CardContent>
      </Card>

      {/* Expectancy */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            Expectancy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${metrics.expectancy >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(metrics.expectancy)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Por trade
          </p>
        </CardContent>
      </Card>

      {/* Largest Win/Loss */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-400" />
            Best/Worst
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-green-400">{formatCurrency(metrics.largestWin)}</div>
          <div className="text-lg font-bold text-red-400">{formatCurrency(Math.abs(metrics.largestLoss))}</div>
        </CardContent>
      </Card>

      {/* Consecutive Wins/Losses */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" />
            Consecutive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            <span className="text-green-400 font-bold">{metrics.consecutiveWins}</span>
            <span className="text-muted-foreground"> wins</span>
          </p>
          <p className="text-sm">
            <span className="text-red-400 font-bold">{metrics.consecutiveLosses}</span>
            <span className="text-muted-foreground"> losses</span>
          </p>
        </CardContent>
      </Card>

      {/* Calmar Ratio */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800 hover:border-pink-500/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4 text-pink-400" />
            Calmar Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${metrics.calmarRatio >= 1 ? 'text-green-400' : 'text-orange-400'}`}>
            {formatNumber(metrics.calmarRatio)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Return/DD
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

