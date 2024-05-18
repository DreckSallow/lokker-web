import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "overpage": "#fafafa", 
        "page": "#ffffff", 
        "subtext":"#666666",
        "headtext":"#171717",
        "line":"#828282",
        "softline":"#e5e5e5b3",
        "brand": "#141d26",
        "brand-soft": "#e0e4ea"
      }
    },
  },
  plugins: [typography],
}

