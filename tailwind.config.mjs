/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      fullhd: "1536px",
      lx: "1120px",
      lg: "1060px",
      pop: "1246px",
      ticket: "1275px",
      speaker: "655px",
      gl: "900px",
    },
    extend: {
      fontFamily: {
        fredoka: ["var(--font-fredoka)", "sans-serif"],
        exo: ["var(--font-exo)", "sans-serif"],
      },
      colors: {
        primary: {
          400: "#FFCD32",
          500: "#FFAE0B",
          600: "#F7931A",
          700: "#F57F18",
        },
        neutral: {
          900: "#1F1F1F",
          700: "#4D4D4D",
          100: "#E6E6E6",
        },
        secondary: {
          500: "#399BFC",
          600: "#308ADB",
        },
      },
      textStrokeWidth: {
        2: "2px",
      },
      textStrokeColor: {
        darkGray: "#1F1F1F",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 15s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-stroke": {
          "-webkit-text-stroke-width": "2px",
          "-webkit-text-stroke-color": "#1F1F1F",
        },
      });
    },
  ],
};
