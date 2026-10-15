import { useState, useEffect } from 'react'
import { contactService } from '../../components/services/api'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'

export default function AdminContact() {
  const [form, setForm] = useState({ email: '', github: '', linkedin: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    contactService.get()
      .then((d) => setForm({ email: d.email ?? '', github: d.github ?? '', linkedin: d.linkedin ?? '' }))
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      await contactService.upsert(form)
      setStatus({ ok: true, msg: 'Kontak berhasil disimpan.' })
    } catch {
      setStatus({ ok: false, msg: 'Gagal menyimpan. Coba lagi.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner text="Memuat kontak..." />

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Kontak</h1>

      <form id="admin-contact-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField
          id="contact-email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <FormField
          id="contact-github"
          label="URL GitHub"
          type="url"
          placeholder="https://github.com/username"
          value={form.github}
          onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
        />
        <FormField
          id="contact-linkedin"
          label="URL LinkedIn"
          type="url"
          placeholder="https://linkedin.com/in/username"
          value={form.linkedin}
          onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
        />

        {status && (
          <p className={`text-sm ${status.ok ? 'text-[var(--color-accent)]' : 'text-red-400'}`}>
            {status.msg}
          </p>
        )}

        <div>
          <Button id="admin-contact-save" type="submit" variant="primary" disabled={saving}>
            {saving ? 'Menyimpan...' : 'Simpan Kontak'}
          </Button>
        </div>
      </form>
    </div>
  )
}
