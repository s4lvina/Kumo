import { useEffect, useRef } from 'react'

interface TradingViewWidgetProps {
  symbol: string
  interval: string
}

declare global {
  interface Window {
    TradingView: any
  }
}

/**
 * Componente alternativo simple para TradingView
 * Usa el widget de TradingView de forma más robusta
 */
export default function TradingViewWidget({ symbol, interval }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    // Cargar script si no existe
    const loadScript = () => {
      if (document.querySelector('script[src*="tradingview.com"]')) {
        initWidget()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/tv.js'
      script.async = true
      script.onload = () => initWidget()
      script.onerror = () => {
        console.error('Failed to load TradingView script')
      }
      document.body.appendChild(script)
    }

    const initWidget = () => {
      if (!window.TradingView || !containerRef.current) {
        setTimeout(initWidget, 500)
        return
      }

      if (widgetRef.current) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          console.log('Cleanup error:', e)
        }
      }

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

      try {
        widgetRef.current = new window.TradingView.widget({
          container_id: containerRef.current.id,
          width: '100%',
          height: 600,
          symbol: `FX_IDC:${symbol}`,
          interval: intervalMap[interval] || '60',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'es',
          toolbar_bg: '#1e293b',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          overrides: {
            'paneProperties.background': '#0B1120',
            'paneProperties.backgroundType': 'solid',
          }
        })
      } catch (error) {
        console.error('Widget initialization error:', error)
      }
    }

    loadScript()

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          console.log('Cleanup error:', e)
        }
      }
    }
  }, [symbol, interval])

  return (
    <div 
      id={`tradingview_${Math.random().toString(36).substring(7)}`}
      ref={containerRef}
      style={{ height: '600px' }}
    />
  )
}

