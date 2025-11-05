import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EquityPoint } from '@/types/backtesting'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface EquityCurveChartProps {
  data: EquityPoint[]
  initialBalance?: number
}

export default function EquityCurveChart({ data }: EquityCurveChartProps) {
  // Optimizar datos del gráfico: limitar puntos y memoizar
  const optimizedData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    // Limitar a un máximo de 1000 puntos para evitar bloqueos
    const maxPoints = 1000
    if (data.length <= maxPoints) {
      return data.map(point => ({
        ...point,
        time: new Date(point.time).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
      }))
    }
    
    // Si hay más puntos, muestrear uniformemente
    const step = Math.ceil(data.length / maxPoints)
    const sampled = []
    for (let i = 0; i < data.length; i += step) {
      sampled.push({
        ...data[i],
        time: new Date(data[i].time).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
      })
    }
    // Asegurar que el último punto esté incluido
    if (sampled[sampled.length - 1] !== data[data.length - 1]) {
      sampled.push({
        ...data[data.length - 1],
        time: new Date(data[data.length - 1].time).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
      })
    }
    
    return sampled
  }, [data])

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

  if (!data || data.length === 0) {
    return (
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            Curva de Equity y Drawdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No hay datos de equity para mostrar</p>
          </div>
        </CardContent>
      </Card>
    )
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
          <LineChart data={optimizedData}>
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

