/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
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
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}