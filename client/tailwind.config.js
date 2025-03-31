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
        colorPrimary:"#0A0F1F",
        buttonPrimary: "#BEBEBE",
        buttonPrimaryHover: "#9E9E9E",
        hoverPrimary:"#3E3E3E",
        buttonSecondary: "#00ADB5",
        buttonSecondaryHover: "#008A92",
        buttonTertiary: "#FF5722",
        buttonTertiaryHover: "#E64A19",
        buttonSubmitted: "#00CED1",
        
        secondary: "#16325B",
        third:"#533483",
        vbYellow:"#FFDC7F"
      },
    },
  },
  plugins: [heroui()],
}

