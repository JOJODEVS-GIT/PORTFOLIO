import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';
import { restSetDoc, restAddDoc, restDeleteDoc } from '../firebase/firestoreRest';
import FormField from './components/FormField';
import ImageUpload from './components/ImageUpload';
import ItemList from './components/ItemList';
import { Plus, Save, X } from 'lucide-react';

const emptyForm = {
  title: '',
  description: '',
  category: 'React',
  tech: [''],
  gradient: 'from-[#16C79A] to-[#0F3460]',
  imageUrl: '',
  github: '',
  live: '',
  order: 0,
};

export default function ProjectsForm() {
  const { projects, refreshData } = useSiteData();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm, order: projects.length });

  const resetForm = () => {
    setForm({ ...emptyForm, order: projects.length });
    setEditing(null);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'React',
      tech: item.tech?.length ? [...item.tech] : [''],
      gradient: item.gradient || 'from-[#16C79A] to-[#0F3460]',
      imageUrl: item.imageUrl || '',
      github: item.github || '',
      live: item.live || '',
      order: item.order || 0,
    });
    setEditing(item.id);
  };

  const [status, setStatus] = useState(null);

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce projet ?')) {
      try {
        await restDeleteDoc(user, 'projects', id);
        await refreshData();
        setStatus({ type: 'success', message: 'Projet supprimé' });
      } catch (err) {
        console.error(err);
        setStatus({ type: 'error', message: `Erreur: ${err.message}` });
      }
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const updateTech = (idx, value) => {
    const newTech = [...form.tech];
    newTech[idx] = value;
    setForm({ ...form, tech: newTech });
  };

  const addTech = () => setForm({ ...form, tech: [...form.tech, ''] });
  const removeTech = (idx) => setForm({ ...form, tech: form.tech.filter((_, i) => i !== idx) });

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      tech: form.tech.filter((t) => t.trim()),
      order: Number(form.order),
    };

    try {
      if (editing) {
        await restSetDoc(user, 'projects', editing, data);
      } else {
        await restAddDoc(user, 'projects', data);
      }
      await refreshData();
      setStatus({ type: 'success', message: editing ? 'Projet modifié' : 'Projet ajouté' });
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: `Erreur: ${err.message}` });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Projets</h1>
      <p className="text-[var(--text-secondary)] mb-8">Gérez vos projets portfolio</p>

      {status && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
          {status.message}
        </div>
      )}

      <div className="card mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Modifier' : 'Ajouter'} un projet</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Titre" name="title" value={form.title} onChange={handleChange} required />
          <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={3} required />
          <FormField label="Catégorie" name="category" value={form.category} onChange={handleChange} placeholder="React, HTML/CSS/JS..." required />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Technologies</label>
              <button type="button" onClick={addTech} className="text-[#16C79A] text-sm flex items-center gap-1">
                <Plus size={14} /> Ajouter
              </button>
            </div>
            {form.tech.map((t, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  value={t}
                  onChange={(e) => updateTech(idx, e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none text-sm"
                  style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                  placeholder={`Tech ${idx + 1}`}
                />
                {form.tech.length > 1 && (
                  <button type="button" onClick={() => removeTech(idx)} className="p-2 text-red-400 hover:text-red-300">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="card space-y-3" style={{ backgroundColor: 'var(--bg-accent)' }}>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Image du projet</h4>
            <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} folder="projects" />
          </div>

          <FormField label="Gradient (fallback)" name="gradient" value={form.gradient} onChange={handleChange} placeholder="from-[#16C79A] to-[#0F3460]" />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Lien GitHub" name="github" value={form.github} onChange={handleChange} />
            <FormField label="Lien Live" name="live" value={form.live} onChange={handleChange} />
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
        <h3 className="font-bold mb-4">Projets ({projects.length})</h3>
        <ItemList
          items={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderLabel={(item) => `${item.title} (${item.category})`}
        />
      </div>
    </div>
  );
}
