/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo Primary Colors
        'brand-red': '#C41E3A',           // Deep crimson from ribbon
        'brand-scarlet': '#E63946',       // Upper sun gradient
        'brand-orange': '#FF8C42',        // Mid sun gradient
        'brand-gold': '#FFD60A',          // Sun center & ribbon trim
        'brand-yellow': '#FFC300',        // Soft gold accent
        'brand-teal': '#0095B6',          // Wing/feather cyan
        'brand-cyan': '#0EA5E9',          // Light teal accent
        'brand-black': '#1a1a1a',         // Pen nib & text
        'brand-white': '#ffffff',         // Background
        
        // Gradient helpers
        'brand-navy': '#001a4d',          // Deep wing shadows
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'sun-gradient': 'linear-gradient(135deg, #E63946 0%, #FF8C42 50%, #FFD60A 100%)',
        'logo-radial': 'radial-gradient(circle, #FFD60A 0%, #FF8C42 50%, #E63946 100%)',
      },
    },
  },
  plugins: [],
}
