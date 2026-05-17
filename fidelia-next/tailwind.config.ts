import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A2342",
        teal: "#0e7797",
        cyan: "#3fc3ee",
        "off-white": "#F5F8FA",
        "light-blue": "#EBF3FA",
        text: "#1a2e44",
        "text-muted": "#5a6e82",
        border: "#d4e4f0",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-h1": "clamp(2.25rem, 4vw + 1rem, 3.25rem)",
      },
    },
  },
  plugins: [],
};
export default config;
