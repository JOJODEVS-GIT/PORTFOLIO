import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc, restAddDoc, restDeleteDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import ItemList from './components/ItemList';
import { Plus, Save, X } from 'lucide-react';

const emptyForm = {
  type: 'experience',
  title: '',
  organization: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
  order: 0,
};

export default function ParcoursForm() {
  const { parcours, refreshData } = useSiteData();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm, order: parcours.length });

  const resetForm = () => {
    setForm({ ...emptyForm, order: parcours.length });
    setEditing(null);
  };

  const handleEdit = (item) => {
    setForm({
      type: item.type || 'experience',
      title: item.title || '',
      organization: item.organization || '',
      location: item.location || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      description: item.description || '',
      order: item.order || 0,
    });
    setEditing(item.id);
  };

  const [status, setStatus] = useState(null);

  const handleDelete = async (id) => {
    if (confirm('Supprimer cet élément ?')) {
      try {
        await restDeleteDoc(user, 'parcours', id);
        await refreshData();
        setStatus({ type: 'success', message: 'Élément supprimé' });
      } catch (err) {
        console.error(err);
        setStatus({ type: 'error', message: `Erreur: ${err.message}` });
      }
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const data = { ...form, order: Number(form.order) };

    try {
      if (editing) {
        await restSetDoc(user, 'parcours', editing, data);
      } else {
        await restAddDoc(user, 'parcours', data);
      }
      await refreshData();
      setStatus({ type: 'success', message: editing ? 'Élément modifié' : 'Élément ajouté' });
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: `Erreur: ${err.message}` });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Parcours</h1>
      <p className="text-[var(--text-secondary)] mb-8">Timeline formations, expériences et certifications</p>

      {status && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
          {status.message}
        </div>
      )}

      <div className="card mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Modifier' : 'Ajouter'} un élément</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none"
              style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
            >
              <option value="formation">Formation</option>
              <option value="experience">Expérience</option>
              <option value="certification">Certification</option>
            </select>
          </div>

          <FormField label="Titre" name="title" value={form.title} onChange={handleChange} required />
          <FormField label="Organisation" name="organization" value={form.organization} onChange={handleChange} required />
          <FormField label="Lieu" name="location" value={form.location} onChange={handleChange} />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Date début" name="startDate" value={form.startDate} onChange={handleChange} placeholder="2023" required />
            <FormField label="Date fin" name="endDate" value={form.endDate} onChange={handleChange} placeholder="Présent" />
          </div>

          <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={3} />
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
        <h3 className="font-bold mb-4">Éléments ({parcours.length})</h3>
        <ItemList
          items={parcours}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderLabel={(item) => `[${item.type}] ${item.title} — ${item.organization}`}
        />
      </div>
    </div>
  );
}
