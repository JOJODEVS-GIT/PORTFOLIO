import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { Upload, X, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ImageUpload({ value, onChange, folder = 'images' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    if (file.size > MAX_FILE_SIZE) {
      setError('Image trop lourde (max 5 Mo)');
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onChange(url);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Erreur d\'upload: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value && (
        <div className="relative mb-3 inline-block">
          <img src={value} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg border border-[#16C79A]/20" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
            aria-label="Supprimer l'image"
          >
            <X size={14} />
          </button>
        </div>
      )}
      {error && (
        <p className="text-red-400 text-xs mb-2 flex items-center gap-1"><AlertCircle size={14} /> {error}</p>
      )}
      <label className="flex items-center gap-2 px-4 py-3 border border-[#16C79A]/20 rounded-lg cursor-pointer hover:border-[#16C79A] transition-colors text-sm" style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-secondary)' }}>
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-[#16C79A] border-t-transparent rounded-full animate-spin" />
            Upload en cours...
          </>
        ) : (
          <>
            <Upload size={18} />
            Choisir une image (max 5 Mo)
          </>
        )}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} aria-label="Choisir une image" />
      </label>
    </div>
  );
}
