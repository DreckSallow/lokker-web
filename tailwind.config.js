/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "page": "#fafafa", 
        "overpage": "#ffffff", 
        "subtext":"#666666",
        "headtext":"#171717",
        "brand": "#141d26",
        "brand-soft": "#e0e4ea"
      }
    },
  },
  plugins: [],
}

