/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',
        secondary: '#14b8a6',
        accent: '#f0fdfa',
        medical: '#0c4a6e'
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
