module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: "#f1f2f2",
        "green-brand": "#193335",
        "coklat-smooth": "#F9F9F9",
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
