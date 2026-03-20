import { Pencil, Trash2, GripVertical } from 'lucide-react';

export default function ItemList({ items, onEdit, onDelete, renderLabel }) {
  if (!items.length) {
    return <p className="text-sm py-4 text-center" style={{ color: 'var(--text-muted)' }}>Aucun élément</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-3 border rounded-lg group hover:border-[#16C79A]/30 transition-colors"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
        >
          <GripVertical size={16} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />

          <span className="text-xs w-6" style={{ color: 'var(--text-muted)' }}>{idx + 1}</span>

          <div className="flex-1 min-w-0">
            <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
              {renderLabel ? renderLabel(item) : item.title || item.name || item.label}
            </p>
          </div>

          <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 hover:bg-[#16C79A]/20 rounded-lg transition-colors hover:text-[#16C79A]"
              style={{ color: 'var(--text-secondary)' }}
              aria-label={`Modifier ${renderLabel ? renderLabel(item) : item.title || item.name || ''}`}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors hover:text-red-400"
              style={{ color: 'var(--text-secondary)' }}
              aria-label={`Supprimer ${renderLabel ? renderLabel(item) : item.title || item.name || ''}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
