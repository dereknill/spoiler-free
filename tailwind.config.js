module.exports = {
  content: ["./src/*.{js, jsx, ts, tsx}", "./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        baskerville: ['"Libre Baskerville"', "serif"],
        montserrat: ['Montserrat", "sans-serif'],
        vollkorn: ["Vollkorn", "serif"],
        crimson: ["Crimson Pro", "serif"],
      },
      colors: {
        neonred: "#FF3131",
      },
      transitionProperty: {
        maxHeight: "max-height",
      },
    },
  },
  plugins: [],
};
