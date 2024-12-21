/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B89146",
        secondary:"#5B2E01"
      }
    },
  },
  plugins: [require("daisyui")],
};
