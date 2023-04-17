/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "gilroy": ["Gilroy", "GilroyBold"],
        "gilroySemiBold": ["GilroySemiBold",],
      },
      colors: {
        "light": "#F5F6F7",
        "dark": "#17181A",
        "dark-1": "#202226",
        "dark-2": "#242322",
        "dark-3": "#2E2C28",
        "primary-green": "#00783F",
        "primary-yellow" : "#C89211",
        "dark-text": "#464754",
        "light-text": "#EEF1F8",
        "dim-text": "#A69F9F",
        "dim-text-dark": "#6C717A",
        "gray": "#807373",
        "gray-dark": "#BBB6B0",   
      },
      backgroundImage: {
        'tree-pattern': "url('../public/images/tree-logo-desktop.svg')",
        'tree-pattern-mobile': "url('../public/images/tree-logo.svg')",
      }
    },
  },
  plugins: [],
}
