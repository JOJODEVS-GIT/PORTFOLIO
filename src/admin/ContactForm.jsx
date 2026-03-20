import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSiteData } from '../context/SiteDataContext';
import FormField from './components/FormField';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const { contact } = useSiteData();
  const [form, setForm] = useState({
    email: 'jojohkdev@gmail.com',
    whatsapp: 'https://wa.me/2290160293043',
    github: 'https://github.com/JOJODEVS-GIT',
    responseTime: 'Je réponds sous 24h. N\'hésitez pas !',
    availabilityMessage: 'Disponible pour de nouvelles collaborations et projets freelance.',
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (contact) {
      const { id, ...data } = contact;
      setForm((prev) => ({ ...prev, ...data }));
    }
  }, [contact]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const { id, ...data } = form;
      await setDoc(doc(db, 'settings', 'contact'), data);
      setStatus({ type: 'success', message: 'Infos contact sauvegardées !' });
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
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <p className="text-[var(--text-secondary)] mb-8">Informations de contact affichées sur le site</p>

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
        <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <FormField label="WhatsApp (lien)" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
        <FormField label="GitHub (lien)" name="github" value={form.github} onChange={handleChange} />
        <FormField label="Temps de réponse" name="responseTime" value={form.responseTime} onChange={handleChange} />
        <FormField label="Message de disponibilité" name="availabilityMessage" value={form.availabilityMessage} onChange={handleChange} rows={2} />

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={18} /> Sauvegarder</>}
        </button>
      </form>
    </div>
  );
}
