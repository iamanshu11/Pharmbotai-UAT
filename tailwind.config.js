/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 1s ease-out',
          'bounce': 'bounce 3s ease-in-out infinite',
          'blink': 'blink 1s step-end infinite',
          'slide-up': 'slideUp 0.8s ease-out',
          'scale-in': 'scaleIn 0.8s ease-out',
          'shimmer': 'shimmer 2s linear infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          blink: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.8)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          shimmer: {
            '0%': {
              backgroundPosition: '-200% 0',
            },
            '100%': {
              backgroundPosition: '200% 0',
            },
          },
        },
        backgroundImage: {
          'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        },
      },
    },
    plugins: [],
  }
  