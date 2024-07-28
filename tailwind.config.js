/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("tailwindcss-scrollbar"),
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto Slab"', 'sans'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}