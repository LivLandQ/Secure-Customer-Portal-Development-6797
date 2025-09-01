/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#447780',    // Headings, links, buttons
          text: '#58595B',       // Body text
          accent: '#939598',     // Borders, subtle accents
          white: '#FFFFFF',      // Primary background
          black: '#000000'       // Deep contrast
        },
        // Keep existing primary colors for backward compatibility
        primary: {
          50: '#f0f9fa',
          100: '#daf2f4',
          200: '#b8e5ea',
          300: '#89d1da',
          400: '#54b5c4',
          500: '#447780',
          600: '#3d6b73',
          700: '#356066',
          800: '#2d5459',
          900: '#25474c',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'eurostile': ['Eurostile', 'Arial Black', 'sans-serif'],
        'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      fontWeight: {
        'demi': '600',
        'bold': '700'
      }
    },
  },
  plugins: [],
}