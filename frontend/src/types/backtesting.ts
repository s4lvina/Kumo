/**
 * Tipos para el sistema de backtesting
 */

export interface BacktestTrade {
  id: number;
  entryTime: string;
  exitTime: string;
  type: 'long' | 'short';
  entryPrice: number;
  exitPrice: number;
  size: number;
  profit: number;
  profitPercent: number;
  pips: number;
  duration: number; // en segundos
  entryReason: string;
  exitReason: string;
}

export interface BacktestMetrics {
  // Métricas generales
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  
  // Rentabilidad
  totalProfit: number;
  totalLoss: number;
  netProfit: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  
  // Ratios de riesgo
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  
  // Drawdown
  maxDrawdown: number;
  maxDrawdownPercent: number;
  maxDrawdownDuration: number; // en días
  
  // Tiempo en mercado
  timeInMarket: number; // porcentaje
  averageTradeDuration: number; // en horas
  
  // Consistencia
  consecutiveWins: number;
  consecutiveLosses: number;
  expectancy: number; // Ganancia esperada por trade
  
  // Capital
  initialBalance: number;
  finalBalance: number;
  returnPercent: number;
}

export interface EquityPoint {
  time: string;
  equity: number;
  drawdown: number;
}

export interface BacktestResult {
  success: boolean;
  strategyName: string;
  symbol: string;
  timeframe: string;
  startDate: string;
  endDate: string;
  metrics: BacktestMetrics;
  trades: BacktestTrade[];
  equityCurve: EquityPoint[];
  error?: string;
}

export interface BacktestConfig {
  symbol: string;
  timeframe: string;
  startDate: string;
  endDate: string;
  initialBalance: number;
  commission: number; // Porcentaje
  slippage: number; // En pips
}

