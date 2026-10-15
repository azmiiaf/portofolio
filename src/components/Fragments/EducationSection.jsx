import SectionHeading from '../Elements/SectionHeading'
import LoadingSpinner from '../Elements/LoadingSpinner'
import EmptyState from '../Elements/EmptyState'
import { GraduationCap } from 'lucide-react'

export default function EducationSection({ items, loading }) {
  return (
    <section id="education" className="py-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          tag="Latar belakang"
          title="Pendidikan"
          subtitle="Perjalanan akademik yang membentuk fondasi pengetahuan saya."
        />

        <div className="mt-12">
          {loading && <LoadingSpinner text="Memuat pendidikan..." />}
          {!loading && items.length === 0 && (
            <EmptyState icon={GraduationCap} message="Belum ada data pendidikan." />
          )}
          {!loading && items.length > 0 && (
            <div className="flex flex-col gap-0">
              {items.map((item, idx) => (
                <EducationItem key={item.id} item={item} isLast={idx === items.length - 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function EducationItem({ item, isLast }) {
  return (
    <div className="flex gap-6 group">
      {/* Timeline line */}
      <div className="flex flex-col items-center pt-1">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-light)] group-hover:bg-[] transition-colors shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-[var(--color-border)] mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-10">
        <p className="text-xs text-[var(--color-text-muted)] mb-1">
          {item.year_start} {item.year_end ? `— ${item.year_end}` : '— Sekarang'}
        </p>
        <h3 className=" font-bold text-[var(--color-text-primary)]">{item.institution}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{item.degree}</p>
        {item.description && (
          <p className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed max-w-xl">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}
