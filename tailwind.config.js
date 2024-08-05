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
        'cover-gradient': 'linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,1))',
        'backdrop-gradient': 'linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88))',
      },
      aspectRatio: {
        'card': '2 / 3', // equivalent to 1.5 / 1
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}