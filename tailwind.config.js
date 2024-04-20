/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors:{
      "dark": '#121212',
      "dark-blue": '#083d56',
      "light-blue": '#0e5f76',
      "green": '#d7df71',
      "dark-gray": '#939292',
      "dark-8": '#494949',
      "error-red": "#fd6363",
      "activity-dot": "#ff4400",
      "white": "#ffffff",
    }
  },
  plugins: [],
};
