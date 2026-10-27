import React, { useState } from 'react'
import {
  ICON_URLS,
  NAME_MAP,
  PRESET_SKILLS,
  normalizeSkillName,
} from '../../constants/skillsData'

// Re-export for compatibility with other files importing from TechIcon
export { ICON_URLS, NAME_MAP, PRESET_SKILLS, normalizeSkillName }

export default function TechIcon({ name, size = 18, className = '' }) {
  const [imgError, setImgError] = useState(false)
  const normalized = normalizeSkillName(name)
  const iconKey = NAME_MAP[normalized] || normalized.replace(/[^a-z0-9]/g, '')
  const iconUrl = ICON_URLS[iconKey] || ICON_URLS[NAME_MAP[normalized]]

  // If there's an image URL and it hasn't errored, display the PNG image icon
  if (iconUrl && !imgError) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
        title={name}
      >
        <img
          src={iconUrl}
          alt={name}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain"
        />
      </span>
    )
  }

  // Fallback badge for custom / unknown technologies: clean monogram badge without SVG
  const label = (name || '?').trim().slice(0, 2).toUpperCase()
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-accent)] font-semibold select-none ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(9, Math.floor(size * 0.55)) }}
      title={name}
    >
      {label}
    </span>
  )
}
