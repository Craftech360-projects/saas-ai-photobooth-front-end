// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear 1',
          'ping-once': 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) 1',
          'progress': 'progress 2s linear infinite',
          'zoom-contained': 'zoom-contained 0.8s ease-out 1',
        },
        keyframes: {
          progress: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
          'zoom-contained': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' },
          },
        },
      },
    },
  };