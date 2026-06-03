/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2563EB",   // blue-600
        secondary: "#22C55E", // green-500
        background: "#F9FAFB", // gray-50
      },
    },
  },
  plugins: [],
};
