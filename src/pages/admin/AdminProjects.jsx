import { useState, useEffect, useRef } from 'react'
import { projectService } from '../../components/services/api'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'
import EmptyState from '../../components/Elements/EmptyState'
import { FolderKanban, Pencil, Trash2, Plus, X, Upload } from 'lucide-react'

const TECH_OPTIONS = ['React', 'Vue', 'Next.js', 'Laravel', 'Node.js', 'Express', 'Python', 'Flutter', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase']

const EMPTY_FORM = {
  name: '', description: '', category: '', tech_stack: [], images: [],
  demo_url: '', github_url: '', optional_info: [],
}

export default function AdminProjects() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState(null)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [techInput, setTechInput] = useState('')
  const imagesRef = useRef()

  const fetchData = () => {
    projectService.list().then(setItems).finally(() => setLoading(false))
  }
  useEffect(() => { fetchData() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); setStatus(null) }
  const openEdit = (item) => {
    setForm({
      name: item.name, description: item.description, category: item.category,
      tech_stack: item.tech_stack ?? [], images: item.images ?? [],
      demo_url: item.demo_url ?? '', github_url: item.github_url ?? '',
      optional_info: item.optional_info ?? [],
    })
    setEditId(item.id)
    setShowForm(true)
    setStatus(null)
  }

  const addTech = (val) => {
    const v = val.trim()
    if (v && !form.tech_stack.includes(v)) setForm((f) => ({ ...f, tech_stack: [...f.tech_stack, v] }))
    setTechInput('')
  }
  const removeTech = (t) => setForm((f) => ({ ...f, tech_stack: f.tech_stack.filter((x) => x !== t) }))

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploadingImages(true)
    try {
      const urls = await projectService.uploadImages(files)
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }))
    } catch {
      setStatus('Upload gambar gagal.')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (url) => setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }))

  const addOptionalInfo = () =>
    setForm((f) => ({ ...f, optional_info: [...f.optional_info, { title: '', description: '' }] }))

  const updateOptionalInfo = (i, field, val) =>
    setForm((f) => ({
      ...f,
      optional_info: f.optional_info.map((sec, idx) => idx === i ? { ...sec, [field]: val } : sec),
    }))

  const removeOptionalInfo = (i) =>
    setForm((f) => ({ ...f, optional_info: f.optional_info.filter((_, idx) => idx !== i) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) await projectService.update(editId, form)
      else await projectService.create(form)
      setShowForm(false)
      fetchData()
    } catch {
      setStatus('Gagal menyimpan.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus projek ini?')) return
    await projectService.remove(id)
    fetchData()
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Projek</h1>
        <Button id="admin-project-add" variant="primary" size="sm" onClick={openAdd}>
          <Plus size={15} /> Tambah
        </Button>
      </div>

      {loading && <LoadingSpinner text="Memuat projek..." />}
      {!loading && items.length === 0 && !showForm && (
        <EmptyState icon={FolderKanban} message="Belum ada projek." />
      )}
      {!loading && items.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div>
                <p className="font-medium text-sm text-[var(--color-text-primary)]">{item.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.category}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button id={`edit-proj-${item.id}`} onClick={() => openEdit(item)} aria-label="Edit" className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><Pencil size={15} /></button>
                <button id={`delete-proj-${item.id}`} onClick={() => handleDelete(item.id)} aria-label="Hapus" className="p-1.5 text-[var(--color-text-muted)] hover:text-red-400"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <form id="admin-project-form" onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm text-[var(--color-text-primary)]">{editId ? 'Edit Projek' : 'Tambah Projek'}</p>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Tutup" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><X size={16} /></button>
          </div>

          <FormField id="proj-name" label="Nama Projek" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <FormField id="proj-desc" label="Deskripsi" multiline rows={3} required value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <FormField id="proj-category" label="Kategori" placeholder="cth: Website, Mobile App" required value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
          <FormField id="proj-github" label="Link Repository GitHub" type="url" value={form.github_url} onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))} />
          <FormField id="proj-demo" label="Link Demo" type="url" value={form.demo_url} onChange={(e) => setForm((f) => ({ ...f, demo_url: e.target.value }))} />

          {/* Tech stack */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Teknologi</label>
            <div className="flex gap-2">
              <select
                id="proj-tech-select"
                className="flex-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                value=""
                onChange={(e) => e.target.value && addTech(e.target.value)}
              >
                <option value="">Pilih teknologi...</option>
                {TECH_OPTIONS.filter((t) => !form.tech_stack.includes(t)).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <input
                id="proj-tech-custom"
                type="text"
                placeholder="Atau ketik sendiri..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech(techInput))}
                className="flex-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              />
              <Button type="button" variant="secondary" size="sm" onClick={() => addTech(techInput)}><Plus size={14} /></Button>
            </div>
            {form.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tech_stack.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} aria-label={`Hapus ${t}`} className="hover:text-red-400"><X size={11} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Gambar Projek</label>
            <input ref={imagesRef} type="file" accept="image/*" multiple className="hidden" id="proj-images-upload" onChange={handleImageUpload} />
            <Button type="button" variant="secondary" size="sm" onClick={() => imagesRef.current?.click()} disabled={uploadingImages}>
              <Upload size={14} /> {uploadingImages ? 'Mengupload...' : 'Upload Gambar'}
            </Button>
            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {form.images.map((url) => (
                  <div key={url} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[var(--color-border)]">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      aria-label="Hapus gambar"
                      className="absolute top-0.5 right-0.5 bg-black/70 rounded-full p-0.5 text-white hover:bg-red-600"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optional info sections */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Informasi Tambahan (opsional)</label>
              <Button type="button" variant="ghost" size="sm" onClick={addOptionalInfo}><Plus size={14} /> Tambah Bagian</Button>
            </div>
            {form.optional_info.map((sec, i) => (
              <div key={i} className="flex flex-col gap-2 p-3 rounded-lg border border-[var(--color-border)] relative">
                <button type="button" onClick={() => removeOptionalInfo(i)} aria-label="Hapus bagian" className="absolute top-2 right-2 text-[var(--color-text-muted)] hover:text-red-400"><X size={13} /></button>
                <FormField id={`optional-title-${i}`} label="Judul" value={sec.title} onChange={(e) => updateOptionalInfo(i, 'title', e.target.value)} />
                <FormField id={`optional-desc-${i}`} label="Deskripsi" multiline rows={2} value={sec.description} onChange={(e) => updateOptionalInfo(i, 'description', e.target.value)} />
              </div>
            ))}
          </div>

          {status && <p className="text-sm text-red-400">{status}</p>}
          <Button id="admin-project-save" type="submit" variant="primary" size="sm" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
        </form>
      )}
    </div>
  )
}
