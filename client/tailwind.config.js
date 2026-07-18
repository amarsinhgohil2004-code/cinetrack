/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#0F172A",
        card: "#1E293B",
        brand: {
          DEFAULT: "#EF4444",
          hover: "#DC2626",
        },
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.5)",
        glow: "0 10px 40px -10px rgba(239,68,68,0.45)",
      },
    },
  },
  plugins: [],
};
