/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    '../components/**/*.{js,ts,jsx,tsx,mdx}',
    '../pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        funBlack: '#0e0e0e'
      }
    },
  },
  plugins: [],
}