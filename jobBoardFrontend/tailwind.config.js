/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cerulean': '#0081A7',
        'dogwood': '#F4D8CD',
        'gunmetal': '#292F36'
      }
    },
  },
  plugins: [],
}

