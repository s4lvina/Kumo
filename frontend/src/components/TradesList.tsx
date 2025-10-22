import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BacktestTrade } from '@/types/backtesting'
import { List, TrendingUp, TrendingDown } from 'lucide-react'
import { useState } from 'react'

interface TradesListProps {
  trades: BacktestTrade[]
}

export default function TradesList({ trades }: TradesListProps) {
  const [filter, setFilter] = useState<'all' | 'wins' | 'losses'>('all')
  const [sortBy, setSortBy] = useState<'time' | 'profit'>('time')

  const filteredTrades = trades.filter(trade => {
    if (filter === 'wins') return trade.profit > 0
    if (filter === 'losses') return trade.profit < 0
    return true
  })

  const sortedTrades = [...filteredTrades].sort((a, b) => {
    if (sortBy === 'time') {
      return new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime()
    } else {
      return Math.abs(b.profit) - Math.abs(a.profit)
    }
  })

  const formatCurrency = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}$${value.toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('es-ES', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    }
    return `${hours}h ${minutes}m`
  }

  return (
    <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <List className="h-5 w-5 text-orange-400" />
            Historial de Operaciones
          </CardTitle>
          <div className="flex gap-2">
            {/* Filtros */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
            >
              <option value="all">Todas ({trades.length})</option>
              <option value="wins">Ganadoras ({trades.filter(t => t.profit > 0).length})</option>
              <option value="losses">Perdedoras ({trades.filter(t => t.profit < 0).length})</option>
            </select>

            {/* Ordenar */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-background border border-slate-300 dark:border-slate-700 rounded px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none"
            >
              <option value="time">Por Fecha</option>
              <option value="profit">Por Ganancia</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {sortedTrades.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay operaciones para mostrar
            </div>
          ) : (
            sortedTrades.map((trade) => (
              <div
                key={trade.id}
                className={`p-4 rounded-lg border-l-4 ${
                  trade.profit >= 0
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-red-500/10 border-red-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {trade.type === 'long' ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <span className="text-sm font-semibold uppercase text-orange-400">
                        {trade.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        #{trade.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <div>
                        <span className="text-muted-foreground">Entrada: </span>
                        <span className="font-medium">{formatDate(trade.entryTime)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Salida: </span>
                        <span className="font-medium">{formatDate(trade.exitTime)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Precio Entrada: </span>
                        <span className="font-medium">${trade.entryPrice.toFixed(5)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Precio Salida: </span>
                        <span className="font-medium">${trade.exitPrice.toFixed(5)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duración: </span>
                        <span className="font-medium">{formatDuration(trade.duration)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pips: </span>
                        <span className="font-medium">{trade.pips.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Entrada: </span>
                        <span className="font-medium text-blue-400">{trade.entryReason}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Salida: </span>
                        <span className="font-medium text-purple-400">{trade.exitReason}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-xl font-bold ${
                        trade.profit >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {formatCurrency(trade.profit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {trade.profitPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

