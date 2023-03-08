/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ch-orange": "#F25D50",
        "ch-white": "#f9f9f9",
        "ch-red": "#E23737",
        "ch-light-green": "#83A14D",
        "ch-pink": "#DDA8A0",
        "ch-pink-shade": "#D65149",
        "ch-turqiouse": "#5AC18A",
        "ch-turqiouse-shade": "#c1ecd8",
        "ch-brown": "#7B3A3E",
        "ch-yellow": "#E8A951",
        "ch-yellow-shade": "#DB9B3D",
        "ch-dark-green": "#3A8658",
        "ch-purple": "#3F3063",
        "ch-indigo": "#040043",
        "ch-gray": "#D2D5DF",
        "ch-dark-gray": "#DADCE5",
      },
    },
  },
  plugins: [],
};
