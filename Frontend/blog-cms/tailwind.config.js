/** @type {import('tailwindcss').Config} */
module.exports = {
  media: false, // or 'media' or 'class'
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:  {
          100: "#d6d6d6",
          200: "#adadad",
          300: "#838384",
          400: "#5a5a5b",
          500: "#313132",
          600: "#272728",
          700: "#1d1d1e",
          800: "#141414",
          900: "#0a0a0a",
          DEFAULT: "#313132"
        },
        secondary : {
          100: "#fdfdfd",
          200: "#fbfbfc",
          300: "#f9fafa",
          400: "#f7f8f9",
          500: "#f5f6f7",
          600: "#c4c5c6",
          700: "#939494",
          800: "#626263",
          900: "#313131",
          DEFAULT: "#f5f6f7"
        },
        box: '#FFFFFF',
        title: "#1d1d1e",
        date: "#d5d5d6",
        text:{
          dark: "2c2c2d",
          light: "#bbbbbb"
        },
       
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  variants: {  
    extend: {},  
  },
  plugins: [],
}
