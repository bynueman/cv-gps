import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutral base — warm cream / espresso (the 80%)
        cream: {
          50: "#FCF9F2",
          100: "#F7F1E5",
          200: "#EFE5D1",
          300: "#E3D4B8",
        },
        espresso: {
          950: "#231810",
          900: "#2C1F14",
          800: "#3C2B1B",
          700: "#4F3923",
          600: "#6A4D30",
          500: "#8A6845",
        },
        // Brand foundation — Kuicip golden yellow + deep brown (the 15%)
        gold: {
          300: "#F7C75E",
          400: "#F2B234",
          500: "#E29A12",
          600: "#C27F0A",
          700: "#9C6508",
        },
        // Putri Teko — earthy amber / ginger / tamarind / herbal (accents)
        ginger: "#C06B2D",
        tamarind: "#8A4A26",
        palmsugar: "#5E3B1E",
        turmeric: "#D98E23",
        herbal: "#5F7A3D",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "76rem",
      },
      boxShadow: {
        lift: "0 14px 34px -14px rgba(44, 31, 20, 0.28)",
        card: "0 6px 20px -10px rgba(44, 31, 20, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
