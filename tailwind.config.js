/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',

      },
      boxShadow: {
        "3xl": "0px 12px 21px 4px rgba(34, 197, 94, 0.1)"
      }
    },
    screens: {
      'sm': { 'min': '640px' },
      'md': { 'min': '768px' },
      'lg': { 'min': '1024px' },
      'xl': { 'min': '1280px' },
      'max-xl': { 'max': '1279px' },
      'max-lg': { 'max': '1023px' },
      'max-md': { 'max': '767px' },
      'max-sm': { 'max': '639px' },
    },
  },
  plugins: [],
}
