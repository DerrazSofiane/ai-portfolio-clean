import { createContext, useContext, useState, useEffect } from 'react';
import { colorPalettes } from '../styles/colorPalettes';

const ColorPaletteContext = createContext();

export const useColorPalette = () => {
  const context = useContext(ColorPaletteContext);
  if (!context) {
    throw new Error('useColorPalette must be used within ColorPaletteProvider');
  }
  return context;
};

export const ColorPaletteProvider = ({ children }) => {
  const [currentPalette, setCurrentPalette] = useState(() => {
    // Load saved palette from localStorage or use default
    const saved = localStorage.getItem('colorPalette');
    return saved || 'forestProfessional';
  });

  const palette = colorPalettes[currentPalette] || colorPalettes.forestProfessional;

  const changePalette = (paletteName) => {
    if (colorPalettes[paletteName]) {
      setCurrentPalette(paletteName);
      localStorage.setItem('colorPalette', paletteName);
      
      // Update CSS variables
      updateCSSVariables(colorPalettes[paletteName].colors);
    }
  };

  const updateCSSVariables = (colors) => {
    if (!colors) return;
    
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--color-${key}`, value);
      }
    });
  };

  useEffect(() => {
    // Set initial CSS variables
    if (palette && palette.colors) {
      updateCSSVariables(palette.colors);
    }
  }, [palette]);

  return (
    <ColorPaletteContext.Provider value={{
      currentPalette,
      palette,
      changePalette,
      availablePalettes: colorPalettes
    }}>
      {children}
    </ColorPaletteContext.Provider>
  );
};