const path = require('path');
    
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
  content: [
    path.join(__dirname, "./index.html"),
    path.join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx}"),
  ]
}