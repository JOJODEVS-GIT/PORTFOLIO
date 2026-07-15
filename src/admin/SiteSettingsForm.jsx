import { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import { Save, CheckCircle, AlertCircle, Moon, Sun } from 'lucide-react';
import { ACCENT_PRESETS, DEFAULT_PRESET } from '../theme/accentPresets';

export default function SiteSettingsForm() {
  const { site, refreshData } = useSiteData();
  const { user } = useAuth();
  const [form, setForm] = useState({
    logoText: 'JOJO',
    logoDot: ".DEV's",
    siteName: "JOJO.DEV's Portfolio",
    description: 'Portfolio de Josué Hounkanrin',
    accentPreset: DEFAULT_PRESET,
    defaultTheme: 'dark',
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (site) {
      const { id, ...data } = site;
      setForm((prev) => ({ ...prev, ...data }));
    }
  }, [site]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const { id, ...data } = form;
      await restSetDoc(user, 'settings', 'site', data);
      await refreshData();
      setStatus({ type: 'success', message: 'Paramètres sauvegardés !' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Erreur: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Paramètres du site</h1>
      <p className="text-[var(--text-secondary)] mb-8">Logo et informations générales</p>

      {status && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
          status.type === 'success'
            ? 'bg-[#16C79A]/20 border border-[#16C79A]/50 text-[#16C79A]'
            : 'bg-red-500/20 border border-red-500/50 text-red-300'
        }`}>
          {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSave} className="card space-y-4">
        <FormField label="Logo (texte)" name="logoText" value={form.logoText} onChange={handleChange} required />
        <FormField label="Logo (suffixe)" name="logoDot" value={form.logoDot} onChange={handleChange} required />
        <FormField label="Nom du site" name="siteName" value={form.siteName} onChange={handleChange} />
        <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={3} />

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Couleur d'accent</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(ACCENT_PRESETS).map(([key, p]) => {
              const active = (form.accentPreset || DEFAULT_PRESET) === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => setForm({ ...form, accentPreset: key })}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all"
                  style={{
                    borderColor: active ? p.swatch : 'var(--border-card)',
                    background: active ? 'var(--bg-card)' : 'transparent',
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: p.swatch }} />
                  {p.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Astuce : prévisualise sans sauver via <code>ton-site.com/?accent=or</code></p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Thème par défaut (nouveaux visiteurs)</label>
          <div className="flex gap-2">
            {[['dark', 'Sombre', Moon], ['light', 'Clair', Sun]].map(([val, label, Icon]) => {
              const active = (form.defaultTheme || 'dark') === val;
              return (
                <button
                  type="button"
                  key={val}
                  onClick={() => setForm({ ...form, defaultTheme: val })}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all"
                  style={{
                    borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                    color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                >
                  <Icon size={15} /> {label}
                </button>
              );
            })}
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={18} /> Sauvegarder</>}
        </button>
      </form>
    </div>
  );
}
