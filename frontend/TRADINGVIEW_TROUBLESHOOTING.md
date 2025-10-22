# 🔧 Solución de Problemas - Widget de TradingView

## Problema: "Algo ha fallado..." al cargar el gráfico

### Causas Comunes y Soluciones

#### 1. **Script de TradingView no cargado**

**Síntomas:**
- Error modal "Algo ha fallado..."
- Área de gráfico vacía o con error

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores relacionados con `tradingview.com`
3. Verifica que el script se cargue correctamente:
   - Ir a Network tab
   - Recargar la página
   - Buscar `tv.js` en la lista de recursos
   - Debería mostrar status 200

**Si el script no carga:**
- Verifica tu conexión a internet
- Revisa si hay bloqueadores de contenido (AdBlock, etc.)
- Intenta en modo incógnito
- Verifica configuración de CORS

#### 2. **Símbolo Incorrecto**

**Síntomas:**
- Widget se carga pero muestra error de símbolo
- "Symbol not found"

**Solución:**
Verifica el formato del símbolo:
- ✅ Correcto: `EURUSD` (sin prefijo FX:)
- ❌ Incorrecto: `FX:EURUSD`
- ✅ Correcto: `BTCUSD`

**Símbolos probados que funcionan:**
```
EURUSD
GBPUSD
USDJPY
BTCUSD
ETHUSD
AAPL (acciones)
```

#### 3. **Contenedor no inicializado**

**Síntomas:**
- Error en consola: "Container not found"
- Widget no aparece

**Solución:**
El código ya maneja esto con reintentos automáticos. Si persiste:
1. Recargar la página completamente (Ctrl+Shift+R)
2. Limpiar caché del navegador
3. Verificar que no haya múltiples tabs abiertos con la misma página

#### 4. **Límite de Rate de TradingView**

**Síntomas:**
- Widget funciona inicialmente pero falla después
- Error 429 en Network tab

**Solución:**
- Esperar 1-2 minutos antes de recargar
- No cambiar símbolos/temporalidades muy rápidamente
- TradingView tiene límites de requests para usuarios gratuitos

#### 5. **Bloqueadores de Terceros**

**Síntomas:**
- Script bloqueado por política de seguridad
- Error CSP en consola

**Solución:**
1. Deshabilitar bloqueadores de contenido temporalmente
2. Agregar excepción para `tradingview.com`
3. En Firefox: Deshabilitar "Enhanced Tracking Protection" para localhost

### Alternativa: Widget Simplificado

Si el problema persiste, usa el componente alternativo:

```tsx
import TradingViewWidget from '@/components/TradingViewWidget'

// En lugar del div normal, usa:
<TradingViewWidget 
  symbol={config.symbol} 
  interval={config.timeframe} 
/>
```

### Verificación Manual

Para verificar que TradingView funciona en tu navegador:

1. Abre la consola (F12)
2. Ejecuta:
```javascript
// Verificar que el script esté cargado
console.log('TradingView loaded:', typeof window.TradingView !== 'undefined')

// Intentar cargar el script manualmente
const script = document.createElement('script')
script.src = 'https://s3.tradingview.com/tv.js'
script.onload = () => console.log('✅ Script loaded successfully')
script.onerror = () => console.log('❌ Script failed to load')
document.head.appendChild(script)
```

### Debugging Avanzado

#### Logs en Consola

El widget ahora muestra logs útiles:
- ✅ `TradingView widget initialized successfully` - Todo OK
- ❌ `Error initializing TradingView widget` - Revisar detalles del error

#### Inspeccionar Contenedor

```javascript
// En consola del navegador:
const container = document.getElementById('tradingview_chart')
console.log('Container:', container)
console.log('Has widget:', container?.children.length > 0)
```

### Solución Temporal: Deshabilitar Widget

Si necesitas usar el backtesting sin el widget:

1. Comentar el Card del gráfico en `Backtesting.tsx`:
```tsx
{/* TradingView Chart - Temporalmente deshabilitado
<Card className="...">
  ...
</Card>
*/}
```

2. El resto del backtesting seguirá funcionando normalmente

### Configuración de Desarrollo

Para desarrollo local, verifica estas configuraciones:

#### package.json
```json
{
  "scripts": {
    "dev": "vite --host"
  }
}
```

#### vite.config.ts
Agregar si no existe:
```typescript
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
  }
})
```

### Símbolos Recomendados para Testing

| Símbolo | Descripción | Formato |
|---------|-------------|---------|
| EURUSD | Euro/Dólar | FX_IDC:EURUSD |
| BTCUSD | Bitcoin | BITSTAMP:BTCUSD |
| AAPL | Apple | NASDAQ:AAPL |
| GOLD | Oro | TVC:GOLD |

### Verificar Estado del Servicio

TradingView puede tener problemas ocasionales:
1. Visitar: https://status.tradingview.com/
2. Verificar si hay incidentes activos
3. Si hay problemas, esperar a que se resuelvan

### Solución Definitiva

Si nada funciona, el problema puede ser:

1. **Restricciones de red corporativa**
   - Usar VPN
   - Probar desde otra red

2. **Versión del navegador antigua**
   - Actualizar navegador
   - Probar en Chrome/Edge actualizados

3. **Extensiones problemáticas**
   - Probar en modo incógnito
   - Deshabilitar extensiones una por una

### Reportar Problema

Si el problema persiste, reportar con:

```
Navegador: [Chrome/Firefox/Edge] versión X.X
OS: [Windows/Mac/Linux]
Error en consola: [copiar mensaje completo]
Network tab: [screenshot de tv.js request]
Símbolo probado: [EURUSD/etc]
```

### Configuración Actual

El widget está configurado con:
- **Source**: `https://s3.tradingview.com/tv.js`
- **Tema**: Dark
- **Timezone**: UTC
- **Idioma**: Español
- **Altura**: 600px
- **Features**: Todos habilitados excepto localStorage

### Próximos Pasos

Si el widget de TradingView es problemático, consideramos:

1. **Usar un gráfico alternativo**:
   - Lightweight Charts by TradingView (más simple)
   - Chart.js con datos propios
   - Recharts con datos históricos

2. **Implementar fallback automático**:
   - Si TradingView falla, mostrar gráfico simple
   - Opción para habilitar/deshabilitar widget

3. **Widget externo**:
   - iframe con TradingView
   - Menos integración pero más estable

---

**Última actualización**: Octubre 2025  
**Versión del componente**: 1.1.0

