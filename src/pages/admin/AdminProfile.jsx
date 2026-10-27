import { useState, useEffect } from 'react'
import { profileService } from '../../components/services/api'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'
import PhotoUpload from '../../components/Elements/PhotoUpload'
import SkillInput from '../../components/Elements/SkillInput'

export default function AdminProfile() {
  const [data, setData] = useState({
    name: '',
    role: '',
    short_description: '',
    about: '',
    skills: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  useEffect(() => {
    profileService
      .get()
      .then((d) =>
        setData({
          name: d.name ?? '',
          role: d.role ?? '',
          short_description: d.short_description ?? '',
          about: d.about ?? '',
          skills: d.skills ?? [],
        })
      )
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [])

  const handlePhotoSelect = (file) => {
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

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
        <PhotoUpload preview={photoPreview} onFileChange={handlePhotoSelect} />

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

        <SkillInput
          value={data.skills}
          onChange={(skills) => setData((d) => ({ ...d, skills }))}
        />

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
