export default function ProfilePhoto() {
  return (
    <div className="relative flex h-full w-full min-w-0 items-center justify-center px-8 py-8 sm:px-12 md:px-4 md:py-0">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl md:h-72 md:w-72"
      />

      <div className="group relative w-full max-w-[17rem] rotate-2 transition-transform duration-500 hover:-rotate-1 motion-reduce:transition-none sm:max-w-[19rem] md:max-w-[17rem] lg:max-w-[19rem]">
        <div
          aria-hidden="true"
          className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/70 via-accent/10 to-indigo-500/60 opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
        />

        <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-surface p-1.5 shadow-glow transition-[box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:shadow-glow-hover motion-reduce:transition-none">
          <div className="relative aspect-[9/14] overflow-hidden rounded-[1.35rem] bg-surface-2">
            <img
              src="/images/image.png"
              alt="M. Azmi Al Fadillah mengenakan jas hitam dan dasi hijau"
              className="h-full w-full object-contain object-center saturate-[0.9] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-accent/10"
            />
          </div>

          <figcaption className="absolute left-4 right-4 top-4 flex items-end justify-between gap-3 rounded-xl border border-white/15 bg-bg/70 px-3 py-2.5 backdrop-blur-md">
            <span className="min-w-0">
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
                Profile / 2026
              </span>
              <span className="mt-1 block truncate text-xs font-semibold text-heading">
                M. Azmi Al Fadillah
              </span>
            </span>
            <span className="shrink-0 font-mono text-[0.65rem] text-text-muted">01</span>
          </figcaption>
        </figure>

        <span
          aria-hidden="true"
          className="absolute -left-3 top-12 h-16 w-px bg-gradient-to-b from-transparent via-accent to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute -right-3 bottom-16 h-px w-16 bg-gradient-to-r from-accent to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute -right-5 top-8 h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]"
        />
      </div>
    </div>
  );
}
