/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ATHLY V2 Luxury Wellness Design Tokens
        graphite: {
          DEFAULT: '#171916',
          950: '#0E100D',
          900: '#171916',
          850: '#1F221E',
          800: '#282B26',
          700: '#383C35',
          600: '#4B4F48',
          500: '#62675F',
        },
        ivory: {
          DEFAULT: '#F4F1E9',
          50: '#FAF8F3',
          100: '#F4F1E9',
          200: '#EBE7DC',
          300: '#DFDBD0',
          400: '#CEC8B9',
        },
        sage: {
          DEFAULT: '#C5D99A',
          100: '#EBF2DC',
          200: '#D8E6BC',
          300: '#C5D99A',
          400: '#B2CA80',
          500: '#9EB866',
          hover: '#B4CB85',
        },
        stone: {
          DEFAULT: '#D9D5CB',
          100: '#F2EFE8',
          200: '#E6E2D8',
          300: '#D9D5CB',
          400: '#C4BFB4',
          500: '#ABA494',
        },
        // Backward compatibility for existing dashboard screens
        athly: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          accent: '#10b981',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          rose: '#f43f5e',
          dark: '#0f172a',
          card: '#1e293b',
          cardHover: '#334155'
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft-elevation': '0 8px 30px rgba(23, 25, 22, 0.06)',
        'soft-glow': '0 0 35px -5px rgba(197, 217, 154, 0.25)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
      }
    },
  },
  plugins: [],
}
