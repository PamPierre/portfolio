/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2540",
          50: "#EAF0F6",
          100: "#CBDAE8",
          200: "#9CB8D2",
          300: "#6D96BC",
          400: "#3E74A6",
          500: "#215888",
          600: "#193F63",
          700: "#122C46",
          800: "#0A2540",
          900: "#061729",
        },
        terracotta: {
          DEFAULT: "#E67E22",
          50: "#FDF3E9",
          100: "#FBE2C6",
          200: "#F6C58D",
          300: "#F1A854",
          400: "#EC922E",
          500: "#E67E22",
          600: "#C2650F",
          700: "#934D0C",
          800: "#63340A",
        },
        surface: "#FFFFFF",
        "surface-alt": "#F8FAFC",
        ink: "#1E293B",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "node-grid":
          "radial-gradient(circle at 1px 1px, rgba(230,126,34,0.18) 1px, transparent 0)",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(10,37,64,0.25)",
        "card-hover": "0 20px 45px -15px rgba(10,37,64,0.35)",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { strokeDashoffset: "0" },
          "50%": { strokeDashoffset: "24" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        pulseLine: "pulseLine 3s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
