import { useState } from 'react';
import { Mail, Download, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/Icons';
import { SITE } from '../../utils/constants';
import { focusRing, iconLink, pageContainer, reveal, sectionShell } from '../../utils/tailwindClasses';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className={`${sectionShell} bg-surface`}>
      <div className={pageContainer}>
        <div
          data-reveal
          className={`${reveal} relative min-w-0 overflow-hidden rounded-md border border-border bg-bg p-8 sm:p-10`}
        >
          <h2 id="contact-heading" className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-heading">
            Hubungi Saya
          </h2>
          <p className="mb-8 max-w-[460px] text-[0.9375rem] leading-[1.6] text-text">
            Saya sedang mencari posisi sebagai frontend dan web developer. Jika
            Anda punya ide atau kebutuhan, jangan ragu untuk menghubungi saya.
          </p>

          <div className="mb-8 flex min-w-0 flex-wrap items-center gap-3">
            <a
              id="contact-email"
              href={`mailto:${SITE.email}`}
              className={`inline-flex min-h-11 items-center gap-2 rounded-sm bg-heading-bright px-4 py-2.5 text-sm font-semibold text-bg transition-opacity duration-100 hover:opacity-90 ${focusRing}`}
            >
              <Mail size={15} />
              Kirim Email
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex min-h-11 items-center gap-2 rounded-sm border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium transition-colors duration-100 hover:border-border-hover ${focusRing} ${
                copied ? 'text-emerald-500' : 'text-heading'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Tersalin!' : 'Salin Email'}
            </button>
          </div>

          <div className="flex min-w-0 flex-wrap gap-6 border-t border-border pt-6">
            <a
              id="contact-github"
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={`${iconLink} min-h-11 text-[0.8125rem] font-medium`}
            >
              <GithubIcon size={15} />
              GitHub
            </a>

            <a
              id="contact-linkedin"
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={`${iconLink} min-h-11 text-[0.8125rem] font-medium`}
            >
              <LinkedinIcon size={15} />
              LinkedIn
            </a>

            <span className="inline-flex min-h-11 min-w-0 max-w-full items-center gap-2 break-words text-[0.8125rem] font-medium text-text-muted [overflow-wrap:anywhere]">
              <Mail size={15} className="shrink-0" />
              <span>{SITE.email}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
