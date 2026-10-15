import { useState, useEffect } from 'react'
import { experienceService } from '../../components/services/api'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'
import EmptyState from '../../components/Elements/EmptyState'
import { Briefcase, Pencil, Trash2, Plus, X } from 'lucide-react'

const EMPTY_FORM = { name: '', type: '', year_start: '', year_end: '', description: '' }

export default function AdminExperience() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState(null)

  const fetchData = () => {
    experienceService.list().then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { fetchData() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); setStatus(null) }
  const openEdit = (item) => {
    setForm({ name: item.name, type: item.type, year_start: item.year_start, year_end: item.year_end ?? '', description: item.description ?? '' })
    setEditId(item.id)
    setShowForm(true)
    setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) await experienceService.update(editId, form)
      else await experienceService.create(form)
      setShowForm(false)
      fetchData()
    } catch {
      setStatus('Gagal menyimpan.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus experience ini?')) return
    await experienceService.remove(id)
    fetchData()
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Experience</h1>
        <Button id="admin-exp-add" variant="primary" size="sm" onClick={openAdd}>
          <Plus size={15} /> Tambah
        </Button>
      </div>

      {loading && <LoadingSpinner text="Memuat experience..." />}
      {!loading && items.length === 0 && !showForm && (
        <EmptyState icon={Briefcase} message="Belum ada data experience." />
      )}
      {!loading && items.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div>
                <p className="font-medium text-sm text-[var(--color-text-primary)]">{item.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.type}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {item.year_start}{item.year_end ? ` — ${item.year_end}` : ' — Sekarang'}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button id={`edit-exp-${item.id}`} onClick={() => openEdit(item)} aria-label="Edit" className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><Pencil size={15} /></button>
                <button id={`delete-exp-${item.id}`} onClick={() => handleDelete(item.id)} aria-label="Hapus" className="p-1.5 text-[var(--color-text-muted)] hover:text-red-400"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <form id="admin-exp-form" onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm text-[var(--color-text-primary)]">{editId ? 'Edit Experience' : 'Tambah Experience'}</p>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Tutup" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><X size={16} /></button>
          </div>
          <FormField id="exp-name" label="Nama Pengalaman" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <FormField id="exp-type" label="Tipe Pengalaman" placeholder="cth: Magang, Projek Mandiri" required value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <FormField id="exp-year-start" label="Tahun Mulai" type="number" required value={form.year_start} onChange={(e) => setForm((f) => ({ ...f, year_start: e.target.value }))} />
            <FormField id="exp-year-end" label="Tahun Selesai" type="number" placeholder="Kosongkan jika masih" value={form.year_end} onChange={(e) => setForm((f) => ({ ...f, year_end: e.target.value }))} />
          </div>
          <FormField id="exp-desc" label="Deskripsi Pekerjaan" multiline rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          {status && <p className="text-sm text-red-400">{status}</p>}
          <Button id="admin-exp-save" type="submit" variant="primary" size="sm" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
        </form>
      )}
    </div>
  )
}
