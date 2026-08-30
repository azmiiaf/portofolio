import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "../Icons/Icons";
import { TechIcon } from "../Icons/TechIcons";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/projects/${project.slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <article
      aria-label={`Project: ${project.title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        backgroundColor: "var(--color-surface)",
        transition: "border-color var(--transition-fast)",
        borderColor: hovered
          ? "var(--color-border-hover)"
          : "var(--color-border)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div
        style={{
          overflow: "hidden",
          aspectRatio: "16/9",
          position: "relative",
          backgroundColor: "var(--color-surface-2)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
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
        <span
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            padding: "0.2rem 0.5rem",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--color-heading)",
            backgroundColor: "rgba(9,9,11,0.85)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "0.75rem",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--color-heading)",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "var(--color-text)",
            flexGrow: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.2rem 0.5rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--color-text)",
                backgroundColor: "var(--color-surface-2)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
              }}
            >
              <TechIcon name={tech} size={12} />
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span
              style={{
                padding: "0.2rem 0.5rem",
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
              }}
            >
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--color-border)",
            flexWrap: "wrap",
          }}
        >
          <button
            id={`project-details-${project.slug}`}
            onClick={handleDetails}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--color-heading)",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "color var(--transition-fast)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-heading)";
            }}
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                color: "var(--color-text-muted)",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-heading)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                color: "var(--color-text-muted)",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-heading)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
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
