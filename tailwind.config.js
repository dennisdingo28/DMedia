/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      'Noto':['Noto Sans','sans-serif'],
      'Open':['Open Sans','sans-serif'],
      'Karla':['Karla', 'sans-serif']
    },
    extend: {
      colors:{
        darkColor:"#141313",
        darkPurple:"#3c06ba",
        darkViolet:"#5a29cc",
        darkBlue:"rgb(37,99,235)"
      }
    },
  },
  plugins: [],
}