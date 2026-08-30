import { TechIcon } from '../Icons/TechIcons';

export default function Skills() {
  const skillsData = [
    { label: "Javascript", icon: "JavaScript" },
    { label: "Tailwind CSS", icon: "Tailwind CSS" },
    { label: "Node JS", icon: "Node.js" },
    { label: "React JS", icon: "React.js" },
    { label: "HTML5", icon: "HTML5" },
    { label: "Web Development", icon: "Web Development" },
    { label: "CSS", icon: "CSS3" },
    { label: "Frontend Development", icon: "Frontend Development" },
    { label: "Github", icon: "GitHub" }
  ];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{
        padding: 'var(--section-padding)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <h2
          id="skills-heading"
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '2.5rem',
            color: 'var(--color-heading)',
          }}
        >
          Keahlian
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          {skillsData.map((skill) => (
            <div
              key={skill.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.65rem',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--color-text)',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                transition: 'border-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            >
              <TechIcon name={skill.icon} size={15} />
              <span>{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
