import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Bebas Neue — bold condensed display (closest free match to Danson Bold)
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        // DM Sans — clean body
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        // Instrument Serif — elegant italic accents
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        teal: {
          DEFAULT: "#0d9488",
          light: "#f0fdfa",
          pale: "#ccfbf1",
          bright: "#14b8a6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
