import { ArrowDown, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/Icons';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import { SITE } from '../../utils/constants';
import { focusRing, iconLink } from '../../utils/tailwindClasses';

export default function Hero() {
  const handleScrollToProjects = (event) => {
    event.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="mx-auto flex min-h-[85svh] w-full min-w-0 max-w-portfolio items-center overflow-hidden px-4 pb-12 pt-28 md:px-6 lg:px-8"
    >
      <div className="grid w-full min-w-0 grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16">
        <div className="relative z-10 min-w-0">
          <h1 className="max-w-full break-words bg-gradient-to-br from-heading-bright to-accent bg-clip-text text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-transparent">
            M. Azmi Al Fadillah
          </h1>

          <p className="mb-6 mt-3 font-mono text-[0.8125rem] font-medium text-accent">
            Frontend &amp; Web Developer
          </p>

          <p className="mb-10 max-w-[520px] text-base leading-[1.6] text-text">
            Saya membangun aplikasi web responsive menggunakan React, JavaScript, dan Tailwind CSS.
            Fresh graduate Informatika dari Universitas Bhayangkara Jakarta Raya, Indonesia.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              id="hero-view-projects"
              href="#projects"
              onClick={handleScrollToProjects}
              className={`inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[0.9375rem] font-semibold text-bg shadow-glow transition-[box-shadow,transform,background-color] duration-100 hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-glow-hover motion-reduce:transition-none ${focusRing}`}
            >
              Lihat Proyek
              <ArrowDown size={14} />
            </a>

            <a
              id="hero-download-cv"
              href={SITE.cv}
              download
              className={`inline-flex items-center gap-2 rounded-lg border border-border bg-soft px-5 py-2.5 text-[0.9375rem] font-medium text-heading backdrop-blur-md transition-[border-color,box-shadow,transform] duration-100 hover:-translate-y-0.5 hover:border-accent hover:shadow-glow motion-reduce:transition-none ${focusRing}`}
            >
              CV
              <Download size={14} />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              id="hero-github"
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={`${iconLink} font-mono text-[0.8125rem]`}
            >
              <GithubIcon size={16} />
              GitHub
            </a>

            <span className="select-none text-border" aria-hidden="true">/</span>

            <a
              id="hero-linkedin"
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={`${iconLink} font-mono text-[0.8125rem]`}
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="relative flex h-[clamp(30rem,62svh,36.25rem)] min-w-0 w-full items-center justify-center">
          <ProfilePhoto />
        </div>
      </div>
    </section>
  );
}
