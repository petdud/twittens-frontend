/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js,ts,tsx}',
    './src/components/**/*.{html,js,ts,tsx}',
    './src/layouts/**/*.{html,js,ts,tsx}',
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
