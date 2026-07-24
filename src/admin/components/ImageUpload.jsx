import { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

// Plan Firebase gratuit = pas de Storage. On stocke l'image directement dans
// Firestore, redimensionnée + compressée dans le navigateur (data-URI), pour
// rester sous la limite d'1 Mo par document. Aucun abonnement requis.
const MAX_SOURCE_SIZE = 12 * 1024 * 1024; // 12 Mo (fichier source, avant compression)
const MAX_DIM = 1200;                     // plus grand côté après redimensionnement
const SIZE_LIMIT = 760 * 1024;            // taille cible du data-URI (marge sous la limite d'1 Mo/doc Firestore)

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function compressToDataUrl(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await loadImage(dataUrl);
  let { width, height } = img;
  if (width > MAX_DIM || height > MAX_DIM) {
    const scale = MAX_DIM / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const draw = (w, h) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; // fond blanc si l'image a de la transparence (JPEG)
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return canvas;
  };

  let canvas = draw(width, height);
  let quality = 0.78;
  let out = canvas.toDataURL('image/jpeg', quality);

  // Baisse la qualité jusqu'à passer sous la limite
  while (out.length > SIZE_LIMIT && quality > 0.4) {
    quality -= 0.1;
    out = canvas.toDataURL('image/jpeg', quality);
  }
  // En dernier recours, réduit encore les dimensions
  if (out.length > SIZE_LIMIT) {
    canvas = draw(Math.round(width * 0.7), Math.round(height * 0.7));
    out = canvas.toDataURL('image/jpeg', 0.6);
  }
  return out;
}

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    if (file.size > MAX_SOURCE_SIZE) {
      setError('Image trop lourde (max 12 Mo)');
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await compressToDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      console.error('Image error:', err);
      setError("Impossible de traiter l'image : " + (err?.message || 'erreur inconnue'));
    } finally {
      setUploading(false);
      e.target.value = '';
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
            Optimisation en cours...
          </>
        ) : (
          <>
            <Upload size={18} />
            Choisir une image (optimisée automatiquement)
          </>
        )}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} aria-label="Choisir une image" />
      </label>
    </div>
  );
}
