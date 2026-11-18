import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Resonance: 'cyan' (Gojo/Six Eyes) | 'crimson' (Sukuna/Black Flash) | 'purple' (Hollow Purple)
  const [resonance, setResonance] = useState(() => {
    return localStorage.getItem('jjk_resonance') || 'purple';
  });

  useEffect(() => {
    localStorage.setItem('jjk_resonance', resonance);
  }, [resonance]);

  // Theme-specific styles & color tokens
  const themeTokens = {
    cyan: {
      name: 'Lục Nhãn (Six Eyes)',
      accent: '#00D2FF',
      accentClass: 'text-[#00D2FF]',
      bgAccent: 'bg-[#00D2FF]/15',
      borderAccent: 'border-[#00D2FF]/40',
      glowClass: 'aura-cyan',
      kanji: '青',
      btnActive: 'bg-[#00D2FF] text-black shadow-glow-cyan',
    },
    crimson: {
      name: 'Nguyền Vương (Sukuna)',
      accent: '#DC2626',
      accentClass: 'text-[#DC2626]',
      bgAccent: 'bg-[#DC2626]/15',
      borderAccent: 'border-[#DC2626]/40',
      glowClass: 'aura-red',
      kanji: '赤',
      btnActive: 'bg-[#DC2626] text-white shadow-glow-red',
    },
    purple: {
      name: 'Hư Thức Tử (Hollow Purple)',
      accent: '#7C3AED',
      accentClass: 'text-[#7C3AED]',
      bgAccent: 'bg-[#7C3AED]/15',
      borderAccent: 'border-[#7C3AED]/40',
      glowClass: 'aura-purple',
      kanji: '紫',
      btnActive: 'bg-[#7C3AED] text-white shadow-glow-purple',
    },
  };

  const currentTheme = themeTokens[resonance] || themeTokens.purple;

  return (
    <ThemeContext.Provider value={{
      resonance,
      setResonance,
      currentTheme,
      themeTokens,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
