import { useState, useEffect, useRef } from 'react'
import { profileService } from '../../components/services/api'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'
import { Upload, Plus, X } from 'lucide-react'

export default function AdminProfile() {
  const [data, setData] = useState({
    name: '', role: '', short_description: '', about: '', skills: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [newSkill, setNewSkill] = useState('')
  const fileInputRef = useRef()

  useEffect(() => {
    profileService.get()
      .then((d) => setData({ name: d.name ?? '', role: d.role ?? '', short_description: d.short_description ?? '', about: d.about ?? '', skills: d.skills ?? [] }))
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const addSkill = () => {
    const s = newSkill.trim()
    if (s && !data.skills.includes(s)) {
      setData((d) => ({ ...d, skills: [...d.skills, s] }))
    }
    setNewSkill('')
  }

  const removeSkill = (s) =>
    setData((d) => ({ ...d, skills: d.skills.filter((x) => x !== s) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      let payload = { ...data }
      if (photoFile) {
        try {
          payload.photo_url = await profileService.uploadPhoto(photoFile)
        } catch (uploadErr) {
          // Tampilkan error upload yang spesifik agar mudah dideteksi
          const msg = uploadErr?.message || uploadErr?.error || JSON.stringify(uploadErr)
          setStatus({ ok: false, msg: `Gagal upload foto: ${msg}` })
          setSaving(false)
          return
        }
      }
      await profileService.upsert(payload)
      setStatus({ ok: true, msg: 'Profil berhasil disimpan.' })
    } catch (err) {
      const msg = err?.message || err?.error || JSON.stringify(err)
      setStatus({ ok: false, msg: `Gagal menyimpan: ${msg}` })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner text="Memuat profil..." />

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Profil</h1>

      <form id="admin-profile-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Photo */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview foto" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-[var(--color-text-muted)]">Foto</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="admin-photo-upload"
            onChange={handlePhotoChange}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} /> Upload Foto
          </Button>
        </div>

        <FormField
          id="admin-name"
          label="Nama"
          required
          value={data.name}
          onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
        />
        <FormField
          id="admin-role"
          label="Role"
          placeholder="cth: Fullstack Developer"
          required
          value={data.role}
          onChange={(e) => setData((d) => ({ ...d, role: e.target.value }))}
        />
        <FormField
          id="admin-short-desc"
          label="Deskripsi Singkat"
          multiline
          rows={2}
          value={data.short_description}
          onChange={(e) => setData((d) => ({ ...d, short_description: e.target.value }))}
        />
        <FormField
          id="admin-about"
          label="Tentang Diri"
          multiline
          rows={5}
          value={data.about}
          onChange={(e) => setData((d) => ({ ...d, about: e.target.value }))}
        />

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Keahlian</label>
          <div className="flex gap-2">
            <input
              id="admin-skill-input"
              type="text"
              placeholder="Tambah keahlian..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              className="flex-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <Button type="button" variant="secondary" size="md" onClick={addSkill}>
              <Plus size={15} />
            </Button>
          </div>
          {data.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSkill(s)}
                    aria-label={`Hapus keahlian ${s}`}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        {status && (
          <p className={`text-sm ${status.ok ? 'text-[var(--color-accent)]' : 'text-red-400'}`}>
            {status.msg}
          </p>
        )}

        <div>
          <Button
            id="admin-profile-save"
            type="submit"
            variant="primary"
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : 'Simpan Profil'}
          </Button>
        </div>
      </form>
    </div>
  )
}
