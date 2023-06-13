/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21BF73",
        secondary: "#f9fcfb",
      },
      screens: {
        xs: "360px", // Extra-small screens
        sm: "576px", // Small screens
        md: "768px", // Medium screens
        lg: "992px", // Large screens
        xl: "1200px", // Extra-large screens
        "2xl": "1440px", // 2x Extra-large screens
      },
    },
  },
  plugins: [],
};
