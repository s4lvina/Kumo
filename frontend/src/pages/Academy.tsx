import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, BookOpen, Video, Code, Trophy, ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Activity, BarChart3 } from 'lucide-react'

/**
 * Página: Academia
 * Recursos educativos sobre trading algorítmico
 */
export default function Academy() {
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null)

  // Mock data - bloques de ejemplo
  const blocks = [
    {
      id: 1,
      title: 'Introducción al Trading Algorítmico',
      description: 'Aprende los fundamentos del trading automatizado y cómo crear tu primera estrategia',
      icon: BookOpen,
      lessons: 12,
      duration: '2h 30min',
      level: 'Principiante',
      color: 'text-green-400'
    },
    {
      id: 2,
      title: 'Indicadores Técnicos Avanzados',
      description: 'Domina el uso de RSI, MACD, Bollinger Bands y más indicadores técnicos',
      icon: Video,
      lessons: 18,
      duration: '4h 15min',
      level: 'Intermedio',
      color: 'text-blue-400'
    },
    {
      id: 3,
      title: 'Backtesting y Optimización',
      description: 'Aprende a validar y optimizar tus estrategias usando datos históricos',
      icon: Code,
      lessons: 15,
      duration: '3h 45min',
      level: 'Avanzado',
      color: 'text-purple-400'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-foreground flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-orange-400" />
            Academia
          </h2>
          <p className="text-muted-foreground mt-2">
            Aprende trading algorítmico desde cero hasta nivel experto
          </p>
        </div>
      </div>

      {/* Progreso del usuario */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500/30 dark:border-orange-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-orange-400" />
                Tu Progreso
              </CardTitle>
              <CardDescription className="mt-2">
                Has completado 3 de 45 lecciones
              </CardDescription>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">6.7%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-slate-200 dark:bg-background/50 rounded-full h-3">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-full h-3" style={{ width: '6.7%' }}></div>
          </div>
        </CardContent>
      </Card>

      {/* Contenido: Vista de Bloques o Contenido del Bloque */}
      {selectedBlock === null ? (
        <>
          {/* Grid de bloques */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Bloques Disponibles</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blocks.map((block) => {
                const Icon = block.icon
                return (
                  <Card 
                    key={block.id} 
                    className="hover:border-orange-500/50 transition-all duration-200 cursor-pointer bg-white dark:bg-surface group"
                    onClick={() => setSelectedBlock(block.id)}
                  >
                    <CardHeader>
                      <Icon className={`h-10 w-10 ${block.color} group-hover:text-orange-400 transition-colors mb-2`} />
                      <CardTitle className="text-lg">{block.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {block.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Lecciones</span>
                          <span className="font-semibold">{block.lessons}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Duración</span>
                          <span className="font-semibold">{block.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Nivel</span>
                          <span className="font-semibold text-primary group-hover:text-orange-400 transition-colors">{block.level}</span>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                          Comenzar Bloque
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        /* Contenido del bloque seleccionado */
        <BlockContent blockId={selectedBlock} onBack={() => setSelectedBlock(null)} />
      )}

      {/* Recursos adicionales - Solo mostrar si no hay bloque seleccionado */}
      {selectedBlock === null && (
        <Card className="bg-white dark:bg-surface">
          <CardHeader>
            <CardTitle>📚 Recursos Adicionales</CardTitle>
            <CardDescription>
              Documentación, guías y ejemplos prácticos
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="justify-start h-auto py-3 border-slate-300 dark:border-slate-700 hover:border-orange-400 hover:text-orange-400">
              <div className="text-left">
                <div className="font-semibold">Documentación API</div>
                <div className="text-xs text-muted-foreground">
                  Referencia completa de la API
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 border-slate-300 dark:border-slate-700 hover:border-orange-400 hover:text-orange-400">
              <div className="text-left">
                <div className="font-semibold">Ejemplos de Código</div>
                <div className="text-xs text-muted-foreground">
                  Estrategias de ejemplo
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 border-slate-300 dark:border-slate-700 hover:border-orange-400 hover:text-orange-400">
              <div className="text-left">
                <div className="font-semibold">Comunidad</div>
                <div className="text-xs text-muted-foreground">
                  Foro y soporte
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/**
 * Componente: Contenido del Bloque
 */
interface BlockContentProps {
  blockId: number
  onBack: () => void
}

function BlockContent({ blockId, onBack }: BlockContentProps) {
  if (blockId === 1) {
    return <IntroductionBlock onBack={onBack} />
  }
  
  if (blockId === 2) {
    return <AdvancedIndicatorsBlock onBack={onBack} />
  }
  
  return (
    <div>
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Bloques
      </Button>
      <p>Contenido del bloque {blockId} en desarrollo...</p>
    </div>
  )
}

/**
 * Bloque 1: Introducción al Trading Algorítmico
 */
function IntroductionBlock({ onBack }: { onBack: () => void }) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [activeLesson, setActiveLesson] = useState<number>(1)

  const lessons = [
    { id: 1, title: '¿Qué es el Trading Algorítmico?', duration: '8 min' },
    { id: 2, title: 'Ventajas del Trading Automatizado', duration: '10 min' },
    { id: 3, title: 'Componentes de una Estrategia', duration: '12 min' },
    { id: 4, title: 'Indicadores Técnicos Básicos', duration: '15 min' },
    { id: 5, title: 'Gestión de Riesgo', duration: '12 min' },
    { id: 6, title: 'Backtesting: Validando tu Estrategia', duration: '10 min' },
  ]

  const toggleLesson = (id: number) => {
    setActiveLesson(id)
    if (!completedLessons.includes(id)) {
      setCompletedLessons(prev => [...prev, id])
    }
  }

  const goToNextLesson = () => {
    if (activeLesson < lessons.length) {
      setActiveLesson(activeLesson + 1)
    }
  }

  const goToPreviousLesson = () => {
    if (activeLesson > 1) {
      setActiveLesson(activeLesson - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con botón de volver */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm" className="border-slate-300 dark:border-slate-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-orange-400" />
            Introducción al Trading Algorítmico
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Fundamentos del trading automatizado
          </p>
        </div>
      </div>

      {/* Progreso del bloque */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-orange-500/30">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso del Bloque</span>
            <span className="text-sm font-bold text-orange-400">
              {completedLessons.length} / {lessons.length} lecciones
            </span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-full h-2 transition-all duration-300" 
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Pestañas de lecciones */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => toggleLesson(lesson.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeLesson === lesson.id
                ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                : 'bg-surface hover:bg-slate-700 text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {completedLessons.includes(lesson.id) && (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              )}
              <span className="whitespace-nowrap">
                {lesson.id}. {lesson.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna principal - Contenido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lección 1 */}
          {activeLesson === 1 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">1.</span>
                ¿Qué es el Trading Algorítmico?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                El <strong className="text-gray-900 dark:text-foreground">trading algorítmico</strong>, también conocido como trading automatizado o algotrading, 
                es el uso de programas informáticos y algoritmos para ejecutar operaciones en los mercados financieros 
                de manera automática, basándose en reglas y condiciones predefinidas.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <p className="text-sm text-orange-400 font-semibold mb-2">🔍 Definición Técnica</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Un algoritmo de trading es un conjunto de instrucciones específicas y repetibles que analiza datos 
                  del mercado (precio, volumen, indicadores) y toma decisiones de compra o venta sin intervención humana 
                  directa durante la ejecución.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">Evolución Histórica</h4>
              <p className="text-muted-foreground leading-relaxed">
                El trading algorítmico comenzó en la década de 1970 con sistemas básicos en las bolsas de Nueva York. 
                En los años 2000, con el auge de internet y la computación de alta velocidad, se popularizó entre traders 
                institucionales. Hoy en día, se estima que <strong className="text-orange-400">más del 70% del volumen</strong> en 
                mercados desarrollados proviene de algoritmos.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">¿Cómo Funciona?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Un sistema de trading algorítmico típico sigue este flujo:
              </p>

              <div className="grid gap-3">
                <div className="flex gap-3 items-start bg-slate-100 dark:bg-background/50 p-3 rounded-lg">
                  <span className="text-orange-400 font-bold">1</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Recepción de Datos</p>
                    <p className="text-xs text-muted-foreground">El algoritmo recibe datos de mercado en tiempo real (precios, volumen, noticias)</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start bg-slate-100 dark:bg-background/50 p-3 rounded-lg">
                  <span className="text-orange-400 font-bold">2</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Análisis y Procesamiento</p>
                    <p className="text-xs text-muted-foreground">Aplica indicadores técnicos, patrones y reglas predefinidas</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start bg-slate-100 dark:bg-background/50 p-3 rounded-lg">
                  <span className="text-orange-400 font-bold">3</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Generación de Señales</p>
                    <p className="text-xs text-muted-foreground">Determina si se cumplen las condiciones para comprar, vender o mantener</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start bg-slate-100 dark:bg-background/50 p-3 rounded-lg">
                  <span className="text-orange-400 font-bold">4</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Ejecución de Órdenes</p>
                    <p className="text-xs text-muted-foreground">Envía automáticamente las órdenes al broker para su ejecución</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start bg-slate-100 dark:bg-background/50 p-3 rounded-lg">
                  <span className="text-orange-400 font-bold">5</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Gestión de Posiciones</p>
                    <p className="text-xs text-muted-foreground">Monitorea posiciones abiertas, aplica stop loss, take profit y trailing stops</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 2 */}
          {activeLesson === 2 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">2.</span>
                Ventajas del Trading Automatizado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                El trading algorítmico ofrece ventajas significativas sobre el trading manual tradicional. 
                Estas ventajas no son solo operativas, sino que impactan directamente en los resultados.
              </p>

              <div className="space-y-4 mt-4">
                <div className="space-y-3">
                  {/* Ventaja 1 */}
                  <div className="bg-background/50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-bold text-orange-400 mb-2">✓ Eliminación del Factor Emocional</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      El algoritmo ejecuta sin miedo ni codicia. Si el RSI baja de 30, compra. Si toca el stop loss, cierra. Sin excepciones.
                    </p>
                  </div>

                  {/* Ventaja 2 */}
                  <div className="bg-background/50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-bold text-orange-400 mb-2">✓ Velocidad y Precisión</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Procesa datos y ejecuta en <strong className="text-foreground">milisegundos</strong>. Puede monitorear cientos de activos simultáneamente.
                    </p>
                  </div>

                  {/* Ventaja 3 */}
                  <div className="bg-background/50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-bold text-orange-400 mb-2">✓ Consistencia Total</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      La estrategia se aplica exactamente igual en cada operación. Permite evaluar objetivamente si funciona.
                    </p>
                  </div>

                  {/* Ventaja 4 */}
                  <div className="bg-background/50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-bold text-orange-400 mb-2">✓ Backtesting Rápido</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Prueba <strong className="text-foreground">años de datos en minutos</strong>. Optimiza antes de arriesgar capital real.
                    </p>
                  </div>

                  {/* Ventaja 5 */}
                  <div className="bg-background/50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-bold text-orange-400 mb-2">✓ Operación 24/7</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      El bot nunca duerme. Captura oportunidades mientras descansas, sin fatiga ni pérdida de concentración.
                    </p>
                  </div>

                  {/* Ventaja 6 */}
                  <div className="bg-background/50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-bold text-orange-400 mb-2">✓ Diversificación</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Ejecuta 10 estrategias en 50 activos sin esfuerzo adicional. Reduce riesgo y suaviza retornos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-orange-400 mb-2">💡 Ventaja Clave</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La mayor ventaja del trading algorítmico no es "ganar más dinero automáticamente", sino <strong className="text-foreground">
                  poder sistematizar, probar y refinar estrategias de forma científica</strong>. Conviertes el trading de un arte 
                  subjetivo a una ciencia medible y repetible.
                </p>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 3 */}
          {activeLesson === 3 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">3.</span>
                Componentes de una Estrategia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                Toda estrategia algorítmica exitosa se compone de elementos bien definidos. Entender estos componentes 
                es fundamental para diseñar tus propias estrategias.
              </p>

              <div className="space-y-4 mt-4">
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-gray-900 dark:text-foreground mb-2 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">1</span>
                    Condiciones de Entrada (Entry Rules)
                  </h5>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    Define <strong className="text-foreground">exactamente cuándo</strong> el algoritmo debe abrir una posición. 
                    Estas condiciones deben ser objetivas y verificables.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900/50 p-3 rounded font-mono text-xs text-green-400">
                    <p>Ejemplo:</p>
                    <p className="mt-2">• RSI(14) {'<'} 30 (sobreventa)</p>
                    <p>• Precio cruza por encima de SMA(200)</p>
                    <p>• Volumen {'>'} promedio de 20 períodos</p>
                    <p className="text-orange-400 mt-2">→ SI todas se cumplen: COMPRAR</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-gray-900 dark:text-foreground mb-2 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">2</span>
                    Condiciones de Salida (Exit Rules)
                  </h5>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    Igual de importante que la entrada. Define cuándo cerrar una posición para tomar ganancias o cortar pérdidas.
                  </p>
                  <div className="space-y-2">
                    <div className="flex gap-2 items-start">
                      <span className="text-green-400">•</span>
                      <p className="text-muted-foreground text-xs"><strong className="text-foreground">Take Profit:</strong> Objetivo de ganancia (ej: +100 pips o +5%)</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="text-red-400">•</span>
                      <p className="text-muted-foreground text-xs"><strong className="text-foreground">Stop Loss:</strong> Límite de pérdida máxima (ej: -50 pips o -2%)</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="text-blue-400">•</span>
                      <p className="text-muted-foreground text-xs"><strong className="text-foreground">Trailing Stop:</strong> Stop que se mueve con el precio a favor</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="text-purple-400">•</span>
                      <p className="text-muted-foreground text-xs"><strong className="text-foreground">Señales técnicas:</strong> Cruces de indicadores, cambios de tendencia</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-gray-900 dark:text-foreground mb-2 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">3</span>
                    Gestión de Riesgo (Risk Management)
                  </h5>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    Determina <strong className="text-foreground">cuánto capital</strong> arriesgar en cada operación. 
                    Este es el componente que más protege tu cuenta.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-orange-400 font-bold">→</span>
                      <span><strong className="text-foreground">Tamaño de posición fijo:</strong> 0.1 lotes siempre</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-orange-400 font-bold">→</span>
                      <span><strong className="text-foreground">% del capital:</strong> Usar 2% del balance por operación</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-orange-400 font-bold">→</span>
                      <span><strong className="text-foreground">% de riesgo:</strong> Arriesgar 1% con stop loss dinámico</span>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-gray-900 dark:text-foreground mb-2 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">4</span>
                    Timeframe (Marco Temporal)
                  </h5>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    El período de tiempo en el que opera la estrategia. Diferentes timeframes tienen diferentes características.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <p className="text-yellow-400 font-semibold">Scalping (1m, 5m)</p>
                      <p className="text-muted-foreground">Muchas operaciones, rápidas, pequeñas ganancias</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <p className="text-blue-400 font-semibold">Day Trading (15m, 1h)</p>
                      <p className="text-muted-foreground">Operaciones intradía, sin overnight</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <p className="text-purple-400 font-semibold">Swing (4h, 1d)</p>
                      <p className="text-muted-foreground">Mantiene posiciones días/semanas</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <p className="text-green-400 font-semibold">Position (1d, 1w)</p>
                      <p className="text-muted-foreground">Largo plazo, menos operaciones</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-gray-900 dark:text-foreground mb-2 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">5</span>
                    Filtros y Condiciones Adicionales
                  </h5>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    Restricciones adicionales que mejoran la calidad de las señales y evitan operaciones en condiciones adversas.
                  </p>
                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground">• <strong className="text-foreground">Horario:</strong> Solo operar durante sesión europea (8:00-16:00 GMT)</p>
                    <p className="text-muted-foreground">• <strong className="text-foreground">Tendencia:</strong> Solo comprar si precio está por encima de SMA200</p>
                    <p className="text-muted-foreground">• <strong className="text-foreground">Volatilidad:</strong> No operar si ATR es muy bajo (mercado sin movimiento)</p>
                    <p className="text-muted-foreground">• <strong className="text-foreground">Calendario:</strong> No operar durante noticias de alto impacto (NFP, FOMC)</p>
                    <p className="text-muted-foreground">• <strong className="text-foreground">Correlaciones:</strong> No abrir 3 posiciones largas en EUR simultáneamente</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-orange-400 mb-2">🎯 Regla de Oro</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Una estrategia completa debe poder describirse en un documento de una página. Si no puedes explicar 
                  claramente cada componente, tu estrategia necesita más trabajo. <strong className="text-foreground">La simplicidad 
                  es clave en trading algorítmico exitoso.</strong>
                </p>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 4 */}
          {activeLesson === 4 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">4.</span>
                Indicadores Técnicos Básicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                Los indicadores técnicos son cálculos matemáticos basados en el precio, volumen o interés abierto de un activo. 
                Son el lenguaje que los algoritmos utilizan para "leer" el mercado y tomar decisiones.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <p className="text-sm text-orange-400 font-semibold mb-2">💡 Ventaja Algorítmica</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Mientras un trader manual puede calcular mentalmente 2-3 indicadores, un algoritmo puede procesar 
                  <strong className="text-foreground"> docenas de indicadores en múltiples timeframes simultáneamente</strong>, 
                  identificando patrones complejos que serían imposibles de detectar a simple vista.
                </p>
              </div>

              <h5 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">Categorías de Indicadores</h5>

              {/* Indicadores organizados de forma más simple */}
              <div className="space-y-4">
                {/* Grupo 1: Indicadores de Tendencia y Momentum */}
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h6 className="font-bold text-orange-400 mb-4">Indicadores de Tendencia y Momentum</h6>
                  
                  <div className="space-y-4">
                    {/* SMA/EMA */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-foreground">SMA / EMA (Medias Móviles)</p>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">Básico</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Suavizan el precio calculando el promedio de N períodos. La EMA da más peso a precios recientes.
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded font-mono text-xs text-orange-400">
                        <p>SMA(20) = (Precio₁ + Precio₂ + ... + Precio₂₀) / 20</p>
                      </div>
                    </div>

                    {/* MACD */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-foreground">MACD</p>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">Intermedio</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Muestra la relación entre dos medias móviles. Identifica cambios en momentum y dirección de tendencia.
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded font-mono text-xs text-orange-400">
                        <p>MACD = EMA(12) - EMA(26)</p>
                      </div>
                    </div>

                    {/* RSI */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-foreground">RSI (Relative Strength Index)</p>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">Básico</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Oscila entre 0-100. Compara ganancias vs pérdidas recientes. RSI &gt; 70 = sobrecompra, &lt; 30 = sobreventa.
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded font-mono text-xs text-orange-400">
                        <p>RSI = 100 - (100 / (1 + RS))</p>
                      </div>
                    </div>

                    {/* ADX */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-foreground">ADX (Average Directional Index)</p>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">Avanzado</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mide la <strong className="text-foreground">fuerza</strong> de la tendencia. ADX &gt; 25 = tendencia fuerte.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grupo 2: Indicadores de Volatilidad */}
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h6 className="font-bold text-orange-400 mb-4">Indicadores de Volatilidad</h6>
                  
                  <div className="space-y-4">
                    {/* Bollinger Bands */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-foreground">Bandas de Bollinger</p>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">Básico</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Media móvil central y dos bandas a ±2 desviaciones estándar. Muestran volatilidad del mercado.
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded font-mono text-xs text-orange-400">
                        <p>Banda Superior = SMA(20) + 2×StdDev</p>
                      </div>
                    </div>

                    {/* ATR */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-foreground">ATR (Average True Range)</p>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">Intermedio</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Mide el rango promedio de movimiento. <strong className="text-foreground">Esencial para calcular stops dinámicos.</strong>
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded font-mono text-xs text-orange-400">
                        <p>Stop Loss típico = 2×ATR</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-orange-400 mb-2">🎯 Regla de Combinación</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">No uses un solo indicador.</strong> Combina indicadores de diferentes categorías: 
                  tendencia + momentum + volumen. Ejemplo: "Comprar cuando precio &gt; SMA200 (tendencia) Y RSI &lt; 30 (momentum) 
                  Y volumen &gt; promedio (confirmación)". Esto reduce señales falsas significativamente.
                </p>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 5 */}
          {activeLesson === 5 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">5.</span>
                Gestión de Riesgo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                La gestión de riesgo es <strong className="text-foreground">el componente más importante</strong> de cualquier sistema de trading. 
                Puedes tener una estrategia con 40% de win rate y ser rentable con buena gestión de riesgo, 
                o tener 70% de win rate y quebrar con mala gestión.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-300 font-semibold mb-2">⚠️ Realidad del Trading</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  El <strong className="text-foreground">95% de traders pierden dinero</strong>. La razón #1 no es tener malas estrategias, 
                  es la <strong className="text-foreground">falta de gestión de riesgo</strong>. Una sola operación mal gestionada puede 
                  borrar meses de ganancias.
                </p>
              </div>

              <h5 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">Principios Fundamentales</h5>

              <div className="space-y-4">
                {/* Regla del 1-2% */}
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h6 className="font-bold text-gray-900 dark:text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">1</span>
                    Regla del 1-2% por Operación
                  </h6>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                    <strong className="text-foreground">Nunca arriesgues más del 1-2% de tu capital en una sola operación.</strong> 
                    Esto significa que si pierdes, solo pierdes 1-2% de tu cuenta.
                  </p>
                  
                  <div className="bg-slate-100 dark:bg-slate-900/50 p-3 rounded mb-3">
                    <p className="text-xs text-muted-foreground mb-2">Ejemplo con cuenta de $10,000:</p>
                    <div className="space-y-1 font-mono text-xs">
                      <p className="text-green-400">• Riesgo 1% = $100 por operación</p>
                      <p className="text-blue-400">• Riesgo 2% = $200 por operación</p>
                      <p className="text-red-400">• Riesgo 10% = $1,000 por operación ❌</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-green-500/10 border border-green-500/30 p-2 rounded">
                      <p className="font-semibold text-green-400 mb-1">Con 1% de riesgo:</p>
                      <p className="text-muted-foreground">Puedes perder 50 operaciones seguidas y aún tener $60,500 (60.5% de capital)</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 p-2 rounded">
                      <p className="font-semibold text-red-400 mb-1">Con 10% de riesgo:</p>
                      <p className="text-muted-foreground">5 pérdidas seguidas = -40% de capital. Necesitas +67% para recuperar.</p>
                    </div>
                  </div>
                </div>

                {/* Risk:Reward Ratio */}
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h6 className="font-bold text-gray-900 dark:text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">2</span>
                    Ratio Riesgo:Beneficio (R:R)
                  </h6>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                    Relación entre lo que arriesgas (stop loss) y lo que esperas ganar (take profit). 
                    Mínimo recomendado: <strong className="text-foreground">1:2</strong>.
                  </p>

                  <div className="bg-slate-900/50 p-3 rounded mb-3 font-mono text-xs">
                    <p className="text-orange-400 mb-2">Ejemplo R:R 1:2:</p>
                    <p className="text-muted-foreground">• Entrada: $100</p>
                    <p className="text-red-400">• Stop Loss: $98 (pierdes $2)</p>
                    <p className="text-green-400">• Take Profit: $104 (ganas $4)</p>
                    <p className="text-blue-400 mt-2">→ Arriesgas $2 para ganar $4</p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded">
                    <p className="text-xs font-semibold text-blue-400 mb-2">💡 Ventaja Matemática</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Con R:R de 1:2, solo necesitas <strong className="text-foreground">35% de win rate</strong> para ser rentable. 
                      Con R:R de 1:3, necesitas solo 26%. Esto te da un margen de error enorme.
                    </p>
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <p className="text-muted-foreground">Cálculo de win rate mínimo necesario:</p>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded font-mono text-green-400">
                      <p>Win Rate = 1 / (1 + R:R)</p>
                      <p className="text-muted-foreground mt-1">• R:R 1:1 → 50% win rate</p>
                      <p className="text-muted-foreground">• R:R 1:2 → 35% win rate</p>
                      <p className="text-muted-foreground">• R:R 1:3 → 26% win rate</p>
                    </div>
                  </div>
                </div>

                {/* Position Sizing */}
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h6 className="font-bold text-gray-900 dark:text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">3</span>
                    Cálculo de Tamaño de Posición
                  </h6>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                    Determinar cuántos lotes/contratos operar según tu riesgo definido y tu stop loss.
                  </p>

                  <div className="bg-slate-100 dark:bg-slate-900/50 p-3 rounded mb-3">
                    <p className="text-xs text-orange-400 font-semibold mb-2">Fórmula Universal:</p>
                    <div className="font-mono text-xs text-green-400">
                      <p>Tamaño = (Capital × % Riesgo) / Distancia Stop Loss</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-3 rounded">
                    <p className="text-xs font-semibold text-blue-400 mb-2">Ejemplo Práctico</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Capital: $10,000</p>
                      <p>• Riesgo por operación: 2% = $200</p>
                      <p>• Entrada EUR/USD: 1.1000</p>
                      <p>• Stop Loss: 1.0950 (50 pips = $50 por lote mini)</p>
                      <p className="text-green-400 font-mono mt-2">→ Tamaño = $200 / $50 = 4 lotes mini (0.4 lotes estándar)</p>
                    </div>
                  </div>

                  <div className="mt-3 bg-orange-500/10 border border-orange-500/30 p-2 rounded">
                    <p className="text-xs text-orange-400 font-semibold">⚡ Ventaja Algorítmica</p>
                    <p className="text-xs text-muted-foreground">
                      El algoritmo calcula esto <strong className="text-foreground">automáticamente</strong> en cada operación. 
                      Un trader manual debe hacer esta matemática mentalmente en cada trade, lo que genera errores.
                    </p>
                  </div>
                </div>

                {/* Drawdown Maximum */}
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h6 className="font-bold text-gray-900 dark:text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">4</span>
                    Drawdown Máximo Permitido
                  </h6>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                    El drawdown es la caída desde el pico máximo de capital. Define un límite de pérdida total 
                    antes de <strong className="text-foreground">detener operaciones</strong>.
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-2 rounded">
                      <p className="font-semibold text-yellow-400 mb-1">Drawdown Conservador</p>
                      <p className="text-muted-foreground">Máximo 10-15% de pérdida desde el pico antes de parar</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 p-2 rounded">
                      <p className="font-semibold text-red-400 mb-1">Drawdown Agresivo</p>
                      <p className="text-muted-foreground">Máximo 20-25% antes de parar (alto riesgo)</p>
                    </div>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-900/50 p-3 rounded">
                    <p className="text-xs text-muted-foreground mb-2">Ejemplo de protección:</p>
                    <div className="font-mono text-xs space-y-1">
                      <p className="text-green-400">• Capital inicial: $10,000</p>
                      <p className="text-blue-400">• Pico máximo alcanzado: $12,000</p>
                      <p className="text-orange-400">• Drawdown máximo: 15%</p>
                      <p className="text-red-400">• Si capital cae a $10,200 ($12,000 - 15%)</p>
                      <p className="text-yellow-400 mt-2">→ STOP: Revisar estrategia antes de continuar</p>
                    </div>
                  </div>
                </div>

                {/* Diversificación */}
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h6 className="font-bold text-gray-900 dark:text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">5</span>
                    Diversificación y Correlación
                  </h6>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                    No pongas todos los huevos en la misma canasta. Opera múltiples activos no correlacionados.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">❌</span>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Malo:</strong> Abrir 5 posiciones largas en EUR/USD, EUR/GBP, EUR/JPY simultáneamente. 
                        Si EUR baja, todas pierden.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Bueno:</strong> EUR/USD, Gold, Bitcoin, S&P500. Son activos con baja correlación. 
                        Si uno cae, otros pueden compensar.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-purple-500/10 border border-purple-500/30 p-3 rounded">
                    <p className="text-xs font-semibold text-purple-400 mb-2">🤖 Ventaja del Trading Algorítmico</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Tu algoritmo puede monitorear correlaciones en tiempo real y <strong className="text-foreground">rechazar automáticamente</strong> 
                      una operación si ya tienes 3 posiciones altamente correlacionadas abiertas. Imposible de hacer manualmente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-red-400 mb-2">🎯 Regla de Oro de Riesgo</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">"Preservar el capital es más importante que hacer ganancias."</strong> 
                  Un trader que protege su capital puede seguir operando y aprendiendo. Un trader que pierde todo su capital, 
                  está fuera del juego. Las estrategias más exitosas del mundo no sobreviven sin gestión de riesgo sólida.
                </p>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 6 */}
          {activeLesson === 6 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">6.</span>
                Backtesting: Validando tu Estrategia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                El backtesting es el proceso de <strong className="text-foreground">probar una estrategia contra datos históricos</strong> 
                para ver cómo habría funcionado en el pasado. Es la diferencia entre operar a ciegas y operar con confianza estadística.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <p className="text-sm text-orange-400 font-semibold mb-2">🚀 La Gran Ventaja del Trading Algorítmico</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  En trading manual, para probar una estrategia necesitarías operar meses o años. En trading algorítmico, 
                  puedes <strong className="text-foreground">probar 10 años de datos en 5 minutos</strong>. Esto acelera exponencialmente 
                  tu curva de aprendizaje y reduce el riesgo de capital.
                </p>
              </div>

              <h5 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">¿Por Qué Hacer Backtesting?</h5>

              <div className="space-y-2 text-xs">
                <div className="bg-background/50 p-3 rounded-lg border-l-4 border-orange-500">
                  <p className="font-semibold text-orange-400 mb-1">✓ Validación Estadística</p>
                  <p className="text-muted-foreground">Saber si tu estrategia tiene ventaja estadística real o es suerte</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border-l-4 border-orange-500">
                  <p className="font-semibold text-orange-400 mb-1">✓ Métricas Clave</p>
                  <p className="text-muted-foreground">Win rate, profit factor, drawdown máximo, sharpe ratio</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border-l-4 border-orange-500">
                  <p className="font-semibold text-orange-400 mb-1">✓ Identificar Debilidades</p>
                  <p className="text-muted-foreground">Ver en qué condiciones de mercado falla tu estrategia</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border-l-4 border-orange-500">
                  <p className="font-semibold text-orange-400 mb-1">✓ Confianza Psicológica</p>
                  <p className="text-muted-foreground">Saber que funcionó en el pasado te ayuda a seguirla en vivo</p>
                </div>
              </div>

              <h5 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">Proceso de Backtesting</h5>

              <div className="space-y-3">
                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">1</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">Definir Estrategia Claramente</p>
                      <p className="text-xs text-muted-foreground">
                        Reglas de entrada, salida, gestión de riesgo. Todo debe ser objetivo y replicable.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded text-xs font-mono text-green-400">
                    <p>IF RSI(14) &lt; 30 AND Precio &gt; SMA(200) THEN Comprar</p>
                    <p>Stop Loss = 2×ATR(14)</p>
                    <p>Take Profit = 3×ATR(14)</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">2</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">Obtener Datos Históricos de Calidad</p>
                      <p className="text-xs text-muted-foreground">
                        Mínimo 3-5 años de datos. Incluye diferentes condiciones de mercado (tendencia, lateral, volátil).
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">2008-2009: Crisis</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">2010-2019: Bull market</span>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">2020: COVID volatilidad</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">2021-2023: Inflación</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">3</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">Ejecutar Backtest</p>
                      <p className="text-xs text-muted-foreground">
                        Simular cada operación como si estuvieras operando en vivo. Incluir comisiones y slippage.
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-2 rounded text-xs">
                    <p className="text-yellow-400 font-semibold mb-1">⚠️ Importante</p>
                    <p className="text-muted-foreground">
                      Incluye <strong className="text-foreground">costos reales</strong>: spreads ($3-5 por trade), comisiones, 
                      slippage (1-2 pips). Un backtest sin costos es fantasía.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">4</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">Analizar Resultados</p>
                      <p className="text-xs text-muted-foreground">
                        Revisar métricas clave y curva de equity. ¿Es consistente o tiene períodos largos de pérdida?
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Métricas Esenciales:</p>
                      <div className="space-y-1 text-xs font-mono">
                        <p className="text-green-400">• Total de Trades: 342</p>
                        <p className="text-blue-400">• Win Rate: 58%</p>
                        <p className="text-purple-400">• Profit Factor: 1.8</p>
                        <p className="text-orange-400">• Max Drawdown: 12%</p>
                        <p className="text-pink-400">• Sharpe Ratio: 1.4</p>
                      </div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Qué Buscar:</p>
                      <div className="space-y-1 text-xs">
                        <p className="text-green-400">✓ Profit Factor &gt; 1.5</p>
                        <p className="text-green-400">✓ Sharpe Ratio &gt; 1.0</p>
                        <p className="text-green-400">✓ Min 100 trades</p>
                        <p className="text-green-400">✓ Drawdown &lt; 20%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">5</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">Forward Testing (Paper Trading)</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Antes de arriesgar dinero real, opera en demo por 1-3 meses. Confirma que los resultados 
                        del backtest se replican en tiempo real.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/30 p-2 rounded">
                        <p className="text-xs text-blue-400">
                          Si forward test coincide con backtest → estrategia robusta. Si difiere mucho → posible overfitting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">Errores Comunes en Backtesting</h5>

              <div className="space-y-3">
                <div className="border-l-4 border-red-500 bg-red-500/10 p-3 rounded-r-lg">
                  <p className="font-bold text-red-400 mb-2">❌ Overfitting (Sobre-optimización)</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Ajustar parámetros hasta que funcionen perfectamente en datos históricos, pero fallan en vivo.
                  </p>
                  <p className="text-xs text-red-300">
                    <strong>Ejemplo:</strong> "RSI funciona mejor con período 17.3 y nivel 32.8" → Demasiado específico, no funcionará en vivo.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-3 rounded-r-lg">
                  <p className="font-bold text-yellow-400 mb-2">⚠️ Look-Ahead Bias</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Usar información del futuro que no estarías disponible en tiempo real.
                  </p>
                  <p className="text-xs text-yellow-300">
                    <strong>Ejemplo:</strong> "Comprar en el mínimo del día" → No sabes cuál es el mínimo hasta que el día termine.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-500/10 p-3 rounded-r-lg">
                  <p className="font-bold text-orange-400 mb-2">⚠️ Ignorar Costos de Transacción</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    No incluir spreads, comisiones y slippage. Una estrategia de scalping con 100 trades/día puede ser 
                    rentable en backtest sin costos, pero perder dinero en vivo.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-500/10 p-3 rounded-r-lg">
                  <p className="font-bold text-purple-400 mb-2">⚠️ Datos de Baja Calidad</p>
                  <p className="text-xs text-muted-foreground">
                    Datos con gaps, precios incorrectos o sin ajustes por splits/dividendos generan resultados irreales.
                  </p>
                </div>
              </div>

              <h5 className="text-lg font-semibold text-gray-900 dark:text-foreground mt-6">Métricas Clave Explicadas</h5>

              <div className="grid gap-3">
                <div className="bg-slate-50 dark:bg-background/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900 dark:text-foreground">Profit Factor</p>
                    <span className="text-xs bg-green-500/30 px-2 py-1 rounded">Meta: &gt; 1.5</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Ganancia bruta / Pérdida bruta. Mide cuánto ganas por cada dólar perdido.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded font-mono text-xs text-green-400">
                    <p>Profit Factor = $50,000 (ganancias) / $25,000 (pérdidas) = 2.0</p>
                    <p className="text-muted-foreground mt-1">→ Por cada $1 perdido, ganas $2</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900 dark:text-foreground">Sharpe Ratio</p>
                    <span className="text-xs bg-blue-500/30 px-2 py-1 rounded">Meta: &gt; 1.0</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Mide rentabilidad ajustada al riesgo. Cuánto retorno obtienes por unidad de riesgo.
                  </p>
                  <div className="text-xs space-y-1">
                    <p className="text-green-400">• Sharpe &gt; 2.0 = Excelente</p>
                    <p className="text-blue-400">• Sharpe 1.0-2.0 = Bueno</p>
                    <p className="text-yellow-400">• Sharpe 0.5-1.0 = Aceptable</p>
                    <p className="text-red-400">• Sharpe &lt; 0.5 = Pobre</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900 dark:text-foreground">Maximum Drawdown</p>
                    <span className="text-xs bg-red-500/30 px-2 py-1 rounded">Meta: &lt; 20%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Mayor caída desde un pico de capital. Indica el peor momento que experimentarías.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded text-xs">
                    <p className="text-muted-foreground">Si tu drawdown histórico fue 15%:</p>
                    <p className="text-orange-400 mt-1">→ Prepárate psicológicamente para ver tu cuenta bajar 15% en vivo</p>
                    <p className="text-red-400 mt-1">→ Probablemente verás 20-25% en el futuro (siempre es peor en vivo)</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-orange-400 mb-2">🎯 Mindset Correcto</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Un backtest no predice el futuro, pero <strong className="text-foreground">te da confianza estadística</strong>. 
                  Si tu estrategia funcionó en 1000 trades en 5 años de datos diversos, tienes evidencia de que tiene una ventaja. 
                  <strong className="text-foreground">La diferencia entre un trader profesional y un amateur es que el profesional 
                  testea todo antes de arriesgar capital.</strong>
                </p>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Botones de navegación entre lecciones */}
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={goToPreviousLesson}
              disabled={activeLesson === 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Lección Anterior
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Lección {activeLesson} de {lessons.length}
            </span>

            <Button
              onClick={goToNextLesson}
              disabled={activeLesson === lessons.length}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              Siguiente Lección
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Conclusión del Bloque */}
          <Card className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-orange-500/30">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-foreground">🎓 ¡Felicitaciones!</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Has completado la introducción al Trading Algorítmico. Ahora conoces los fundamentos que separan 
                  a los traders exitosos de los que fracasan: <strong className="text-foreground">automatización, gestión de riesgo 
                  y validación estadística</strong>.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                    Siguiente Bloque: Indicadores Avanzados
                  </Button>
                  <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-500/10">
                    Volver a Bloques
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral - Índice de lecciones */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-surface sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Índice del Bloque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-background/50 transition-colors text-left"
                >
                  <div className="mt-0.5">
                    {completedLessons.includes(lesson.id) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/**
 * Bloque 2: Indicadores Técnicos Avanzados
 */
function AdvancedIndicatorsBlock({ onBack }: { onBack: () => void }) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [activeLesson, setActiveLesson] = useState<number>(1)

  const lessons = [
    { id: 1, title: 'Medias Móviles: El Fundamento', duration: '10 min' },
    { id: 2, title: 'Bandas de Bollinger', duration: '12 min' },
    { id: 3, title: 'MACD: Momentum y Tendencia', duration: '14 min' },
    { id: 4, title: 'Fibonacci y Retrocesos', duration: '15 min' },
    { id: 5, title: 'Ichimoku Cloud', duration: '18 min' },
    { id: 6, title: 'Volume Profile y Order Flow', duration: '16 min' },
    { id: 7, title: 'Divergencias: Señales Ocultas', duration: '14 min' },
  ]

  const toggleLesson = (id: number) => {
    setActiveLesson(id)
    if (!completedLessons.includes(id)) {
      setCompletedLessons(prev => [...prev, id])
    }
  }

  const goToNextLesson = () => {
    if (activeLesson < lessons.length) {
      setActiveLesson(activeLesson + 1)
    }
  }

  const goToPreviousLesson = () => {
    if (activeLesson > 1) {
      setActiveLesson(activeLesson - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con botón de volver */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Bloques
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Indicadores Técnicos Avanzados
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Herramientas profesionales para análisis de mercado
          </p>
        </div>
      </div>

      {/* Progreso del bloque */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-orange-500/30">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso del Bloque</span>
            <span className="text-sm font-bold text-orange-400">
              {completedLessons.length} / {lessons.length} lecciones
            </span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-full h-2 transition-all duration-300" 
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Pestañas de lecciones */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => toggleLesson(lesson.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeLesson === lesson.id
                ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                : 'bg-surface hover:bg-slate-700 text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {completedLessons.includes(lesson.id) && (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              )}
              <span className="whitespace-nowrap">
                {lesson.id}. {lesson.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna principal - Contenido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lección 1: Medias Móviles */}
          {activeLesson === 1 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">1.</span>
                Medias Móviles: El Fundamento
              </CardTitle>
              <CardDescription>La base de todo análisis técnico</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Las Medias Móviles son el <strong className="text-foreground">indicador más fundamental en análisis técnico</strong>. 
                  Suavizan el ruido del precio para revelar la dirección de la tendencia. Casi todos los indicadores avanzados se basan 
                  en medias móviles de alguna forma. Dominarlas es esencial.
                </p>

                {/* Visualización: Tipos de Medias Móviles */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-400" />
                    Visualización: SMA vs EMA
                  </h4>
                  <div className="relative h-64 bg-slate-950 rounded-lg p-4 overflow-hidden">
                    {/* Grid */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="absolute left-0 right-0 border-t border-slate-700" style={{ top: `${i * 25}%` }} />
                      ))}
                    </div>

                    {/* Precio (línea irregular) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                      <path
                        d="M 0 120 L 30 130 L 60 110 L 90 140 L 120 100 L 150 90 L 180 120 L 210 80 L 240 70 L 270 100 L 300 60 L 330 80 L 360 50 L 390 70 L 420 40 L 450 60 L 480 30 L 510 50 L 540 20 L 570 40 L 600 30"
                        fill="none"
                        stroke="rgb(148, 163, 184)"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                    </svg>

                    {/* SMA (Simple Moving Average) - más lenta */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                      <path
                        d="M 0 120 Q 100 120, 200 90 T 400 50 T 600 35"
                        fill="none"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="2.5"
                        opacity="0.9"
                      />
                    </svg>

                    {/* EMA (Exponential Moving Average) - más rápida */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 3 }}>
                      <path
                        d="M 0 120 Q 80 115, 160 85 T 320 45 T 480 25 L 600 28"
                        fill="none"
                        stroke="rgb(251, 146, 60)"
                        strokeWidth="2.5"
                        opacity="1"
                      />
                    </svg>

                    {/* Leyenda */}
                    <div className="absolute top-2 right-4 text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-slate-400 opacity-50"></div>
                        <span className="text-slate-400">Precio</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-blue-500"></div>
                        <span className="text-blue-400">SMA(20)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-orange-500"></div>
                        <span className="text-orange-400">EMA(20)</span>
                      </div>
                    </div>

                    {/* Anotaciones */}
                    <div className="absolute" style={{ left: '60%', top: '20%' }}>
                      <div className="bg-orange-500/20 px-2 py-1 rounded text-xs text-orange-400 whitespace-nowrap">
                        EMA reacciona más rápido
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    La EMA da más peso a precios recientes, siguiendo cambios más rápido que la SMA
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">📊 Tipos de Medias Móviles</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-blue-200 dark:border-blue-900/30">
                      <p className="font-semibold text-blue-400 mb-1">SMA (Simple Moving Average)</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Promedio aritmético simple. Todos los períodos tienen el mismo peso.
                      </p>
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        SMA = (P1 + P2 + ... + Pn) / n
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <strong className="text-foreground">Uso:</strong> Niveles de soporte/resistencia, tendencias a largo plazo
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-orange-200 dark:border-orange-900/30">
                      <p className="font-semibold text-orange-400 mb-1">EMA (Exponential Moving Average)</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Da más peso a precios recientes. <strong className="text-foreground">Reacciona más rápido</strong> a cambios de precio.
                      </p>
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        EMA = Price × K + EMA(prev) × (1 - K)<br/>
                        donde K = 2/(n+1)
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        <strong className="text-foreground">Uso:</strong> Trading activo, señales rápidas, cruces de medias
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">WMA (Weighted Moving Average)</p>
                      <p className="text-xs text-muted-foreground">
                        Similar a EMA pero con pesos lineales. Menos común en la práctica.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visualización: Períodos Comunes */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-400" />
                    Períodos Comunes y Sus Usos
                  </h4>
                  <div className="relative h-64 bg-slate-950 rounded-lg p-4 overflow-hidden">
                    {/* Grid */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="absolute left-0 right-0 border-t border-slate-700" style={{ top: `${i * 25}%` }} />
                      ))}
                    </div>

                    {/* Precio */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                      <path
                        d="M 0 160 L 50 150 L 100 140 L 150 120 L 200 100 L 250 90 L 300 70 L 350 60 L 400 50 L 450 40 L 500 35 L 550 30 L 600 25"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.7"
                      />
                    </svg>

                    {/* EMA 20 (corto plazo) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                      <path
                        d="M 0 160 Q 150 130, 300 80 T 600 32"
                        fill="none"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="2"
                        opacity="0.9"
                      />
                    </svg>

                    {/* EMA 50 (medio plazo) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                      <path
                        d="M 0 160 Q 200 135, 400 90 T 600 45"
                        fill="none"
                        stroke="rgb(251, 146, 60)"
                        strokeWidth="2"
                        opacity="0.9"
                      />
                    </svg>

                    {/* EMA 200 (largo plazo) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                      <path
                        d="M 0 160 Q 250 145, 450 110 L 600 85"
                        fill="none"
                        stroke="rgb(239, 68, 68)"
                        strokeWidth="2.5"
                        opacity="0.9"
                      />
                    </svg>

                    {/* Leyenda */}
                    <div className="absolute top-2 right-4 text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-white"></div>
                        <span className="text-white">Precio</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-green-500"></div>
                        <span className="text-green-400">EMA 20</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-orange-500"></div>
                        <span className="text-orange-400">EMA 50</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-red-500"></div>
                        <span className="text-red-400">EMA 200</span>
                      </div>
                    </div>

                    {/* Anotaciones */}
                    <div className="absolute bottom-4 left-4 text-xs space-y-1">
                      <p className="text-green-400">EMA 20: Tendencia a corto</p>
                      <p className="text-orange-400">EMA 50: Tendencia a medio</p>
                      <p className="text-red-400">EMA 200: La "línea sagrada"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🎯 Estrategias con Medias Móviles</h4>
                  <div className="space-y-3 text-sm">
                    {/* Golden Cross / Death Cross */}
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">1. Golden Cross / Death Cross</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Cruces de medias móviles de diferentes períodos generan señales de tendencia.
                      </p>
                      
                      {/* Visualización Cruces */}
                      <div className="bg-slate-950 rounded p-3 my-2">
                        <div className="relative h-40">
                          <svg className="absolute inset-0 w-full h-full">
                            {/* Golden Cross */}
                            <path d="M 0 100 Q 80 100, 160 80" stroke="rgb(34, 197, 94)" strokeWidth="2" fill="none" />
                            <path d="M 0 80 Q 80 90, 160 80" stroke="rgb(239, 68, 68)" strokeWidth="2" fill="none" />
                            <circle cx="160" cy="80" r="5" fill="rgb(251, 191, 36)" stroke="white" strokeWidth="2" />
                            <text x="50" y="60" fill="rgb(34, 197, 94)" fontSize="11" fontWeight="bold">GOLDEN CROSS</text>
                            <text x="55" y="120" fill="rgb(100, 116, 139)" fontSize="9">EMA corta cruza arriba →</text>
                            <text x="55" y="132" fill="rgb(34, 197, 94)" fontSize="9">Señal ALCISTA</text>

                            {/* Death Cross */}
                            <path d="M 240 40 Q 320 40, 400 60" stroke="rgb(34, 197, 94)" strokeWidth="2" fill="none" />
                            <path d="M 240 60 Q 320 50, 400 60" stroke="rgb(239, 68, 68)" strokeWidth="2" fill="none" />
                            <circle cx="400" cy="60" r="5" fill="rgb(71, 85, 105)" stroke="white" strokeWidth="2" />
                            <text x="290" y="30" fill="rgb(239, 68, 68)" fontSize="11" fontWeight="bold">DEATH CROSS</text>
                            <text x="295" y="90" fill="rgb(100, 116, 139)" fontSize="9">EMA corta cruza abajo →</text>
                            <text x="295" y="102" fill="rgb(239, 68, 68)" fontSize="9">Señal BAJISTA</text>

                            {/* Leyendas */}
                            <line x1="10" y1="155" x2="30" y2="155" stroke="rgb(34, 197, 94)" strokeWidth="2" />
                            <text x="35" y="158" fill="rgb(148, 163, 184)" fontSize="8">EMA 50</text>
                            
                            <line x1="90" y1="155" x2="110" y2="155" stroke="rgb(239, 68, 68)" strokeWidth="2" />
                            <text x="115" y="158" fill="rgb(148, 163, 184)" fontSize="8">EMA 200</text>
                          </svg>
                        </div>
                      </div>

                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        IF EMA(50) crosses above EMA(200)<br/>
                        THEN Golden Cross → Tendencia alcista<br/>
                        <br/>
                        IF EMA(50) crosses below EMA(200)<br/>
                        THEN Death Cross → Tendencia bajista
                      </div>
                    </div>

                    {/* MA como Soporte/Resistencia */}
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">2. MA como Soporte/Resistencia Dinámico</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Las medias móviles actúan como niveles donde el precio rebota.
                      </p>
                      
                      {/* Visualización Rebotes */}
                      <div className="bg-slate-950 rounded p-3 my-2">
                        <div className="relative h-32">
                          <svg className="absolute inset-0 w-full h-full">
                            {/* EMA 50 como soporte */}
                            <path d="M 0 80 L 400 80" stroke="rgb(251, 146, 60)" strokeWidth="2.5" opacity="0.9" />
                            
                            {/* Precio rebotando en la EMA */}
                            <path 
                              d="M 0 60 L 80 50 L 120 70 L 140 85 L 160 75 L 200 55 L 240 70 L 260 85 L 280 75 L 320 60 L 360 70 L 380 85 L 400 75" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="2"
                            />
                            
                            {/* Marcadores de rebote */}
                            <circle cx="140" cy="85" r="4" fill="rgb(34, 197, 94)" />
                            <circle cx="260" cy="85" r="4" fill="rgb(34, 197, 94)" />
                            <circle cx="380" cy="85" r="4" fill="rgb(34, 197, 94)" />
                            
                            <text x="150" y="105" fill="rgb(34, 197, 94)" fontSize="9">Rebote</text>
                            <text x="270" y="105" fill="rgb(34, 197, 94)" fontSize="9">Rebote</text>
                            
                            <text x="10" y="95" fill="rgb(251, 146, 60)" fontSize="10" fontWeight="bold">EMA 50 = Soporte</text>
                          </svg>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground mt-2">
                        En tendencias alcistas, el precio raramente cae por debajo de la EMA 50 por mucho tiempo.
                      </p>
                    </div>

                    {/* Estrategia de 3 EMAs */}
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">3. Sistema de 3 EMAs (Ribbon)</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Usar EMA 8, 21, 55 para detectar cambios de tendencia temprano.
                      </p>
                      
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        // Tendencia alcista fuerte<br/>
                        IF Price &gt; EMA(8) &gt; EMA(21) &gt; EMA(55)<br/>
                        THEN Buy<br/>
                        <br/>
                        // Cambio a bajista<br/>
                        IF EMA(8) crosses below EMA(21)<br/>
                        THEN Exit / Reverse
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-400 mb-2">💎 Pro Tips</p>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      1. <strong className="text-foreground">La EMA 200 es sagrada</strong> - En timeframes diarios, es el nivel 
                      más respetado por instituciones. Precio arriba = mercado alcista. Abajo = bajista.
                    </p>
                    <p>
                      2. <strong className="text-foreground">Nunca uses una sola MA</strong> - Combina al menos 2 períodos diferentes 
                      para confirmar tendencias y filtrar ruido.
                    </p>
                    <p>
                      3. <strong className="text-foreground">EMAs en timeframes altos &gt; bajos</strong> - Una EMA 50 en gráfico 
                      diario es mucho más confiable que en 5 minutos.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-2">💡 En Kumo</h4>
                  <p className="text-sm text-muted-foreground">
                    Usa condiciones como: <code className="text-orange-400 bg-slate-200 dark:bg-slate-900 px-1 rounded">
                    Close &gt; EMA(50) AND EMA(50) &gt; EMA(200)</code> para entrar solo en tendencias alcistas confirmadas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 2: Bandas de Bollinger */}
          {activeLesson === 2 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">2.</span>
                Bandas de Bollinger
              </CardTitle>
              <CardDescription>Volatilidad y zonas de precio extremas</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Las Bandas de Bollinger son uno de los <strong className="text-foreground">indicadores de volatilidad más populares</strong> 
                  en trading. Consisten en tres líneas: una media móvil central (típicamente SMA de 20 períodos) y dos bandas que se 
                  expanden o contraen según la desviación estándar del precio.
                </p>

                {/* Visualización de Bandas de Bollinger */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-400" />
                    Visualización: Anatomía de las Bandas de Bollinger
                  </h4>
                  <div className="relative h-64 bg-slate-950 rounded-lg p-4 overflow-hidden">
                    {/* Grid de fondo */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="absolute left-0 right-0 border-t border-slate-700" style={{ top: `${i * 25}%` }} />
                      ))}
                    </div>

                    {/* Banda Superior */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                      <path
                        d="M 0 40 Q 80 30, 160 35 T 320 40 T 480 35 T 640 45 T 800 40"
                        fill="none"
                        stroke="rgb(239, 68, 68)"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Banda Media (SMA) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                      <path
                        d="M 0 128 Q 80 120, 160 125 T 320 128 T 480 125 T 640 135 T 800 128"
                        fill="none"
                        stroke="rgb(251, 146, 60)"
                        strokeWidth="3"
                        opacity="1"
                      />
                    </svg>

                    {/* Banda Inferior */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                      <path
                        d="M 0 216 Q 80 210, 160 215 T 320 216 T 480 215 T 640 225 T 800 216"
                        fill="none"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Área entre bandas (zona de normalidad) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                      <path
                        d="M 0 40 Q 80 30, 160 35 T 320 40 T 480 35 T 640 45 T 800 40 L 800 216 Q 640 225, 480 215 T 160 215 T 0 216 Z"
                        fill="rgb(251, 146, 60)"
                        opacity="0.1"
                      />
                    </svg>

                    {/* Precio (línea blanca que interactúa con las bandas) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 3 }}>
                      <path
                        d="M 0 128 L 100 80 L 140 50 L 180 70 L 220 110 L 280 140 L 340 170 L 400 200 L 460 220 L 520 195 L 600 160 L 680 130 L 760 110 L 800 128"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        opacity="0.9"
                      />
                    </svg>

                    {/* Anotaciones */}
                    <div className="absolute top-2 right-4 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-0.5 bg-red-500 opacity-80"></div>
                        <span className="text-red-400">Banda Superior (+2σ)</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-0.5 bg-orange-500"></div>
                        <span className="text-orange-400">SMA(20)</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-0.5 bg-green-500 opacity-80"></div>
                        <span className="text-green-400">Banda Inferior (-2σ)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-white"></div>
                        <span className="text-white">Precio</span>
                      </div>
                    </div>

                    {/* Señales de ejemplo */}
                    <div className="absolute" style={{ left: '17%', top: '16%' }}>
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute -top-6 -left-8 text-xs text-red-400 font-semibold whitespace-nowrap">
                        Sobrecompra
                      </div>
                    </div>

                    <div className="absolute" style={{ left: '50%', top: '82%' }}>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="absolute top-4 -left-8 text-xs text-green-400 font-semibold whitespace-nowrap">
                        Sobreventa
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    Las bandas se expanden y contraen según la volatilidad del mercado
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">📊 Componentes de Bollinger</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-foreground">Banda Superior: SMA(20) + (2 × Desviación Estándar)</p>
                        <p className="text-xs text-muted-foreground">Zona de sobrecompra potencial</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-foreground">Banda Media: SMA de 20 períodos</p>
                        <p className="text-xs text-muted-foreground">Media móvil que actúa como referencia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-foreground">Banda Inferior: SMA(20) - (2 × Desviación Estándar)</p>
                        <p className="text-xs text-muted-foreground">Zona de sobreventa potencial</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🎯 Estrategias con Bollinger</h4>
                  <div className="space-y-3 text-sm">
                    {/* Estrategia 1: Bollinger Bounce */}
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-1">1. Bollinger Bounce (Rebote)</p>
                      <p className="text-muted-foreground text-xs mb-2">
                        Usado en mercados laterales. Compra cuando el precio toca la banda inferior, vende cuando toca la superior.
                      </p>
                      
                      {/* Visualización Bounce */}
                      <div className="bg-slate-950 rounded p-3 my-2">
                        <div className="relative h-32">
                          {/* Bandas */}
                          <svg className="absolute inset-0 w-full h-full">
                            <path d="M 0 20 L 400 20" stroke="rgb(239, 68, 68)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            <path d="M 0 64 L 400 64" stroke="rgb(251, 146, 60)" strokeWidth="2" opacity="0.8" />
                            <path d="M 0 108 L 400 108" stroke="rgb(34, 197, 94)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            
                            {/* Precio rebotando */}
                            <path 
                              d="M 0 64 L 50 90 L 100 105 L 150 90 L 200 64 L 250 38 L 300 25 L 350 38 L 400 64" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="2.5"
                            />
                            
                            {/* Flechas de entrada */}
                            <circle cx="100" cy="105" r="4" fill="rgb(34, 197, 94)" />
                            <path d="M 100 105 L 100 90" stroke="rgb(34, 197, 94)" strokeWidth="2" markerEnd="url(#arrowgreen)" />
                            <text x="105" y="115" fill="rgb(34, 197, 94)" fontSize="10">COMPRA</text>
                            
                            <circle cx="300" cy="25" r="4" fill="rgb(239, 68, 68)" />
                            <path d="M 300 25 L 300 40" stroke="rgb(239, 68, 68)" strokeWidth="2" />
                            <text x="305" y="20" fill="rgb(239, 68, 68)" fontSize="10">VENTA</text>
                          </svg>
                        </div>
                        <p className="text-xs text-slate-400 text-center mt-2">Precio rebota entre bandas en mercado lateral</p>
                      </div>

                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        IF Price touches Lower Band AND RSI &lt; 30<br/>
                        THEN Buy (expecting bounce to middle)
                      </div>
                    </div>

                    {/* Estrategia 2: Bollinger Squeeze */}
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-1">2. Bollinger Squeeze (Compresión)</p>
                      <p className="text-muted-foreground text-xs mb-2">
                        Cuando las bandas se contraen, indica <strong className="text-foreground">baja volatilidad antes de un movimiento explosivo</strong>.
                      </p>
                      
                      {/* Visualización Squeeze */}
                      <div className="bg-slate-950 rounded p-3 my-2">
                        <div className="relative h-32">
                          <svg className="absolute inset-0 w-full h-full">
                            {/* Bandas que se comprimen y luego explotan */}
                            {/* Fase 1: Normal */}
                            <path d="M 0 20 Q 50 20, 100 30" stroke="rgb(239, 68, 68)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            <path d="M 0 64 Q 50 64, 100 64" stroke="rgb(251, 146, 60)" strokeWidth="2" opacity="0.8" />
                            <path d="M 0 108 Q 50 108, 100 98" stroke="rgb(34, 197, 94)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            
                            {/* Fase 2: Squeeze (bandas apretadas) */}
                            <path d="M 100 30 Q 150 40, 200 56" stroke="rgb(239, 68, 68)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            <path d="M 100 64 Q 150 64, 200 64" stroke="rgb(251, 146, 60)" strokeWidth="2" opacity="0.8" />
                            <path d="M 100 98 Q 150 88, 200 72" stroke="rgb(34, 197, 94)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            
                            {/* Fase 3: Expansión explosiva */}
                            <path d="M 200 56 Q 250 40, 300 10 L 400 10" stroke="rgb(239, 68, 68)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            <path d="M 200 64 Q 250 50, 300 30 L 400 30" stroke="rgb(251, 146, 60)" strokeWidth="2" opacity="0.8" />
                            <path d="M 200 72 Q 250 60, 300 50 L 400 50" stroke="rgb(34, 197, 94)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            
                            {/* Precio */}
                            <path 
                              d="M 0 64 L 100 68 L 150 64 L 200 66 L 250 40 L 300 20 L 350 15 L 400 18" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="2.5"
                            />
                            
                            {/* Anotaciones */}
                            <rect x="145" y="54" width="60" height="20" fill="rgb(251, 146, 60)" opacity="0.2" />
                            <text x="150" y="67" fill="rgb(251, 146, 60)" fontSize="9" fontWeight="bold">SQUEEZE</text>
                            
                            <circle cx="250" cy="40" r="4" fill="rgb(34, 197, 94)" />
                            <text x="255" y="38" fill="rgb(34, 197, 94)" fontSize="10">BREAKOUT!</text>
                          </svg>
                        </div>
                        <p className="text-xs text-slate-400 text-center mt-2">Compresión → Explosión (prepararse para movimiento fuerte)</p>
                      </div>

                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        IF BandWidth &lt; 10% of price<br/>
                        THEN prepare for breakout (direction unknown)
                      </div>
                    </div>

                    {/* Estrategia 3: Bollinger Breakout */}
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-1">3. Bollinger Breakout</p>
                      <p className="text-muted-foreground text-xs mb-2">
                        Precio rompiendo las bandas con volumen fuerte indica continuación de tendencia.
                      </p>
                      
                      {/* Visualización Breakout */}
                      <div className="bg-slate-950 rounded p-3 my-2">
                        <div className="relative h-32">
                          <svg className="absolute inset-0 w-full h-full">
                            {/* Bandas */}
                            <path d="M 0 20 L 400 20" stroke="rgb(239, 68, 68)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            <path d="M 0 64 L 400 64" stroke="rgb(251, 146, 60)" strokeWidth="2" opacity="0.8" />
                            <path d="M 0 108 L 400 108" stroke="rgb(34, 197, 94)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                            
                            {/* Precio rompiendo hacia arriba */}
                            <path 
                              d="M 0 90 L 50 75 L 100 60 L 150 45 L 200 30 L 250 15 L 300 10 L 350 8 L 400 5" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="2.5"
                            />
                            
                            {/* Zona de ruptura */}
                            <rect x="195" y="10" width="10" height="25" fill="rgb(251, 146, 60)" opacity="0.3" />
                            <text x="140" y="35" fill="rgb(34, 197, 94)" fontSize="10" fontWeight="bold">RUPTURA ALCISTA</text>
                            
                            {/* Barras de volumen */}
                            <rect x="180" y="115" width="8" height="8" fill="rgb(100, 116, 139)" opacity="0.5" />
                            <rect x="195" y="110" width="8" height="13" fill="rgb(100, 116, 139)" opacity="0.5" />
                            <rect x="210" y="105" width="8" height="18" fill="rgb(34, 197, 94)" opacity="0.8" />
                            <rect x="225" y="108" width="8" height="15" fill="rgb(34, 197, 94)" opacity="0.8" />
                            <text x="185" y="103" fill="rgb(100, 116, 139)" fontSize="8">Vol↑</text>
                          </svg>
                        </div>
                        <p className="text-xs text-slate-400 text-center mt-2">Ruptura con volumen = tendencia fuerte (no reversión)</p>
                      </div>

                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        IF Close &gt; Upper Band AND Volume &gt; Average<br/>
                        THEN Strong uptrend (ride the momentum)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-400 mb-2">⚠️ Error Común</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">NO asumas que tocar la banda superior es siempre señal de venta</strong>. 
                    En tendencias fuertes, el precio puede "caminar" sobre la banda superior durante días. Combina siempre con 
                    análisis de tendencia (ADX, moving averages) para saber si estás en rango o en tendencia.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-2">💡 En Kumo</h4>
                  <p className="text-sm text-muted-foreground">
                    Puedes usar condiciones como: <code className="text-orange-400 bg-slate-200 dark:bg-slate-900 px-1 rounded">
                    Close &lt; Bollinger_Lower(20,2)</code> combinado con 
                    <code className="text-orange-400 bg-slate-200 dark:bg-slate-900 px-1 rounded ml-1">RSI &lt; 30</code> para 
                    entradas de alta probabilidad en zonas de sobreventa.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 3: MACD */}
          {activeLesson === 3 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">3.</span>
                MACD: Momentum y Tendencia
              </CardTitle>
              <CardDescription>El indicador más versátil del trading</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  El MACD (Moving Average Convergence Divergence) es un <strong className="text-foreground">indicador de momentum 
                  que sigue tendencias</strong>. Muestra la relación entre dos medias móviles exponenciales (EMA) y es excelente 
                  para identificar cambios en la fuerza, dirección y duración de una tendencia.
                </p>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🔧 Componentes del MACD</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground">MACD Line (Línea MACD)</p>
                      <p className="text-xs text-muted-foreground mb-2">EMA(12) - EMA(26)</p>
                      <p className="text-xs text-muted-foreground">
                        Muestra la diferencia entre las dos medias. Cuando es positiva, la tendencia de corto plazo es alcista.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground">Signal Line (Línea de Señal)</p>
                      <p className="text-xs text-muted-foreground mb-2">EMA(9) de la MACD Line</p>
                      <p className="text-xs text-muted-foreground">
                        Actúa como disparador para señales de compra/venta cuando la MACD line la cruza.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground">Histogram (Histograma)</p>
                      <p className="text-xs text-muted-foreground mb-2">MACD Line - Signal Line</p>
                      <p className="text-xs text-muted-foreground">
                        Visualiza la distancia entre las dos líneas. Barras crecientes = momentum aumentando.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">📈 Señales de Trading</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500/20 p-2 rounded">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-foreground">Cruce Alcista (Bullish Crossover)</p>
                        <p className="text-xs text-muted-foreground">
                          Cuando la MACD line cruza HACIA ARRIBA la signal line → Señal de compra
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-red-500/20 p-2 rounded">
                        <Activity className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-foreground">Cruce Bajista (Bearish Crossover)</p>
                        <p className="text-xs text-muted-foreground">
                          Cuando la MACD line cruza HACIA ABAJO la signal line → Señal de venta
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500/20 p-2 rounded">
                        <BarChart3 className="h-5 w-5 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-foreground">Cruce de Línea Cero</p>
                        <p className="text-xs text-muted-foreground">
                          MACD cruzando por encima de 0 → Tendencia alcista confirmada. Por debajo de 0 → Bajista
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🎯 Estrategia Avanzada: MACD + Tendencia</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    No tomes todos los cruces. <strong className="text-foreground">Filtra señales según la tendencia mayor</strong>:
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900/50 p-3 rounded text-xs font-mono">
                    // Solo compras en tendencia alcista<br/>
                    IF Close &gt; SMA(200) AND MACD crosses above Signal<br/>
                    THEN BUY<br/>
                    <br/>
                    // Solo ventas en tendencia bajista<br/>
                    IF Close &lt; SMA(200) AND MACD crosses below Signal<br/>
                    THEN SELL
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Esta combinación <strong className="text-foreground">elimina el 70% de señales falsas</strong> porque solo operas 
                    a favor de la tendencia mayor.
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-400 mb-2">💎 Pro Tip</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    El MACD es un <strong className="text-foreground">indicador retrasado</strong> (lagging indicator). Funciona 
                    mejor en tendencias que en rangos. En mercados laterales, genera muchas señales falsas. Combínalo siempre con 
                    análisis de estructura de precio o soportes/resistencias para evitar trampas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 4: Fibonacci */}
          {activeLesson === 4 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">4.</span>
                Fibonacci y Retrocesos
              </CardTitle>
              <CardDescription>La geometría oculta de los mercados</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Los niveles de Fibonacci se basan en la <strong className="text-foreground">secuencia matemática descubierta por 
                  Leonardo Fibonacci</strong>. Sorprendentemente, estos ratios aparecen repetidamente en los mercados financieros, 
                  funcionando como zonas de soporte/resistencia y objetivos de precio.
                </p>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">📐 Niveles Clave de Fibonacci</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900 dark:text-foreground">23.6%</span>
                        <span className="text-xs bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">Retroceso Mínimo</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Primer nivel de soporte/resistencia. Retroceso débil.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-orange-200 dark:border-orange-900/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-orange-400">38.2%</span>
                        <span className="text-xs bg-orange-500/20 px-2 py-1 rounded text-orange-400">Zona de Entrada</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Nivel más usado por traders profesionales</strong>. Retroceso saludable en tendencias fuertes.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-orange-200 dark:border-orange-900/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-orange-400">50%</span>
                        <span className="text-xs bg-orange-500/20 px-2 py-1 rounded text-orange-400">Psicológico</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        No es técnicamente Fibonacci, pero es <strong className="text-foreground">nivel psicológico clave</strong>. 
                        El mercado "devuelve la mitad".
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-orange-200 dark:border-orange-900/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-orange-400">61.8%</span>
                        <span className="text-xs bg-orange-500/20 px-2 py-1 rounded text-orange-400">Golden Ratio</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">El ratio dorado</strong>. Nivel más respetado. Si se rompe, la tendencia 
                        probablemente se ha revertido.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900 dark:text-foreground">78.6%</span>
                        <span className="text-xs bg-red-500/20 px-2 py-1 rounded text-red-400">Última Defensa</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Retroceso profundo. Si el precio llega aquí, la tendencia es débil.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🎯 Cómo Usar Fibonacci en Trading</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-orange-400 mb-2">1. Identificar la Tendencia</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Encuentra un movimiento claro: <strong className="text-foreground">un swing low a un swing high</strong> (alcista) 
                        o swing high a swing low (bajista).
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded text-xs">
                        <p className="text-muted-foreground">Ejemplo: Precio sube de $100 (low) a $200 (high)</p>
                        <p className="text-orange-400 mt-1">→ Espera retroceso a $161.80 (38.2%) o $138.20 (61.8%)</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-orange-400 mb-2">2. Esperar el Retroceso</p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">No compres en los máximos</strong>. Espera pacientemente a que el precio 
                        retroceda a uno de los niveles Fibonacci.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-orange-400 mb-2">3. Buscar Confirmación</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        No entres solo porque tocó el nivel. Busca <strong className="text-foreground">confluencia</strong>:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                        <li>• Fibonacci + soporte/resistencia previo</li>
                        <li>• Fibonacci + EMA 50/200</li>
                        <li>• Fibonacci + patrón de velas (hammer, engulfing)</li>
                        <li>• Fibonacci + RSI oversold</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">📏 Extensiones de Fibonacci (Objetivos)</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Además de retrocesos, usa extensiones para <strong className="text-foreground">proyectar objetivos de precio</strong>:
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <span className="font-semibold text-gray-900 dark:text-foreground">127.2%</span>
                      <span className="text-muted-foreground">Objetivo 1 (conservador)</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <span className="font-semibold text-orange-400">161.8%</span>
                      <span className="text-muted-foreground">Objetivo 2 (estándar)</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900/50 p-2 rounded">
                      <span className="font-semibold text-gray-900 dark:text-foreground">200%</span>
                      <span className="text-muted-foreground">Objetivo 3 (agresivo)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-400 mb-2">🧠 Por Qué Funciona Fibonacci</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fibonacci funciona porque <strong className="text-foreground">millones de traders lo usan</strong>, convirtiéndolo 
                    en una profecía autocumplida. Cuando muchos ven soporte en 61.8%, colocan órdenes de compra ahí, creando presión 
                    compradora real. No es magia, es <strong className="text-foreground">psicología de masas</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 5: Ichimoku Cloud */}
          {activeLesson === 5 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">5.</span>
                Ichimoku Cloud
              </CardTitle>
              <CardDescription>Sistema completo de trading en un solo indicador</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  El Ichimoku Kinko Hyo (equilibrio de un vistazo) es un <strong className="text-foreground">sistema completo de trading 
                  japonés</strong> que muestra tendencia, momentum, soporte/resistencia y señales de entrada en un solo gráfico. 
                  Parece complejo, pero una vez que lo entiendes, es increíblemente poderoso.
                </p>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🌊 Las 5 Líneas de Ichimoku</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-blue-400">Tenkan-sen (Línea de Conversión)</span>
                        <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">9 períodos</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        (Máximo 9 + Mínimo 9) / 2 → <strong className="text-foreground">Media de corto plazo</strong>. Como una EMA rápida.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-red-400">Kijun-sen (Línea Base)</span>
                        <span className="text-xs bg-red-500/20 px-2 py-1 rounded">26 períodos</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        (Máximo 26 + Mínimo 26) / 2 → <strong className="text-foreground">Media de medio plazo</strong>. Soporte/resistencia clave.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-green-200 dark:border-green-900/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-green-400">Senkou Span A (Borde Superior Nube)</span>
                        <span className="text-xs bg-green-500/20 px-2 py-1 rounded">Proyectado 26</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        (Tenkan + Kijun) / 2, proyectado 26 períodos al futuro → <strong className="text-foreground">Primera línea de la nube</strong>
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-green-200 dark:border-green-900/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-green-400">Senkou Span B (Borde Inferior Nube)</span>
                        <span className="text-xs bg-green-500/20 px-2 py-1 rounded">52 períodos</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        (Máximo 52 + Mínimo 52) / 2, proyectado 26 al futuro → <strong className="text-foreground">Segunda línea de la nube</strong>
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-purple-400">Chikou Span (Línea Retrasada)</span>
                        <span className="text-xs bg-purple-500/20 px-2 py-1 rounded">26 atrás</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Precio actual proyectado 26 períodos ATRÁS → <strong className="text-foreground">Confirma tendencia</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">☁️ La Nube (Kumo): El Corazón de Ichimoku</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded">
                      <p className="font-semibold text-green-400 mb-1">Nube Verde (Alcista)</p>
                      <p className="text-xs text-muted-foreground">
                        Senkou A por encima de Senkou B → La nube actúa como <strong className="text-foreground">soporte dinámico</strong>
                      </p>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
                      <p className="font-semibold text-red-400 mb-1">Nube Roja (Bajista)</p>
                      <p className="text-xs text-muted-foreground">
                        Senkou B por encima de Senkou A → La nube actúa como <strong className="text-foreground">resistencia dinámica</strong>
                      </p>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Grosor de la nube = fuerza del soporte/resistencia</strong>. Nube gruesa → 
                        difícil de romper. Nube delgada → débil, probable ruptura.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🎯 Señales de Trading con Ichimoku</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">1. Cruce TK (Tenkan-Kijun)</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong className="text-green-400">Señal alcista:</strong> Tenkan cruza ARRIBA de Kijun (por encima de la nube)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-red-400">Señal bajista:</strong> Tenkan cruza ABAJO de Kijun (por debajo de la nube)
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">2. Ruptura de la Nube (Kumo Breakout)</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong className="text-foreground">Señal MÁS fuerte de Ichimoku</strong>. Cuando el precio rompe la nube:
                      </p>
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs">
                        <p className="text-green-400">↑ Rompe arriba → Fuerte tendencia alcista</p>
                        <p className="text-red-400 mt-1">↓ Rompe abajo → Fuerte tendencia bajista</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">3. Confirmación Chikou Span</p>
                      <p className="text-xs text-muted-foreground">
                        Solo toma la señal si <strong className="text-foreground">Chikou Span está por encima del precio</strong> 
                        (alcista) o por debajo (bajista). Esto filtra señales falsas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">💡 Regla de Oro de Ichimoku</h4>
                  <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 p-3 rounded border border-orange-500/30">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground text-base">Solo opera a favor de la nube</strong><br/>
                      • Precio ARRIBA de nube verde → solo compras<br/>
                      • Precio ABAJO de nube roja → solo ventas<br/>
                      • Precio DENTRO de nube → NO operes (zona de indecisión)
                    </p>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-400 mb-2">⚠️ Advertencia</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ichimoku fue diseñado para <strong className="text-foreground">gráficos diarios de acciones japonesas</strong>. 
                    En timeframes muy cortos (1min, 5min) puede generar ruido. Funciona mejor en H1, H4, D1. También, ajusta los parámetros 
                    para criptomonedas (usa 20/60/120 en vez de 9/26/52 porque crypto opera 24/7).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 6: Volume Profile */}
          {activeLesson === 6 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">6.</span>
                Volume Profile y Order Flow
              </CardTitle>
              <CardDescription>Ver dónde está el dinero real</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Mientras los indicadores tradicionales se basan en precio, <strong className="text-foreground">Volume Profile 
                  se enfoca en DÓNDE se negoció el volumen</strong>. Esto revela niveles de precio donde hay alta liquidez, 
                  interés institucional y zonas de aceptación/rechazo del mercado.
                </p>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">📊 ¿Qué es Volume Profile?</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Volume Profile es un <strong className="text-foreground">histograma horizontal</strong> que muestra cuánto volumen 
                    se negoció en cada nivel de precio durante un período específico.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900/50 p-3 rounded text-xs">
                    <p className="text-muted-foreground mb-2">A diferencia del volumen tradicional (que es vertical y muestra volumen por tiempo):</p>
                    <p className="text-orange-400">→ Volume Profile muestra volumen por PRECIO</p>
                    <p className="text-muted-foreground mt-2">
                      Esto te dice <strong className="text-foreground">dónde el mercado "aceptó" o "rechazó" precios</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🔑 Conceptos Clave</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-orange-200 dark:border-orange-900/30">
                      <p className="font-semibold text-orange-400 mb-1">POC (Point of Control)</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        El nivel de precio con <strong className="text-foreground">MAYOR volumen negociado</strong>. Actúa como imán de precios.
                      </p>
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs">
                        <p className="text-muted-foreground">Si el precio está arriba del POC → probablemente baje a testearlo</p>
                        <p className="text-muted-foreground">Si el precio está abajo del POC → probablemente suba a testearlo</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">VAH (Value Area High)</p>
                      <p className="text-xs text-muted-foreground">
                        Límite superior del área donde se negoció el <strong className="text-foreground">70% del volumen</strong>. 
                        Actúa como resistencia.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">VAL (Value Area Low)</p>
                      <p className="text-xs text-muted-foreground">
                        Límite inferior del área donde se negoció el <strong className="text-foreground">70% del volumen</strong>. 
                        Actúa como soporte.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">HVN (High Volume Nodes)</p>
                      <p className="text-xs text-muted-foreground">
                        Zonas de <strong className="text-foreground">alto volumen = aceptación</strong>. El precio tiende a 
                        consolidarse aquí (soportes/resistencias fuertes).
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-gray-900 dark:text-foreground mb-1">LVN (Low Volume Nodes)</p>
                      <p className="text-xs text-muted-foreground">
                        Zonas de <strong className="text-foreground">bajo volumen = rechazo</strong>. El precio atraviesa estas 
                        zonas rápidamente (gaps de volumen).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🎯 Estrategias con Volume Profile</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">1. Regresar al POC</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        El precio tiende a <strong className="text-foreground">"volver a casa"</strong> (el POC) después de excursiones.
                      </p>
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs font-mono">
                        IF price &gt; POC + 2% AND no strong trend<br/>
                        THEN sell (expecting return to POC)<br/>
                        <br/>
                        IF price &lt; POC - 2% AND no strong trend<br/>
                        THEN buy (expecting return to POC)
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">2. Trading en Value Area</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Compra en VAL (soporte), vende en VAH (resistencia) cuando el mercado está en rango.
                      </p>
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs">
                        <p className="text-green-400">→ Precio toca VAL + RSI oversold = COMPRA</p>
                        <p className="text-red-400 mt-1">→ Precio toca VAH + RSI overbought = VENTA</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-orange-400 mb-2">3. Breakout desde LVN</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Cuando el precio está en una zona de <strong className="text-foreground">bajo volumen (LVN)</strong>, 
                        es inestable y busca moverse rápido a la próxima zona HVN.
                      </p>
                      <div className="bg-slate-100 dark:bg-background p-2 rounded text-xs">
                        <p className="text-muted-foreground">Identifica LVN → Espera breakout → Objetivo = próximo HVN</p>
                        <p className="text-orange-400 mt-1">⚡ Movimientos rápidos con poco stop loss</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🌊 Order Flow: El Siguiente Nivel</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Order Flow va más allá de Volume Profile al analizar <strong className="text-foreground">COMPRAS vs VENTAS</strong> 
                    en cada nivel (usando footprint charts, delta volume, etc.).
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="bg-green-500/10 border border-green-500/30 p-2 rounded">
                      <p className="font-semibold text-green-400">Positive Delta</p>
                      <p className="text-muted-foreground">Más órdenes de compra que venta → Presión compradora</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 p-2 rounded">
                      <p className="font-semibold text-red-400">Negative Delta</p>
                      <p className="text-muted-foreground">Más órdenes de venta que compra → Presión vendedora</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    <strong className="text-foreground">Divergencia de delta</strong> es poderosa: precio subiendo pero delta negativo 
                    = los compradores se están debilitando → probable reversión.
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-400 mb-2">💎 Por Qué Es Superior</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Volume Profile y Order Flow son usados por <strong className="text-foreground">traders institucionales y 
                    profesionales</strong> porque muestran dónde el dinero real está actuando. Los indicadores de precio pueden 
                    manipularse, pero <strong className="text-foreground">el volumen no miente</strong>. Es la huella de los 
                    grandes jugadores.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Lección 7: Divergencias */}
          {activeLesson === 7 && (
          <Card className="bg-white dark:bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-400">7.</span>
                Divergencias: Señales Ocultas
              </CardTitle>
              <CardDescription>Detectar reversiones antes que el mercado</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Las divergencias ocurren cuando el <strong className="text-foreground">precio y un indicador (RSI, MACD, etc.) 
                  se mueven en direcciones opuestas</strong>. Son señales de advertencia de que la tendencia actual está perdiendo 
                  fuerza y podría revertirse. Los traders profesionales las consideran algunas de las señales más confiables.
                </p>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🔍 Tipos de Divergencias</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
                      <p className="font-semibold text-red-400 mb-2">Divergencia Bajista Regular</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong className="text-foreground">Señal de reversión desde tendencia alcista</strong>
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded text-xs space-y-1">
                        <p className="text-foreground">• Precio hace máximos más altos (higher highs)</p>
                        <p className="text-foreground">• RSI/MACD hace máximos más bajos (lower highs)</p>
                        <p className="text-red-400 mt-2">→ Los compradores se están agotando → Probable caída</p>
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded">
                      <p className="font-semibold text-green-400 mb-2">Divergencia Alcista Regular</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong className="text-foreground">Señal de reversión desde tendencia bajista</strong>
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded text-xs space-y-1">
                        <p className="text-foreground">• Precio hace mínimos más bajos (lower lows)</p>
                        <p className="text-foreground">• RSI/MACD hace mínimos más altos (higher lows)</p>
                        <p className="text-green-400 mt-2">→ Los vendedores se están agotando → Probable subida</p>
                      </div>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded">
                      <p className="font-semibold text-orange-400 mb-2">Divergencia Oculta (Hidden)</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong className="text-foreground">Señal de continuación de tendencia</strong> (opuesto a regular)
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded text-xs">
                        <p className="text-muted-foreground">Alcista oculta: Precio higher lows, indicador lower lows → Continúa alcista</p>
                        <p className="text-muted-foreground mt-1">Bajista oculta: Precio lower highs, indicador higher highs → Continúa bajista</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">🎯 Cómo Detectar Divergencias</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-orange-400 mb-2">Paso 1: Identificar Swing Points</p>
                      <p className="text-xs text-muted-foreground">
                        Encuentra picos (highs) y valles (lows) claros en el precio. Necesitas al menos 
                        <strong className="text-foreground"> 2 puntos para comparar</strong>.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-orange-400 mb-2">Paso 2: Comparar con el Indicador</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Usa RSI, MACD, Stochastic o cualquier oscilador de momentum. Compara los mismos puntos temporales:
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded text-xs">
                        <p className="text-muted-foreground">¿El indicador está haciendo lo OPUESTO que el precio?</p>
                        <p className="text-orange-400 mt-1">→ Si sí = Divergencia detectada</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-orange-400 mb-2">Paso 3: Esperar Confirmación</p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">NO entres solo por la divergencia</strong>. Espera:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 mt-2 ml-4">
                        <li>• Patrón de velas de reversión (doji, engulfing, hammer)</li>
                        <li>• Ruptura de línea de tendencia</li>
                        <li>• Cruce del indicador (ej: RSI cruzando de vuelta a zona neutral)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">💡 Mejores Indicadores para Divergencias</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900/50 p-2 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🥇</span>
                        <span className="font-semibold text-gray-900 dark:text-foreground">RSI (14)</span>
                      </div>
                      <span className="text-green-400">Más confiable</span>
                    </div>
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900/50 p-2 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🥈</span>
                        <span className="font-semibold text-gray-900 dark:text-foreground">MACD Histogram</span>
                      </div>
                      <span className="text-orange-400">Muy bueno</span>
                    </div>
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900/50 p-2 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🥉</span>
                        <span className="font-semibold text-gray-900 dark:text-foreground">Stochastic</span>
                      </div>
                      <span className="text-muted-foreground">Bueno</span>
                    </div>
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900/50 p-2 rounded border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📊</span>
                        <span className="font-semibold text-gray-900 dark:text-foreground">OBV (On Balance Volume)</span>
                      </div>
                      <span className="text-muted-foreground">Para expertos</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-3">📐 Ejemplo Práctico</h4>
                  <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-3 rounded border border-red-500/30 text-xs space-y-2">
                    <p className="font-semibold text-red-400">Escenario: Divergencia Bajista en Bitcoin</p>
                    <p className="text-muted-foreground">1. BTC sube de $60k → $65k → $68k (higher highs)</p>
                    <p className="text-muted-foreground">2. RSI marca 75 → 72 → 68 (lower highs) ⚠️ DIVERGENCIA</p>
                    <p className="text-muted-foreground">3. Aparece vela doji en $68k → Confirmación</p>
                    <p className="text-orange-400 font-semibold mt-2">→ Entrada: Sell en $67.5k</p>
                    <p className="text-muted-foreground">→ Stop Loss: $69k (arriba del máximo)</p>
                    <p className="text-muted-foreground">→ Take Profit: $62k (soporte previo)</p>
                    <p className="text-green-400 mt-2">Resultado: 5.5k de ganancia vs 1.5k de riesgo = R:R de 3.6:1 🎯</p>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-400 mb-2">⚠️ Advertencias Importantes</p>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      1. <strong className="text-foreground">Las divergencias pueden extenderse</strong> - El precio puede 
                      continuar la tendencia actual incluso después de divergencia. No hagas short solo por divergencia.
                    </p>
                    <p>
                      2. <strong className="text-foreground">Timeframes superiores son más confiables</strong> - Divergencia 
                      en gráfico diario &gt;&gt;&gt; divergencia en gráfico de 5 minutos.
                    </p>
                    <p>
                      3. <strong className="text-foreground">Combina con estructura de precio</strong> - Divergencia en una 
                      zona de resistencia clave es 10x más poderosa que en medio de la nada.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-background/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-2">💡 En Kumo</h4>
                  <p className="text-sm text-muted-foreground">
                    Aunque Kumo no detecta divergencias automáticamente (requiere análisis visual), puedes crear condiciones 
                    que se aproximen: <code className="text-orange-400 bg-slate-200 dark:bg-slate-900 px-1 rounded">
                    Close &gt; Close[10] AND RSI &lt; RSI[10]</code> para capturar situaciones donde el precio sube pero 
                    momentum baja.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Botones de navegación entre lecciones */}
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={goToPreviousLesson}
              disabled={activeLesson === 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Lección Anterior
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Lección {activeLesson} de {lessons.length}
            </span>

            <Button
              onClick={goToNextLesson}
              disabled={activeLesson === lessons.length}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              Siguiente Lección
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Conclusión del Bloque */}
          <Card className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-orange-500/30">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-foreground">🎓 ¡Excelente Trabajo!</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Has completado el bloque de Indicadores Técnicos Avanzados. Ahora dominas herramientas profesionales 
                  que te dan ventaja sobre el 90% de traders retail. Recuerda: <strong className="text-foreground">la 
                  clave no es usar todos los indicadores, sino dominar unos pocos y combinarlos estratégicamente</strong>.
                </p>
                <div className="flex flex-wrap gap-3 justify-center pt-4">
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                    <Trophy className="h-4 w-4 mr-2" />
                    Siguiente Bloque: Estrategias de Trading
                  </Button>
                  <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-500/10" onClick={onBack}>
                    Volver a Bloques
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral - Índice de lecciones */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-surface sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Índice del Bloque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-background/50 transition-colors text-left"
                >
                  <div className="mt-0.5">
                    {completedLessons.includes(lesson.id) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

