import { Link } from 'react-router-dom'
import { User, GraduationCap, Award, FolderKanban, Briefcase, Mail } from 'lucide-react'

const SECTIONS = [
  { to: '/admin/profile', label: 'Profil', icon: User, desc: 'Nama, role, foto, keahlian' },
  { to: '/admin/education', label: 'Pendidikan', icon: GraduationCap, desc: 'Riwayat pendidikan' },
  { to: '/admin/certifications', label: 'Sertifikasi', icon: Award, desc: 'Lisensi & sertifikat' },
  { to: '/admin/projects', label: 'Projek', icon: FolderKanban, desc: 'Portfolio projek' },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase, desc: 'Pengalaman kerja' },
  { to: '/admin/contact', label: 'Kontak', icon: Mail, desc: 'Email, GitHub, LinkedIn' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Dashboard</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Pilih bagian yang ingin dikelola.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(({ to, label, icon: Icon, desc }) => (
          <Link
            key={to}
            to={to}
            id={`admin-nav-${label.toLowerCase()}`}
            className="flex items-start gap-4 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-all duration-200 group"
          >
            <div className="p-2.5 rounded-lg bg-[var(--color-surface-2)] group-hover:bg-[var(--color-accent)]/10 transition-colors">
              <Icon size={18} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-medium text-[var(--color-text-primary)] text-sm">{label}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
