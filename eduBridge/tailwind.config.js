/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        soul: ['"Soul Signature"', 'cursive'], // fallback if not loaded
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}