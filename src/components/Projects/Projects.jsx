import { projects } from '../../data/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import {
  pageContainer,
  reveal,
  sectionHeading,
  sectionShell,
} from '../../utils/tailwindClasses';

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className={sectionShell}>
      <div className={pageContainer}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="projects-heading" className={sectionHeading}>
            Project
          </h2>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} data-reveal className={`${reveal} min-w-0`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
