import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSiteData } from '../context/SiteDataContext';
import FormField from './components/FormField';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function HeroForm() {
  const { hero } = useSiteData();
  const [form, setForm] = useState({
    badge: 'Bienvenue 👋',
    title: 'Salut, je suis',
    name: 'Josué',
    subtitle: 'Développeur Web Full Stack & Automatisation',
    description: 'Basé à Cotonou 🇧🇯, je transforme vos idées en solutions digitales performantes — sites web, applications et automatisations sur mesure.',
    ctaPrimaryText: 'Voir mes projets',
    ctaPrimaryLink: '#projects',
    ctaSecondaryText: 'Mon GitHub',
    ctaSecondaryLink: 'https://github.com/JOJODEVS-GIT',
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (hero) {
      const { id, ...data } = hero;
      setForm((prev) => ({ ...prev, ...data }));
    }
  }, [hero]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const { id, ...data } = form;
      await setDoc(doc(db, 'settings', 'hero'), data);
      setStatus({ type: 'success', message: 'Section Hero sauvegardée !' });
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
      <h1 className="text-3xl font-bold mb-2">Section Hero</h1>
      <p className="text-[var(--text-secondary)] mb-8">Contenu de la section d'accueil</p>

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
        <FormField label="Badge" name="badge" value={form.badge} onChange={handleChange} />
        <FormField label="Titre" name="title" value={form.title} onChange={handleChange} required />
        <FormField label="Nom (accent)" name="name" value={form.name} onChange={handleChange} required />
        <FormField label="Sous-titre" name="subtitle" value={form.subtitle} onChange={handleChange} />
        <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={3} />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="CTA Primaire (texte)" name="ctaPrimaryText" value={form.ctaPrimaryText} onChange={handleChange} />
          <FormField label="CTA Primaire (lien)" name="ctaPrimaryLink" value={form.ctaPrimaryLink} onChange={handleChange} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="CTA Secondaire (texte)" name="ctaSecondaryText" value={form.ctaSecondaryText} onChange={handleChange} />
          <FormField label="CTA Secondaire (lien)" name="ctaSecondaryLink" value={form.ctaSecondaryLink} onChange={handleChange} />
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={18} /> Sauvegarder</>}
        </button>
      </form>
    </div>
  );
}
