/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#232429',
        secondaryColor: '#333740',
        tertiaryColor: '#40434D',
        primaryContentColor: '#f5f5f5',
        secondaryContentColor: '#b5b5b5',
        tertiaryContentColor: '#999fab',
        accentPrimaryColor: '#7E7CF7',
        accentSecondaryColor: '#656a80',
        accentTertiaryColor: '#4B4D63',
        dangerColor: '#E63946',
        successColor: '#2A9D8F'
      }
    },
  },
  plugins: [],
}

