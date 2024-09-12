/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      color: {
        main: "#F57206",
        black: "#000000",
        white: "#FFFFFF",
        hover1: "#FFAB66",
        hover2: "#DBDBDB",
        border: "#CCCCCC",
        lightbg: "#FFFFFF",
        darkbg: "#0A090D",
        specialRelation: "#0075FF",
        whitesmoke: "#FAFAFA",
      },
      fontSize: {
        '18':'18px',
        '16':'16px',
        '12':'12px'
      },
    },
  },
  plugins: [],
};
