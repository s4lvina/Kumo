import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BacktestTrade } from '@/types/backtesting'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3 } from 'lucide-react'

interface TradeDistributionChartProps {
  trades: BacktestTrade[]
}

export default function TradeDistributionChart({ trades }: TradeDistributionChartProps) {
  // Agrupar trades por rangos de profit
  const ranges = [
    { min: -Infinity, max: -500, label: '< -$500' },
    { min: -500, max: -200, label: '-$500 to -$200' },
    { min: -200, max: -50, label: '-$200 to -$50' },
    { min: -50, max: 0, label: '-$50 to $0' },
    { min: 0, max: 50, label: '$0 to $50' },
    { min: 50, max: 200, label: '$50 to $200' },
    { min: 200, max: 500, label: '$200 to $500' },
    { min: 500, max: Infinity, label: '> $500' },
  ]

  const distribution = ranges.map(range => {
    const count = trades.filter(t => t.profit > range.min && t.profit <= range.max).length
    return {
      range: range.label,
      count,
      isProfit: range.min >= 0
    }
  })

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-white">
            {payload[0].payload.range}
          </p>
          <p className="text-sm text-slate-300">
            Trades: {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          Distribución de Resultados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="range" 
              stroke="#94a3b8"
              style={{ fontSize: '10px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="count" name="Número de Trades">
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isProfit ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

