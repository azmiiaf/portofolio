import { Link } from 'react-router-dom'
import Button from '../components/Elements/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--color-base)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="section-tag mb-3">404 Error</p>
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
          Alamat yang Anda tuju tidak tersedia atau mungkin telah berpindah lokasi.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button variant="primary">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
