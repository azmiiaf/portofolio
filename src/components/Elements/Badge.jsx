// Badge: small label tag used on cards (category, tech, etc.)
export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-md bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)] ${className}`}
    >
      {children}
    </span>
  )
}
