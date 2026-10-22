import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, FolderKanban } from 'lucide-react'
import { GitHubIcon } from '../Elements/SocialIcons'
import SectionHeading from '../Elements/SectionHeading'
import LoadingSpinner from '../Elements/LoadingSpinner'
import EmptyState from '../Elements/EmptyState'

export default function ProjectsSection({ items, loading, githubUrl }) {
  const [showAll, setShowAll] = useState(false)
  const initialLimit = 4
  const visibleItems = showAll ? items : items?.slice(0, initialLimit)
  const hasMore = items && items.length > initialLimit

  return (
    <section id="projects" className="py-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          tag="Hasil kerja"
          title="Projek Pilihan"
          subtitle="Kumpulan projek yang pernah saya bangun, dari personal hingga kolaborasi."
        />

        <div className="mt-12">
          {loading && <LoadingSpinner text="Memuat projek..." />}
          {!loading && (!items || items.length === 0) && (
            <EmptyState icon={FolderKanban} message="Belum ada projek yang ditambahkan." />
          )}
          {!loading && items && items.length > 0 && (
            <>
              {/* 2-column grid matching reference image 2 */}
              <div className="flex flex-wrap gap-2">
                {visibleItems.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Bottom "See More Projects" button matching reference image 2 */}
              <div className="mt-12 flex justify-center">
                {hasMore ? (
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#bef264] hover:bg-[#cdff00] text-black font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(190,242,100,0.35)] active:scale-95 cursor-pointer"
                  >
                    <span>{showAll ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Projek'}</span>
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </button>
                ) : githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#bef264] hover:bg-[#cdff00] text-black font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(190,242,100,0.35)] active:scale-95 cursor-pointer"
                  >
                    <span>Lihat Semua Projek di GitHub</span>
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </a>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const coverImage = project.images?.[0]
  const navigate = useNavigate()

  // Simpan posisi scroll sebelum navigasi ke detail
  function saveAndGo(e) {
    e.preventDefault()
    sessionStorage.setItem('home_scroll_y', String(window.scrollY))
    navigate(`/projects/${project.id}`)
  }

  return (
    <div className="group relative w-86 rounded-[3px] overflow-hidden bg-[#121212] border border-[#242424] hover:border-[#383838] aspect-[4/3] sm:aspect-square flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 shadow-xl">
      {/* Background Cover Image */}
      {coverImage ? (
        <img
          src={coverImage}
          alt={`Cover projek ${project.name}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1c1f26] via-[#14171d] to-[#0d0f14] flex items-center justify-center">
          <FolderKanban size={64} strokeWidth={1} className="text-gray-600/40" />
        </div>
      )}

      {/* Dark Overlay (Gelap murni saat hover agar teks jelas dibaca) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Top Bar: Badge Kategori */}
      <div className="relative z-20">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/35 bg-black/40 backdrop-blur-md text-white text-xs tracking-wide shadow-sm transform -rotate-15 transition-transform duration-300 group-hover:-rotate-1 font-spacemono">
          {project.category || 'Projek'}
        </span>
      </div>

      {/* Center Action Button: Arrow Hijau */}
      <div className="relative z-20 flex items-center justify-center my-auto opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
        <a
          href={`/projects/${project.id}`}
          id={`project-detail-${project.id}`}
          aria-label={`Buka detail projek ${project.name}`}
          onClick={saveAndGo}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#bef264] text-black flex items-center justify-center shadow-xl transition-all duration-300 hover:bg-[#cdff00] hover:shadow-[0_0_30px_rgba(190,242,100,0.5)] active:scale-95 focus-visible:outline-[#bef264]"
        >
          <ArrowUpRight size={26} strokeWidth={2.4} />
        </a>
      </div>

      {/* Bottom Area: JUDUL + TECH STACK SEMBUNYI TOTAL (OPACITY 0), MUNCUL BERSAMAAN PAS HOVER */}
      <div className="relative z-20 flex items-end justify-between gap-4 mt-auto">
        <div className="flex-1 min-w-0">
          <div className="opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
            {/* Judul Utama */}
            <a
              href={`/projects/${project.id}`}
              onClick={saveAndGo}
              className="block text-lg sm:text-xl font-bold text-[#bef264] hover:text-[#bef264] transition-colors duration-200 line-clamp-2 font-spacemono"
            >
              {project.name}
            </a>

            {/* Tech Stack */}
            {project.tech_stack?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {project.tech_stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-gray-200 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-gray-400">
                    +{project.tech_stack.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* GitHub Link */}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${project.id}`}
            aria-label={`Repositori GitHub ${project.name}`}
            className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:border-white/50 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 duration-300 focus-visible:outline-[#bef264] shrink-0"
          >
            <GitHubIcon size={18} />
          </a>
        )}
      </div>
    </div>
  )
}