import { experiences } from '../../data/experience';
import {
  bodyText,
  pageContainer,
  reveal,
  sectionHeading,
  sectionShell,
} from '../../utils/tailwindClasses';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className={`${sectionShell} bg-surface`}>
      <div className={pageContainer}>
        <h2 id="experience-heading" className={`${sectionHeading} mb-12`}>
          Experience
        </h2>

        <div className="flex min-w-0 flex-col">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              data-reveal
              className={`${reveal} mb-6 grid min-w-0 grid-cols-1 gap-2 rounded-lg border border-border bg-surface p-8 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-8`}
              aria-label={`${exp.role} at ${exp.organization}`}
            >
              <div className="min-w-0">
                <p className="mb-1.5 text-[0.8125rem] font-medium text-text-muted">
                  {exp.period}
                </p>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-text-muted">
                  {exp.type}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="mb-0.5 break-words text-lg font-semibold text-heading">
                  {exp.role}
                </h3>
                <p className={`break-words text-sm font-medium text-accent ${exp.location ? 'mb-1' : 'mb-3'}`}>
                  {exp.organization}
                </p>
                {exp.location && (
                  <p className="mb-4 break-words text-[0.8125rem] text-text-muted">
                    {exp.location}
                  </p>
                )}
                {exp.description && (
                  <p className={`mb-4 ${bodyText} [overflow-wrap:anywhere]`}>
                    {exp.description}
                  </p>
                )}
                <ul className="flex min-w-0 list-none flex-col gap-1.5">
                  {exp.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="relative break-words pl-4 text-sm text-text [overflow-wrap:anywhere]"
                    >
                      <span className="absolute left-0 top-[0.65em] size-1 rounded-full bg-border-hover" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
