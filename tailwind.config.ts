import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        brass: "#b7791f",
        harbor: "#0f766e",
        signal: "#2563eb",
      },
      /* Les familles Tailwind pointent sur les tokens (source de vérité : styles/tokens.css)
         pour qu'aucune utilitaire `font-*` ne puisse réintroduire une police non chargée. */
      fontFamily: {
        sans: ["var(--ts-font-main)"],
        mono: ["var(--ts-font-system)"],
        serif: ["var(--ts-font-titre)"],
      },
    },
  },
  plugins: [],
};

export default config;
