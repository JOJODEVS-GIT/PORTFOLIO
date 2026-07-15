// Presets d'accent curatés (harmonies "luxe", pilotables depuis l'admin).
// Chaque preset définit les variables d'accent pour le mode sombre ET clair.

export const DEFAULT_PRESET = 'emeraude';

export const ACCENT_PRESETS = {
  emeraude: {
    label: 'Émeraude',
    swatch: '#17c99b',
    dark:  { accent: '#17c99b', bright: '#3ff0c0', dark: '#0e8f6f', glow: 'rgba(23,201,155,0.14)',  borderHover: 'rgba(23,201,155,0.35)',  cardHover: 'rgba(23,201,155,0.06)' },
    light: { accent: '#0e8f6f', bright: '#12a882', dark: '#0a6b53', glow: 'rgba(14,143,111,0.12)',  borderHover: 'rgba(14,143,111,0.40)',  cardHover: 'rgba(14,143,111,0.05)' },
  },
  or: {
    label: 'Or',
    swatch: '#d4af6a',
    dark:  { accent: '#d4af6a', bright: '#ecd39a', dark: '#a8874a', glow: 'rgba(212,175,106,0.16)', borderHover: 'rgba(212,175,106,0.40)', cardHover: 'rgba(212,175,106,0.07)' },
    light: { accent: '#9a7b3f', bright: '#b8965a', dark: '#7a6030', glow: 'rgba(154,123,63,0.14)',  borderHover: 'rgba(154,123,63,0.40)',  cardHover: 'rgba(154,123,63,0.06)' },
  },
  electrique: {
    label: 'Électrique',
    swatch: '#4b9bff',
    dark:  { accent: '#4b9bff', bright: '#7ab6ff', dark: '#2f7fe0', glow: 'rgba(75,155,255,0.16)',  borderHover: 'rgba(75,155,255,0.40)',  cardHover: 'rgba(75,155,255,0.07)' },
    light: { accent: '#2f7fe0', bright: '#4b9bff', dark: '#1f5fb0', glow: 'rgba(47,127,224,0.14)',  borderHover: 'rgba(47,127,224,0.40)',  cardHover: 'rgba(47,127,224,0.06)' },
  },
  violet: {
    label: 'Violet',
    swatch: '#9b8cff',
    dark:  { accent: '#9b8cff', bright: '#b9adff', dark: '#6d5de0', glow: 'rgba(155,140,255,0.16)', borderHover: 'rgba(155,140,255,0.40)', cardHover: 'rgba(155,140,255,0.07)' },
    light: { accent: '#6d5de0', bright: '#8b7cf6', dark: '#503fb0', glow: 'rgba(109,93,224,0.14)',  borderHover: 'rgba(109,93,224,0.40)',  cardHover: 'rgba(109,93,224,0.06)' },
  },
  corail: {
    label: 'Corail',
    swatch: '#ff7a5c',
    dark:  { accent: '#ff7a5c', bright: '#ff9d85', dark: '#e0512e', glow: 'rgba(255,122,92,0.16)',  borderHover: 'rgba(255,122,92,0.40)',  cardHover: 'rgba(255,122,92,0.07)' },
    light: { accent: '#e0512e', bright: '#ff7a5c', dark: '#b03d1f', glow: 'rgba(224,81,46,0.14)',   borderHover: 'rgba(224,81,46,0.40)',   cardHover: 'rgba(224,81,46,0.05)' },
  },
};

/** Applique un preset d'accent sur :root pour le mode donné ('dark' | 'light') */
export function applyAccent(presetKey, theme) {
  const preset = ACCENT_PRESETS[presetKey] || ACCENT_PRESETS[DEFAULT_PRESET];
  const v = preset[theme === 'light' ? 'light' : 'dark'];
  const root = document.documentElement;
  root.style.setProperty('--accent', v.accent);
  root.style.setProperty('--accent-bright', v.bright);
  root.style.setProperty('--accent-dark', v.dark);
  root.style.setProperty('--accent-glow', v.glow);
  root.style.setProperty('--border-card-hover', v.borderHover);
  root.style.setProperty('--bg-card-hover', v.cardHover);
}
