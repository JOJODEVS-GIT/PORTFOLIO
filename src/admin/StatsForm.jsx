import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc, restAddDoc, restDeleteDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import ItemList from './components/ItemList';
import { Plus, Save, X } from 'lucide-react';

export default function StatsForm() {
  const { stats, refreshData } = useSiteData();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ number: '', label: '', suffix: '+', order: 0 });

  const resetForm = () => {
    setForm({ number: '', label: '', suffix: '+', order: stats.length });
    setEditing(null);
  };

  const handleEdit = (item) => {
    setForm({ number: item.number, label: item.label, suffix: item.suffix || '+', order: item.order || 0 });
    setEditing(item.id);
  };

  const [status, setStatus] = useState(null);

  const handleDelete = async (id) => {
    if (confirm('Supprimer cette stat ?')) {
      try {
        await restDeleteDoc(user, 'stats', id);
        await refreshData();
        setStatus({ type: 'success', message: 'Stat supprimée' });
      } catch (err) {
        console.error(err);
        setStatus({ type: 'error', message: `Erreur: ${err.message}` });
      }
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const data = { ...form, number: Number(form.number), order: Number(form.order) };

    try {
      if (editing) {
        await restSetDoc(user, 'stats', editing, data);
      } else {
        await restAddDoc(user, 'stats', data);
      }
      await refreshData();
      setStatus({ type: 'success', message: editing ? 'Stat modifiée' : 'Stat ajoutée' });
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: `Erreur: ${err.message}` });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Stats</h1>
      <p className="text-[var(--text-secondary)] mb-8">Chiffres clés affichés sur le site</p>

      {status && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
          {status.message}
        </div>
      )}

      <div className="card mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Modifier' : 'Ajouter'} une stat</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Nombre" name="number" type="number" value={form.number} onChange={handleChange} required />
            <FormField label="Suffixe" name="suffix" value={form.suffix} onChange={handleChange} placeholder="+ ou %" />
          </div>
          <FormField label="Label" name="label" value={form.label} onChange={handleChange} required />
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
        <h3 className="font-bold mb-4">Stats existantes ({stats.length})</h3>
        <ItemList
          items={stats}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderLabel={(item) => `${item.number}${item.suffix} — ${item.label}`}
        />
      </div>
    </div>
  );
}
