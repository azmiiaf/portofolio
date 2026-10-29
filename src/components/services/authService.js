import { supabase } from './supabase'
import {
  validateAndSanitizeEmail,
  validatePassword,
  recordLoginSuccess,
} from './security'

export const authService = {
  async signIn(email, password) {
    if (!supabase) throw new Error('Supabase belum dikonfigurasi.')

    const emailCheck = validateAndSanitizeEmail(email)
    if (!emailCheck.isValid) {
      throw new Error(emailCheck.error)
    }

    const passwordCheck = validatePassword(password)
    if (!passwordCheck.isValid) {
      throw new Error(passwordCheck.error)
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailCheck.sanitized,
      password,
    })
    if (error) throw error

    recordLoginSuccess()
    return data
  },

  async signOut() {
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    if (!supabase) return null
    const { data } = await supabase.auth.getSession()
    return data.session
  },

  onAuthStateChange(callback) {
    if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } }
    return supabase.auth.onAuthStateChange((_event, session) => callback(session))
  },
}
