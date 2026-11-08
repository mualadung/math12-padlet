import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        mach: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        moss: "var(--moss)",
        olive: "var(--olive)",
        rust: "var(--rust)",
        gold: "var(--gold)",
        ink: "var(--ink)",
        sage: "var(--sage)",
        terracotta: "var(--terracotta)",
        machCyan: "var(--cyan)",
        machEmerald: "var(--emerald)",
        machViolet: "var(--violet)",
      },
      boxShadow: {
        paper: "var(--paper-shadow)",
        "paper-hover": "var(--paper-shadow-hover)",
      },
    },
  },
  plugins: [],
};
export default config;
