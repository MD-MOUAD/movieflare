/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto Slab"', 'sans'],
        raleway: ['Raleway', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}