/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // primary: "#383A63",
        primary: "#0F3460",
        hoverprimary:"#16213E",
        secondary: "#16325B",
        third:"#533483",
        vbYellow:"#FFDC7F"
      },
    },
  },
  plugins: [],
}

