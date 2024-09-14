/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cardinal: "#F57206",
        black: "#000000",
        white: "#FFFFFF",
        hover1: "#FFAB66",
        hover2: "#DBDBDB",
        border: "#CCCCCC",
        lightbg: "#FFFFFF",
        darkbg: "#0A090D",
        specialRelation: "#0075FF",
        whitesmoke: "#FAFAFA",
        l_input: "#565A59",
      },
      fontSize: {
        40: "40px",
        18: "18px",
        16: "16px",
        14: "14px",
        12: "12px",
      },
      width: {
        "auth-input": "345px",
        "auth-btn": "160px",
        "input-icon": "28px",
      },
      height: {
        "auth-input": "45px",
        "auth-btn": "40px",
        "input-icon": "28px",
      },
      spacing: {
        "auth-input": "16px",
      },
      padding: {
        "auth-input-y": "10px",
        "auth-input-x": "10px",
      },
    },
  },
  plugins: [

  ],
};
