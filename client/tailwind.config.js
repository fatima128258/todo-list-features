/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "toast-in": {
          from: { opacity: "0", transform: "translateX(0.75rem)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.35s ease-out forwards",
      },
      colors: {
        surface: {
          dark: "rgba(30, 41, 59, 0.85)",
          card: "rgba(71, 85, 105, 0.45)",
        },
      },
    },
  },
  plugins: [],
};
