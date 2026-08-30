import { useState } from "react";
import { projects } from "../../data/projects";
import ProjectCard from "../ProjectCard/ProjectCard";

const CATEGORIES = [
  "Semua",
  "Aplikasi Web",
  "Aplikasi Produktivitas",
  "Aplikasi Frontend",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProjects =
    activeCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <h2
            id="projects-heading"
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--color-heading)",
            }}
          >
            Project
          </h2>

          {/* Filter */}
          {/* <div
            style={{
              display: "flex",
              gap: "0.375rem",
              flexWrap: "wrap",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.35rem 0.75rem",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid",
                    borderColor: isActive
                      ? "var(--color-heading-bright)"
                      : "var(--color-border)",
                    backgroundColor: isActive
                      ? "var(--color-heading-bright)"
                      : "transparent",
                    color: isActive
                      ? "var(--color-bg)"
                      : "var(--color-text-muted)",
                    transition: "all var(--transition-fast)",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div> */}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
          className="projects-grid"
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="reveal">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
