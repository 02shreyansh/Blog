/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'soft-glow-horizontal': 'soft-glow-horizontal 5s ease-in-out infinite',
        'soft-glow-diagonal': 'soft-glow-diagonal 7s ease-in-out infinite',
      },
      keyframes: {
        'soft-glow-horizontal': {
          '0%, 100%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { transform: 'translateX(100%)', opacity: 0.8, filter: 'blur(12px)' },
        },
        'soft-glow-diagonal': {
          '0%, 100%': { transform: 'translate(-100%, -100%)', opacity: 0 },
          '50%': { transform: 'translate(100%, 100%)', opacity: 0.8, filter: 'blur(18px)' },
        },
      }
    },
  },
  plugins: [],
}

