/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "bgcustom-main": "#e3e4e5",
      "bgcustom-nav": "#ededee",
      "bgcustom-primary": "#ffffff",
      "bgcustom-secondary": "#e5e5e5",
      "bgcustom-secondary-100": "#e4e5e6",
      "txtcustom-primary": "#272727",
      "txtcustom-secondary": "#3f4040",
      "txtcustom-secondar-100": "#4c4c4c",
    },
    extend: {
      maxHeight: {
        '48': '12rem', // Или любое значение, которое вам нужно
        '64': '16rem', // Например, можно добавить больше значений по необходимости
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
