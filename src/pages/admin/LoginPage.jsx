import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../components/services/authService'
import {
  checkLoginRateLimit,
  recordLoginFailure,
  validateAndSanitizeEmail,
  validatePassword,
} from '../../components/services/security'
import FormField from '../../components/Elements/FormField'
import Button from '../../components/Elements/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lockoutSeconds, setLockoutSeconds] = useState(0)

  // Check rate limit on mount
  useEffect(() => {
    const status = checkLoginRateLimit()
    if (status.isLocked) {
      setLockoutSeconds(status.remainingSeconds)
    }
  }, [])

  // Countdown timer for lockout cooldown
  useEffect(() => {
    if (lockoutSeconds <= 0) return

    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setError(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [lockoutSeconds])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Bot Honeypot defense
    if (form.website) {
      // Silently discard automated bot submission
      setError('Akses ditolak.')
      return
    }

    // 2. Client-side rate limit defense
    const rateLimit = checkLoginRateLimit()
    if (rateLimit.isLocked) {
      setLockoutSeconds(rateLimit.remainingSeconds)
      setError(`Terlalu banyak percobaan gagal. Silakan tunggu ${rateLimit.remainingSeconds} detik.`)
      return
    }

    // 3. Email validation & sanitization
    const emailCheck = validateAndSanitizeEmail(form.email)
    if (!emailCheck.isValid) {
      setError(emailCheck.error)
      return
    }

    // 4. Password validation
    const passwordCheck = validatePassword(form.password)
    if (!passwordCheck.isValid) {
      setError(passwordCheck.error)
      return
    }

    setLoading(true)
    setError(null)

    try {
      await authService.signIn(emailCheck.sanitized, form.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      // Record failed attempt for rate limiting
      const failStatus = recordLoginFailure()
      if (failStatus.isLocked) {
        setLockoutSeconds(failStatus.remainingSeconds)
        setError(`Terlalu banyak percobaan gagal. Silakan tunggu ${failStatus.remainingSeconds} detik.`)
      } else {
        // Safe generic error: avoid leaking database internals or user existence
        const msg = err?.message || ''
        if (msg.includes('tidak aman') || msg.includes('minimal') || msg.includes('maksimal')) {
          setError(msg)
        } else if (msg.includes('belum dikonfigurasi')) {
          setError('Sistem otentikasi belum dikonfigurasi.')
        } else {
          setError('Email atau password tidak sesuai.')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const isLocked = lockoutSeconds > 0

  return (
    <div className="min-h-screen bg-[var(--color-base)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <p className="section-tag mb-2">Admin</p>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Masuk ke Panel</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Gunakan akun yang telah terdaftar pada sistem.
          </p>
        </div>

        {/* Form */}
        <form
          id="admin-login-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          {/* Honeypot field (hidden from real users, lures bots) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="login-website">Website</label>
            <input
              id="login-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            />
          </div>

          <FormField
            id="login-email"
            label="Email"
            type="email"
            placeholder="admin@email.com"
            required
            autoComplete="email"
            disabled={loading || isLocked}
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
            disabled={loading || isLocked}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />

          {isLocked && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex flex-col gap-1">
              <span className="font-semibold">Akses Terkunci Sementara</span>
              <span>
                Percobaan login dibatasi. Silakan tunggu{' '}
                <strong className="font-mono text-amber-200">{lockoutSeconds}</strong> detik.
              </span>
            </div>
          )}

          {error && !isLocked && (
            <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <Button
            id="login-submit"
            type="submit"
            variant="primary"
            className="w-full justify-center mt-1"
            disabled={loading || isLocked}
          >
            {loading ? 'Memeriksa...' : isLocked ? `Terkunci (${lockoutSeconds}s)` : 'Masuk'}
          </Button>
        </form>
      </div>
    </div>
  )
}
