import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EE",
        pearl: "#FFFBF4",
        cream: "#F6EEE0",
        beige: "#EFE3D2",
        champagne: "#E8D8B8",
        champagneGold: "#C9A24B",
        gold: "#D4AF37",
        blush: "#F4B8C3",
        blushSoft: "#FBE1E6",
        roseGold: "#B76E79",
        rosewood: "#5F3132",
        ink: "#2F2525",
        cocoa: "#3D2B23"
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 26px 90px rgba(185, 120, 105, 0.24)",
        gold: "0 16px 48px rgba(201, 162, 75, 0.28)",
        blush: "0 24px 70px rgba(244, 184, 195, 0.28)",
        soft: "0 18px 60px rgba(95, 49, 50, 0.10)"
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E8D8B8 0%, #D4AF37 45%, #B76E79 100%)",
        "soft-cream": "linear-gradient(180deg, #FFFBF4 0%, #FAF6EE 50%, #F6EEE0 100%)",
        "rose-sheen": "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-22px) translateX(8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        sparkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.7)" },
          "50%": { opacity: "1", transform: "scale(1.15)" }
        },
        blobDrift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -3%) scale(1.06)" },
          "66%": { transform: "translate(-3%, 4%) scale(0.96)" }
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 9s ease-in-out infinite",
        shimmer: "shimmer 2.8s linear infinite",
        sparkle: "sparkle 3s ease-in-out infinite",
        blobDrift: "blobDrift 22s ease-in-out infinite",
        spinSlow: "spinSlow 40s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
