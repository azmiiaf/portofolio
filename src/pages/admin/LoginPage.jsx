import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../components/services/authService'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await authService.signIn(form.email, form.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message ?? 'Login gagal. Periksa email dan password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-base)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <p className="section-tag mb-2">Admin</p>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Masuk ke Panel</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Gunakan akun Supabase yang telah dikonfigurasi.
          </p>
        </div>

        {/* Form */}
        <form
          id="admin-login-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          <FormField
            id="login-email"
            label="Email"
            type="email"
            placeholder="admin@email.com"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <FormField
            id="login-password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <Button
            id="login-submit"
            type="submit"
            variant="primary"
            className="w-full justify-center mt-1"
            disabled={loading}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </Button>
        </form>
      </div>
    </div>
  )
}
