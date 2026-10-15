import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Jika env belum dikonfigurasi, tampilkan pesan dan buat client dummy
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Portofolio] Supabase belum dikonfigurasi. Salin .env.example ke .env dan isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.'
  )
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
