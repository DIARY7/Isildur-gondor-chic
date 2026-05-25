export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'Cormorant Garamond', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sand: '#f3e7d9',
        ochre: '#b48a4d',
        earth: '#6b4f2a',
        ivory: '#f9f4ec',
        stone: '#7c6a57',
        charcoal: '#221b17',
      },
      boxShadow: {
        soft: '0 28px 80px rgba(34, 27, 23, 0.12)',
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.45), transparent 35%), radial-gradient(circle at bottom right, rgba(205, 178, 127, 0.18), transparent 25%)',
      },
    },
  },
  plugins: [],
}
