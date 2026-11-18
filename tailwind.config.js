/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // JJK Palette based on user requirements
        jjk: {
          void: '#070709',       // Deepest abyss
          bg: '#0A0A0C',         // Base background
          charcoal: '#12131A',   // Primary card background
          surface: '#171822',    // Elevated element
          cardHover: '#1B1D2B',  // Hovered card
          border: '#232636',     // Border tone
          borderLight: '#32364D',// Highlight border
          
          // Theme Accents
          cyan: '#00D2FF',       // Cursed Energy & Six Eyes (Gojo)
          cyanGlow: 'rgba(0, 210, 255, 0.35)',
          
          red: '#DC2626',        // Sukuna Crimson & Black Flash
          redGlow: 'rgba(220, 38, 38, 0.35)',
          
          purple: '#7C3AED',     // Hollow Purple (Hư Thức: Tử)
          purpleGlow: 'rgba(124, 58, 237, 0.35)',
          
          gold: '#F59E0B',       // Sukuna / Pinnacle Refinement
          muted: '#94A3B8',      // Text secondary
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        kanji: ['"Noto Serif JP"', 'serif'],
        display: ['"Chakra Petch"', '"Be Vietnam Pro"', 'sans-serif'],
        jjk: ['"Dela Gothic One"', '"Chakra Petch"', 'sans-serif'],
        combat: ['"Chakra Petch"', '"Be Vietnam Pro"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(0, 210, 255, 0.35)',
        'glow-red': '0 0 25px -4px rgba(220, 38, 38, 0.35)',
        'glow-purple': '0 0 25px -4px rgba(124, 58, 237, 0.35)',
        'domain': '0 0 80px 20px rgba(7, 7, 9, 0.95)',
      },
      animation: {
        'curse-pulse': 'cursePulse 3s ease-in-out infinite',
        'domain-ripple': 'domainRipple 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spark': 'sparkCrackle 0.8s ease-out infinite',
      },
      keyframes: {
        cursePulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        domainRipple: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        sparkCrackle: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px #DC2626)' },
          '50%': { filter: 'drop-shadow(0 0 12px #DC2626) brightness(1.3)' },
        }
      }
    },
  },
  plugins: [],
}
