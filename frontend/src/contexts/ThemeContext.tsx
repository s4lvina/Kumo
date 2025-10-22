import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Intentar cargar el tema guardado, por defecto es 'dark'
    const savedTheme = localStorage.getItem('kumo-theme') as Theme
    return savedTheme || 'dark'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remover ambas clases
    root.classList.remove('light', 'dark')
    
    // Agregar la clase del tema actual
    root.classList.add(theme)
    
    // Guardar en localStorage
    localStorage.setItem('kumo-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

