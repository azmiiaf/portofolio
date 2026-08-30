import { BookOpen } from "lucide-react";
import { education } from "../../data/education";

export default function Education() {
  const edu = education[0];

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      style={{
        padding: "var(--section-padding)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <h2
          id="education-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "2.5rem",
            color: "var(--color-heading)",
          }}
        >
          Pendidikan
        </h2>

        <div
          className="reveal"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1.5rem 1.75rem",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "var(--color-text-muted)",
              }}
            >
              <BookOpen size={18} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "var(--color-heading)",
                  marginBottom: "0.2rem",
                }}
              >
                {edu.degree}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text)",
                  fontWeight: 500,
                }}
              >
                {edu.institution} · {edu.period}
              </p>
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              padding: "1.5rem 1.75rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
            className="edu-body"
          >
            {/* Thesis */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.625rem",
                }}
              >
                Skripsi
              </h4>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                "{edu.thesis}"
              </p>
            </div>

            {/* Relevant Courses */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.625rem",
                }}
              >
                Mata Kuliah Relevan
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                }}
              >
                {edu.relevantCourses.map((course) => (
                  <li
                    key={course}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text)",
                      paddingLeft: "1rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.65em",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-border-hover)",
                      }}
                    />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .edu-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
