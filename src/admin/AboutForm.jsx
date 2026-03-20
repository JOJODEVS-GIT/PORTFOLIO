import { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import ImageUpload from './components/ImageUpload';
import { Save, CheckCircle, AlertCircle, Plus, X } from 'lucide-react';

export default function AboutForm() {
  const { about, refreshData } = useSiteData();
  const { user } = useAuth();
  const [form, setForm] = useState({
    photoUrl: '/images/1.webp',
    paragraphs: [
      'Je suis Josué, développeur Full Stack basé à Cotonou 🇧🇯. Je crée des sites web modernes avec React et Next.js, des sites vitrine/e-commerce avec WordPress, et j\'automatise les process répétitifs avec Python.',
      'Passionné par la technologie et l\'innovation, je transforme des idées en projets concrets et fonctionnels. Mon objectif : fournir des solutions digitales de qualité, adaptées aux réalités locales africaines.',
    ],
    tagline: '📍 Cotonou, Bénin \u2022 🎯 Projets avec impact \u2022 💡 Full Stack & Automatisation',
    socialLinks: {
      github: 'https://github.com/JOJODEVS-GIT',
      whatsapp: 'https://wa.me/2290160293043',
      email: 'mailto:jojohkdev@gmail.com',
    },
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (about) {
      const { id, ...data } = about;
      setForm((prev) => ({ ...prev, ...data }));
    }
  }, [about]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const { id, ...data } = form;
      await restSetDoc(user, 'settings', 'about', data);
      await refreshData();
      setStatus({ type: 'success', message: 'Section À propos sauvegardée !' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Erreur: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const updateParagraph = (idx, value) => {
    const newParagraphs = [...form.paragraphs];
    newParagraphs[idx] = value;
    setForm({ ...form, paragraphs: newParagraphs });
  };

  const addParagraph = () => setForm({ ...form, paragraphs: [...form.paragraphs, ''] });

  const removeParagraph = (idx) => {
    setForm({ ...form, paragraphs: form.paragraphs.filter((_, i) => i !== idx) });
  };

  const updateSocial = (key, value) => {
    setForm({ ...form, socialLinks: { ...form.socialLinks, [key]: value } });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">À propos</h1>
      <p className="text-[var(--text-secondary)] mb-8">Bio, photo et réseaux sociaux</p>

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

      <form onSubmit={handleSave} className="space-y-6">
        <div className="card space-y-4">
          <h3 className="font-bold">Photo de profil</h3>
          <ImageUpload value={form.photoUrl} onChange={(url) => setForm({ ...form, photoUrl: url })} />
        </div>

        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Paragraphes</h3>
            <button type="button" onClick={addParagraph} className="text-[#16C79A] hover:text-[#16C79A]/80 text-sm flex items-center gap-1">
              <Plus size={16} /> Ajouter
            </button>
          </div>
          {form.paragraphs.map((p, idx) => (
            <div key={idx} className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(idx, e.target.value)}
                rows={3}
                className="flex-1 px-4 py-3 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none resize-none"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                placeholder={`Paragraphe ${idx + 1}`}
              />
              {form.paragraphs.length > 1 && (
                <button type="button" onClick={() => removeParagraph(idx)} className="p-2 text-red-400 hover:text-red-300">
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="card space-y-4">
          <h3 className="font-bold">Tagline</h3>
          <FormField label="Tagline" name="tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </div>

        <div className="card space-y-4">
          <h3 className="font-bold">Réseaux sociaux</h3>
          <FormField label="GitHub" name="github" value={form.socialLinks.github} onChange={(e) => updateSocial('github', e.target.value)} />
          <FormField label="WhatsApp" name="whatsapp" value={form.socialLinks.whatsapp} onChange={(e) => updateSocial('whatsapp', e.target.value)} />
          <FormField label="Email" name="email" value={form.socialLinks.email} onChange={(e) => updateSocial('email', e.target.value)} />
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={18} /> Sauvegarder</>}
        </button>
      </form>
    </div>
  );
}
