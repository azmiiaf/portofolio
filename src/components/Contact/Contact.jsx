import { useState } from "react";
import { Mail, Download, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../Icons/Icons";
import { SITE } from "../../utils/constants";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        padding: "var(--section-padding)",
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
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
          className="reveal"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "2.5rem 2rem",
            backgroundColor: "var(--color-bg)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h2
            id="contact-heading"
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--color-heading)",
              marginBottom: "0.75rem",
            }}
          >
            Hubungi Saya
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-text)",
              maxWidth: "460px",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            Saya sedang mencari posisi sebagai frontend dan web developer. Jika
            Anda punya ide atau kebutuhan, jangan ragu untuk menghubungi saya.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "2rem",
              alignItems: "center",
            }}
          >
            <a
              id="contact-email"
              href={`mailto:${SITE.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.1rem",
                backgroundColor: "var(--color-heading-bright)",
                color: "var(--color-bg)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: "var(--radius-sm)",
                transition: "opacity var(--transition-fast)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <Mail size={15} />
              Kirim Email
            </a>

            <button
              onClick={handleCopyEmail}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.1rem",
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: copied ? "#10b981" : "var(--color-heading)",
                fontWeight: 500,
                fontSize: "0.875rem",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                if (!copied)
                  e.currentTarget.style.borderColor =
                    "var(--color-border-hover)";
              }}
              onMouseLeave={(e) => {
                if (!copied)
                  e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Tersalin!" : "Salin Email"}
            </button>

            <a
              id="contact-download-cv"
              href={SITE.cv}
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.1rem",
                border: "1px solid var(--color-border)",
                color: "var(--color-heading)",
                fontWeight: 500,
                fontSize: "0.875rem",
                borderRadius: "var(--radius-sm)",
                transition: "border-color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <Download size={15} />
              Unduh CV
            </a>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <a
              id="contact-github"
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-text-muted)",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-heading)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-text-muted)",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-heading)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
            >
              <LinkedinIcon size={15} />
              LinkedIn
            </a>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-text-muted)",
              }}
            >
              <Mail size={15} />
              {SITE.email}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
