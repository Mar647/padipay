/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#08090B",
        "obsidian-elevated": "#131519",
        "obsidian-card": "#1A1D22",
        emerald: {
          DEFAULT: "#10E094",
          dim: "#0B7A54",
        },
        gold: {
          DEFAULT: "#E0B872",
          dim: "#8A6B3A",
        },
        violet: "#8B6EFF",
        "text-primary": "#F7F7F4",
        "text-muted": "#85888E",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        "glow-emerald": "0 0 40px -10px rgba(16, 224, 148, 0.3)",
        "glow-gold": "0 0 30px -8px rgba(224, 184, 114, 0.2)",
        "glow-violet": "0 0 30px -8px rgba(139, 110, 255, 0.25)",
      },
    },
  },
  plugins: [],
};
