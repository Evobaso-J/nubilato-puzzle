export default {
  content: [],
  theme: {
    extend: {
      colors: {
        celebration: {
          bg: '#1a0b2e',
          accent: '#ec4899',
          gold: '#fbbf24',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
        'reveal-bounce': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        'reveal-bounce': 'reveal-bounce 0.35s ease-out',
      },
    },
  },
}
