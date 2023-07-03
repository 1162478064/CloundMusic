module.exports = {
  content: ['./src/**/*.{html,js,vue}', './public/**/*.{html,js}'],
  darkMode: 'class',
  variants: {
    extend: {
      textOpacity: ['dark'],
      backgroundColor: ['dark']
    }
  },
  theme: {
    extend: {},
  },
  plugins: [
      require('tailwindcss-dark-mode')()
  ],
};
