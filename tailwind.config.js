/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          base: 'rgb(var(--bg-primary) / <alpha-value>)',
          surface: 'rgb(var(--bg-surface) / <alpha-value>)',
          accent: 'rgb(var(--accent-color) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          border: 'rgb(var(--border-color) / <alpha-value>)',
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
        },
        aurora: {
          teal: 'rgb(var(--aurora-teal) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgb(var(--border-color)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border-color)) 1px, transparent 1px)",
        'radial-fade': 'radial-gradient(circle at center, rgba(var(--accent-color), 0.05) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        }
      }
    }
  },
  plugins: [],
}
