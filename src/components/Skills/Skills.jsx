import { TechIcon } from '../Icons/TechIcons';
import { pageContainer, sectionHeading, sectionShell } from '../../utils/tailwindClasses';

const SKILLS = [
  { label: 'Javascript', icon: 'JavaScript' },
  { label: 'Tailwind CSS', icon: 'Tailwind CSS' },
  { label: 'Node JS', icon: 'Node.js' },
  { label: 'React JS', icon: 'React.js' },
  { label: 'HTML5', icon: 'HTML5' },
  { label: 'Web Development', icon: 'Web Development' },
  { label: 'CSS', icon: 'CSS3' },
  { label: 'Frontend Development', icon: 'Frontend Development' },
  { label: 'Github', icon: 'GitHub' },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className={`${sectionShell} bg-surface`}>
      <div className={pageContainer}>
        <h2 id="skills-heading" className={`${sectionHeading} mb-10`}>
          Keahlian
        </h2>

        <div className="flex min-w-0 flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className="inline-flex max-w-full items-center gap-2 rounded-sm border border-border bg-surface-2 px-[0.65rem] py-[0.35rem] text-[0.8125rem] font-medium text-text transition-colors duration-100 hover:border-border-hover"
            >
              <TechIcon name={skill.icon} size={15} className="shrink-0" />
              <span className="break-words">{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
