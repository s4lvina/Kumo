# 📊 Guía del Sistema de Backtesting de Kumo

## Descripción General

El panel de Backtesting de Kumo es un sistema completo para probar estrategias de trading con datos históricos. Proporciona métricas avanzadas, visualizaciones profesionales y análisis detallado de resultados.

## Características Principales

### 1. **Integración con TradingView**
- Widget completo de TradingView embebido
- Selección de símbolos y temporalidades
- Visualización profesional de gráficos
- Tema oscuro consistente con Kumo

### 2. **Configuración Flexible**
- **Símbolo**: Elige cualquier par de divisas o activo
- **Temporalidad**: Desde 1 minuto hasta 1 semana
- **Rango de Fechas**: Define el período exacto de prueba
- **Balance Inicial**: Configura el capital inicial
- **Comisiones**: Simula costos reales de trading
- **Slippage**: Considera el deslizamiento de precios

### 3. **Métricas Avanzadas**

#### Métricas de Performance
- **Total Trades**: Número total de operaciones
- **Win Rate**: Porcentaje de operaciones ganadoras
- **Net Profit**: Ganancia neta total
- **Profit Factor**: Ratio de ganancias vs pérdidas

#### Métricas de Riesgo
- **Max Drawdown**: Máxima caída desde el pico
- **Sharpe Ratio**: Rendimiento ajustado por riesgo
- **Sortino Ratio**: Similar a Sharpe pero solo considera volatilidad negativa
- **Calmar Ratio**: Retorno anualizado dividido por drawdown máximo

#### Métricas de Consistencia
- **Average Win/Loss**: Ganancia y pérdida promedio por operación
- **Largest Win/Loss**: Mejor y peor operación
- **Consecutive Wins/Losses**: Rachas máximas
- **Expectancy**: Ganancia esperada por operación
- **Time in Market**: Porcentaje de tiempo con posiciones abiertas

### 4. **Visualizaciones Avanzadas**

#### Curva de Equity
- Gráfico de línea mostrando la evolución del capital
- Curva de drawdown superpuesta
- Tooltips interactivos con información detallada
- Escalas dual (currency y porcentaje)

#### Distribución de Resultados
- Histograma de distribución de ganancias/pérdidas
- Rangos configurables
- Código de colores (verde para ganancias, rojo para pérdidas)
- Identifica patrones en los resultados

#### Lista de Operaciones
- Tabla completa de todas las operaciones
- Filtros por tipo (ganadoras/perdedoras/todas)
- Ordenamiento por fecha o ganancia
- Detalles completos:
  - Fechas y precios de entrada/salida
  - Duración de la operación
  - Pips ganados/perdidos
  - Razón de entrada y salida
  - Profit absoluto y porcentual

## Cómo Usar el Sistema

### Paso 1: Seleccionar o Crear una Estrategia
1. Ve al **Diseñador** y crea tu estrategia
2. O selecciona una estrategia guardada desde **Mis Estrategias**
3. Guarda la estrategia antes de hacer backtesting

### Paso 2: Configurar el Backtest
1. Navega a la página de **Backtesting**
2. Selecciona tu estrategia del dropdown
3. Configura los parámetros:
   - Símbolo (ej: EURUSD, BTCUSD)
   - Temporalidad
   - Fechas de inicio y fin
   - Balance inicial
   - Comisión y slippage

### Paso 3: Ejecutar el Backtest
1. Haz clic en **"Ejecutar Backtest"**
2. Espera mientras se procesan los datos
3. Los resultados aparecerán automáticamente

### Paso 4: Analizar Resultados
1. **Revisa las métricas principales**: Win Rate, Profit Factor, Sharpe Ratio
2. **Analiza la curva de equity**: ¿Es consistente el crecimiento?
3. **Examina el drawdown**: ¿Es tolerable la máxima caída?
4. **Estudia la distribución**: ¿Están equilibradas las ganancias/pérdidas?
5. **Revisa operaciones individuales**: Busca patrones en entradas/salidas

