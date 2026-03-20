import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc, restAddDoc, restDeleteDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import ItemList from './components/ItemList';
import { Plus, Save, X } from 'lucide-react';

const emptyForm = {
  title: '',
  description: '',
  iconName: 'Globe',
  features: [''],
  order: 0,
};

export default function ServicesForm() {
  const { services } = useSiteData();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm, order: services.length });

  const resetForm = () => {
    setForm({ ...emptyForm, order: services.length });
    setEditing(null);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || '',
      description: item.description || '',
      iconName: item.iconName || 'Globe',
      features: item.features?.length ? [...item.features] : [''],
      order: item.order || 0,
    });
    setEditing(item.id);
  };

  const [status, setStatus] = useState(null);

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce service ?')) {
      try {
        await restDeleteDoc(user, 'services', id);
        setStatus({ type: 'success', message: 'Service supprimé' });
      } catch (err) {
        console.error(err);
        setStatus({ type: 'error', message: `Erreur: ${err.message}` });
      }
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const updateFeature = (idx, value) => {
    const newFeatures = [...form.features];
    newFeatures[idx] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
  const removeFeature = (idx) => setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      features: form.features.filter((f) => f.trim()),
      order: Number(form.order),
    };

    try {
      if (editing) {
        await restSetDoc(user, 'services', editing, data);
      } else {
        await restAddDoc(user, 'services', data);
      }
      setStatus({ type: 'success', message: editing ? 'Service modifié' : 'Service ajouté' });
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: `Erreur: ${err.message}` });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Services</h1>
      <p className="text-[var(--text-secondary)] mb-8">Services proposés sur le portfolio</p>

      {status && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
          {status.message}
        </div>
      )}

      <div className="card mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Modifier' : 'Ajouter'} un service</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Titre" name="title" value={form.title} onChange={handleChange} required />
          <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={3} required />
          <FormField label="Icône (nom Lucide)" name="iconName" value={form.iconName} onChange={handleChange} placeholder="Globe, Bot, Palette..." />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Features</label>
              <button type="button" onClick={addFeature} className="text-[#16C79A] text-sm flex items-center gap-1">
                <Plus size={14} /> Ajouter
              </button>
            </div>
            {form.features.map((f, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  value={f}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none text-sm"
                  style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                  placeholder={`Feature ${idx + 1}`}
                />
                {form.features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-red-400 hover:text-red-300">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

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
        <h3 className="font-bold mb-4">Services ({services.length})</h3>
        <ItemList items={services} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
