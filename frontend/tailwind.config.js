/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados para Kumo
        'primary': '#4F46E5',     // Violeta
        'background': {
          DEFAULT: '#0B1120',     // Azul noche (modo oscuro)
          light: '#FFFFFF',       // Blanco (modo claro)
        },
        'surface': {
          DEFAULT: '#1e293b',     // Color para tarjetas y paneles (modo oscuro)
          light: '#F8FAFC',       // Gris muy claro (modo claro)
        },
        'orange': {
          400: '#FB923C',         // Naranja para acentos
          500: '#F97316',         // Naranja medio
          600: '#EA580C',         // Naranja oscuro
        },
        'pink': {
          500: '#F472B6',         // Rosa para gradientes
          600: '#EC4899',         // Rosa oscuro
        },
        'purple': {
          400: '#A78BFA',         // Violeta claro
          500: '#8B5CF6',         // Violeta medio
          600: '#7C3AED',         // Violeta oscuro
        },
        
        // Colores adicionales para shadcn/ui
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

