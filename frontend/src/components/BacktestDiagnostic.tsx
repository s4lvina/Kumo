import React from 'react'
import { AlertTriangle, CheckCircle, Info, Settings, Target, TrendingUp } from 'lucide-react'
import { BacktestResult } from '@/types/backtesting'

interface BacktestDiagnosticProps {
  result: BacktestResult | null
  isVisible: boolean
  onClose: () => void
}

interface DiagnosticIssue {
  type: 'error' | 'warning' | 'info' | 'success'
  title: string
  description: string
  action: string
  icon: React.ReactNode
}

export default function BacktestDiagnostic({ result, isVisible, onClose }: BacktestDiagnosticProps) {
  if (!isVisible || !result) return null

  const analyzeBacktest = (result: BacktestResult): DiagnosticIssue[] => {
    const issues: DiagnosticIssue[] = []
    const metrics = result.metrics

    // 1. No trades generated - Análisis específico
    if (metrics.totalTrades === 0) {
      // Detectar problemas específicos basados en el nombre de la estrategia
      const strategyName = result.strategyName.toLowerCase()
      
      if (strategyName.includes('cruce') || strategyName.includes('cross')) {
        issues.push({
          type: 'error',
          title: '🚨 PROBLEMA DE ESTRUCTURA - Estrategia Sin Acciones',
          description: 'La estrategia del Designer no tiene acciones configuradas en los Entry Blocks. El sistema ha añadido automáticamente "Comprar a Mercado" para que funcione.',
          action: 'SOLUCIÓN AUTOMÁTICA: El sistema ha añadido la acción por defecto. Si quieres personalizar, ve al Designer → Entry Block → Añadir Acción → "Comprar a Mercado" o "Vender a Mercado".',
          icon: <Target className="h-5 w-5" />
        })
      } else if (strategyName.includes('stochastic') || strategyName.includes('estocástica')) {
        issues.push({
          type: 'error',
          title: 'Problema con indicador Stochastic',
          description: 'El indicador Stochastic no está generando señales. Posibles causas: condiciones muy restrictivas o falta de Stop Loss.',
          action: 'Verifica que Stochastic < 20 para entrada y > 80 para salida. Asegúrate de tener Stop Loss (50 pips) y Take Profit (100 pips) configurados.',
          icon: <Target className="h-5 w-5" />
        })
      } else if (strategyName.includes('golden') || strategyName.includes('death')) {
        issues.push({
          type: 'error',
          title: 'Problema con Golden/Death Cross',
          description: 'El cruce de medias de largo plazo no está funcionando. Posible causa: SMA(200) no implementado.',
          action: 'Esta estrategia requiere SMA(200) que no está implementado. Usa períodos más cortos como SMA(50) vs SMA(100) o cambia a otra estrategia.',
          icon: <Target className="h-5 w-5" />
        })
      } else {
        issues.push({
          type: 'error',
          title: 'No se generaron posiciones',
          description: 'La estrategia no encontró ninguna señal de entrada durante el período de backtesting.',
          action: 'Verifica que tu estrategia tenga reglas de entrada válidas, acciones configuradas, y que las condiciones se cumplan en el mercado.',
          icon: <Target className="h-5 w-5" />
        })
      }
    }

    // 2. Very few trades
    else if (metrics.totalTrades < 5) {
      issues.push({
        type: 'warning',
        title: 'Muy pocas operaciones',
        description: `Solo se generaron ${metrics.totalTrades} operaciones. Esto puede indicar condiciones muy restrictivas.`,
        action: 'Considera relajar las condiciones de entrada o ampliar el período de backtesting.',
        icon: <TrendingUp className="h-5 w-5" />
      })
    }

    // 3. Poor performance
    if (metrics.totalTrades > 0) {
      if (metrics.winRate < 30) {
        issues.push({
          type: 'warning',
          title: 'Baja tasa de aciertos',
          description: `Solo el ${metrics.winRate.toFixed(1)}% de las operaciones fueron ganadoras.`,
          action: 'Revisa las condiciones de entrada y salida. Considera añadir filtros adicionales.',
          icon: <AlertTriangle className="h-5 w-5" />
        })
      }

      if (metrics.netProfit < 0) {
        issues.push({
          type: 'error',
          title: 'Pérdidas netas',
          description: `La estrategia perdió $${Math.abs(metrics.netProfit).toFixed(2)} en total.`,
          action: 'Revisa la lógica de la estrategia. Considera añadir stop loss más estrictos o cambiar las condiciones.',
          icon: <AlertTriangle className="h-5 w-5" />
        })
      }

      if (metrics.maxDrawdownPercent > 20) {
        issues.push({
          type: 'warning',
          title: 'Drawdown alto',
          description: `La pérdida máxima fue del ${metrics.maxDrawdownPercent.toFixed(1)}%.`,
          action: 'Considera reducir el tamaño de posición o añadir mejores condiciones de salida.',
          icon: <TrendingUp className="h-5 w-5" />
        })
      }
    }

    // 4. Success indicators
    if (metrics.totalTrades > 10 && metrics.winRate > 50 && metrics.netProfit > 0) {
      issues.push({
        type: 'success',
        title: 'Estrategia prometedora',
        description: `La estrategia generó ${metrics.totalTrades} operaciones con ${metrics.winRate.toFixed(1)}% de aciertos y ganancias de $${metrics.netProfit.toFixed(2)}.`,
        action: '¡Excelente! Considera optimizar los parámetros para mejorar aún más el rendimiento.',
        icon: <CheckCircle className="h-5 w-5" />
      })
    }

    return issues
  }

  const issues = analyzeBacktest(result)

  const getIssueStyles = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800'
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800'
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800'
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800'
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-500'
      case 'warning':
        return 'text-yellow-500'
      case 'info':
        return 'text-blue-500'
      case 'success':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Diagnóstico del Backtest
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4 p-3 bg-slate-800 border border-slate-700 rounded-lg">
            <h3 className="font-medium text-white mb-2">Resumen del Backtest</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Estrategia:</span>
                <span className="ml-2 font-medium text-white">{result.strategyName}</span>
              </div>
              <div>
                <span className="text-gray-400">Período:</span>
                <span className="ml-2 font-medium text-white">{result.startDate} - {result.endDate}</span>
              </div>
              <div>
                <span className="text-gray-400">Total Trades:</span>
                <span className="ml-2 font-medium text-white">{result.metrics.totalTrades}</span>
              </div>
              <div>
                <span className="text-gray-400">Win Rate:</span>
                <span className="ml-2 font-medium text-white">{result.metrics.winRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {issues.length === 0 ? (
            <div className="text-center py-8">
              <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No se detectaron problemas específicos en este backtest.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-medium text-white">Análisis Detallado</h3>
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getIssueStyles(issue.type)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 ${getIconColor(issue.type)}`}>
                      {issue.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{issue.title}</h4>
                      <p className="text-sm mb-2 opacity-90">{issue.description}</p>
                      <div className="text-sm font-medium">
                        <span className="opacity-75">💡 </span>
                        {issue.action}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  // Navigate to designer
                  window.location.href = '/designer'
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ir al Designer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
