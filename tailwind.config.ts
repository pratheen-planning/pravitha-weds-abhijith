import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F1E3",
        pearl: "#FFF9F1",
        champagne: "#E8D8B8",
        champagneGold: "#C8A45D",
        blush: "#F4B8C3",
        blushSoft: "#FBE1E6",
        roseGold: "#B97869",
        rosewood: "#5F3132",
        ink: "#2F2525"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 26px 90px rgba(185, 120, 105, 0.24)",
        gold: "0 16px 48px rgba(200, 164, 93, 0.25)",
        blush: "0 24px 70px rgba(244, 184, 195, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
