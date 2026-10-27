import { supabase } from './supabase'

const STORAGE_KEY = 'porto_visitor_logs'
const VISITOR_ID_KEY = 'porto_visitor_uuid'
const LAST_VISIT_KEY = 'porto_last_visit_session'

// Generate or retrieve persistent anonymous visitor ID
function getVisitorId() {
  try {
    let vid = localStorage.getItem(VISITOR_ID_KEY)
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
      localStorage.setItem(VISITOR_ID_KEY, vid)
    }
    return vid
  } catch {
    return 'anonymous'
  }
}

// Detect simple browser and OS from userAgent
function parseUserAgent() {
  const ua = navigator.userAgent || ''
  let browser = 'Lainnya'
  let os = 'Lainnya'
  let device = 'Desktop'

  if (/Mobi|Android|iPhone|iPad/i.test(ua)) {
    device = /iPad|Tablet/i.test(ua) ? 'Tablet' : 'Mobile'
  }

  // OS detection
  if (/Windows/i.test(ua)) os = 'Windows'
  else if (/Macintosh|Mac OS/i.test(ua)) os = 'macOS'
  else if (/Linux/i.test(ua)) os = 'Linux'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'

  // Browser detection
  if (/Edg/i.test(ua)) browser = 'Edge'
  else if (/Chrome|CriOS/i.test(ua)) browser = 'Chrome'
  else if (/Firefox|FxiOS/i.test(ua)) browser = 'Firefox'
  else if (/Safari/i.test(ua)) browser = 'Safari'
  else if (/Opera|OPR/i.test(ua)) browser = 'Opera'

  return { browser, os, device }
}

export const analyticsService = {
  // Track a page view
  async trackVisit(path = window.location.pathname) {
    try {
      // Ignore admin page visits
      if (path.startsWith('/admin')) return

      // Ignore logged in admin
      if (supabase) {
        try {
          const { data } = await supabase.auth.getSession()
          if (data?.session) {
            return
          }
        } catch {
          // ignore session check error
        }
      }

      // Debounce: prevent duplicate logs if re-rendered or visited within 15 seconds
      const now = Date.now()
      const lastVisit = sessionStorage.getItem(LAST_VISIT_KEY)
      if (lastVisit) {
        try {
          const { lastPath, time } = JSON.parse(lastVisit)
          if (lastPath === path && now - time < 15000) {
            return
          }
        } catch {
          // ignore parsing error
        }
      }
      sessionStorage.setItem(LAST_VISIT_KEY, JSON.stringify({ lastPath: path, time: now }))

      const visitorId = getVisitorId()
      const { browser, os, device } = parseUserAgent()
      const referrer = document.referrer ? new URL(document.referrer).hostname : 'Langsung'

      const logEntry = {
        id: 'log_' + now + '_' + Math.random().toString(36).substring(2, 7),
        visited_at: new Date().toISOString(),
        path: path || '/',
        browser,
        os,
        device,
        referrer,
        visitor_id: visitorId,
      }

      // 1. Save to local storage cache immediately
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const localLogs = raw ? JSON.parse(raw) : []
        localLogs.unshift(logEntry)
        // Keep up to 500 recent logs locally
        if (localLogs.length > 500) localLogs.length = 500
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localLogs))
      } catch (err) {
        console.warn('Gagal menyimpan log lokal:', err)
      }

      // 2. Try to sync to Supabase if available
      if (supabase) {
        const payload = {
          path: logEntry.path,
          browser: logEntry.browser,
          os: logEntry.os,
          device: logEntry.device,
          referrer: logEntry.referrer,
          visitor_id: logEntry.visitor_id,
          visited_at: logEntry.visited_at,
        }

        // Try 'visitor_logs' or 'visitors_log'
        const res = await supabase.from('visitor_logs').insert([payload])
        if (res.error) {
          await supabase.from('visitors_log').insert([payload])
        }
      }
    } catch (err) {
      console.warn('Analytics trackVisit error:', err)
    }
  },

  // Get all visitor logs
  async getLogs() {
    let cloudLogs = null

    // Try Supabase first
    if (supabase) {
      try {
        let { data, error } = await supabase
          .from('visitor_logs')
          .select('*')
          .order('visited_at', { ascending: false })
          .limit(300)

        if (error || !data || data.length === 0) {
          const alt = await supabase
            .from('visitors_log')
            .select('*')
            .order('visited_at', { ascending: false })
            .limit(300)
          if (!alt.error && Array.isArray(alt.data) && alt.data.length > 0) {
            cloudLogs = alt.data
          }
        } else {
          cloudLogs = data
        }
      } catch {
        // fallback to local logs
      }
    }

    if (cloudLogs) {
      return cloudLogs
    }

    // Fallback to localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  },

  // Clear logs
  async clearLogs() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }

    if (supabase) {
      try {
        await supabase.from('visitor_logs').delete().neq('id', 0)
        await supabase.from('visitors_log').delete().neq('id', 0)
      } catch {
        // ignore
      }
    }
  },
}
