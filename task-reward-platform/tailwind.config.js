New-Item -ItemType File -Name tailwind.config.js
Set-Content -Path tailwind.config.js -Value "module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
};"
