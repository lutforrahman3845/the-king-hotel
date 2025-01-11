/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B89146",
        secondary:"#5B2E01"
      },
      fontFamily: {
        'cinzel': ["Cinzel", "serif"],
      },
      screens:{
        '3xl':'1900px'
      }
      
    },
  },
  plugins: [require("daisyui")],
};
