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
          teal: '#447780',
          grey: '#58595B',
          white: '#FFFFFF',
        },
        primary: {
          50: '#f0f7f8',
          100: '#ddeef1',
          200: '#bfdee3',
          300: '#92c5ce',
          400: '#5fa3b1',
          500: '#447780',
          600: '#3a676e',
          700: '#32555c',
          800: '#2d474d',
          900: '#293d42',
        },
        grey: {
          50: '#f9f9fa',
          100: '#f3f3f4',
          200: '#e8e8ea',
          300: '#d6d6d8',
          400: '#a8a9ab',
          500: '#58595B',
          600: '#4f5052',
          700: '#424344',
          800: '#383839',
          900: '#2f2f30',
        }
      },
      fontFamily: {
        'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'brand': '8px',
        'card': '16px',
      },
      minHeight: {
        'button': '44px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}