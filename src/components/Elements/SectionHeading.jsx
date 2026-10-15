// SectionHeading: reusable heading block for public sections
export default function SectionHeading({ tag, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {tag && <span className="section-tag font-spacemono">{tag}</span>}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight font-spacemono">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
