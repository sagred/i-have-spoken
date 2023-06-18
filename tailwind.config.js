/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Josefin": ["Major Mono Display", ...defaultTheme.fontFamily.sans],
        "Rajdhani": ["Rajdhani", ...defaultTheme.fontFamily.sans],

      },
      animation: {
        'spin-fast': 'spin 0.3s linear infinite',
      }
    },
  },
  daisyui: {
    themes: [
      "black",
    ],
  },
  plugins: [require("daisyui"), require('tailwindcss-dotted-background'),]
}
