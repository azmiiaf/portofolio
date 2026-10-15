import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Tentang', href: '#about' },
  { label: 'Pendidikan', href: '#education' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Projek', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-10 right-10 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[var(--color-base)]/40 backdrop-blur-md border-b rounded-full border-[var(--color-border)]' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-[var(--color-text-primary)] font-bold text-lg tracking-tight hover:text-[var(--color-accent)] transition-colors font-spacemono"
        >
          {name ?? 'Azmi'}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Buka menu navigasi"
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-b border-[var(--color-border)] px-6 pb-4">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
