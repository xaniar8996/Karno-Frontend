/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9FAFB",
        primary: "#2563EB",
        secondary: "#475569",
        accent: "#0EA5E9",
        text: "#1E293B",
      },
      fontFamily: {
        vazirmatn: ["Vazirmatn", "sans-serif"],
      },
    },
  },
  plugins: [],
};
