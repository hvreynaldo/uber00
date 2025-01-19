/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        uber: {
          blue: '#276EF1',
          black: '#000000',
        },
      },
    },
  },
  plugins: [],
};