import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#111111",
          100: "#1A1A1A",
          200: "#222222",
          300: "#2A2A2A",
          400: "#333333",
        },
        red: {
          DEFAULT: "#E53333",
          dark: "#C42B2B",
          light: "#FF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
