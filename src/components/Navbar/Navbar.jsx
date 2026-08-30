import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const NAV_LINKS = [
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Pendidikan', href: '#education' },
  { label: 'Kontak', href: '#contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }

    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 300ms ease, border-color 300ms ease',
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={() => handleNavClick('#hero')}
          aria-label="Go to top"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--color-heading)',
            letterSpacing: '-0.02em',
          }}
        >
          azmi<span style={{ color: 'var(--color-accent)' }}>_</span>
        </a>

        {/* Desktop Nav */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--color-heading)' : 'var(--color-text-muted)',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-text)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                >
                  {label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        right: 0,
                        height: '1.5px',
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: '999px',
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-heading)',
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            display: 'none',
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        style={{
          display: menuOpen ? 'block' : 'none',
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: '1rem 2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'color var(--transition-fast)',
                  }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
