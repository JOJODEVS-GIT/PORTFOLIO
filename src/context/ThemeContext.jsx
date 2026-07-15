import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // On ne mémorise le thème que si le visiteur le change lui-même
  const toggleTheme = () => setTheme((prev) => {
    const next = prev === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') localStorage.setItem('portfolio-theme', next);
    return next;
  });

  // Applique le thème par défaut défini dans l'admin, sauf si le visiteur a déjà choisi
  const applyDefaultTheme = (t) => {
    if (t && typeof window !== 'undefined' && !localStorage.getItem('portfolio-theme')) {
      setTheme(t);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, applyDefaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
