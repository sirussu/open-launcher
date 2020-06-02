const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    tailwindcss
  ],
  // Disable autoprefixer not needed in this project
  vue: {
    autoprefixer: false
  }
}
