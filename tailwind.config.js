/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          "0": "#000000",
          50:"#000000",
          100: "#F57206",
          200: "#FFAB66",
          300: "#DBDBDB",
          310: "#CCCCCC",
          320: "#A9A9A9",
          330: "#565A59",
          340: "#F0F0F0",
          500: "#FFFFFF",
          510: "#FAFAFA",
          600: "#FFF2E8",
        },
        dark: {
          "0": "#000000",
          10: "#0A090D",
          50:"#000000",
          20: "#1F1F1F",
          100: "#F57206",
          200: "#FFAB66",
          300: "#2B2B2B",
          310: "#565A59",
          320: "#A9A9A9",
          330: "#4C4C4C",
          500: "#FFFFFF",
        },
        ios:{
          light:{
            340:"#F0F0F0"
          },
          dark:{
            330:"#4C4C4C"
          }
        },
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
        l_search: "#FFF2E8",
        deny: "#A9A9A9",
      },
      fontSize: {
        40: "40px",
        24: "24px",
        18: "18px",
        16: "16px",
        14: "14px",
        12: "12px",
        10: "10px",
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
      fontFamily: {
        "helvetica-bold": ["helvetica-bold"],
        "helvetica-bold-italic": ["helvetica-bold-italic"],
        "helvetica-light": ["helvetica-light"],
        "helvetica-light-italic": ["helvetica-light-italic"],
        "helvetica-regular": ["helvetica-regular"],
        "helvetica-ultra-light": ["helvetica-ultra-light"],
        "helvetica-ultra-light-italic": ["helvetica-ultra-light-italic"],
      },
    },
  },
  plugins: [],
};
