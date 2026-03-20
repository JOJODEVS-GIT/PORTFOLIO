export default function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  rows,
}) {
  const inputClasses = 'w-full px-4 py-3 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none';

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {rows ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          required={required}
          className={`${inputClasses} resize-none`}
          style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
        />
      )}
    </div>
  );
}
