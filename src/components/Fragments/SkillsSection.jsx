import SectionHeading from '../Elements/SectionHeading'
import LoadingSpinner from '../Elements/LoadingSpinner'
import EmptyState from '../Elements/EmptyState'
import TechIcon from '../Elements/TechIcon'
import { Layers } from 'lucide-react'

export default function SkillsSection({ profile, loading }) {
  const skills = profile?.skills ?? []

  return (
    <section id="skills" className="py-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <SectionHeading
            tag="Yang saya kuasai"
            title="Keahlian"
            subtitle="Teknologi dan tools yang saya gunakan untuk membangun produk."
          />

          <div>
            {loading && <LoadingSpinner text="Memuat keahlian..." />}
            {!loading && skills.length === 0 && (
              <EmptyState icon={Layers} message="Belum ada data keahlian." />
            )}
            {!loading && skills.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#5D29F8] bg-[var(--color-surface)]/60 text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-all duration-200 cursor-default group"
                  >
                    <TechIcon
                      name={skill}
                      size={18}
                      className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
