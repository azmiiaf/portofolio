import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { profileService } from '../services/api'

export default function PublicLayout() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    profileService.get().then(setProfile).catch(() => null)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-base)]">
      <Navbar name={profile?.name} />
      <main>
        <Outlet context={{ profile }} />
      </main>
    </div>
  )
}
