import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

/**
 * Componente de switch para alternar entre modo oscuro y claro
 * Mantiene los colores de acento de Kumo mientras cambia los fondos
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex items-center gap-2 px-4 py-2 rounded-lg",
        "border-2 transition-all duration-300",
        "group hover:scale-105",
        theme === 'dark'
          ? "bg-slate-800/50 border-slate-700 hover:border-orange-500/50"
          : "bg-white border-gray-300 hover:border-orange-500/50"
      )}
      aria-label="Cambiar tema"
    >
      {/* Contenedor del switch */}
      <div className="relative w-14 h-7 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-800 dark:to-slate-900 p-0.5">
        {/* Indicador deslizante */}
        <div
          className={cn(
            "absolute top-0.5 h-6 w-6 rounded-full transition-all duration-300",
            "bg-gradient-to-br shadow-lg",
            theme === 'dark'
              ? "left-0.5 from-purple-500 via-purple-600 to-primary"
              : "left-7 from-orange-400 via-orange-500 to-pink-500"
          )}
        >
          {/* Icono dentro del indicador */}
          <div className="flex items-center justify-center h-full">
            {theme === 'dark' ? (
              <Moon className="h-3.5 w-3.5 text-white" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Etiqueta de texto */}
      <span className={cn(
        "text-sm font-medium transition-colors duration-200",
        theme === 'dark' 
          ? "text-gray-300 group-hover:text-orange-400" 
          : "text-gray-700 group-hover:text-orange-500"
      )}>
        {theme === 'dark' ? 'Oscuro' : 'Claro'}
      </span>

      {/* Efecto glow al hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 blur-sm" />
      </div>
    </button>
  )
}

