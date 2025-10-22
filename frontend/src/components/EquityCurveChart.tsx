import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EquityPoint } from '@/types/backtesting'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface EquityCurveChartProps {
  data: EquityPoint[]
  initialBalance?: number
}

export default function EquityCurveChart({ data }: EquityCurveChartProps) {
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-slate-400 mb-2">
            {new Date(payload[0].payload.time).toLocaleString('es-ES')}
          </p>
          <p className="text-sm font-semibold text-green-400">
            Equity: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm font-semibold text-red-400">
            DD: {payload[1].value.toFixed(2)}%
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
          <TrendingUp className="h-5 w-5 text-orange-400" />
          Curva de Equity y Drawdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="time" 
              tickFormatter={formatDate}
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={formatCurrency}
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `${value}%`}
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="equity" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
              name="Equity"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="drawdown" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={false}
              name="Drawdown %"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

