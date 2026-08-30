export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        padding: "var(--section-padding)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: Text */}
          <div className="reveal">
            <h2
              id="about-heading"
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "var(--color-heading)",
              }}
            >
              Tentang
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                fontSize: "0.9375rem",
                color: "var(--color-text)",
                lineHeight: 1.7,
              }}
            >
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

          {/* Right: Quick facts */}
          <div className="reveal">
            <div
              style={{
                padding: "1.5rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "transparent",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  { label: "Gelar", value: "S.Kom — Informatika" },
                  { label: "Universitas", value: "Universitas Bhayangkara Jakarta Raya" },
                  { label: "Lulus", value: "2026" },
                  { label: "Fokus", value: "Frontend / Web" },
                  { label: "Lokasi", value: "Indonesia" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "1rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-heading)",
                        fontWeight: 500,
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
