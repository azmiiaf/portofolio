import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/Icons';
import { SITE } from '../../utils/constants';

const currentYear = new Date().getFullYear();


export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2.5rem 2rem',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        {/* Left: Name + copyright */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9375rem',
              color: 'var(--color-heading)',
              marginBottom: '0.25rem',
            }}
          >
            azmi<span style={{ color: 'var(--color-accent)' }}>_</span>
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            © {currentYear} M. Azmi Al Fadillah
          </p>
        </div>

        {/* Right: Social links */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              color: 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-heading)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              color: 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-heading)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            style={{
              color: 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-heading)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
