import { Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './AuthContext'
import { analyticsService } from '../services/analyticsService'
import LoadingSpinner from '../Elements/LoadingSpinner'

// Redirect ke /admin/login jika belum login
export default function ProtectedRoute({ children }) {
  const { session, isLoading } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // Rekam percobaan akses tidak terotorisasi ke rute admin yang diproteksi
    if (!isLoading && !session) {
      analyticsService.trackVisit(location.pathname)
    }
  }, [isLoading, session, location.pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-base)] flex items-center justify-center">
        <LoadingSpinner text="Memeriksa sesi..." />
      </div>
    )
  }

  if (!session) {
    // Pastikan tracking rute yang dicoba tetap terekam sebelum redirect
    analyticsService.trackVisit(location.pathname)
    return <Navigate to="/admin/login" replace />
  }

  return children
}
