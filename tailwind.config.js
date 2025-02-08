/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js,ts,tsx}',
    './src/components/**/*.{html,js,ts,tsx}',
    './src/layouts/**/*.{html,js,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      const utilities = {
        '.break-spaces': {
          'white-space': 'break-spaces'
        },
        '.overflow-wrap-anywhere': {
          'overflow-wrap': 'anywhere'
        }
      };

      addUtilities(utilities);
    }
  ]
};
