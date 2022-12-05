/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,html,js}",
    "./public/**/*.js"
  ],
  theme: {
    container:{
      center:true,
    },
    screens:{
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily:{
      display: [],
      body:[],
    },
    extend: {
      colors:
      {
      transparent: 'transparent',
        current: 'currentColor',

        'Purple': {
          900: '#4c1d95',
          700: '#7e22ce',
          300: '#d8b4fe',
          400: '#c084fc'

        },
        'Fuchsia': {
          900: '#701a75',
          300: '#f0abfc'
        },
        'Violet': {
          900: '#4c1d95',
          400: '#a78bfa',
          300: '#c4b5fd'
        },
        'Red' : {
          400: '#f87171',
          900: '#7f1d1d',
          300: '#fca5a5'
        },
        'Orange': {
          900: '#7c2d12',
          700: '#c2410c',
          800: '#9a3412',
        }



      }
    },
  },
  plugins: [require("daisyui")],
}