## Interpretación de Métricas

### Win Rate
- **> 60%**: Excelente
- **50-60%**: Bueno
- **40-50%**: Aceptable si el profit factor es bueno
- **< 40%**: Necesita mejoras

### Profit Factor
- **> 2.0**: Excelente
- **1.5-2.0**: Bueno
- **1.2-1.5**: Aceptable
- **< 1.2**: Marginal
- **< 1.0**: Perdedor

### Sharpe Ratio
- **> 2.0**: Excelente
- **1.5-2.0**: Muy bueno
- **1.0-1.5**: Bueno
- **0.5-1.0**: Aceptable
- **< 0.5**: Pobre

### Max Drawdown
- **< 10%**: Excelente control de riesgo
- **10-20%**: Bueno
- **20-30%**: Alto pero manejable
- **> 30%**: Riesgoso, considerar reducir tamaño de posiciones

### Expectancy
- **> $50 por trade**: Excelente
- **$20-50**: Bueno
- **$10-20**: Aceptable
- **< $10**: Marginal
- **Negativo**: Perdedor

## Mejores Prácticas

### 1. **Período de Prueba Adecuado**
- Mínimo 6 meses de datos
- Idealmente 1-2 años
- Incluir diferentes condiciones de mercado

### 2. **Realismo en Configuración**
- Usar comisiones reales de tu broker
- Considerar slippage realista (2-5 pips para forex)
- Balance inicial acorde a tu capital real

### 3. **Análisis Completo**
- No te fijes solo en el profit total
- Considera el drawdown máximo
- Analiza la consistencia de resultados
- Verifica el número de trades (mínimo 30-50)

### 4. **Validación**
- Prueba en diferentes símbolos
- Prueba en diferentes temporalidades
- Divide el período (in-sample / out-of-sample)
- Forward testing después del backtest

## Limitaciones Actuales

### Motor de Backtesting
El motor actual genera datos simulados para demostración. Para trading real:
- Implementar conexión a fuentes de datos históricas reales
- Integrar motor de backtesting profesional (Backtrader, QuantConnect)
- Considerar costos de spread bid/ask
- Modelar ejecución más realista

### Datos Históricos
- Los datos actuales son simulados
- Para producción, usar datos de calidad institucional
- Considerar ajustes por splits y dividendos

## Futuras Mejoras

### Planeadas
1. **Walk-Forward Analysis**: Optimización rolling con ventanas temporales
2. **Monte Carlo Simulation**: Análisis de robustez estadística
3. **Optimization Engine**: Optimizar parámetros automáticamente
4. **Comparison Mode**: Comparar múltiples estrategias lado a lado
5. **Export Reports**: Exportar informes en PDF/Excel
6. **Real-time Progress**: Barra de progreso durante backtesting largo
7. **Multi-Symbol Testing**: Probar en múltiples símbolos simultáneamente

## Código y Arquitectura

### Frontend Components
- `Backtesting.tsx`: Página principal
- `BacktestMetricsPanel.tsx`: Panel de métricas
- `EquityCurveChart.tsx`: Gráfico de equity
- `TradeDistributionChart.tsx`: Histograma de distribución
- `TradesList.tsx`: Lista detallada de operaciones

### Backend Endpoint
- `POST /api/v1/backtest`: Ejecuta el backtest
- Entrada: Estrategia + Configuración
- Salida: Resultados completos con métricas, trades y equity curve

### Tipos TypeScript
- `backtesting.ts`: Tipos completos para backtest
- Interfaces para trades, métricas, configuración y resultados

## Soporte

Para preguntas o problemas:
1. Revisa esta guía primero
2. Consulta la documentación de componentes
3. Verifica los logs del backend
4. Contacta al equipo de desarrollo

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Licencia**: Proyecto Kumo

