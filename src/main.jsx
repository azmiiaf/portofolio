import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import './index.css'

import { AuthProvider, useAuth } from './components/Layout/AuthContext'
import { analyticsService } from './components/services/analyticsService'
import ProtectedRoute from './components/Layout/ProtectedRoute'
import PublicLayout from './components/Layout/PublicLayout'
import AdminLayout from './components/Layout/AdminLayout'

import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import LoginPage from './pages/admin/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProfile from './pages/admin/AdminProfile'
import AdminEducation from './pages/admin/AdminEducation'
import AdminCertifications from './pages/admin/AdminCertifications'
import AdminProjects from './pages/admin/AdminProjects'
import AdminExperience from './pages/admin/AdminExperience'
import AdminContact from './pages/admin/AdminContact'
import AdminLogs from './pages/admin/AdminLogs'

// Global tracker layout: tracks all unauthenticated visitor routes anywhere on the site
function GlobalTrackerLayout() {
  const location = useLocation()
  const { session, isLoading } = useAuth()

  useEffect(() => {
    // Rekam jejak pengunjung unauthenticated di semua rute
    if (!isLoading && !session) {
      analyticsService.trackVisit(location.pathname)
    }
  }, [location.pathname, session, isLoading])

  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <GlobalTrackerLayout />,
    children: [
      {
        path: '/',
        element: <PublicLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'projects/:id', element: <ProjectDetailPage /> },
        ],
      },
      {
        // Halaman login: publik, tidak perlu auth
        path: '/admin/login',
        element: <LoginPage />,
      },
      {
        // Rute panel admin: terproteksi auth
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'profile', element: <AdminProfile /> },
          { path: 'education', element: <AdminEducation /> },
          { path: 'certifications', element: <AdminCertifications /> },
          { path: 'projects', element: <AdminProjects /> },
          { path: 'experience', element: <AdminExperience /> },
          { path: 'contact', element: <AdminContact /> },
          { path: 'logs', element: <AdminLogs /> },
        ],
      },
      {
        // Rute penangkap semua path lain (404)
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
