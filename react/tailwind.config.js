/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    darkMode: ["class"],
  theme: {
    extend: {
      colors:{
        primary:"var(--primary-color)",
        foreground:{DEFAULT:"var(--foreground)",dark:"var(--dark-foreground)"},
        background:{DEFAULT:"var(--background)",dark:"var(--dark-background)"},
         dark:"var(--dark)",
        light:"var(--light)",
        brown:{
          DEFAULT:"#5f6368",
          overlay:"#5f636840"
        }
      },
      boxShadow:{
        "search":"inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07)"
      }
    },
  },
  plugins: [],
}