import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projectService } from '../components/services/api'
import { ExternalLink, ArrowLeft, ImageOff, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GitHubIcon } from '../components/Elements/SocialIcons'
import Badge from '../components/Elements/Badge'
import LoadingSpinner from '../components/Elements/LoadingSpinner'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    projectService.getById(id)
      .then(setProject)
      .catch(() => setError('Projek tidak ditemukan atau terjadi kesalahan.'))
      .finally(() => setLoading(false))
    // Scroll ke atas saat buka detail
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  // Kembali ke homepage, scroll ke section projek setelah data load
  function handleBack() {
    sessionStorage.setItem('scroll_to_projects', '1')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="pt-24 max-w-5xl mx-auto px-6">
        <LoadingSpinner text="Memuat detail projek..." />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="pt-24 max-w-5xl mx-auto px-6 flex flex-col items-center gap-4 py-20">
        <ImageOff size={40} className="text-[var(--color-text-muted)]" strokeWidth={1} />
        <p className="text-[var(--color-text-secondary)]">{error ?? 'Projek tidak ditemukan.'}</p>
        <button
          id="project-error-back"
          onClick={handleBack}
          className="text-[var(--color-accent)] text-sm hover:underline"
        >
          Kembali ke projek
        </button>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-24 max-w-5xl mx-auto px-6">
      <button
        id="project-detail-back"
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-10 cursor-pointer"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>

      <div className="flex flex-col gap-4 mb-10">
        <span className="section-tag">{project.category}</span>
        <h1 className="text-4xl font-black text-[var(--color-text-primary)]">{project.name}</h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          {project.description}
        </p>

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

      {project.images?.length > 0 && (
        <>
          <ImageGrid
            images={project.images}
            projectName={project.name}
            onOpen={setLightboxIndex}
          />
          {lightboxIndex !== null && (
            <Lightbox
              images={project.images}
              projectName={project.name}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </>
      )}

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

/* ── Grid: gambar pertama full-width, sisa 2-kolom ── */
function ImageGrid({ images, projectName, onOpen }) {
  const [first, ...rest] = images

  return (
    <div className="mb-12 flex flex-col gap-3" role="list" aria-label={"Screenshot " + projectName}>
      {/* Gambar pertama: full width, dibatasi tinggi agar portrait tidak kegedean */}
      <GridItem img={first} index={0} projectName={projectName} onOpen={onOpen} isFirst />

      {/* Gambar berikutnya: 2 kolom */}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.map((img, i) => (
            <GridItem
              key={i + 1}
              img={img}
              index={i + 1}
              projectName={projectName}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Satu tile: gambar tampil dengan batas tinggi, hover = overlay ── */
function GridItem({ img, index, projectName, onOpen, isFirst }) {
  // Gambar pertama: max 480px agar portrait tidak terlalu tinggi
  // Gambar grid: max 260px agar konsisten
  const maxH = isFirst ? 480 : 260

  return (
    <div
      role="listitem"
      className="group relative rounded-xl overflow-hidden border border-[var(--color-border)] cursor-pointer flex items-center justify-center"
      style={{ background: '#0d0d0d', maxHeight: maxH + 'px' }}
      onClick={() => onOpen(index)}
    >
      <img
        src={img}
        alt={"Screenshot " + projectName + " " + (index + 1)}
        className="w-full h-auto block"
        style={{ maxHeight: maxH + 'px', objectFit: 'contain' }}
        loading={index === 0 ? 'eager' : 'lazy'}
      />

      {/* Overlay muncul saat hover */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(0,0,0,0.52)' }}
        aria-hidden="true"
      >
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white"
          style={{
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <ZoomIn size={14} />
          Klik untuk melihat gambar penuh
        </span>
      </div>

      {/* Accessible button di atas tile */}
      <button
        id={"project-img-open-" + index}
        aria-label={"Buka screenshot " + (index + 1) + " dalam tampilan penuh"}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        onClick={() => onOpen(index)}
      />
    </div>
  )
}

/* ── Lightbox modal ── */
function Lightbox({ images, projectName, startIndex, onClose }) {
  const total = images.length
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total])

  // Escape = tutup, ArrowLeft/Right = navigasi (R-32)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  // Lock scroll saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      id="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={"Tampilan penuh screenshot " + projectName}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.93)' }}
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm text-white/70 font-medium truncate pr-4">{projectName}</span>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs tabular-nums text-white/40">{current + 1} / {total}</span>
          <button
            id="project-lightbox-close"
            onClick={onClose}
            aria-label="Tutup tampilan gambar (Escape)"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Area gambar */}
      <div
        className="flex-1 relative flex items-center justify-center min-h-0 px-14 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current]}
          alt={"Screenshot " + projectName + " " + (current + 1) + " dari " + total}
          className="max-w-full max-h-full object-contain block select-none"
        />

        {total > 1 && (
          <>
            <button
              id="project-lightbox-prev"
              onClick={prev}
              aria-label="Gambar sebelumnya"
              className="absolute left-3 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              id="project-lightbox-next"
              onClick={next}
              aria-label="Gambar berikutnya"
              className="absolute right-3 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div
          className="shrink-0 px-5 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 justify-center overflow-x-auto pb-1" role="tablist" aria-label="Pilih screenshot">
            {images.map((img, i) => (
              <button
                key={i}
                id={"project-lightbox-thumb-" + i}
                role="tab"
                aria-selected={i === current}
                aria-label={"Screenshot " + (i + 1)}
                onClick={() => setCurrent(i)}
                className="shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{
                  borderColor: i === current ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
                  opacity: i === current ? 1 : 0.45,
                  background: '#111',
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
