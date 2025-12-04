/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
        xx: "280px",
        mm: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {},
      fontFamily: {
        generalSans: ["General Sans", "sans-serif"],
        Cabin: ["Cabin", "sans-serif"],
        Jost: ["Jost", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        fig: ["Figtree", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        Pin: ["Pineapple Demo", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        Sallomae: ["Sallomae", "sans-serif"],
        Mont: ["Montserrat", "sans-serif"],
        Oxanium: ["Oxanium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
