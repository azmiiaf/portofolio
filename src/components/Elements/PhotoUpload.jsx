import { useRef } from 'react'
import Button from './Button'
import { Upload } from 'lucide-react'

export default function PhotoUpload({ preview, onFileChange }) {
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileChange(file)
    }
  }

  return (
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Preview foto" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-[var(--color-text-muted)]">Foto</span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        id="admin-photo-upload"
        onChange={handleChange}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={14} /> Upload Foto
      </Button>
    </div>
  )
}
