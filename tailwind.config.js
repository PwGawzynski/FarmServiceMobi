/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors:{
      "dark": '#081e3f',
      "dark-green": '#083d56',
      "light-green": '#0e5f76',
      "green": '#d7df71',
    }
  },
  plugins: [],
};
