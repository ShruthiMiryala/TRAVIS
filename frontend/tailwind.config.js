/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',   // Gold color
        'purple-dark': '#6A0DAD', // Dark Purple
        'purple-light': '#9B30FF', // Light Purple
        'purple-soft': '#C3A6FF', // Softer Purple for backgrounds
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        slideInAndFloat: 'slideIn 1.5s ease-out forwards, float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(30px)', opacity: 1 }, // small shift from left edge
        },
      },
  plugins: [],
}
  }
}
