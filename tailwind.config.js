module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: "#f1f2f2",
        "green-brand": "# ",
        "coklat-smooth": "#F9F9F9",
      },
      spacing: {
        "800px": "800px",
        "400px": "400px",
        "1020px": "1020px",
      },
      maxWidth: {
        "1020px": "1020px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
