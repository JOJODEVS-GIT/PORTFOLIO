import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc, restAddDoc, restDeleteDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import ItemList from './components/ItemList';
import { Plus, Save, X } from 'lucide-react';

const emptyForm = {
  name: '',
  role: '',
  quote: '',
  avatarUrl: '',
  rating: 5,
  order: 0,
};

export default function TestimonialsForm() {
  const { testimonials, refreshData } = useSiteData();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm, order: testimonials.length });
  const [status, setStatus] = useState(null);

  const resetForm = () => {
    setForm({ ...emptyForm, order: testimonials.length });
    setEditing(null);
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || '',
      role: item.role || '',
      quote: item.quote || '',
      avatarUrl: item.avatarUrl || '',
      rating: item.rating ?? 5,
      order: item.order || 0,
    });
    setEditing(item.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce témoignage ?')) {
      try {
        await restDeleteDoc(user, 'testimonials', id);
        await refreshData();
        setStatus({ type: 'success', message: 'Témoignage supprimé' });
      } catch (err) {
        console.error(err);
        setStatus({ type: 'error', message: `Erreur: ${err.message}` });
      }
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      role: form.role,
      quote: form.quote,
      avatarUrl: form.avatarUrl,
      rating: Number(form.rating),
      order: Number(form.order),
    };

    try {
      if (editing) {
        await restSetDoc(user, 'testimonials', editing, data);
      } else {
        await restAddDoc(user, 'testimonials', data);
      }
      await refreshData();
      setStatus({ type: 'success', message: editing ? 'Témoignage modifié' : 'Témoignage ajouté' });
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: `Erreur: ${err.message}` });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Témoignages</h1>
      <p className="text-[var(--text-secondary)] mb-8">Avis de vos clients affichés sur le portfolio</p>

      {status && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
          {status.message}
        </div>
      )}

      <div className="card mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Modifier' : 'Ajouter'} un témoignage</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Nom du client" name="name" value={form.name} onChange={handleChange} placeholder="Aline K." required />
          <FormField label="Rôle / entreprise" name="role" value={form.role} onChange={handleChange} placeholder="Fondatrice · Boutique en ligne" />
          <FormField label="Témoignage" name="quote" value={form.quote} onChange={handleChange} rows={4} required />
          <FormField label="Photo (URL, optionnel)" name="avatarUrl" value={form.avatarUrl} onChange={handleChange} placeholder="https://... (sinon initiales)" />
          <FormField label="Note (1 à 5)" name="rating" type="number" value={form.rating} onChange={handleChange} />
          <FormField label="Ordre" name="order" type="number" value={form.order} onChange={handleChange} />

          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex items-center gap-2">
              {editing ? <Save size={18} /> : <Plus size={18} />}
              {editing ? 'Modifier' : 'Ajouter'}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="btn-secondary flex items-center gap-2">
                <X size={18} /> Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="font-bold mb-4">Témoignages ({testimonials.length})</h3>
        <ItemList items={testimonials} onEdit={handleEdit} onDelete={handleDelete} renderLabel={(item) => `${item.name} — ${item.role || ''}`} />
      </div>
    </div>
  );
}
