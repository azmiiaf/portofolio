import { ArrowDown, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/Icons';
import Lanyard from '../Lanyard/Lanyard';
import { SITE } from '../../utils/constants';

export default function Hero() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: '85svh',
        display: 'flex',
        alignItems: 'center',
        padding: '7rem 2rem 3rem',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '4rem',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left Column */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1
            className="text-gradient"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
            }}
          >
            M. Azmi Al Fadillah
          </h1>

          <p
            className="mono"
            style={{
              color: 'var(--color-accent)',
              fontWeight: 500,
              marginBottom: '1.5rem',
            }}
          >
            Frontend &amp; Web Developer
          </p>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'var(--color-text)',
              maxWidth: '520px',
              marginBottom: '2.5rem',
            }}
          >
            Saya membangun aplikasi web responsive menggunakan React, JavaScript, dan Tailwind CSS.
            Fresh graduate Informatika dari Jakarta, Indonesia.
          </p>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '2.5rem',
            }}
          >
            <a
              id="hero-view-projects"
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn-glow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              Lihat Proyek
              <ArrowDown size={14} />
            </a>

            <a
              id="hero-download-cv"
              href={SITE.cv}
              download
              className="btn-glow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                border: '1px solid var(--color-border)',
                color: 'var(--color-heading)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                fontWeight: 500,
                fontSize: '0.9375rem',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              CV
              <Download size={14} />
            </a>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a
              id="hero-github"
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: 'var(--color-text-muted)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-heading)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
            >
              <GithubIcon size={16} />
              GitHub
            </a>

            <span style={{ color: 'var(--color-border)', userSelect: 'none' }}>/</span>

            <a
              id="hero-linkedin"
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: 'var(--color-text-muted)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-heading)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Column: Lanyard */}
        <div style={{ position: 'relative', width: '100%', height: '580px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 0 }}>
          <div style={{
            position: 'absolute',
            width: '1600px',
            height: '1200px',
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0,
          }}>
            <Lanyard
              position={[0, -1.75, 48]}
              gravity={[0, -40, 0]}
              frontImage="/images/image.png"
              backImage="/images/image.png"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
