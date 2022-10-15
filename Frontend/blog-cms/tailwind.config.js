/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./dist/*.html'],  
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {},
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
