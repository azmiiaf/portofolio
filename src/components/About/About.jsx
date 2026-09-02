import {
  bodyText,
  pageContainer,
  reveal,
  sectionHeading,
  sectionShell,
} from '../../utils/tailwindClasses';

const QUICK_FACTS = [
  { label: 'Gelar', value: 'S.Kom — Informatika' },
  { label: 'Universitas', value: 'Universitas Bhayangkara Jakarta Raya' },
  { label: 'Lulus', value: '2026' },
  { label: 'Fokus', value: 'Frontend Web / Web Development' },
  { label: 'Lokasi', value: 'Bekasi, Jawa Barat, Indonesia' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className={sectionShell}>
      <div className={pageContainer}>
        <div className="grid min-w-0 grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div
            data-reveal
            className={`${reveal} min-w-0`}
          >
            <h2 id="about-heading" className={`${sectionHeading} mb-6`}>
              Tentang
            </h2>
            <div className={`flex min-w-0 flex-col gap-4 ${bodyText}`}>
              <p>
                Saya baru saja lulus dari Universitas Bhayangkara Jakarta Raya
                dengan gelar Sarjana Informatika. Untuk skripsi saya, saya
                membangun sistem informasi bank sampah dari nol — mulai dari
                perancangan database, backend API, hingga frontend UI.
              </p>
              <p>
                Fokus saya adalah membangun antarmuka yang responsif menggunakan
                React, JavaScript, dan Tailwind CSS. Saya tertarik pada aspek
                praktis dalam pengembangan web — bagaimana komponen mengelola
                state, bagaimana data di-fetch secara efisien, dan bagaimana
                layout menyesuaikan diri di berbagai ukuran layar.
              </p>
              <p>
                Saat ini saya sedang mencari posisi sebagai frontend developer
                atau web developer untuk menerapkan keahlian saya pada produk
                nyata dan berkolaborasi dengan developer lain.
              </p>
            </div>
          </div>

          <div data-reveal className={`${reveal} min-w-0`}>
            <div className="rounded-md border border-border p-6">
              <div className="flex min-w-0 flex-col gap-3">
                {QUICK_FACTS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-baseline justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="shrink-0 text-[0.8125rem] text-text-muted">
                      {label}
                    </span>
                    <span className="min-w-0 break-words text-right text-sm font-medium text-heading [overflow-wrap:anywhere]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
