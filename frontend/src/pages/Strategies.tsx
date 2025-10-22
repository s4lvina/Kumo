import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Plus, Edit, Copy, Trash2, Play, Pause, Archive, MoreVertical, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { 
  getAllStrategies, 
  deleteStrategy, 
  duplicateStrategy, 
  updateStrategyStatus,
  StoredStrategy 
} from '@/lib/strategyStorage'

/**
 * Página: Mis Estrategias
 * Muestra y gestiona las estrategias guardadas localmente
 */
export default function Strategies() {
  const [strategies, setStrategies] = useState<StoredStrategy[]>([])
  const [showMenuId, setShowMenuId] = useState<number | null>(null)
  const navigate = useNavigate()

  // Cargar estrategias desde localStorage
  useEffect(() => {
    loadStrategies()
  }, [])

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => setShowMenuId(null)
    if (showMenuId !== null) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showMenuId])

  const loadStrategies = () => {
    const loaded = getAllStrategies()
    setStrategies(loaded)
  }

  // Editar estrategia (ir a Designer)
  const handleEdit = (strategy: StoredStrategy) => {
    // Guardar estrategia en sessionStorage para cargarla en Designer
    sessionStorage.setItem('editingStrategy', JSON.stringify(strategy))
    navigate('/designer')
  }

  // Duplicar estrategia
  const handleDuplicate = (id: number) => {
    const duplicated = duplicateStrategy(id)
    if (duplicated) {
      loadStrategies()
      setShowMenuId(null)
    }
  }

  // Eliminar estrategia
  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta estrategia?')) {
      deleteStrategy(id)
      loadStrategies()
      setShowMenuId(null)
    }
  }

  // Cambiar estado
  const handleStatusChange = (id: number, status: StoredStrategy['status']) => {
    updateStrategyStatus(id, status)
    loadStrategies()
    setShowMenuId(null)
  }

  // Obtener el ícono según el tipo de estrategia
  const getStrategyIcon = (type?: string) => {
    switch (type) {
      case 'momentum':
        return <Activity className="h-8 w-8 text-green-400 group-hover:text-orange-400 transition-colors duration-200" />
      case 'trend_following':
        return <TrendingUp className="h-8 w-8 text-blue-400 group-hover:text-orange-400 transition-colors duration-200" />
      case 'volatility':
        return <TrendingDown className="h-8 w-8 text-purple-400 group-hover:text-orange-400 transition-colors duration-200" />
      default:
        return <Activity className="h-8 w-8 text-gray-400 group-hover:text-orange-400 transition-colors duration-200" />
    }
  }

  // Obtener el color según el estado
  const getStatusColor = (status: StoredStrategy['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'testing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'paused':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'archived':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusLabel = (status: StoredStrategy['status']) => {
    const labels = {
      active: 'Activa',
      testing: 'En Pruebas',
      paused: 'Pausada',
      archived: 'Archivada'
    }
    return labels[status]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-foreground flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-orange-400" />
            Mis Estrategias
          </h2>
          <p className="text-muted-foreground mt-2">
            Gestiona tus estrategias de trading y sus métricas de backtest
          </p>
        </div>
        <Button 
          onClick={() => navigate('/designer')}
          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Estrategia
        </Button>
      </div>

      {/* Lista de estrategias */}
      {strategies.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategies.map((strategy) => {
            const Icon = getStrategyIcon(strategy.description)
            
            return (
              <Card key={strategy.id} className="hover:border-orange-500/50 transition-all duration-200 bg-white dark:bg-surface group relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-primary group-hover:text-orange-400 transition-colors">
                        {Icon}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(strategy.status)}`}>
                        {getStatusLabel(strategy.status)}
                      </span>
                    </div>
                    
                    {/* Menú de acciones */}
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowMenuId(showMenuId === strategy.id ? null : strategy.id)
                        }}
                        className="h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-800"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>

                      {showMenuId === strategy.id && (
                        <div className="absolute right-0 top-10 w-48 bg-white dark:bg-surface border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10">
                          <div className="p-1">
                            <button
                              onClick={() => handleEdit(strategy)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Edit className="h-4 w-4 text-orange-400" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDuplicate(strategy.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Copy className="h-4 w-4 text-blue-400" />
                              Duplicar
                            </button>
                            
                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                            
                            <p className="px-3 py-1 text-[10px] text-muted-foreground uppercase tracking-wider">
                              Cambiar Estado
                            </p>
                            <button
                              onClick={() => handleStatusChange(strategy.id, 'active')}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Play className="h-4 w-4 text-green-400" />
                              Activar
                            </button>
                            <button
                              onClick={() => handleStatusChange(strategy.id, 'testing')}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Activity className="h-4 w-4 text-yellow-400" />
                              En Pruebas
                            </button>
                            <button
                              onClick={() => handleStatusChange(strategy.id, 'paused')}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Pause className="h-4 w-4 text-blue-400" />
                              Pausar
                            </button>
                            <button
                              onClick={() => handleStatusChange(strategy.id, 'archived')}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Archive className="h-4 w-4 text-gray-400" />
                              Archivar
                            </button>
                            
                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                            
                            <button
                              onClick={() => handleDelete(strategy.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-red-500/10 text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="mt-4 line-clamp-1">{strategy.name}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Creada el {new Date(strategy.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Descripción */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                    {strategy.description || 'Sin descripción'}
                  </p>

                  {/* Métricas de Backtest */}
                  {strategy.backtestMetrics ? (
                    <div className="mb-4 p-3 bg-slate-50 dark:bg-background/50 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Win Rate</p>
                          <p className="text-lg font-bold text-green-400">
                            {strategy.backtestMetrics.winRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Total Trades</p>
                          <p className="text-lg font-bold">
                            {strategy.backtestMetrics.totalTrades}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase">Profit Factor</p>
                          <p className="text-sm font-semibold">{strategy.backtestMetrics.profitFactor?.toFixed(2) || '-'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase">Sharpe Ratio</p>
                          <p className="text-sm font-semibold">{strategy.backtestMetrics.sharpeRatio?.toFixed(2) || '-'}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-slate-50 dark:bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-2">
                        Sin métricas de backtest
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs border-slate-700 hover:border-purple-400 hover:text-purple-400"
                      >
                        Ejecutar Backtest
                      </Button>
                    </div>
                  )}

                  {/* Timeframe badge */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {strategy.timeframe}
                    </span>
                    {strategy.entryBlocks && strategy.entryBlocks.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {strategy.entryBlocks.length} {strategy.entryBlocks.length === 1 ? 'Entrada' : 'Entradas'}
                      </span>
                    )}
                    {strategy.exitBlocks && strategy.exitBlocks.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {strategy.exitBlocks.length} {strategy.exitBlocks.length === 1 ? 'Salida' : 'Salidas'}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handleEdit(strategy)}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Estrategia
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        /* Sin estrategias */
        <Card className="bg-white dark:bg-surface">
          <CardContent className="py-16">
            <div className="text-center">
              <LayoutDashboard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Aún no tienes estrategias creadas
              </p>
              <Button 
                onClick={() => navigate('/designer')}
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Estrategia
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
