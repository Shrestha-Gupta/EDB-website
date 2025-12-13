/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'brand-white': '#FFFFFF',         // Outer circular background, text backgrounds
        'brand-black': '#000000',         // Central pen nib, text, outlines
        'brand-navy': '#001a4d',          // Very dark blue variant
        
        // Warm Colors (Golden Yellow → Orange Gradient)
        'brand-gold': '#FFD700',          // Golden yellow (warmth/knowledge)
        'brand-yellow': '#FFC300',        // Yellow accent
        'brand-orange': '#FF8C42',        // Orange gradient end
        'brand-red': '#C41E3A',           // Ribbon red
        
        // Cool Colors (Blue Shades)
        'brand-blue-light': '#87CEEB',    // Light blue (wings/pages)
        'brand-blue': '#4A90E2',          // Medium blue (scholarly feel)
        'brand-blue-dark': '#1E40AF',     // Dark blue shade
        'brand-cyan': '#00CED1',          // Cyan/Teal highlights
        'brand-teal': '#0095B6',          // Teal accent
      },
      fontFamily: {
        'serif': ['Times New Roman', 'Times', 'serif'],
        'sans': ['Times New Roman', 'Times', 'serif'],
        'display': ['Times New Roman', 'Times', 'serif'],
        
      },
      backgroundImage: {
        'sun-gradient': 'linear-gradient(135deg, #E63946 0%, #FF8C42 50%, #FFD60A 100%)',
        'logo-radial': 'radial-gradient(circle, #FFD60A 0%, #FF8C42 50%, #E63946 100%)',
      },
    },
  },
  plugins: [],
}
