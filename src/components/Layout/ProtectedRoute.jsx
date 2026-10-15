import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import LoadingSpinner from '../Elements/LoadingSpinner'

// Redirect ke /admin/login jika belum login
export default function ProtectedRoute({ children }) {
  const { session, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-base)] flex items-center justify-center">
        <LoadingSpinner text="Memeriksa sesi..." />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
