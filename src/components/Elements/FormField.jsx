// FormField: reusable label + input/textarea wrapper
export default function FormField({
  label,
  id,
  type = 'text',
  multiline = false,
  rows = 4,
  required = false,
  className = '',
  ...props
}) {
  const inputClass =
    'w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200'

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-secondary)]">
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea id={id} rows={rows} className={inputClass} required={required} {...props} />
      ) : (
        <input id={id} type={type} className={inputClass} required={required} {...props} />
      )}
    </div>
  )
}
