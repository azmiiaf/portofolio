import { BookOpen } from 'lucide-react';
import { education } from '../../data/education';
import {
  pageContainer,
  reveal,
  sectionHeading,
  sectionShell,
} from '../../utils/tailwindClasses';

export default function Education() {
  const edu = education[0];

  return (
    <section id="education" aria-labelledby="education-heading" className={sectionShell}>
      <div className={pageContainer}>
        <h2 id="education-heading" className={`${sectionHeading} mb-10`}>
          Pendidikan
        </h2>

        <div data-reveal className={`${reveal} min-w-0 overflow-hidden rounded-md border border-border`}>
          <div className="flex min-w-0 items-start gap-4 border-b border-border bg-surface p-6 md:px-7">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border bg-surface-2 text-text-muted">
              <BookOpen size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="mb-0.5 break-words text-lg font-semibold text-heading">
                {edu.degree}
              </h3>
              <p className="break-words text-sm font-medium text-text [overflow-wrap:anywhere]">
                {edu.institution} · {edu.period}
              </p>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-8 p-6 md:grid-cols-2 md:px-7">
            <div className="min-w-0">
              <h4 className="mb-2.5 text-xs font-semibold uppercase text-text-muted">
                Skripsi
              </h4>
              <p className="break-words text-sm italic leading-[1.6] text-text [overflow-wrap:anywhere]">
                &quot;{edu.thesis}&quot;
              </p>
            </div>

            <div className="min-w-0">
              <h4 className="mb-2.5 text-xs font-semibold uppercase text-text-muted">
                Mata Kuliah Relevan
              </h4>
              <ul className="flex min-w-0 list-none flex-col gap-1.5">
                {edu.relevantCourses.map((course) => (
                  <li
                    key={course}
                    className="relative break-words pl-4 text-sm text-text [overflow-wrap:anywhere]"
                  >
                    <span className="absolute left-0 top-[0.65em] size-1 rounded-full bg-border-hover" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
