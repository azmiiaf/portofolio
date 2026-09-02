import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { focusRing, pageContainer } from '../../utils/tailwindClasses';

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-[100] w-full max-w-full border-b transition-colors duration-300 motion-reduce:transition-none ${
        scrolled
          ? 'border-border bg-header backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`${pageContainer} flex h-16 items-center justify-between overflow-x-clip`}
      >
        <a
          href="#hero"
          onClick={() => handleNavClick('#hero')}
          aria-label="Go to top"
          className={`font-display text-[1.05rem] font-bold tracking-[-0.02em] text-heading ${focusRing}`}
        >
          azmi<span className="text-accent">_</span>
        </a>

        <ul className="hidden min-w-0 list-none items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(href);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative pb-0.5 text-sm font-medium transition-colors duration-100 ${focusRing} ${
                    isActive ? 'text-heading' : 'text-text-muted hover:text-text'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex min-h-11 min-w-11 items-center justify-center rounded-sm border-0 bg-transparent p-2 text-heading md:hidden ${focusRing}`}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`${menuOpen ? 'block' : 'hidden'} w-full max-w-full min-w-0 border-t border-border bg-menu backdrop-blur-md`}
      >
        <ul className={`${pageContainer} flex list-none flex-col gap-1 pb-6 pt-4`}>
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeId === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(href);
                  }}
                  className={`block min-h-11 border-b border-border py-3 text-base font-medium transition-colors duration-100 ${focusRing} ${
                    isActive ? 'text-accent' : 'text-text hover:text-heading'
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
