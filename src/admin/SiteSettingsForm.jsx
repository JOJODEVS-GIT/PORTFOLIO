import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSiteData } from '../context/SiteDataContext';
import FormField from './components/FormField';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function SiteSettingsForm() {
  const { site } = useSiteData();
  const [form, setForm] = useState({
    logoText: 'JOJO',
    logoDot: ".DEV's",
    siteName: "JOJO.DEV's Portfolio",
    description: 'Portfolio de Josué Hounkanrin',
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
      await setDoc(doc(db, 'settings', 'site'), data);
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

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={18} /> Sauvegarder</>}
        </button>
      </form>
    </div>
  );
}
