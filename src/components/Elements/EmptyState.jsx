// EmptyState: displayed when a section has no data (R-27)
import { Inbox } from 'lucide-react'

export default function EmptyState({ message = 'Belum ada data.', icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-[var(--color-text-muted)]">
      <Icon size={36} strokeWidth={1.5} />
      <p className="text-sm">{message}</p>
    </div>
  )
}
