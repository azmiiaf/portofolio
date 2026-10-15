import SectionHeading from '../Elements/SectionHeading'
import LoadingSpinner from '../Elements/LoadingSpinner'
import EmptyState from '../Elements/EmptyState'
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
                    className="px-4 py-2 rounded-lg border border-[#5D29F8] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors duration-200 cursor-default"
                  >
                    {skill}
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
