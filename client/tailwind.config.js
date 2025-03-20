/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tremor/react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // primary: "#383A63",
        hoverprimary:"#0A0F1F",
        buttonPrimary: "#BEBEBE",
        buttonPrimaryHover: "#9E9E9E",
        hoverSecundary:"#3E3E3E",
        
        secondary: "#16325B",
        third:"#533483",
        vbYellow:"#FFDC7F"
      },
    },
  },
  plugins: [heroui()],
}

