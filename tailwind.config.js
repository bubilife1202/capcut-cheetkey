/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'card-bg': '#1E1E1E',
        'accent': '#22D3EE',
      },
    },
  },
  plugins: [],
}
