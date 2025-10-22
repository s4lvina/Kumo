import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Sparkles, 
  PenTool, 
  GraduationCap,
  Cloud,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'
// import ThemeToggle from './ThemeToggle'

interface LayoutProps {
  children: ReactNode
}

/**
 * Definición de las rutas de navegación de la aplicación
 */
const navigationItems = [
  {
    path: '/templates',
    label: 'Plantillas',
    icon: Sparkles,
    description: 'Biblioteca de plantillas predefinidas'
  },
  {
    path: '/designer',
    label: 'Diseñador',
    icon: PenTool,
    description: 'Crea estrategias personalizadas'
  },
  {
    path: '/strategies',
    label: 'Mis Estrategias',
    icon: LayoutDashboard,
    description: 'Gestiona tus estrategias'
  },
  {
    path: '/backtesting',
    label: 'Backtesting',
    icon: BarChart3,
    description: 'Prueba con datos históricos'
  },
  {
    path: '/academy',
    label: 'Academia',
    icon: GraduationCap,
    description: 'Aprende trading algorítmico'
  },
]

/**
 * Layout principal de la aplicación Kumo
 * Incluye navegación lateral para desktop y navegación inferior para móvil
 */
export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Barra lateral de navegación - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-surface px-6 pb-4 border-r border-border">
          {/* Logo y título */}
          <Link to="/" className="flex h-16 shrink-0 items-center gap-3 pt-4 group">
            <div className="relative">
              <Cloud className="h-8 w-8 text-primary group-hover:text-orange-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-pink-500 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </div>
            <h1 className="text-2xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              Kumo
            </h1>
          </Link>

          {/* Navegación */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path
                    const Icon = item.icon
                    
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={cn(
                            'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200 relative overflow-hidden',
                            isActive
                              ? 'bg-gradient-to-r from-primary via-purple-600 to-purple-500 text-white shadow-lg shadow-primary/50'
                              : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                          )}
                        >
                          {/* Efecto hover naranja */}
                          {!isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                          
                          <Icon
                            className={cn(
                              'h-6 w-6 shrink-0 relative z-10 transition-colors duration-200',
                              isActive ? 'text-white' : 'text-gray-400 group-hover:text-orange-400'
                            )}
                          />
                          <div className="flex flex-col relative z-10">
                            <span>{item.label}</span>
                            <span className={cn(
                              "text-xs font-normal transition-colors duration-200",
                              isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-300'
                            )}>
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>

              {/* Footer del sidebar */}
              <li className="mt-auto space-y-3">
                {/* Theme Toggle - Temporalmente desactivado */}
                {/* <div className="flex justify-center">
                  <ThemeToggle />
                </div> */}
                
                <div className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 p-4 border border-slate-800 hover:border-orange-500/50 transition-colors duration-300 group">
                  <p className="text-xs text-muted-foreground group-hover:text-orange-400 transition-colors duration-300">
                    Kumo v1.0.0
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Plataforma de Trading Algorítmico
                  </p>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Área de contenido principal */}
      <div className="lg:pl-72">
        {/* Header superior - Mobile */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-border bg-surface/95 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 lg:hidden">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <Cloud className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-pink-500 to-orange-500 opacity-20 blur-md" />
            </div>
            <h1 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
              Kumo
            </h1>
          </Link>
          
          {/* Theme Toggle en mobile - Temporalmente desactivado */}
          {/* <ThemeToggle /> */}
        </div>

        {/* Contenido principal */}
        <main className="py-6 lg:py-10 pb-24 lg:pb-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Barra de navegación inferior - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border lg:hidden">
        <div className="grid h-16 grid-cols-5 gap-1 px-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-400 hover:text-orange-400 hover:bg-slate-800/50'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

