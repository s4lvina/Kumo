import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Templates from './pages/Templates'
import Designer from './pages/Designer'
import Strategies from './pages/Strategies'
import Academy from './pages/Academy'
import Backtesting from './pages/Backtesting'

/**
 * Componente principal de la aplicación Kumo
 * Configura el enrutamiento y el layout principal
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Landing page sin Layout */}
          <Route path="/" element={<Landing />} />
          
          {/* Rutas de la aplicación con Layout */}
          <Route path="/app" element={<Layout><Strategies /></Layout>} />
          <Route path="/templates" element={<Layout><Templates /></Layout>} />
          <Route path="/designer" element={<Layout><Designer /></Layout>} />
          <Route path="/strategies" element={<Layout><Strategies /></Layout>} />
          <Route path="/backtesting" element={<Layout><Backtesting /></Layout>} />
          <Route path="/academy" element={<Layout><Academy /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

