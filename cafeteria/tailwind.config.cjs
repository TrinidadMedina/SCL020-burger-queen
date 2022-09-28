/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
 theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
    colors: {
      'dark-green': '#3D5552',
      'orange-1': '#a46e4f',
'orange-10':'#ab7d5c',
'orange-20':'#b28d6b',
'orange-30':'#ba9c7b',
'orange-40':'#c1ab8d',
'orange-50':'#c9ba9f',
'orange-60':'#d2c8b2',
'orange-70':'#dcd7c5',
'orange-80':'#e7e5d9',
'orange-90':'#f3f3ed',
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
      
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
  
