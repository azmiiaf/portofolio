import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/Icons/Icons";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} | M. Azmi Al Fadillah`;
    }
    return () => {
      document.title = "M. Azmi Al Fadillah | Frontend & Web Developer";
    };
  }, [project]);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <h1 style={{ color: "var(--color-heading)", fontSize: "2rem" }}>
          Proyek tidak ditemukan
        </h1>
        <button
          onClick={() => navigate("/")}
          style={{
            color: "var(--color-accent)",
            background: "none",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowLeft size={17} /> Kembali ke portofolio
        </button>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100svh",
        paddingTop: "80px",
        paddingBottom: "5rem",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "3rem 2rem 0",
        }}
      >
        {/* Back link */}
        <button
          id="project-detail-back"
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--color-text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "2.5rem",
            padding: 0,
            transition: "color var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-heading)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <ArrowLeft size={16} />
          Kembali ke Proyek
        </button>

        {/* Header */}
        <header style={{ marginBottom: "2.5rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.25rem 0.625rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              backgroundColor: "var(--color-accent-dim)",
              borderRadius: "var(--radius-sm)",
              marginBottom: "1rem",
              border: "1px solid rgba(196,147,63,0.2)",
            }}
          >
            {project.category}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.875rem, 5vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--color-heading-bright)",
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-text)",
              lineHeight: 1.75,
              maxWidth: "680px",
            }}
          >
            {project.description}
          </p>
        </header>

        {/* Gallery / Images */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Main Image */}
          {project.image && (
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface)",
                aspectRatio: "16/9",
              }}
            >
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Additional Screenshots */}
          {project.screenshots &&
            project.screenshots.filter((s) => s !== project.image).length >
              0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {project.screenshots
                  .filter((s) => s !== project.image)
                  .map((screenshot, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                        aspectRatio: "16/9",
                      }}
                    >
                      <img
                        src={screenshot}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
        </div>

        {/* Case Study Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {/* Overview */}
          <CaseSection title="Gambaran Umum">
            <p style={proseStyle}>{project.overview}</p>
          </CaseSection>

          {/* Problem */}
          <CaseSection title="Masalah">
            <p style={proseStyle}>{project.problem}</p>
          </CaseSection>

          {/* Solution */}
          <CaseSection title="Solusi">
            <p style={proseStyle}>{project.solution}</p>
          </CaseSection>

          {/* Features + Tech — two columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
            className="detail-two-col"
          >
            <CaseSection title="Fitur">
              <ul style={listStyle}>
                {project.features.map((f) => (
                  <BulletItem key={f}>{f}</BulletItem>
                ))}
              </ul>
            </CaseSection>

            <CaseSection title="Teknologi yang Digunakan">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "0.375rem 0.75rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-accent)",
                      backgroundColor: "var(--color-accent-dim)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(196,147,63,0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CaseSection>
          </div>

          {/* Challenges */}
          {project.challenges?.length > 0 && (
            <CaseSection title="Tantangan">
              <ul style={listStyle}>
                {project.challenges.map((c) => (
                  <BulletItem key={c}>{c}</BulletItem>
                ))}
              </ul>
            </CaseSection>
          )}

          {/* Solutions */}
          {project.solutions?.length > 0 && (
            <CaseSection title="Cara Saya Menyelesaikannya">
              <ul style={listStyle}>
                {project.solutions.map((s) => (
                  <BulletItem key={s}>{s}</BulletItem>
                ))}
              </ul>
            </CaseSection>
          )}

          {/* Result */}
          {project.result && (
            <CaseSection title="Hasil">
              <p
                style={{
                  ...proseStyle,
                  borderLeft: "3px solid var(--color-accent)",
                  paddingLeft: "1.25rem",
                  color: "var(--color-heading)",
                }}
              >
                {project.result}
              </p>
            </CaseSection>
          )}

          {/* Application Flow */}
          {project.experience && (
            <CaseSection title="Alur Aplikasi">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {Array.isArray(project.experience) ? (
                  project.experience.map((paragraph, idx) => (
                    <p key={idx} style={proseStyle}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p style={proseStyle}>{project.experience}</p>
                )}
              </div>
            </CaseSection>
          )}

          {/* Links */}
          {(project.github || project.demo) && (
            <div
              style={{
                paddingTop: "2rem",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                gap: "0.875rem",
                flexWrap: "wrap",
              }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={primaryLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-accent-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-accent)";
                  }}
                >
                  <GithubIcon size={17} /> Lihat di GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={secondaryLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.color = "var(--color-heading)";
                  }}
                >
                  <ExternalLink size={17} /> Demo Langsung
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .detail-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

/* ── Sub-components ── */

function CaseSection({ title, children }) {
  return (
    <section
      aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <h2
        id={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletItem({ children }) {
  return (
    <li
      style={{
        fontSize: "0.9375rem",
        color: "var(--color-text)",
        paddingLeft: "1.25rem",
        position: "relative",
        lineHeight: 1.7,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "0.6em",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "var(--color-accent)",
        }}
      />
      {children}
    </li>
  );
}

/* Styles */
const proseStyle = {
  fontSize: "0.9375rem",
  color: "var(--color-text)",
  lineHeight: 1.8,
};

const listStyle = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
};

const primaryLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.75rem 1.5rem",
  backgroundColor: "var(--color-accent)",
  color: "#0a0a0a",
  fontWeight: 600,
  fontSize: "0.9375rem",
  borderRadius: "var(--radius-md)",
  transition: "background-color var(--transition-fast)",
};

const secondaryLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.75rem 1.5rem",
  border: "1px solid var(--color-border)",
  color: "var(--color-heading)",
  fontWeight: 600,
  fontSize: "0.9375rem",
  borderRadius: "var(--radius-md)",
  transition:
    "border-color var(--transition-fast), color var(--transition-fast)",
};
