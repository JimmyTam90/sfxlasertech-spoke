/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0284C7', // BRAND_PRIMARY_COLOR
          light: '#38BDF8',
          dark: '#0369A1', // used for filled buttons (white text contrast >= 4.5:1)
          deeper: '#075985',
        },
        ink: '#0F172A', // BRAND_SECONDARY_COLOR
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
