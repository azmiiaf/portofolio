import { supabase } from './supabase'

// Guard: jika supabase null (env belum dikonfigurasi), lempar error yang bisa di-catch
const guard = () => {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi. Isi file .env terlebih dahulu.')
}

export const profileService = {
  async get() {
    guard()
    // maybeSingle() returns null (not error) when no row exists yet
    const { data, error } = await supabase.from('profile').select('*').maybeSingle()
    if (error) throw error
    return data
  },

  async upsert(payload) {
    guard()
    // First get existing row id so upsert targets the right row
    const existing = await profileService.get()
    const row = existing ? { ...payload, id: existing.id } : payload
    const { data, error } = await supabase.from('profile').upsert(row).select().single()
    if (error) throw error
    return data
  },

  async uploadPhoto(file) {
    guard()
    const ext = file.name.split('.').pop()
    const fileName = `profile-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('portofolio').upload(`photos/${fileName}`, file, { upsert: true })
    if (error) throw new Error(error.message || error.error || JSON.stringify(error))
    const { data } = supabase.storage.from('portofolio').getPublicUrl(`photos/${fileName}`)
    return data.publicUrl
  },
}

export const educationService = {
  async list() {
    guard()
    const { data, error } = await supabase.from('education').select('*').order('year_start', { ascending: false })
    if (error) throw error
    return data
  },

  async create(payload) {
    guard()
    const { data, error } = await supabase.from('education').insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    guard()
    const { data, error } = await supabase.from('education').update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async remove(id) {
    guard()
    const { error } = await supabase.from('education').delete().eq('id', id)
    if (error) throw error
  },
}

export const certificationService = {
  async list() {
    guard()
    const { data, error } = await supabase.from('certifications').select('*').order('year_issued', { ascending: false })
    if (error) throw error
    return data
  },

  async create(payload) {
    guard()
    const { data, error } = await supabase.from('certifications').insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    guard()
    const { data, error } = await supabase.from('certifications').update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async remove(id) {
    guard()
    const { error } = await supabase.from('certifications').delete().eq('id', id)
    if (error) throw error
  },

  async uploadFile(file) {
    guard()
    const ext = file.name.split('.').pop()
    const fileName = `cert-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('portofolio').upload(`certifications/${fileName}`, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from('portofolio').getPublicUrl(`certifications/${fileName}`)
    return data.publicUrl
  },
}

export const projectService = {
  async list() {
    guard()
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id) {
    guard()
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
    if (error) throw error
    return data
  },

  async create(payload) {
    guard()
    const { data, error } = await supabase.from('projects').insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    guard()
    const { data, error } = await supabase.from('projects').update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async remove(id) {
    guard()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
  },

  async uploadImages(files) {
    guard()
    const urls = []
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const fileName = `project-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('portofolio').upload(`projects/${fileName}`, file, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from('portofolio').getPublicUrl(`projects/${fileName}`)
      urls.push(data.publicUrl)
    }
    return urls
  },
}

export const experienceService = {
  async list() {
    guard()
    const { data, error } = await supabase.from('experience').select('*').order('year_start', { ascending: false })
    if (error) throw error
    return data
  },

  async create(payload) {
    guard()
    const { data, error } = await supabase.from('experience').insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    guard()
    const { data, error } = await supabase.from('experience').update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async remove(id) {
    guard()
    const { error } = await supabase.from('experience').delete().eq('id', id)
    if (error) throw error
  },
}

export const contactService = {
  async get() {
    guard()
    // maybeSingle() returns null (not error) when no row exists yet
    const { data, error } = await supabase.from('contact').select('*').maybeSingle()
    if (error) throw error
    return data
  },

  async upsert(payload) {
    guard()
    // First get existing row id so upsert targets the right row
    const existing = await contactService.get()
    const row = existing ? { ...payload, id: existing.id } : payload
    const { data, error } = await supabase.from('contact').upsert(row).select().single()
    if (error) throw error
    return data
  },
}
