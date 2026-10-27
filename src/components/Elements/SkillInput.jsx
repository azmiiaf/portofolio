import { useState, useEffect, useRef, useMemo } from 'react'
import TechIcon from './TechIcon'
import { PRESET_SKILLS } from '../../constants/skillsData'
import Button from './Button'
import { Plus, X, ChevronDown, Check } from 'lucide-react'

export default function SkillInput({ value = [], onChange }) {
  const [newSkill, setNewSkill] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [customSkills, setCustomSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('custom_skills')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const allAvailableSkills = useMemo(() => {
    const set = new Set([...PRESET_SKILLS, ...customSkills, ...value])
    return Array.from(set)
  }, [customSkills, value])

  const filteredSkills = useMemo(() => {
    const q = newSkill.trim().toLowerCase()
    if (!q) return allAvailableSkills
    return allAvailableSkills.filter((s) => s.toLowerCase().includes(q))
  }, [allAvailableSkills, newSkill])

  const isExactMatch = useMemo(() => {
    const q = newSkill.trim().toLowerCase()
    if (!q) return true
    return allAvailableSkills.some((s) => s.toLowerCase() === q)
  }, [allAvailableSkills, newSkill])

  const handleAddSkill = (skillToAdd) => {
    const s = (skillToAdd !== undefined ? skillToAdd : newSkill).trim()
    if (!s) return

    if (!value.includes(s)) {
      onChange?.([...value, s])
    }

    const exists = allAvailableSkills.some((item) => item.toLowerCase() === s.toLowerCase())
    if (!exists) {
      const updated = [...customSkills, s]
      setCustomSkills(updated)
      try {
        localStorage.setItem('custom_skills', JSON.stringify(updated))
      } catch {
        // ignore storage error
      }
    }

    setNewSkill('')
    setIsDropdownOpen(false)
  }

  const handleRemoveSkill = (skillToRemove) => {
    onChange?.(value.filter((s) => s !== skillToRemove))
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--color-text-secondary)]">Keahlian</label>
      <div ref={dropdownRef} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]">
              {newSkill.trim() ? (
                <TechIcon name={newSkill} size={18} />
              ) : (
                <span className="w-4 h-4 rounded border border-dashed border-[var(--color-border)] block" />
              )}
            </div>
            <input
              id="admin-skill-input"
              type="text"
              placeholder="Pilih dari dropdown atau ketik keahlian baru..."
              value={newSkill}
              autoComplete="off"
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setNewSkill(e.target.value)
                setIsDropdownOpen(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsDropdownOpen(false)
                } else if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddSkill(newSkill)
                }
              }}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg pl-10 pr-10 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label="Buka pilihan keahlian"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1"
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="md"
            aria-label="Tambah keahlian"
            onClick={() => handleAddSkill(newSkill)}
          >
            <Plus size={15} />
          </Button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute z-30 left-0 right-14 mt-1.5 max-h-60 overflow-y-auto rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-1.5 focus:outline-none"
            role="listbox"
          >
            {/* Real-time add option for custom typed skill */}
            {newSkill.trim() && !isExactMatch && (
              <button
                type="button"
                onClick={() => handleAddSkill(newSkill)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm text-[var(--color-accent)] bg-[var(--color-surface-2)] hover:bg-[var(--color-border)]/60 transition-colors mb-1"
              >
                <span className="flex items-center gap-2.5">
                  <TechIcon name={newSkill} size={16} />
                  <span>
                    Tambah <strong className="text-white">"{newSkill.trim()}"</strong>
                  </span>
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                  Keahlian Baru
                </span>
              </button>
            )}

            {/* Filtered skill list */}
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => {
                const isAdded = value.includes(skill)
                return (
                  <button
                    key={skill}
                    type="button"
                    disabled={isAdded}
                    onClick={() => handleAddSkill(skill)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      isAdded
                        ? 'opacity-40 cursor-not-allowed bg-transparent text-[var(--color-text-muted)]'
                        : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] hover:text-white cursor-pointer'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <TechIcon name={skill} size={16} />
                      <span>{skill}</span>
                    </span>
                    {isAdded && (
                      <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                        <Check size={13} /> Ditambahkan
                      </span>
                    )}
                  </button>
                )
              })
            ) : (
              !newSkill.trim() && (
                <div className="px-3 py-3 text-xs text-center text-[var(--color-text-muted)]">
                  Tidak ada opsi keahlian.
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Active Skills Badges */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] hover:border-[var(--color-border-light)] transition-colors"
            >
              <TechIcon name={s} size={14} />
              <span>{s}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(s)}
                aria-label={`Hapus keahlian ${s}`}
                className="text-[var(--color-text-muted)] hover:text-red-400 transition-colors p-0.5 rounded"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
