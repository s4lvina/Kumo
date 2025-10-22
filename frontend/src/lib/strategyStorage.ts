/**
 * Sistema de almacenamiento local de estrategias
 * Guarda estrategias en localStorage del navegador
 */

import { Strategy } from '@/types/strategy'

const STORAGE_KEY = 'kumo_strategies'

export interface StoredStrategy extends Strategy {
  id: number
  status: 'active' | 'testing' | 'paused' | 'archived'
  createdAt: string
  updatedAt: string
  backtestMetrics?: {
    winRate: number
    totalTrades: number
    profitFactor: number
    sharpeRatio: number
    maxDrawdown: number
    avgWin: number
    avgLoss: number
  }
}

// Obtener todas las estrategias
export const getAllStrategies = (): StoredStrategy[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading strategies:', error)
    return []
  }
}

// Obtener una estrategia por ID
export const getStrategyById = (id: number): StoredStrategy | undefined => {
  const strategies = getAllStrategies()
  return strategies.find(s => s.id === id)
}

// Guardar una nueva estrategia
export const saveStrategy = (strategy: Omit<StoredStrategy, 'id' | 'createdAt' | 'updatedAt'>): StoredStrategy => {
  const strategies = getAllStrategies()
  const now = new Date().toISOString()
  
  const newStrategy: StoredStrategy = {
    ...strategy,
    id: Date.now(),
    createdAt: now,
    updatedAt: now
  }
  
  strategies.push(newStrategy)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(strategies))
  
  return newStrategy
}

// Actualizar una estrategia existente
export const updateStrategy = (id: number, updates: Partial<StoredStrategy>): StoredStrategy | null => {
  const strategies = getAllStrategies()
  const index = strategies.findIndex(s => s.id === id)
  
  if (index === -1) return null
  
  const updatedStrategy: StoredStrategy = {
    ...strategies[index],
    ...updates,
    id: strategies[index].id, // Preservar ID
    createdAt: strategies[index].createdAt, // Preservar fecha creación
    updatedAt: new Date().toISOString()
  }
  
  strategies[index] = updatedStrategy
  localStorage.setItem(STORAGE_KEY, JSON.stringify(strategies))
  
  return updatedStrategy
}

// Eliminar una estrategia
export const deleteStrategy = (id: number): boolean => {
  const strategies = getAllStrategies()
  const filtered = strategies.filter(s => s.id !== id)
  
  if (filtered.length === strategies.length) return false
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

// Duplicar una estrategia
export const duplicateStrategy = (id: number): StoredStrategy | null => {
  const strategy = getStrategyById(id)
  if (!strategy) return null
  
  const duplicate = {
    ...strategy,
    name: `${strategy.name} (Copia)`,
    status: 'testing' as const,
    backtestMetrics: undefined // Resetear métricas en copia
  }
  
  return saveStrategy(duplicate)
}

// Cambiar estado de estrategia
export const updateStrategyStatus = (
  id: number, 
  status: 'active' | 'testing' | 'paused' | 'archived'
): StoredStrategy | null => {
  return updateStrategy(id, { status })
}

// Actualizar métricas de backtest
export const updateBacktestMetrics = (
  id: number,
  metrics: StoredStrategy['backtestMetrics']
): StoredStrategy | null => {
  return updateStrategy(id, { backtestMetrics: metrics })
}

// Exportar estrategia como JSON
export const exportStrategy = (id: number): string | null => {
  const strategy = getStrategyById(id)
  if (!strategy) return null
  
  return JSON.stringify(strategy, null, 2)
}

// Importar estrategia desde JSON
export const importStrategy = (jsonString: string): StoredStrategy | null => {
  try {
    const strategy = JSON.parse(jsonString)
    return saveStrategy({
      ...strategy,
      status: 'testing',
      backtestMetrics: undefined
    })
  } catch (error) {
    console.error('Error importing strategy:', error)
    return null
  }
}

// Limpiar todas las estrategias (útil para desarrollo)
export const clearAllStrategies = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}

