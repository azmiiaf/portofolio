import { useState, useEffect } from 'react'
import { educationService } from '../../components/services/api'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'
import EmptyState from '../../components/Elements/EmptyState'
import { GraduationCap, Pencil, Trash2, Plus, X } from 'lucide-react'

const EMPTY_FORM = { institution: '', degree: '', year_start: '', year_end: '', description: '' }

export default function AdminEducation() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState(null)

  const fetchData = () => {
    educationService.list().then(setItems).finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); setStatus(null) }
  const openEdit = (item) => {
    setForm({ institution: item.institution, degree: item.degree, year_start: item.year_start, year_end: item.year_end ?? '', description: item.description ?? '' })
    setEditId(item.id)
    setShowForm(true)
    setStatus(null)
  }
  const closeForm = () => setShowForm(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) await educationService.update(editId, form)
      else await educationService.create(form)
      setShowForm(false)
      fetchData()
    } catch {
      setStatus('Gagal menyimpan data.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data pendidikan ini?')) return
    await educationService.remove(id)
    fetchData()
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Pendidikan</h1>
        <Button id="admin-education-add" variant="primary" size="sm" onClick={openAdd}>
          <Plus size={15} /> Tambah
        </Button>
      </div>

      {loading && <LoadingSpinner text="Memuat pendidikan..." />}
      {!loading && items.length === 0 && !showForm && (
        <EmptyState icon={GraduationCap} message="Belum ada data pendidikan. Klik Tambah untuk mulai." />
      )}
      {!loading && items.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
            >
              <div>
                <p className="font-medium text-sm text-[var(--color-text-primary)]">{item.institution}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.degree}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.year_start}{item.year_end ? ` — ${item.year_end}` : ''}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button id={`edit-edu-${item.id}`} onClick={() => openEdit(item)} aria-label="Edit" className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><Pencil size={15} /></button>
                <button id={`delete-edu-${item.id}`} onClick={() => handleDelete(item.id)} aria-label="Hapus" className="p-1.5 text-[var(--color-text-muted)] hover:text-red-400"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <form id="admin-education-form" onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm text-[var(--color-text-primary)]">{editId ? 'Edit Pendidikan' : 'Tambah Pendidikan'}</p>
            <button type="button" onClick={closeForm} aria-label="Tutup" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><X size={16} /></button>
          </div>
          <FormField id="edu-institution" label="Institusi" required value={form.institution} onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))} />
          <FormField id="edu-degree" label="Jurusan / Gelar" required value={form.degree} onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <FormField id="edu-year-start" label="Tahun Mulai" type="number" required value={form.year_start} onChange={(e) => setForm((f) => ({ ...f, year_start: e.target.value }))} />
            <FormField id="edu-year-end" label="Tahun Selesai" type="number" placeholder="Kosongkan jika masih" value={form.year_end} onChange={(e) => setForm((f) => ({ ...f, year_end: e.target.value }))} />
          </div>
          <FormField id="edu-description" label="Deskripsi" multiline rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          {status && <p className="text-sm text-red-400">{status}</p>}
          <Button id="admin-education-save" type="submit" variant="primary" size="md" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
        </form>
      )}
    </div>
  )
}
