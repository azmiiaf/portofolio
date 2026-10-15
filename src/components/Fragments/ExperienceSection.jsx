import SectionHeading from '../Elements/SectionHeading'
import LoadingSpinner from '../Elements/LoadingSpinner'
import EmptyState from '../Elements/EmptyState'
import { Briefcase } from 'lucide-react'

export default function ExperienceSection({ items, loading }) {
  return (
    <section id="experience" className="py-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          tag="Perjalanan karir"
          title="Experience"
          subtitle="Pengalaman kerja dan keterlibatan dalam projek nyata."
        />

        <div className="mt-12">
          {loading && <LoadingSpinner text="Memuat experience..." />}
          {!loading && items.length === 0 && (
            <EmptyState icon={Briefcase} message="Belum ada data experience." />
          )}
          {!loading && items.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5">
              {items.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ exp }) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-3 hover:border-[var(--color-border-light)] transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-bold text-[var(--color-text-primary)] leading-snug">{exp.name}</h3>
        <span className="shrink-0 px-2 py-1 rounded-md bg-[var(--color-surface-2)] text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
          {exp.type}
        </span>
      </div>

      <p className="text-xs text-[var(--color-text-muted)]">
        {exp.year_start} {exp.year_end ? `— ${exp.year_end}` : '— Sekarang'}
      </p>

      {exp.description && (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-1">
          {exp.description}
        </p>
      )}
    </div>
  )
}
