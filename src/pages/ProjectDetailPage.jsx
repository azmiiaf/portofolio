import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectService } from '../components/services/api'
import { ExternalLink, ArrowLeft, ImageOff } from 'lucide-react'
import { GitHubIcon } from '../components/Elements/SocialIcons'
import Badge from '../components/Elements/Badge'
import LoadingSpinner from '../components/Elements/LoadingSpinner'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    projectService.getById(id)
      .then(setProject)
      .catch(() => setError('Projek tidak ditemukan atau terjadi kesalahan.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="pt-24 max-w-4xl mx-auto px-6">
        <LoadingSpinner text="Memuat detail projek..." />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="pt-24 max-w-4xl mx-auto px-6 flex flex-col items-center gap-4 py-20">
        <ImageOff size={40} className="text-[var(--color-text-muted)]" strokeWidth={1} />
        <p className="text-[var(--color-text-secondary)]">{error ?? 'Projek tidak ditemukan.'}</p>
        <Link to="/#projects" className="text-[var(--color-accent)] text-sm hover:underline">
          Kembali ke projek
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-24 max-w-4xl mx-auto px-6">
      {/* Back */}
      <Link
        to="/#projects"
        id="project-detail-back"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-10"
      >
        <ArrowLeft size={16} />
        Kembali
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-10">
        <span className="section-tag">{project.category}</span>
        <h1 className="text-4xl font-black text-[var(--color-text-primary)]">{project.name}</h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex gap-4 mt-2">
          {project.github_url && (
            <a
              id="project-github-detail"
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <GitHubIcon size={15} /> Repository
            </a>
          )}
          {project.demo_url && (
            <a
              id="project-demo-detail"
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-black text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Images */}
      {project.images?.length > 0 && (
        <div className="mb-12">
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
            <img
              src={project.images[activeImage]}
              alt={`Screenshot projek ${project.name} ${activeImage + 1}`}
              className="w-full object-cover max-h-96"
            />
          </div>
          {project.images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  id={`project-image-thumb-${i}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Gambar ${i + 1}`}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImage ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tech stack */}
      {project.tech_stack?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Teknologi</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Optional info sections */}
      {project.optional_info?.length > 0 && (
        <div className="flex flex-col gap-8">
          {project.optional_info.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                {section.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
