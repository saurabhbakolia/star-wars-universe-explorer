/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sw-dark': '#0F1419',
        'sw-blue': '#0A1929',
        'sw-gold': '#FFD700',
        'sw-red': '#FF4444',
        'sw-gray': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
