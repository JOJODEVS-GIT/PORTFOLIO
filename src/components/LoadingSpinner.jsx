export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#16C79A]/20 border-t-[#16C79A] rounded-full animate-spin" />
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Chargement...</p>
      </div>
    </div>
  );
}
