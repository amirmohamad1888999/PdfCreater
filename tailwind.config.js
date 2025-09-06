/** @type {import('tailwindcss').Config} */
const rtl = require("tailwindcss-rtl");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.6)",
        "dark-purple": "#390050",
        "custom-green":"#00674f",
        "custom-purple":"#582768",
        "custom-gray":"#848484",
        "custom-gray-pink":"#AD9082",
      },
      fontFamily: {
        custom: ["dana-fanum"],
      },
    },
  },
  plugins: [
    rtl,
    function({ addUtilities }) {
      addUtilities({
        '.optimize-text': {
          'WebkitTextStroke': '0.5px',
          'textRendering': 'optimizeLegibility',
          'WebkitFontSmoothing': 'antialiased',
        },
      })
    }
  ],
};