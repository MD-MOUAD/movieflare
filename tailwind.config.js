/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inputBackGround: "#1f2123",
        inputColor: "#a1a1a1",
      },
      fontFamily: {
        roboto: ['"Roboto Slab"', 'sans'],
        raleway: ['Raleway', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'cover-gradient': 'linear-gradient(rgba(0,0,0,.60), rgba(0,0,0,.88))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}