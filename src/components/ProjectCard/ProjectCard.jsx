import { ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GithubIcon } from '../Icons/Icons';
import { TechIcon } from '../Icons/TechIcons';
import { focusRing } from '../../utils/tailwindClasses';

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/projects/${project.slug}`);
    window.scrollTo(0, 0);
  };

  const cardAction = `inline-flex items-center gap-1.5 text-[0.8125rem] transition-colors duration-100 ${focusRing}`;

  return (
    <article
      aria-label={`Project: ${project.title}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover motion-reduce:transition-none"
    >
      <div className="relative aspect-video overflow-hidden border-b border-border bg-surface-2">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] break-words rounded-sm border border-border bg-overlay px-2 py-[0.2rem] text-[0.6875rem] font-semibold text-heading backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex min-w-0 grow flex-col gap-3 p-5">
        <h3 className="break-words text-base font-semibold leading-[1.3] text-heading">
          {project.title}
        </h3>

        <p className="min-w-0 grow break-words text-sm leading-[1.6] text-text [overflow-wrap:anywhere]">
          {project.description}
        </p>

        <div className="flex min-w-0 flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex max-w-full items-center gap-1.5 break-words rounded-sm border border-border bg-surface-2 px-2 py-[0.2rem] text-xs font-medium text-text"
            >
              <TechIcon name={tech} size={12} className="shrink-0" />
              <span className="break-words [overflow-wrap:anywhere]">{tech}</span>
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-[0.2rem] text-xs text-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex min-w-0 flex-wrap gap-3 border-t border-border pt-3">
          <button
            id={`project-details-${project.slug}`}
            type="button"
            onClick={handleDetails}
            className={`${cardAction} font-semibold text-heading hover:text-accent`}
          >
            Lihat detail
            <ArrowRight size={13} />
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className={`${cardAction} text-text-muted hover:text-heading`}
            >
              <GithubIcon size={14} />
              Code
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className={`${cardAction} text-text-muted hover:text-heading`}
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
