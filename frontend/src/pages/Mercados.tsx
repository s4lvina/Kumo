import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

declare global {
  interface Window {
    TradingView: any
  }
}

/**
 * Página: Mercados
 * Panel para visualizar gráficos de TradingView en tiempo real
 */
export default function Mercados() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  
  const [config, setConfig] = useState({
    symbol: 'EURUSD',
    timeframe: '1h'
  })

  // Cargar script de TradingView una sola vez
  useEffect(() => {
    // Verificar si el script ya está cargado
    if (window.TradingView) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.type = 'text/javascript'
    document.head.appendChild(script)

    return () => {
      // Cleanup si es necesario
      const scripts = document.querySelectorAll('script[src="https://s3.tradingview.com/tv.js"]')
      scripts.forEach(s => s.remove())
    }
  }, [])

  // Inicializar TradingView Widget cuando el script esté listo
  useEffect(() => {
    if (!chartContainerRef.current) return

    const initWidget = () => {
      if (!window.TradingView) {
        // Si TradingView no está disponible, reintentar en 500ms
        setTimeout(initWidget, 500)
        return
      }

      // Limpiar widget anterior si existe
      if (widgetRef.current) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          console.log('Error removing widget:', e)
        }
        widgetRef.current = null
      }

      // Limpiar contenedor
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = ''
      }

      try {
        // Mapear temporalidades al formato de TradingView
        const intervalMap: Record<string, string> = {
          '1': '1',
          '5': '5',
          '15': '15',
          '30': '30',
          '60': '60',
          '1h': '60',
          '240': '240',
          '4h': '240',
          'D': 'D',
          '1d': 'D',
          'W': 'W',
          '1w': 'W'
        }

        const interval = intervalMap[config.timeframe] || '60'

        widgetRef.current = new window.TradingView.widget({
          autosize: true,
          symbol: `FX_IDC:${config.symbol}`,
          interval: interval,
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'es',
          toolbar_bg: '#1e293b',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          disabled_features: [
            'use_localstorage_for_settings',
            'header_symbol_search',
            'header_compare'
          ],
          overrides: {
            'paneProperties.background': '#0B1120',
            'paneProperties.backgroundType': 'solid',
            'paneProperties.vertGridProperties.color': '#1e293b',
            'paneProperties.horzGridProperties.color': '#1e293b',
            'symbolWatermarkProperties.transparency': 90,
            'scalesProperties.textColor': '#AAA'
          }
        })
        
        console.log('[TRADINGVIEW] Widget initialized successfully')
      } catch (error) {
        console.error('[TRADINGVIEW] Error initializing widget:', error)
      }
    }

    // Esperar un momento antes de inicializar
    const timeout = setTimeout(initWidget, 100)

    return () => {
      clearTimeout(timeout)
      if (widgetRef.current) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          console.log('Cleanup error:', e)
        }
        widgetRef.current = null
      }
    }
  }, [config.symbol, config.timeframe])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-orange-400" />
            <h1 className="text-3xl font-bold">Mercados</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Visualiza gráficos de trading en tiempo real con TradingView
          </p>
        </div>
      </div>

      {/* Configuración del Gráfico */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Configuración del Gráfico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
                <option value="1h">1 Hora</option>
                <option value="240">4 Horas</option>
                <option value="4h">4 Horas</option>
                <option value="D">1 Día</option>
                <option value="1d">1 Día</option>
                <option value="W">1 Semana</option>
                <option value="1w">1 Semana</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TradingView Chart */}
      <Card className="bg-white dark:bg-surface border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Gráfico de Trading</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Visualiza el mercado en tiempo real. Usa los controles de arriba para cambiar símbolo y temporalidad.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 px-4 py-2 rounded-lg border border-primary/30">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-medium text-muted-foreground">TradingView Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            id="tradingview_chart"
            ref={chartContainerRef}
            style={{ height: '600px', position: 'relative' }}
            className="rounded-lg overflow-hidden"
          />
        </CardContent>
      </Card>
    </div>
  )
}

