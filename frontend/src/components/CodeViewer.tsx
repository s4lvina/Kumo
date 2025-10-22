import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Copy, Download, Check } from 'lucide-react'

interface CodeViewerProps {
  code: string
  language: string
  filename: string
  onClose: () => void
}

/**
 * Componente para visualizar código generado
 * Muestra el código con syntax highlighting y opciones de copiar/descargar
 */
export default function CodeViewer({ code, language, filename, onClose }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  // Copiar código al portapapeles
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  // Descargar código como archivo
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Mapa de etiquetas de lenguajes
  const languageLabels: Record<string, string> = {
    python: 'Python (Backtrader)',
    mql5: 'MQL5 (MetaTrader 5)',
    pinescript: 'Pine Script (TradingView)',
    prorealcode: 'ProRealCode (ProRealTime)'
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-surface border-slate-200 dark:border-slate-800 flex flex-col">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span className="text-orange-400">💻</span>
                Código Generado
              </CardTitle>
              <CardDescription className="mt-1">
                {languageLabels[language] || language} • {filename}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-slate-700 hover:border-green-400 hover:text-green-400"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="border-slate-700 hover:border-orange-400 hover:text-orange-400"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-red-500/10 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-0">
          <pre className="p-6 text-sm font-mono text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-slate-950/50 whitespace-pre-wrap break-words">
            <code>{code}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

