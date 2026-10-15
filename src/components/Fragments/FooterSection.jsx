import LoadingSpinner from '../Elements/LoadingSpinner'
import EmptyState from '../Elements/EmptyState'
import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../Elements/SocialIcons'

export default function FooterSection({ contact, loading }) {
  return (
    <footer id="contact" className="border-t border-[var(--color-border)] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          {/* Left: CTA */}
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="section-tag font-spacemono">Kontak</p>
            <h2 className="text-3xl font-spacemono font-bold text-[var(--color-text-primary)] leading-tight">
              Kontak Saya
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Saya terbuka untuk peluang baru, kolaborasi projek, dan diskusi teknikal.
            </p>
          </div>

          {/* Right: links */}
          <div>
            {loading && <LoadingSpinner text="Memuat kontak..." />}
            {!loading && !contact && (
              <EmptyState icon={Mail} message="Kontak belum tersedia." />
            )}
            {!loading && contact && (
              <div className="flex flex-col gap-3">
                {contact.email && (
                  <ContactLink
                    href={`mailto:${contact.email}`}
                    icon={<Mail size={16} />}
                    label={contact.email}
                    id="contact-email"
                  />
                )}
                {contact.github && (
                  <ContactLink
                    href={contact.github}
                    icon={<GitHubIcon size={16} />}
                    label="GitHub"
                    id="contact-github"
                  />
                )}
                {contact.linkedin && (
                  <ContactLink
                    href={contact.linkedin}
                    icon={<LinkedInIcon size={16} />}
                    label="LinkedIn"
                    id="contact-linkedin"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] justify-center">
          <span>© 2026 M. Azmi Al Fadillah</span>
        </div>
      </div>
    </footer>
  )
}

function ContactLink({ href, icon, label, id }) {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]"
    >
      {icon}
      {label}
    </a>
  )
}
