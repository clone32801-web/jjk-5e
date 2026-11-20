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

  // Theme-specific styles & color tokens (Restrained, tactical accents)
  const themeTokens = {
    cyan: {
      name: 'Lục Nhãn (Six Eyes)',
      accent: '#00D2FF',
      accentClass: 'text-[#00D2FF]',
      bgAccent: 'bg-[#00D2FF]/10',
      borderAccent: 'border-[#00D2FF]/30',
      glowClass: 'ring-1 ring-[#00D2FF]/30',
      kanji: '青',
      btnActive: 'bg-[#00D2FF] text-black font-semibold',
    },
    crimson: {
      name: 'Nguyền Vương (Sukuna)',
      accent: '#DC2626',
      accentClass: 'text-[#DC2626]',
      bgAccent: 'bg-[#DC2626]/10',
      borderAccent: 'border-[#DC2626]/30',
      glowClass: 'ring-1 ring-[#DC2626]/30',
      kanji: '赤',
      btnActive: 'bg-[#DC2626] text-white font-semibold',
    },
    purple: {
      name: 'Hư Thức Tử (Hollow Purple)',
      accent: '#8B5CF6',
      accentClass: 'text-[#8B5CF6]',
      bgAccent: 'bg-[#8B5CF6]/10',
      borderAccent: 'border-[#8B5CF6]/30',
      glowClass: 'ring-1 ring-[#8B5CF6]/30',
      kanji: '紫',
      btnActive: 'bg-[#8B5CF6] text-white font-semibold',
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
