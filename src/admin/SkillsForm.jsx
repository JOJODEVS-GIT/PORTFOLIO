import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc, restAddDoc, restDeleteDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import ItemList from './components/ItemList';
import { Plus, Save, X } from 'lucide-react';

const emptyForm = {
  name: '',
  iconName: 'Code2',
  color: 'text-[#16C79A]',
  order: 0,
};

export default function SkillsForm() {
  const { skills } = useSiteData();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm, order: skills.length });

  const resetForm = () => {
    setForm({ ...emptyForm, order: skills.length });
    setEditing(null);
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || '',
      iconName: item.iconName || 'Code2',
      color: item.color || 'text-[#16C79A]',
      order: item.order || 0,
    });
    setEditing(item.id);
  };

  const [status, setStatus] = useState(null);

  const handleDelete = async (id) => {
    if (confirm('Supprimer cette compétence ?')) {
      try {
        await restDeleteDoc(user, 'skills', id);
        setStatus({ type: 'success', message: 'Compétence supprimée' });
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
        await restSetDoc(user, 'skills', editing, data);
      } else {
        await restAddDoc(user, 'skills', data);
      }
      setStatus({ type: 'success', message: editing ? 'Compétence modifiée' : 'Compétence ajoutée' });
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: `Erreur: ${err.message}` });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Compétences</h1>
      <p className="text-[var(--text-secondary)] mb-8">Compétences techniques affichées</p>

      {status && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
          {status.message}
        </div>
      )}

      <div className="card mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Modifier' : 'Ajouter'} une compétence</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Nom" name="name" value={form.name} onChange={handleChange} required />
          <FormField label="Icône (nom Lucide)" name="iconName" value={form.iconName} onChange={handleChange} placeholder="Code2, Sparkles, Globe..." />
          <FormField label="Couleur (classe Tailwind)" name="color" value={form.color} onChange={handleChange} placeholder="text-[#16C79A], text-blue-400..." />
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
        <h3 className="font-bold mb-4">Compétences ({skills.length})</h3>
        <ItemList
          items={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderLabel={(item) => `${item.name} (${item.iconName})`}
        />
      </div>
    </div>
  );
}
