import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { AuthProvider } from './components/Layout/AuthContext'
import ProtectedRoute from './components/Layout/ProtectedRoute'
import PublicLayout from './components/Layout/PublicLayout'
import AdminLayout from './components/Layout/AdminLayout'

import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import LoginPage from './pages/admin/LoginPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProfile from './pages/admin/AdminProfile'
import AdminEducation from './pages/admin/AdminEducation'
import AdminCertifications from './pages/admin/AdminCertifications'
import AdminProjects from './pages/admin/AdminProjects'
import AdminExperience from './pages/admin/AdminExperience'
import AdminContact from './pages/admin/AdminContact'
import AdminLogs from './pages/admin/AdminLogs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects/:id', element: <ProjectDetailPage /> },
    ],
  },
  {
    // Halaman login — tidak perlu auth
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    // Semua halaman admin — wajib login
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
