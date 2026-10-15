// LoadingSpinner: used during async data fetches (R-27)
export default function LoadingSpinner({ text = 'Memuat...' }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-[var(--color-text-muted)]">
      <div className="w-7 h-7 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
      <p className="text-sm">{text}</p>
    </div>
  )
}
