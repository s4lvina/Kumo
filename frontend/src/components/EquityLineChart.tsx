/**
 * Equity Line Chart Component
 * Gráfico temporal de línea con relleno para mostrar la curva de equity
 * Incluye marcadores visuales de entradas y salidas
 */
import { useMemo } from 'react'
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Scatter, ScatterChart } from 'recharts'
import { EquityPoint, BacktestTrade } from '@/types/backtesting'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface EquityLineChartProps {
  data: EquityPoint[]
  initialBalance: number
  trades: BacktestTrade[]
}

export default function EquityLineChart({ data, initialBalance, trades }: EquityLineChartProps) {
  // Memoizar datos del gráfico para evitar recalcular en cada render
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    // Limitar a un máximo de 1000 puntos para evitar bloqueos
    const maxPoints = 1000
    const step = data.length > maxPoints ? Math.ceil(data.length / maxPoints) : 1
    const limitedData = data.filter((_, index) => index % step === 0 || index === data.length - 1)
    
    return limitedData.map((point) => ({
      time: new Date(point.time).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      timeFull: point.time, // Mantener fecha completa para matching
      timeTimestamp: new Date(point.time).getTime(), // Timestamp para búsqueda rápida
      equity: point.equity,
      drawdown: point.drawdown,
      // Calcular porcentaje de retorno
      returnPercent: ((point.equity - initialBalance) / initialBalance) * 100
    }))
  }, [data, initialBalance])

  // Memoizar mapeo de trades usando búsqueda binaria optimizada
  const tradeMarkers = useMemo(() => {
    if (!trades || trades.length === 0 || !chartData || chartData.length === 0) return []
    
    const markers: any[] = []
    
    // Ordenar datos por tiempo si no están ordenados (una sola vez)
    const sortedData = [...chartData].sort((a, b) => a.timeTimestamp - b.timeTimestamp)
    
    // Función de búsqueda binaria optimizada
    const findClosestIndex = (targetTime: number): number => {
      let left = 0
      let right = sortedData.length - 1
      
      while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (sortedData[mid].timeTimestamp < targetTime) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      
      // Verificar si el anterior es más cercano
      if (left > 0) {
        const diff1 = Math.abs(sortedData[left].timeTimestamp - targetTime)
        const diff2 = Math.abs(sortedData[left - 1].timeTimestamp - targetTime)
        if (diff2 < diff1) {
          return left - 1
        }
      }
      
      return Math.min(left, sortedData.length - 1)
    }
    
    // Limitar número de trades a procesar para evitar bloqueos
    const maxTrades = 500
    const tradesToProcess = trades.slice(0, maxTrades)
    
    tradesToProcess.forEach((trade) => {
      try {
        const entryTime = new Date(trade.entryTime).getTime()
        const exitTime = new Date(trade.exitTime).getTime()
        
        const entryIndex = findClosestIndex(entryTime)
        const exitIndex = findClosestIndex(exitTime)
        
        // Añadir marcador de entrada
        if (sortedData[entryIndex] && entryIndex >= 0 && entryIndex < sortedData.length) {
          markers.push({
            type: 'entry',
            trade,
            x: entryIndex,
            y: sortedData[entryIndex].equity,
            time: sortedData[entryIndex].time,
            timeFull: sortedData[entryIndex].timeFull
          })
        }
        
        // Añadir marcador de salida solo si es diferente a entrada
        if (sortedData[exitIndex] && exitIndex >= 0 && exitIndex < sortedData.length && exitIndex !== entryIndex) {
          markers.push({
            type: 'exit',
            trade,
            x: exitIndex,
            y: sortedData[exitIndex].equity,
            time: sortedData[exitIndex].time,
            timeFull: sortedData[exitIndex].timeFull
          })
        }
      } catch (error) {
        // Ignorar trades con fechas inválidas
        console.warn('Error procesando trade:', error)
      }
    })
    
    return markers
  }, [trades, chartData])

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-900 rounded-lg border border-slate-700">
        <p className="text-slate-400">No hay datos de equity para mostrar</p>
      </div>
    )
  }

  // Componente personalizado para marcadores de entrada/salida
  const CustomMarker = ({ cx, cy, payload }: any) => {
    if (!payload) return null
    
    const { type, trade } = payload
    const isEntry = type === 'entry'
    const isLong = trade.type === 'long'
    const isProfit = trade.profit > 0
    
    // Colores y estilos según tipo
    const entryColor = isLong ? '#22c55e' : '#ef4444' // Verde para long, rojo para short
    const exitColor = isProfit ? '#22c55e' : '#ef4444' // Verde para profit, rojo para loss
    
    const color = isEntry ? entryColor : exitColor
    const size = isEntry ? 10 : 8
    
    return (
      <g>
        {/* Círculo de fondo */}
        <circle
          cx={cx}
          cy={cy}
          r={size + 2}
          fill="rgba(0, 0, 0, 0.5)"
          stroke={color}
          strokeWidth={2}
        />
        {/* Círculo principal */}
        <circle
          cx={cx}
          cy={cy}
          r={size}
          fill={color}
          stroke="#fff"
          strokeWidth={1.5}
        />
        {/* Icono según tipo */}
        {isEntry && (
          <g transform={`translate(${cx}, ${cy})`}>
            {isLong ? (
              <ArrowUp size={12} fill="#fff" stroke="#fff" strokeWidth={2} />
            ) : (
              <ArrowDown size={12} fill="#fff" stroke="#fff" strokeWidth={2} />
            )}
          </g>
        )}
        {!isEntry && (
          <g transform={`translate(${cx}, ${cy})`}>
            <circle r={4} fill="#fff" />
          </g>
        )}
      </g>
    )
  }

  // Calcular estadísticas para el tooltip
  const maxEquity = Math.max(...chartData.map(d => d.equity))
  const minEquity = Math.min(...chartData.map(d => d.equity))
  const finalEquity = chartData[chartData.length - 1]?.equity || initialBalance
  const totalReturn = ((finalEquity - initialBalance) / initialBalance) * 100

  // Color del gradiente basado en el rendimiento
  const isPositive = totalReturn >= 0
  const gradientColor = isPositive 
    ? 'rgba(34, 197, 94, 0.3)' // Verde para positivo
    : 'rgba(239, 68, 68, 0.3)' // Rojo para negativo
  const lineColor = isPositive 
    ? '#22c55e' // Verde
    : '#ef4444' // Rojo

  // Custom tooltip para la curva de equity
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      
      // Buscar si hay un trade en este punto (por índice o fecha)
      const currentIndex = chartData.findIndex(d => d.time === data.time)
      const tradeMarker = tradeMarkers.find(m => 
        m.x === currentIndex || 
        (chartData[m.x] && chartData[m.x].time === data.time)
      )
      
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-3">
          <p className="text-sm text-slate-300 mb-1">{`Fecha: ${data.time}`}</p>
          <p className="text-sm font-semibold text-white mb-1">
            Equity: <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
              ${data.equity.toFixed(2)}
            </span>
          </p>
          <p className="text-xs text-slate-400">
            Retorno: <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
              {data.returnPercent >= 0 ? '+' : ''}{data.returnPercent.toFixed(2)}%
            </span>
          </p>
          <p className="text-xs text-slate-400">
            Drawdown: <span className="text-orange-400">{data.drawdown.toFixed(2)}%</span>
          </p>
          {tradeMarker && (
            <div className="mt-2 pt-2 border-t border-slate-700">
              <p className="text-xs font-semibold text-white mb-1">
                {tradeMarker.type === 'entry' ? 'ENTRADA' : 'SALIDA'}
              </p>
              <p className="text-xs text-slate-400">
                Tipo: <span className="text-white">{tradeMarker.trade.type.toUpperCase()}</span>
              </p>
              <p className="text-xs text-slate-400">
                {tradeMarker.type === 'entry' ? 'Precio Entrada' : 'Precio Salida'}: 
                <span className="text-white ml-1">
                  ${tradeMarker.type === 'entry' ? tradeMarker.trade.entryPrice.toFixed(5) : (tradeMarker.trade.exitPrice || tradeMarker.trade.entryPrice).toFixed(5)}
                </span>
              </p>
              {tradeMarker.type === 'entry' && (
                <p className="text-xs text-slate-400">
                  Hora: <span className="text-white">{new Date(tradeMarker.trade.entryTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                </p>
              )}
              {tradeMarker.type === 'exit' && (
                <>
                  <p className="text-xs text-slate-400">
                    Precio Entrada: <span className="text-white">${tradeMarker.trade.entryPrice.toFixed(5)}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Precio Salida: <span className="text-white">${(tradeMarker.trade.exitPrice || tradeMarker.trade.entryPrice).toFixed(5)}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Diferencia: <span className={tradeMarker.trade.profit > 0 ? 'text-green-400' : 'text-red-400'}>
                      {tradeMarker.trade.type === 'long' 
                        ? ((tradeMarker.trade.exitPrice || tradeMarker.trade.entryPrice) - tradeMarker.trade.entryPrice).toFixed(5)
                        : (tradeMarker.trade.entryPrice - (tradeMarker.trade.exitPrice || tradeMarker.trade.entryPrice)).toFixed(5)
                      }
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Profit: <span className={tradeMarker.trade.profit > 0 ? 'text-green-400' : 'text-red-400'}>
                      ${tradeMarker.trade.profit.toFixed(2)}
                    </span>
                    {' '}
                    <span className={tradeMarker.trade.profitPercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ({tradeMarker.trade.profitPercent >= 0 ? '+' : ''}{tradeMarker.trade.profitPercent.toFixed(2)}%)
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Pips: <span className={tradeMarker.trade.pips > 0 ? 'text-green-400' : 'text-red-400'}>
                      {tradeMarker.trade.pips >= 0 ? '+' : ''}{tradeMarker.trade.pips.toFixed(1)}
                    </span>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-6 shadow-xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Curva de Equity</h3>
          <div className={`px-4 py-2 rounded-lg ${isPositive ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
            <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"></div>
            <span className="text-slate-300 font-medium">Equity</span>
          </div>
          <div className="text-slate-400">
            Balance Inicial: <span className="text-white font-semibold">${initialBalance.toLocaleString()}</span>
          </div>
          <div className={`${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            Balance Final: <span className="font-bold text-lg">${finalEquity.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Leyenda de marcadores */}
        {trades && trades.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-6 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                <span className="text-slate-300">↑ Entrada LONG</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
                <span className="text-slate-300">↓ Entrada SHORT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></div>
                <span className="text-slate-300">✓ Salida Ganadora</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white"></div>
                <span className="text-slate-300">✗ Salida Perdedora</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.5} />
              <stop offset="50%" stopColor={lineColor} stopOpacity={0.2} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis 
            id="time"
            dataKey="time" 
            stroke="#64748b"
            style={{ fontSize: '11px' }}
            tick={{ fill: '#94a3b8' }}
            axisLine={{ stroke: '#475569' }}
          />
          <YAxis 
            id="equity"
            stroke="#64748b"
            style={{ fontSize: '11px' }}
            tick={{ fill: '#94a3b8' }}
            axisLine={{ stroke: '#475569' }}
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="linear"
            dataKey="equity"
            stroke={lineColor}
            strokeWidth={3}
            fill="url(#equityGradient)"
            dot={false}
            activeDot={{ r: 6, fill: lineColor, stroke: '#fff', strokeWidth: 2 }}
            connectNulls={false}
          />
          {/* Marcadores de entradas y salidas usando Scatter */}
          {tradeMarkers.length > 0 && (
            <Scatter
              name="Trades"
              data={tradeMarkers.map((marker) => {
                const pointIndex = marker.x >= 0 && marker.x < chartData.length ? marker.x : -1
                const xValue = pointIndex >= 0 ? chartData[pointIndex]?.time : marker.time
                const yValue = pointIndex >= 0 ? chartData[pointIndex]?.equity : marker.y
                
                return {
                  time: xValue,
                  equity: yValue,
                  marker: marker
                }
              }).filter(item => item.time && item.equity)}
              xAxisId="time"
              yAxisId="equity"
              xAxisDataKey="time"
              yAxisDataKey="equity"
              shape={(props: any) => {
                const { cx, cy, payload } = props
                if (!payload || !payload.marker) return null
                
                const marker = payload.marker
                const isEntry = marker.type === 'entry'
                const isLong = marker.trade.type === 'long'
                const isProfit = marker.trade.profit > 0
                
                const entryColor = isLong ? '#22c55e' : '#ef4444'
                const exitColor = isProfit ? '#22c55e' : '#ef4444'
                const color = isEntry ? entryColor : exitColor
                const size = isEntry ? 10 : 8
                
                return (
                  <g>
                    {/* Círculo de fondo con sombra */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={size + 2}
                      fill="rgba(0, 0, 0, 0.6)"
                      stroke={color}
                      strokeWidth={2}
                    />
                    {/* Círculo principal */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={size}
                      fill={color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                    {/* Icono según tipo */}
                    {isEntry && (
                      <g transform={`translate(${cx}, ${cy})`}>
                        {isLong ? (
                          // Flecha arriba para LONG (↑)
                          <text
                            x={0}
                            y={0}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#fff"
                            fontSize={14}
                            fontWeight="bold"
                          >
                            ↑
                          </text>
                        ) : (
                          // Flecha abajo para SHORT (↓)
                          <text
                            x={0}
                            y={0}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#fff"
                            fontSize={14}
                            fontWeight="bold"
                          >
                            ↓
                          </text>
                        )}
                      </g>
                    )}
                    {!isEntry && (
                      <g transform={`translate(${cx}, ${cy})`}>
                        {isProfit ? (
                          // Check verde para salida ganadora (✓)
                          <text
                            x={0}
                            y={0}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#fff"
                            fontSize={12}
                            fontWeight="bold"
                          >
                            ✓
                          </text>
                        ) : (
                          // X roja para salida perdedora (✗)
                          <text
                            x={0}
                            y={0}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#fff"
                            fontSize={12}
                            fontWeight="bold"
                          >
                            ✗
                          </text>
                        )}
                      </g>
                    )}
                  </g>
                )
              }}
              fill="#8884d8"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>

      {/* Estadísticas adicionales */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700 shadow-lg">
          <p className="text-slate-400 text-xs mb-2 font-medium">Equity Máximo</p>
          <p className="text-white font-bold text-lg">${maxEquity.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700 shadow-lg">
          <p className="text-slate-400 text-xs mb-2 font-medium">Equity Mínimo</p>
          <p className="text-white font-bold text-lg">${minEquity.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700 shadow-lg">
          <p className="text-slate-400 text-xs mb-2 font-medium">Rango</p>
          <p className="text-white font-bold text-lg">${(maxEquity - minEquity).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

