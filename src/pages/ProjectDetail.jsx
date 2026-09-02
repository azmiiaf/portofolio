import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/Icons/Icons';
import { projects } from '../data/projects';
import {
  bodyText,
  detailContainer,
  focusRing,
  primaryAction,
  secondaryAction,
} from '../utils/tailwindClasses';

const proseText = `${bodyText} [overflow-wrap:anywhere]`;
const listText = 'flex min-w-0 list-none flex-col gap-2.5';
const detailLink = `${focusRing} inline-flex items-center gap-2 rounded-md`;

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} | M. Azmi Al Fadillah`;
    }
    return () => {
      document.title = 'M. Azmi Al Fadillah | Frontend & Web Developer';
    };
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen w-full min-w-0 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold text-heading">Proyek tidak ditemukan</h1>
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`${detailLink} min-h-11 text-base text-accent hover:text-accent-light`}
        >
          <ArrowLeft size={17} />
          Kembali ke portofolio
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip pb-20 pt-20">
      <div className={`${detailContainer} pt-12`}>
        <button
          id="project-detail-back"
          type="button"
          onClick={() => {
            navigate('/');
            setTimeout(() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className={`${detailLink} mb-10 min-h-11 pr-2 text-sm text-text-muted transition-colors duration-100 hover:text-heading`}
        >
          <ArrowLeft size={16} />
          Kembali ke Proyek
        </button>

        <header className="mb-10 min-w-0">
          <span className="mb-4 inline-block max-w-full break-words rounded-sm border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            {project.category}
          </span>
          <h1 className="mb-4 max-w-full break-words font-display text-[clamp(1.875rem,5vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-heading-bright">
            {project.title}
          </h1>
          <p className="max-w-[680px] break-words text-[1.0625rem] leading-[1.75] text-text [overflow-wrap:anywhere]">
            {project.description}
          </p>
        </header>

        <div className="mb-12 flex min-w-0 flex-col gap-6">
          {project.image && (
            <div className="aspect-video min-w-0 overflow-hidden rounded-lg border border-border bg-surface">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {project.screenshots && project.screenshots.filter((screenshot) => screenshot !== project.image).length > 0 && (
            <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
              {project.screenshots
                .filter((screenshot) => screenshot !== project.image)
                .map((screenshot, index) => (
                  <div
                    key={screenshot}
                    className="aspect-video min-w-0 overflow-hidden rounded-lg border border-border bg-surface"
                  >
                    <img
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-12">
          <CaseSection title="Gambaran Umum">
            <p className={proseText}>{project.overview}</p>
          </CaseSection>

          <CaseSection title="Masalah">
            <p className={proseText}>{project.problem}</p>
          </CaseSection>

          <CaseSection title="Solusi">
            <p className={proseText}>{project.solution}</p>
          </CaseSection>

          <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2">
            <CaseSection title="Fitur">
              <ul className={listText}>
                {project.features.map((feature) => (
                  <BulletItem key={feature}>{feature}</BulletItem>
                ))}
              </ul>
            </CaseSection>

            <CaseSection title="Teknologi yang Digunakan">
              <div className="flex min-w-0 flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="max-w-full break-words rounded-sm border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent [overflow-wrap:anywhere]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </CaseSection>
          </div>

          {project.challenges?.length > 0 && (
            <CaseSection title="Tantangan">
              <ul className={listText}>
                {project.challenges.map((challenge) => (
                  <BulletItem key={challenge}>{challenge}</BulletItem>
                ))}
              </ul>
            </CaseSection>
          )}

          {project.solutions?.length > 0 && (
            <CaseSection title="Cara Saya Menyelesaikannya">
              <ul className={listText}>
                {project.solutions.map((solution) => (
                  <BulletItem key={solution}>{solution}</BulletItem>
                ))}
              </ul>
            </CaseSection>
          )}

          {project.result && (
            <CaseSection title="Hasil">
              <p className={`${proseText} border-l-4 border-accent pl-5 text-heading`}>
                {project.result}
              </p>
            </CaseSection>
          )}

          {project.experience && (
            <CaseSection title="Alur Aplikasi">
              <div className="flex min-w-0 flex-col gap-4">
                {Array.isArray(project.experience) ? (
                  project.experience.map((paragraph, index) => (
                    <p key={index} className={proseText}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className={proseText}>{project.experience}</p>
                )}
              </div>
            </CaseSection>
          )}

          {(project.github || project.demo) && (
            <div className="flex min-w-0 flex-wrap gap-3 border-t border-border pt-8">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryAction}
                >
                  <GithubIcon size={17} />
                  Lihat di GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryAction}
                >
                  <ExternalLink size={17} />
                  Demo Langsung
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function CaseSection({ title, children }) {
  return (
    <section aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`} className="min-w-0">
      <h2
        id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="mb-4 border-b border-border pb-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-text-muted"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletItem({ children }) {
  return (
    <li className="relative break-words pl-5 text-[0.9375rem] leading-[1.7] text-text [overflow-wrap:anywhere]">
      <span className="absolute left-0 top-[0.65em] size-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </li>
  );
}
