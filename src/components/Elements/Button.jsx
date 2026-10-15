// Button variants: 'primary' | 'secondary' | 'ghost'
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const variants = {
    primary:
      'bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] focus-visible:outline-[var(--color-accent)] active:scale-95',
    secondary:
      'border border-[var(--color-border-light)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-95',
    ghost:
      'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] active:scale-95',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
