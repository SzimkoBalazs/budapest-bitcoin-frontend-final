/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utilities/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      fullhd: "1536px",
      lx: "1135px",
      lg: "1060px",
      pop: "1246px",
      ticket: "1275px",
      speaker: "655px",
      md: "768px",
      sm: "640px",
      xs: "500px",
      xxs: "390px",
      gl: "900px",
      footerTitle: "800px",
      navbarBreak: "1200px",
      whatToExpectBreak: "1000px",
      whaleTextXs: "410px",
      whaleTextXsHu: "373px",
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
          950:"#0f0f0f",
          900: "#1F1F1F",
          700: "#4D4D4D",
          300:"#B2B2B2",
          200:"#CCCCCC",
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
      height:{
        'mobile-menu':'calc( 100dvh - 58px)',
        'hero-section':'95vh',
        'hero-section-small':'110vh',
      },
      minHeight: {
        "mobile-menu": "500px",
        "mobile-menu-auto": "auto",
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
        ".hero-bg":{
          "backgroundSize":'180vh',
          "backgroundPosition":'50% 0%',
        },
        ".hero-bg-middle":{
          "backgroundSize":'160vh',
          "backgroundPosition":'50% 0%',
        },
        ".hero-bg-mobile":{
          "backgroundSize":"160vh",
          "backgroundPosition":"50% 0%",
        },
        ".big-title": {
          textShadow:
            "0px 0px 3px #000,  -1px 1px 0px #FFAE0B, -2px 2px 0px #FFAE0B, -3px 3px 0px #FFAE0B, -4px 4px 0px #FFAE0B, -5px 5px 0px #FFAE0B, -6px 6px 0px #FFAE0B, -7px 7px 0px #FFAE0B, -9px 9px 8px rgba(247, 147, 26, 0.20)",
        },
        ".big-title-mobile": {
          textShadow:
            "0px 0px 3px #000,  -1px 1px 0px #FFAE0B, -2px 2px 0px #FFAE0B, -3px 3px 0px #FFAE0B, -4px 4px 0px #FFAE0B, -5px 5px 0px #FFAE0B,  -7px 7px 6px rgba(247, 147, 26, 0.20)",
        },
        ".mobile-menu-container": {
          height: "100dvh",
        },
        ".no-scroll": {
          overflow: "hidden",
        },
      });
    },
  ],
};
