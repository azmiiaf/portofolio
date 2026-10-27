import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { profileService } from '../services/api'
import { analyticsService } from '../services/analyticsService'
import { useAuth } from './AuthContext'

export default function PublicLayout() {
  const [profile, setProfile] = useState(null)
  const location = useLocation()
  const { session, isLoading } = useAuth()

  useEffect(() => {
    profileService.get().then(setProfile).catch(() => null)
  }, [])

  useEffect(() => {
    // Hanya track jika proses loading auth selesai dan admin BELUM login
    if (!isLoading && !session) {
      analyticsService.trackVisit(location.pathname)
    }
  }, [location.pathname, session, isLoading])

  return (
    <div className="min-h-screen bg-[var(--color-base)]">
      <Navbar name={profile?.name} />
      <main>
        <Outlet context={{ profile }} />
      </main>
    </div>
  )
}
