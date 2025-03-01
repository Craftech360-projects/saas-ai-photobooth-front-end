// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          'progress': 'progress 2s linear infinite',
        },
        keyframes: {
          progress: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
      },
    },
  };