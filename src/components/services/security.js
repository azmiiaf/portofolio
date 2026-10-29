// Security utilities: sanitization, validation, and anti-brute-force rate limiting

const RATE_LIMIT_KEY = 'porto_login_security'

// Sanitizes standard text input by removing control characters and limiting length
export function sanitizeText(val, maxLength = 255) {
  if (typeof val !== 'string') return ''
  return val
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength)
}

// Validates and sanitizes email input
// Blocks SQL injection patterns, script injection, and invalid formats
export function validateAndSanitizeEmail(rawEmail) {
  if (!rawEmail || typeof rawEmail !== 'string') {
    return { isValid: false, error: 'Email wajib diisi.', sanitized: '' }
  }

  const trimmed = rawEmail.trim().toLowerCase()

  // Length boundaries (RFC 5321 specifies maximum 254 characters)
  if (trimmed.length < 5 || trimmed.length > 254) {
    return { isValid: false, error: 'Panjang email tidak valid.', sanitized: '' }
  }

  // Detect dangerous injection characters and SQL/script patterns
  const dangerousPatterns = [
    /--/,
    /\/\*/,
    /\*\//,
    /;/,
    /'|"|`/,
    /<[^>]*>/,
    /\b(select|union|insert|delete|drop|update|exec|truncate)\b/i,
    /(\sor\s|\sand\s).*[=><]/i,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) {
      return {
        isValid: false,
        error: 'Input terdeteksi mengandung karakter tidak aman.',
        sanitized: '',
      }
    }
  }

  // Strict email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Format email tidak valid.', sanitized: '' }
  }

  return { isValid: true, error: null, sanitized: trimmed }
}

// Validates password input
// Enforces length boundaries to prevent DoS via excessive bcrypt calculation
export function validatePassword(rawPassword) {
  if (!rawPassword || typeof rawPassword !== 'string') {
    return { isValid: false, error: 'Password wajib diisi.' }
  }

  // Prevent null bytes
  if (rawPassword.includes('\0')) {
    return { isValid: false, error: 'Password tidak valid.' }
  }

  if (rawPassword.length < 6) {
    return { isValid: false, error: 'Password minimal 6 karakter.' }
  }

  // Bcrypt max length boundary protection (prevents CPU exhaustion attacks)
  if (rawPassword.length > 72) {
    return { isValid: false, error: 'Password maksimal 72 karakter.' }
  }

  return { isValid: true, error: null }
}

// Check client-side rate limit for login attempts
export function checkLoginRateLimit() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY)
    if (!raw) return { isLocked: false, remainingSeconds: 0 }

    const data = JSON.parse(raw)
    const now = Date.now()

    if (data.lockoutUntil && data.lockoutUntil > now) {
      const remainingSeconds = Math.ceil((data.lockoutUntil - now) / 1000)
      return { isLocked: true, remainingSeconds }
    }

    // Reset if lockout window has expired by more than 15 minutes
    if (data.lockoutUntil && now - data.lockoutUntil > 900000) {
      localStorage.removeItem(RATE_LIMIT_KEY)
      return { isLocked: false, remainingSeconds: 0 }
    }

    return { isLocked: false, remainingSeconds: 0 }
  } catch {
    return { isLocked: false, remainingSeconds: 0 }
  }
}

// Record a failed login attempt and apply cooldown when thresholds are reached
export function recordLoginFailure() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY)
    const data = raw ? JSON.parse(raw) : { count: 0, lockoutUntil: 0 }
    const count = (data.count || 0) + 1
    const now = Date.now()

    let cooldownSeconds = 0
    if (count >= 10) {
      cooldownSeconds = 300 // 5 minutes lockout
    } else if (count >= 7) {
      cooldownSeconds = 60 // 1 minute lockout
    } else if (count >= 5) {
      cooldownSeconds = 30 // 30 seconds lockout
    }

    const lockoutUntil = cooldownSeconds > 0 ? now + cooldownSeconds * 1000 : 0

    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({
        count,
        lockoutUntil,
        lastAttempt: now,
      })
    )

    return {
      isLocked: cooldownSeconds > 0,
      remainingSeconds: cooldownSeconds,
      attemptCount: count,
    }
  } catch {
    return { isLocked: false, remainingSeconds: 0, attemptCount: 1 }
  }
}

// Clear login attempt counters on successful authentication
export function recordLoginSuccess() {
  try {
    localStorage.removeItem(RATE_LIMIT_KEY)
  } catch {
    // ignore storage errors
  }
}

// Sanitize paths for visitor logging (prevent stored XSS or injection)
export function sanitizeLogPath(path) {
  if (typeof path !== 'string') return '/'
  const clean = path
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[<>"'`]/g, '')
    .trim()
    .slice(0, 200)

  return clean.startsWith('/') ? clean : '/' + clean
}
