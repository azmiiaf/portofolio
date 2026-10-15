import { useState } from "react";
import SectionHeading from "../Elements/SectionHeading";
import LoadingSpinner from "../Elements/LoadingSpinner";
import EmptyState from "../Elements/EmptyState";
import { Award, X, ArrowUpRight } from "lucide-react";

export default function CertificationsSection({ items, loading }) {
  const [preview, setPreview] = useState(null);

  return (
    <section
      id="certifications"
      className="py-24 border-t border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          tag="Pengakuan resmi"
          title="Lisensi & Sertifikasi"
          subtitle="Sertifikasi yang telah saya raih untuk memvalidasi keahlian."
        />

        <div className="mt-12">
          {loading && <LoadingSpinner text="Memuat sertifikasi..." />}
          {!loading && items.length === 0 && (
            <EmptyState icon={Award} message="Belum ada data sertifikasi." />
          )}
          {!loading && items.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((cert) => (
                <CertCard key={cert.id} cert={cert} onPreview={setPreview} />
              ))}
            </div>
          )}
        </div>
      </div>

      {preview && (
        <CertPreviewModal cert={preview} onClose={() => setPreview(null)} />
      )}
    </section>
  );
}

function CertCard({ cert, onPreview }) {
  const isPdf = cert.file_url?.toLowerCase().endsWith(".pdf");

  return (
    <div className="group bg-[#1B282A] border border-[#212733] hover:border-[#303846] rounded-[28px] p-4 sm:p-5 flex flex-col transition-all duration-300 shadow-lg">
      {/* Cover image area */}
      <div className="relative h-48 sm:h-44 w-full rounded-2xl overflow-hidden bg-[#12161f]">
        {cert.file_url ? (
          isPdf ? (
            /* PREVIEW PDF LANGSUNG VIA IFRAME */
            <div className="w-full h-full relative overflow-hidden">
              <iframe
                src={`${cert.file_url}#toolbar=0&navpanes=0&view=FitH`}
                title={`Preview ${cert.name}`}
                className="w-full h-[180%] -mt-6 border-0 pointer-events-none scale-105 group-hover:scale-110 transition-transform duration-500 ease-out"
                scrolling="no"
              />
              {/* Overlay transparan agar card tetap mulus saat diklik/di-hover */}
              <div className="absolute inset-0 bg-transparent" />
            </div>
          ) : (
            /* GAMBAR biasa (JPG/PNG) */
            <img
              src={cert.file_url}
              alt={`Sertifikat ${cert.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a2130] to-[#12161f] text-gray-400">
            <Award size={44} strokeWidth={1.2} className="text-purple-400/80 mb-2" />
          </div>
        )}

        {/* Badge Issuer */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center px-3.5 py-1 rounded-lg bg-[#5D29F8] text-white text-[11px] font-semibold tracking-wide shadow-md">
            {cert.issuer || "Sertifikasi"}{" "}
            {cert.year_issued ? `\u2022 ${cert.year_issued}` : ""}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="pt-4 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
          {cert.name}
        </h3>

        <p className="text-xs text-gray-400 mt-1.5">
          {cert.year_expires ? `Berlaku hingga: ${cert.year_expires}` : "Masa berlaku seumur hidup"}
        </p>

        <div className="mt-3 pt-2">
          <button
            id={`cert-preview-${cert.id}`}
            onClick={() => onPreview(cert)}
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-gray-700/80 hover:border-gray-400 text-gray-200 hover:text-white text-xs font-medium transition-all duration-200 focus-visible:outline-[#6366f1] cursor-pointer"
          >
            Lihat Sertifikat <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CertPreviewModal({ cert, onClose }) {
  const isPdf = cert.file_url?.toLowerCase().endsWith(".pdf");

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`Sertifikat: ${cert.name}`}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={-1}
    >
      <div className="relative bg-[#141820] rounded-2xl border border-gray-800 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <h2 className="font-bold text-white text-sm sm:text-white">
              {cert.name}
            </h2>
            <p className="text-xs text-gray-400">
              {cert.issuer}{" "}
              {cert.year_issued ? `\u2022 ${cert.year_issued}` : ""}
            </p>
          </div>
          <button
            id="cert-modal-close"
            onClick={onClose}
            aria-label="Tutup pratinjau"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors focus-visible:outline-[#6366f1]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-black/40 p-4">
          {isPdf ? (
            <iframe
              src={cert.file_url}
              title={`Sertifikat ${cert.name}`}
              className="w-full h-full min-h-[65vh] rounded-lg border border-gray-800"
            />
          ) : (
            <div className="overflow-y-auto max-h-[72vh] flex justify-center items-center">
              <img
                src={cert.file_url}
                alt={`Sertifikat ${cert.name}`}
                className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
