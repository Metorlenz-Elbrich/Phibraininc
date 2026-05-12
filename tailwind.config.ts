import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // PhiBrain brand palette (from official logo)
        brand: {
          50: "#EAF7FD",
          100: "#CBEBF8",
          200: "#9BD8F1",
          300: "#67C2E9",
          400: "#3EB1E1",
          500: "#29ABE2", // primary cyan from logo
          600: "#1F8DBA",
          700: "#196F92",
          800: "#13556F",
          900: "#0E3F53",
          950: "#082837",
        },
        ink: {
          50: "#F7F7F8",
          100: "#EEEEF0",
          200: "#D8D9DC",
          300: "#B6B8BD",
          400: "#878A90",
          500: "#5C5F65",
          600: "#43464C",
          700: "#3C3C3C", // anthracite from logo
          800: "#2A2B2E",
          900: "#1A1B1D",
          950: "#0C0D0F",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 7vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-xl": ["clamp(2.75rem, 5.2vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "elevation-1": "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.04)",
        "elevation-2": "0 4px 8px -2px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        "elevation-3": "0 12px 24px -8px rgb(0 0 0 / 0.10), 0 4px 8px -4px rgb(0 0 0 / 0.06)",
        "elevation-4": "0 24px 48px -12px rgb(0 0 0 / 0.18), 0 8px 16px -8px rgb(0 0 0 / 0.10)",
        "glow-brand": "0 0 0 1px rgb(41 171 226 / 0.30), 0 0 28px -4px rgb(41 171 226 / 0.35)",
        "inset-border": "inset 0 0 0 1px rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgb(0 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.04) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)",
        "brand-gradient":
          "linear-gradient(135deg, #29ABE2 0%, #67C2E9 50%, #1F8DBA 100%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
