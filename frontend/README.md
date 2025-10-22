# Kumo Frontend

Frontend de la aplicación Kumo construido con React, Vite, TypeScript y Tailwind CSS.

## 🚀 Inicio Rápido

### Requisitos previos
- Node.js 18 o superior
- npm o yarn

### Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Instalar tailwindcss-animate (dependencia de shadcn/ui):
```bash
npm install -D tailwindcss-animate
```

### Ejecución

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en: http://localhost:5173

## 🛠️ Stack Tecnológico

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes de UI
- **React Router** - Enrutamiento
- **Lucide React** - Iconos

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes de shadcn/ui
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   └── Layout.tsx    # Layout principal
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Templates.tsx
│   │   ├── Designer.tsx
│   │   ├── Strategies.tsx
│   │   └── Academy.tsx
│   ├── lib/
│   │   └── utils.ts      # Utilidades
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── public/               # Archivos estáticos
├── index.html           # HTML principal
├── vite.config.ts       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
└── package.json         # Dependencias
```

## 🎨 Tema

La aplicación utiliza un tema oscuro por defecto con los siguientes colores principales:

- **Primary**: `#4F46E5` (Violeta)
- **Background**: `#0B1120` (Azul noche)
- **Surface**: `#1e293b` (Gris oscuro)

## 🧩 Comandos disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Vista previa de la build de producción
npm run lint     # Ejecuta el linter
```

