/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
"./public/index.html",
"./public/**/*.js",
"./public/ui.html"],
  theme: {
    extend: {
        colors: {
            "gm-blood-red": "rgba(108, 6, 7, 1)",
            "gm-dark-red": "rgba(153, 5, 6, 1)",
            "gm-indigo-dye": "rgba(13, 64, 87, 1)",
            "gm-raisin-black": "rgba(28, 20, 21, 1)",
            "gm-star-command-blue": "rgba(5, 124, 176, 1)",
      },
      height: {
          '128': '32rem',
          '140': '40rem',
      },
      width: {
          '128': '32rem',
          '140': '40rem', 
      },
      maxWidth: {
          '128': '32rem',
      },
    },
  },
  plugins: [],
}