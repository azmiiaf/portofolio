import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
          id="experience-heading"
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '3rem',
            color: 'var(--color-heading)',
          }}
        >
          Experience
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              className="reveal exp-item card-hover"
              aria-label={`${exp.role} at ${exp.organization}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: '2rem',
                padding: '2rem',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                marginBottom: '1.5rem',
              }}
            >
              {/* Left: Meta */}
              <div>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.375rem',
                  }}
                >
                  {exp.period}
                </p>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {exp.type}
                </span>
              </div>

              {/* Right: Content */}
              <div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--color-heading)',
                    marginBottom: '0.2rem',
                  }}
                >
                  {exp.role}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-accent)',
                    fontWeight: 500,
                    marginBottom: exp.location ? '0.25rem' : '0.75rem',
                  }}
                >
                  {exp.organization}
                </p>
                {exp.location && (
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-muted)',
                      marginBottom: '1rem',
                    }}
                  >
                    {exp.location}
                  </p>
                )}
                {exp.description && (
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--color-text)',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}
                  >
                    {exp.description}
                  </p>
                )}
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  {exp.responsibilities.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text)',
                        paddingLeft: '1rem',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.65em',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-border-hover)',
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-item { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </section>
  );
}
