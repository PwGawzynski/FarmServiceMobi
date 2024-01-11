/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors:{
      "dark": '#081e3f',
      "dark-blue": '#083d56',
      "light-blue": '#0e5f76',
      "green": '#d7df71',
      "dark-gray": '#939292',
      "error-red": "#fd6363",
      "activity-dot": "#ff4400"
    }
  },
  plugins: [],
};
