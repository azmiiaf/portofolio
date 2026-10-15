import { useState, useEffect, useRef } from 'react'
import { certificationService } from '../../components/services/api'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'
import EmptyState from '../../components/Elements/EmptyState'
import { Award, Pencil, Trash2, Plus, X, Upload } from 'lucide-react'

const EMPTY_FORM = { name: '', issuer: '', year_issued: '', year_expires: '', file_url: '' }

export default function AdminCertifications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  const fetchData = () => {
    certificationService.list().then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { fetchData() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); setStatus(null) }
  const openEdit = (item) => {
    setForm({ name: item.name, issuer: item.issuer, year_issued: item.year_issued, year_expires: item.year_expires ?? '', file_url: item.file_url ?? '' })
    setEditId(item.id)
    setShowForm(true)
    setStatus(null)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await certificationService.uploadFile(file)
      setForm((f) => ({ ...f, file_url: url }))
    } catch {
      setStatus('Upload gagal.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) await certificationService.update(editId, form)
      else await certificationService.create(form)
      setShowForm(false)
      fetchData()
    } catch {
      setStatus('Gagal menyimpan.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus sertifikasi ini?')) return
    await certificationService.remove(id)
    fetchData()
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Lisensi & Sertifikasi</h1>
        <Button id="admin-cert-add" variant="primary" size="sm" onClick={openAdd}>
          <Plus size={15} /> Tambah
        </Button>
      </div>

      {loading && <LoadingSpinner text="Memuat sertifikasi..." />}
      {!loading && items.length === 0 && !showForm && (
        <EmptyState icon={Award} message="Belum ada sertifikasi." />
      )}
      {!loading && items.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div>
                <p className="font-medium text-sm text-[var(--color-text-primary)]">{item.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.issuer}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {item.year_issued} {item.year_expires ? `— ${item.year_expires}` : ''}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button id={`edit-cert-${item.id}`} onClick={() => openEdit(item)} aria-label="Edit" className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><Pencil size={15} /></button>
                <button id={`delete-cert-${item.id}`} onClick={() => handleDelete(item.id)} aria-label="Hapus" className="p-1.5 text-[var(--color-text-muted)] hover:text-red-400"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <form id="admin-cert-form" onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm text-[var(--color-text-primary)]">{editId ? 'Edit Sertifikasi' : 'Tambah Sertifikasi'}</p>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Tutup" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><X size={16} /></button>
          </div>
          <FormField id="cert-name" label="Nama Sertifikat" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <FormField id="cert-issuer" label="Penerbit" required value={form.issuer} onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <FormField id="cert-year-issued" label="Tahun Terbit" type="number" required value={form.year_issued} onChange={(e) => setForm((f) => ({ ...f, year_issued: e.target.value }))} />
            <FormField id="cert-year-expires" label="Tahun Expire" type="number" placeholder="Kosongkan jika selamanya" value={form.year_expires} onChange={(e) => setForm((f) => ({ ...f, year_expires: e.target.value }))} />
          </div>

          {/* File upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">File Sertifikat (PDF / Gambar)</label>
            <div className="flex gap-2 items-center">
              <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" id="cert-file-upload" onChange={handleFileUpload} />
              <Button type="button" variant="secondary" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
                <Upload size={14} /> {uploading ? 'Mengupload...' : 'Upload File'}
              </Button>
              {form.file_url && (
                <a href={form.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-accent)] hover:underline">
                  Lihat file
                </a>
              )}
            </div>
          </div>

          {status && <p className="text-sm text-red-400">{status}</p>}
          <Button id="admin-cert-save" type="submit" variant="primary" size="sm" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
        </form>
      )}
    </div>
  )
}
