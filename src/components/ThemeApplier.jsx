import { useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useTheme } from '../context/ThemeContext';
import { applyAccent, DEFAULT_PRESET } from '../theme/accentPresets';

// Composant invisible : applique la couleur d'accent et le thème par défaut
// définis dans l'admin (settings/site). Ne rend rien.
export default function ThemeApplier() {
  const { site } = useSiteData();
  const { theme, applyDefaultTheme } = useTheme();

  // Prévisualisation via ?accent=or (teste une couleur sans toucher à l'admin)
  const override = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('accent')
    : null;

  const presetKey = override || site?.accentPreset || DEFAULT_PRESET;

  useEffect(() => {
    applyAccent(presetKey, theme);
  }, [presetKey, theme]);

  useEffect(() => {
    if (site?.defaultTheme) applyDefaultTheme(site.defaultTheme);
  }, [site, applyDefaultTheme]);

  return null;
}
