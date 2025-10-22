# Sistema de Temas de Kumo

## Descripción General

Kumo ahora cuenta con un sistema completo de temas que permite alternar entre modo oscuro y modo claro, manteniendo la identidad visual característica de la marca.

## Implementación

### Arquitectura

1. **ThemeContext** (`src/contexts/ThemeContext.tsx`)
   - Gestiona el estado global del tema
   - Persiste la preferencia del usuario en `localStorage`
   - Proporciona la función `toggleTheme()` para cambiar entre modos

2. **ThemeToggle** (`src/components/ThemeToggle.tsx`)
   - Componente visual del switch de tema
   - Muestra iconos de sol/luna según el tema activo
   - Animaciones suaves y efectos hover consistentes con la marca

3. **Variables CSS** (`src/index.css`)
   - Variables para modo claro en `:root`
   - Variables para modo oscuro en `.dark`
   - Garantiza transiciones suaves entre temas

### Paleta de Colores

#### Colores de Acento (Consistentes en ambos modos)
- **Primary**: `#4F46E5` (Violeta)
- **Orange**: `#FB923C` (Naranja para acentos)
- **Pink**: `#F472B6` (Rosa para gradientes)
- **Purple**: `#A78BFA` (Púrpura para gradientes)

#### Modo Oscuro (Por defecto)
- **Background**: `#0B1120` (Azul noche oscuro)
- **Surface**: `#1e293b` (Gris oscuro para tarjetas)
- **Text**: Tonos claros de blanco/gris

#### Modo Claro
- **Background**: `#FFFFFF` (Blanco)
- **Surface**: `#F8FAFC` (Gris muy claro)
- **Text**: Tonos oscuros de gris/negro

### Gradientes Destacados

1. **Violeta → Púrpura**: Botones primarios estándar
   ```css
   from-primary to-purple-600
   ```

2. **Naranja → Rosa**: CTAs muy destacados
   ```css
   from-orange-500 to-pink-600
   ```

3. **Púrpura → Rosa → Naranja**: Títulos especiales
   ```css
   from-purple-400 via-pink-500 to-orange-500
   ```

## Uso

### Integración en Componentes

El sistema usa clases de Tailwind con el modificador `dark:`:

```tsx
// Ejemplo de texto adaptativo
<p className="text-slate-600 dark:text-slate-400">
  Este texto se adapta automáticamente
</p>

// Ejemplo de background adaptativo
<div className="bg-white dark:bg-slate-900">
  Contenido
</div>
```

### Acceder al Tema en Componentes

```tsx
import { useTheme } from '@/contexts/ThemeContext'

function MiComponente() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Tema actual: {theme}
    </button>
  )
}
```

## Ubicación del Toggle

- **Desktop** (páginas de la app): Sidebar inferior, encima del footer de versión
- **Mobile** (páginas de la app): Header superior, junto al logo Kumo
- **Landing Page**: No disponible (la landing siempre está en modo oscuro)

## Persistencia

El tema seleccionado se guarda automáticamente en `localStorage` con la clave `kumo-theme` y se restaura en cada visita.

## Prevención de Flash

El archivo `index.html` incluye un script que carga el tema guardado antes de que React se monte, evitando el flash de contenido con el tema incorrecto.

## Directrices de Diseño

Al crear nuevos componentes:

1. **Mantén los colores de acento**: Los colores naranja, rosa, púrpura y violeta deben permanecer constantes
2. **Usa variables CSS**: Prefiere las variables de Tailwind (`text-foreground`, `bg-background`, etc.)
3. **Añade variantes dark**: Usa el modificador `dark:` para adaptar colores de fondo y texto
4. **Hover naranja**: Los efectos hover deben usar `hover:text-orange-400` o `hover:border-orange-500`
5. **Transiciones suaves**: Añade `transition-colors duration-200` para cambios de color

## Ejemplos de Patrones Comunes

### Card Adaptativa
```tsx
<Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
  <CardTitle className="text-gray-900 dark:text-white">
    Título
  </CardTitle>
  <CardDescription className="text-slate-600 dark:text-slate-400">
    Descripción
  </CardDescription>
</Card>
```

### Botón con Hover Naranja
```tsx
<button className="text-gray-600 dark:text-gray-400 hover:text-orange-400 transition-colors">
  Click me
</button>
```

### Sección con Background Alternativo
```tsx
<section className="bg-slate-50 dark:bg-slate-900/20">
  Contenido
</section>
```

## Mantenimiento

- Las variables CSS están centralizadas en `src/index.css`
- Los colores personalizados están en `tailwind.config.js`
- El contexto de tema está en `src/contexts/ThemeContext.tsx`

Para modificar la paleta de colores, edita estos tres archivos manteniendo la coherencia entre ellos.

