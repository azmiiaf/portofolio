import { useState } from 'react';
import { Award, ExternalLink, Calendar, KeyRound, X, FileText, Image as ImageIcon, Download } from 'lucide-react';
import { certifications } from '../../data/certifications';
import {
  pageContainer,
  reveal,
  sectionHeading,
  sectionShell,
  focusRing,
} from '../../utils/tailwindClasses';

export default function Certifications() {
  const [selectedFile, setSelectedFile] = useState(null);

  const getFileType = (path) => {
    if (!path) return null;
    const cleanPath = path.split('?')[0].toLowerCase();
    if (cleanPath.endsWith('.pdf')) return 'pdf';
    return 'image';
  };

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className={`${sectionShell} bg-surface`}>
      <div className={pageContainer}>
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 id="certifications-heading" className={sectionHeading}>
              Lisensi &amp; Sertifikasi
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Sertifikasi profesional dan kompetensi yang telah saya peroleh
            </p>
          </div>
          <span className="font-mono text-xs text-text-muted">
            {certifications.length} Sertifikat
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {certifications.map((cert) => {
            const filePath = cert.file || cert.image;
            const isPdf = getFileType(filePath) === 'pdf';

            return (
              <div
                key={cert.id}
                data-reveal
                className={`${reveal} group relative flex flex-col justify-between rounded-md border border-border bg-bg p-5 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent/40`}
              >
                <div>
                  {/* Header: Title & Issuer */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-accent">
                      <Award size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-base font-semibold leading-snug text-heading">
                        {cert.title}
                      </h3>
                      <p className="mt-0.5 break-words text-sm font-medium text-text-muted">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Metadata: Dates & Credential ID */}
                  <div className="mt-4 flex flex-col gap-1.5 border-t border-border/60 pt-3.5 font-mono text-xs text-text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="shrink-0 text-accent/70" />
                      <span>
                        Diterbitkan {cert.issueDate}
                        {cert.expiryDate ? ` · Berlaku hingga ${cert.expiryDate}` : ''}
                      </span>
                    </div>
                    {cert.credentialId && (
                      <div className="flex items-center gap-2">
                        <KeyRound size={13} className="shrink-0 text-accent/70" />
                        <span className="truncate">ID: {cert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills tags if available */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-sm bg-surface-2 px-2 py-0.5 text-[0.7rem] font-medium text-text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Certificate File Preview / Button & Link */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-3.5">
                  {filePath ? (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedFile({
                          url: filePath,
                          title: cert.title,
                          type: getFileType(filePath),
                        })
                      }
                      className={`group/btn inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text transition-colors hover:border-accent hover:text-heading ${focusRing}`}
                    >
                      {isPdf ? (
                        <FileText size={13} className="text-red-400 transition-colors group-hover/btn:text-accent" />
                      ) : (
                        <ImageIcon size={13} className="text-text-muted transition-colors group-hover/btn:text-accent" />
                      )}
                      <span>Lihat {isPdf ? 'PDF' : 'Sertifikat'}</span>
                    </button>
                  ) : (
                    <span />
                  )}

                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline ${focusRing}`}
                    >
                      Kredensial
                      <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Lightbox Preview (Handles both PDF and Images) */}
      {selectedFile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedFile.title}
          onClick={() => setSelectedFile(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex flex-col overflow-hidden rounded-lg border border-border bg-bg shadow-2xl ${
              selectedFile.type === 'pdf'
                ? 'h-[90vh] w-full max-w-5xl'
                : 'max-h-[90vh] max-w-4xl'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface">
              <div className="flex items-center gap-2 truncate pr-4">
                {selectedFile.type === 'pdf' ? (
                  <FileText size={16} className="shrink-0 text-red-400" />
                ) : (
                  <ImageIcon size={16} className="shrink-0 text-accent" />
                )}
                <h4 className="truncate text-sm font-semibold text-heading">
                  {selectedFile.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedFile.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-text hover:border-accent hover:text-heading ${focusRing}`}
                  title="Unduh / Buka di Tab Baru"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">Unduh / Buka</span>
                </a>

                <button
                  type="button"
                  aria-label="Tutup pratinjau"
                  onClick={() => setSelectedFile(null)}
                  className={`rounded-sm p-1 text-text-muted hover:bg-surface-2 hover:text-heading ${focusRing}`}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Content: PDF viewer or Image viewer */}
            <div className="flex-1 overflow-auto bg-black/40 flex items-center justify-center p-2 sm:p-4">
              {selectedFile.type === 'pdf' ? (
                <iframe
                  src={`${selectedFile.url}#toolbar=1&navpanes=0`}
                  title={selectedFile.title}
                  className="h-full w-full rounded border-0 bg-white"
                />
              ) : (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x600/18181b/fafafa?text=File+Belum+Ditemukan';
                  }}
                  className="max-h-[75vh] max-w-full rounded object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
