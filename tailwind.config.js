/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
  950: "var(--ink-950)",
  900: "var(--ink-900)",
  800: "var(--ink-800)",
  700: "var(--ink-700)",
  600: "var(--ink-600)",
},
mist: {
  400: "var(--mist-400)",
  200: "var(--mist-200)",
  50: "var(--mist-50)",
},
        ghost: {
          DEFAULT: "#7C6FF0",
          light: "#9D93F5",
          dark: "#5E52C9",
        },
        signal: {
          DEFAULT: "#3ECF8E",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124, 111, 240, 0.25), 0 0 24px rgba(124, 111, 240, 0.15)",
      },
    },
  },
  plugins: [],
};
