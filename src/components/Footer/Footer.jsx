import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/Icons';
import { SITE } from '../../utils/constants';
import { focusRing, pageContainer } from '../../utils/tailwindClasses';

const currentYear = new Date().getFullYear();

const footerIconLink = `inline-flex min-h-11 min-w-11 items-center justify-center text-text-muted transition-colors duration-100 hover:text-heading ${focusRing}`;

export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border bg-bg px-4 py-10 md:px-6 lg:px-8">
      <div className={`${pageContainer} flex flex-wrap items-center justify-between gap-6`}>
        <div className="min-w-0">
          <p className="mb-1 font-display text-[0.9375rem] font-bold text-heading">
            azmi<span className="text-accent">_</span>
          </p>
          <p className="text-[0.8125rem] text-text-muted">
            © {currentYear} M. Azmi Al Fadillah
          </p>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={footerIconLink}
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={footerIconLink}
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className={footerIconLink}
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
