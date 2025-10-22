import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp, Activity, BarChart3, Zap, Target, Clock } from 'lucide-react'
import { STRATEGY_TEMPLATES, StrategyTemplate } from '@/data/templates'

/**
 * Página: Biblioteca de Plantillas
 * Muestra plantillas predefinidas de estrategias de trading clásicas
 */
export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const navigate = useNavigate()

  // Filtrar plantillas
  const filteredTemplates = STRATEGY_TEMPLATES.filter(template => {
    if (selectedCategory && template.category !== selectedCategory) return false
    if (selectedDifficulty && template.difficulty !== selectedDifficulty) return false
    return true
  })

  // Usar plantilla - cargarla en el Designer
  const handleUseTemplate = (template: StrategyTemplate) => {
    // Guardar plantilla en sessionStorage para cargarla en Designer
    sessionStorage.setItem('loadingTemplate', JSON.stringify(template.strategy))
    navigate('/designer')
  }

  // Iconos por categoría
  const getCategoryIcon = (category: StrategyTemplate['category']) => {
    switch (category) {
      case 'momentum':
        return Activity
      case 'trend':
        return TrendingUp
      case 'volatility':
        return BarChart3
      case 'reversal':
        return Zap
      case 'breakout':
        return Target
      case 'scalping':
        return Clock
      default:
        return Activity
    }
  }

  // Color por categoría
  const getCategoryColor = (category: StrategyTemplate['category']) => {
    switch (category) {
      case 'momentum':
        return 'text-green-400'
      case 'trend':
        return 'text-blue-400'
      case 'volatility':
        return 'text-purple-400'
      case 'reversal':
        return 'text-orange-400'
      case 'breakout':
        return 'text-pink-400'
      case 'scalping':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  // Badge de dificultad
  const getDifficultyColor = (difficulty: StrategyTemplate['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
    }
  }

  const getDifficultyLabel = (difficulty: StrategyTemplate['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'Básico'
      case 'intermediate':
        return 'Intermedio'
      case 'advanced':
        return 'Avanzado'
    }
  }

  const getCategoryLabel = (category: StrategyTemplate['category']) => {
    switch (category) {
      case 'momentum':
        return 'Momentum'
      case 'trend':
        return 'Tendencia'
      case 'volatility':
        return 'Volatilidad'
      case 'reversal':
        return 'Reversión'
      case 'breakout':
        return 'Breakout'
      case 'scalping':
        return 'Scalping'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-foreground flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-orange-400" />
            Biblioteca de Plantillas
          </h2>
          <p className="text-muted-foreground mt-2">
            {filteredTemplates.length} estrategias clásicas listas para usar
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        {/* Filtro por Categoría */}
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' : 'bg-slate-100 dark:bg-slate-800 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-purple-400'}
          >
            Todas
          </Button>
          {['momentum', 'trend', 'volatility', 'reversal', 'breakout', 'scalping'].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' : 'bg-slate-100 dark:bg-slate-800 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-purple-400'}
            >
              {getCategoryLabel(cat as StrategyTemplate['category'])}
            </Button>
          ))}
        </div>

        <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

        {/* Filtro por Dificultad */}
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground flex items-center">Dificultad:</span>
          <Button
            variant={selectedDifficulty === null ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setSelectedDifficulty(null)}
            className={selectedDifficulty === null ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' : 'bg-slate-100 dark:bg-slate-800 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'}
          >
            Todas
          </Button>
          {['beginner', 'intermediate', 'advanced'].map((diff) => (
            <Button
              key={diff}
              variant={selectedDifficulty === diff ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setSelectedDifficulty(diff)}
              className={selectedDifficulty === diff ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' : 'bg-slate-100 dark:bg-slate-800 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'}
            >
              {getDifficultyLabel(diff as StrategyTemplate['difficulty'])}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de plantillas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => {
          const Icon = getCategoryIcon(template.category)
          const color = getCategoryColor(template.category)
          
          return (
            <Card key={template.id} className="hover:border-orange-500/50 transition-all duration-200 bg-white dark:bg-surface group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className={`h-8 w-8 ${color} group-hover:text-orange-400 transition-colors duration-200`} />
                  <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(template.difficulty)}`}>
                    {getDifficultyLabel(template.difficulty)}
                  </span>
                </div>
                <CardTitle className="mt-4 line-clamp-1">{template.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {getCategoryLabel(template.category)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 min-h-[4.5rem]">
                  {template.description}
                </p>

                {/* Timeframes */}
                <div className="mb-4 p-3 bg-slate-50 dark:bg-background/50 rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase mb-1">Timeframes</p>
                  <p className="text-sm font-semibold">{template.timeframes.join(', ')}</p>
                </div>

                {/* Indicadores */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.indicators.map((indicator, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>

                <Button 
                  onClick={() => handleUseTemplate(template)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                >
                  Usar Plantilla
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Sin resultados */}
      {filteredTemplates.length === 0 && (
        <Card className="bg-white dark:bg-surface">
          <CardContent className="py-16">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                No se encontraron plantillas con estos filtros
              </p>
              <Button 
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedDifficulty(null)
                }}
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-500/10"
              >
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información adicional */}
      <Card className="bg-gradient-to-br from-orange-500/5 to-pink-500/5 border-orange-500/20 dark:border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-orange-400">💡</span>
            Sobre las Plantillas
          </CardTitle>
          <CardDescription className="text-sm">
            Todas estas estrategias están basadas en sistemas clásicos y probados del trading. 
            Son punto de partida ideal - puedes <strong className="text-orange-400">modificarlas</strong> en 
            el Designer para adaptarlas a tu estilo y mercado.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
