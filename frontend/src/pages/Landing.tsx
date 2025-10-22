import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Code, TrendingUp, Blocks, BarChart3, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Página: Landing Page
 * Página de bienvenida y presentación de Kumo
 */
export default function Landing() {
  const features = [
    {
      title: 'Constructor Visual Intuitivo',
      description: 'Arrastra, suelta y conecta bloques lógicos para construir cualquier estrategia. Si puedes pensarlo, puedes crearlo.',
      icon: Blocks,
    },
    {
      title: 'Backtesting Profesional',
      description: 'Valida tus estrategias con datos históricos precisos. Analiza métricas avanzadas y optimiza tus parámetros.',
      icon: BarChart3,
    },
    {
      title: 'Exporta tu Código, Listo para Usar',
      description: 'Genera código limpio y robusto para MQL5 y ProRealTime con un solo clic. Sin dependencias, listo para operar.',
      icon: Code,
    },
  ]

  const steps = [
    {
      number: '1',
      title: 'Diseña tu Lógica',
      description: 'Utiliza nuestro editor visual para definir tus condiciones de entrada, salida y gestión de riesgo sin escribir una sola línea de código.',
    },
    {
      number: '2',
      title: 'Valida con Datos',
      description: 'Ejecuta un backtest completo para ver cómo se habría comportado tu estrategia. Analiza los resultados y optimiza hasta que sea perfecta.',
    },
    {
      number: '3',
      title: 'Genera y Despliega',
      description: 'Con tu estrategia validada, genera el código fuente final. Descárgalo y úsalo en tu plataforma de trading preferida al instante.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-100 dark:to-slate-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Cloud className="h-8 w-8 text-primary group-hover:text-orange-400 transition-colors" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">Kumo</span>
          </Link>
          
          {/* Navegación */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-orange-400 transition-colors">
              Características
            </a>
            <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-orange-400 transition-colors">
              Cómo Funciona
            </a>
            <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-orange-400 transition-colors">
              Precios
            </a>
          </nav>
          
          {/* Botón CTA */}
          <Link to="/strategies">
            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:border-orange-400 hover:text-orange-400">
              Ir a la App
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 text-center">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative">
          {/* Logo & Brand */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Cloud className="h-16 w-16 text-primary" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-pink-500 to-orange-500 opacity-20 blur-xl" />
              </div>
              <span className="font-bold text-4xl text-gray-900 dark:text-white">Kumo</span>
            </div>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Donde nacen las estrategias.
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
            El poder del trading algorítmico, sin el estrés del código.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/templates">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Empezar a Crear Gratis
              </Button>
            </Link>
            <a 
              href="#how-it-works" 
              className="text-slate-600 dark:text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
            >
              Ver cómo funciona 
              <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Convierte tus ideas en código, 
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"> sin esfuerzo.</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Todo lo que necesitas para diseñar, validar y exportar tus sistemas de trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={index}
                  className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <CardHeader>
                    <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 group-hover:from-orange-500/30 group-hover:to-pink-500/30 transition-colors">
                      <Icon className="h-8 w-8 text-orange-400" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              De la idea al robot en 
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"> 3 simples pasos.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="text-7xl font-bold bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                      {step.number}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-orange-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Un plan para 
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"> cada trader.</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Usa la plataforma gratis. Paga solo cuando estés listo para exportar tu creación.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                      <Download className="h-6 w-6 text-orange-400" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Descarga tu código</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Obtén el archivo MQL5 o ProRealCode de tu estrategia, listo para usar.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to="/strategies">
                      <Button 
                        size="lg" 
                        className="text-xl px-10 py-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                      >
                        Desde 25€
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-sm text-slate-600 dark:text-slate-500 mt-6 text-center">
              ¿Necesitas descargas ilimitadas y optimización?{' '}
              <a href="#" className="text-orange-400 hover:text-orange-300 underline transition-colors">
                Consulta nuestro Plan PRO
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-pink-500/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl mx-auto leading-tight">
            ¿Listo para darle vida a{' '}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              tus estrategias?
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Regístrate gratis y empieza a construir tu primer robot de trading en menos de 5 minutos.
          </p>
          <div className="mt-10">
            <Link to="/templates">
              <Button 
                size="lg" 
                className="text-xl px-12 py-7 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 shadow-2xl shadow-orange-500/20"
              >
                Empezar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              © 2025 Kumo Technologies. Todos los derechos reservados.
            </p>
            <div className="mt-4 flex justify-center gap-8 text-sm">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-orange-400 transition-colors">
                Términos
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-orange-400 transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-orange-400 transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

