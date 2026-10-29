import { useState, useEffect, useMemo } from 'react'
import { analyticsService } from '../../components/services/analyticsService'
import VisitorChart from '../../components/Elements/VisitorChart'
import LoadingSpinner from '../../components/Elements/LoadingSpinner'
import EmptyState from '../../components/Elements/EmptyState'
import Button from '../../components/Elements/Button'
import {
  Activity,
  Users,
  Eye,
  Calendar,
  Globe,
  RefreshCw,
  Trash2,
  Search,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle2,
  Database,
} from 'lucide-react'

export default function AdminLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [deviceFilter, setDeviceFilter] = useState('ALL')
  const [showSqlInfo, setShowSqlInfo] = useState(false)
  const [clearing, setClearing] = useState(false)

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true)
    try {
      const data = await analyticsService.getLogs()
      setLogs(data || [])
    } catch {
      setLogs([])
    } finally {
      setLoading(false)
      if (isManual) setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Calculate real metrics from the logs
  const stats = useMemo(() => {
    const totalViews = logs.length
    const uniqueVisitors = new Set(logs.map((l) => l.visitor_id || l.id)).size

    const todayStr = new Date().toISOString().split('T')[0]
    const todayViews = logs.filter((l) => l.visited_at && l.visited_at.startsWith(todayStr)).length

    // Calculate top visited path
    const pathCounts = {}
    logs.forEach((l) => {
      const p = l.path || '/'
      pathCounts[p] = (pathCounts[p] || 0) + 1
    })
    let topPath = '/'
    let topPathCount = 0
    Object.entries(pathCounts).forEach(([path, count]) => {
      if (count > topPathCount) {
        topPath = path
        topPathCount = count
      }
    })

    return {
      totalViews,
      uniqueVisitors,
      todayViews,
      topPath,
      topPathCount,
    }
  }, [logs])

  // Filtered logs for the table
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        (log.path && log.path.toLowerCase().includes(q)) ||
        (log.browser && log.browser.toLowerCase().includes(q)) ||
        (log.os && log.os.toLowerCase().includes(q)) ||
        (log.referrer && log.referrer.toLowerCase().includes(q))

      const matchesDevice =
        deviceFilter === 'ALL' ||
        (log.device && log.device.toUpperCase() === deviceFilter)

      return matchesSearch && matchesDevice
    })
  }, [logs, searchQuery, deviceFilter])

  const handleClearLogs = async () => {
    if (!window.confirm('Yakin ingin menghapus seluruh log kunjungan?')) return
    setClearing(true)
    try {
      await analyticsService.clearLogs(logs)
      setLogs([])
    } catch (err) {
      console.error('Gagal membersihkan log:', err)
    } finally {
      setClearing(false)
    }
  }

  const getDeviceIcon = (device) => {
    if (device === 'Mobile') return <Smartphone size={14} className="text-amber-400" />
    if (device === 'Tablet') return <Tablet size={14} className="text-blue-400" />
    return <Monitor size={14} className="text-emerald-400" />
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const d = new Date(dateString)
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  if (loading) return <LoadingSpinner text="Memuat log pengunjung..." />

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Logs & Kunjungan
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Data statistik trafik dan aktivitas kunjungan ke portofolio Anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => loadData(true)}
            disabled={refreshing}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </Button>
          {logs.length > 0 && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClearLogs}
              disabled={clearing || refreshing}
              className="hover:text-red-400 hover:border-red-500/40"
            >
              <Trash2 size={14} className={clearing ? 'animate-spin' : ''} />
              {clearing ? 'Membersihkan...' : 'Bersihkan'}
            </Button>
          )}
        </div>
      </div>

      {/* Real Metric Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-1">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-medium">Total Kunjungan</span>
            <Eye size={16} className="text-[var(--color-accent)]" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">
            {stats.totalViews}
          </p>
          <span className="text-[11px] text-[var(--color-text-muted)]">Akumulasi seluruh tayangan</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-1">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-medium">Pengunjung Unik</span>
            <Users size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">
            {stats.uniqueVisitors}
          </p>
          <span className="text-[11px] text-[var(--color-text-muted)]">Berdasarkan ID perangkat</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-1">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-medium">Kunjungan Hari Ini</span>
            <Calendar size={16} className="text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">
            {stats.todayViews}
          </p>
          <span className="text-[11px] text-[var(--color-text-muted)]">Trafik 24 jam terakhir</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-1">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-medium">Halaman Utama</span>
            <Globe size={16} className="text-purple-400" />
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] mt-1 truncate" title={stats.topPath}>
            {stats.topPath}
          </p>
          <span className="text-[11px] text-[var(--color-text-muted)]">{stats.topPathCount} tayangan</span>
        </div>
      </div>

      {/* Traffic Chart */}
      <VisitorChart logs={logs} />

      {/* Visitor Logs Table Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Riwayat Log Kunjungan
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Menampilkan {filteredLogs.length} dari {logs.length} catatan log.
            </p>
          </div>

          {/* Search & Device Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                type="text"
                placeholder="Cari path, browser..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] w-48 sm:w-56 transition-colors"
              />
            </div>

            <div className="inline-flex rounded-lg bg-[var(--color-surface-2)] p-1 border border-[var(--color-border)]">
              {['ALL', 'DESKTOP', 'MOBILE'].map((dev) => (
                <button
                  key={dev}
                  type="button"
                  onClick={() => setDeviceFilter(dev)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                    deviceFilter === dev
                      ? 'bg-[var(--color-accent)] text-black font-medium'
                      : 'text-[var(--color-text-secondary)] hover:text-white'
                  }`}
                >
                  {dev === 'ALL' ? 'Semua' : dev === 'DESKTOP' ? 'Desktop' : 'Mobile'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table / Empty State */}
        {filteredLogs.length === 0 ? (
          <div className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <EmptyState
              icon={Activity}
              message={
                logs.length === 0
                  ? 'Belum ada log kunjungan. Buka halaman utama portofolio untuk mencatat kunjungan pertama.'
                  : 'Tidak ada log yang cocok dengan pencarian atau filter Anda.'
              }
            />
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--color-surface-2)] text-[var(--color-text-muted)] font-medium border-b border-[var(--color-border)]">
                  <tr>
                    <th className="px-4 py-3">Waktu</th>
                    <th className="px-4 py-3">Halaman</th>
                    <th className="px-4 py-3">Perangkat & OS</th>
                    <th className="px-4 py-3">Browser</th>
                    <th className="px-4 py-3">Sumber (Referrer)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filteredLogs.slice(0, 100).map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-[var(--color-surface-2)]/60 transition-colors"
                    >
                      <td className="px-4 py-3 text-[var(--color-text-secondary)] whitespace-nowrap">
                        {formatDate(log.visited_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">
                        <span className="px-2 py-0.5 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)] font-mono text-[11px]">
                          {log.path || '/'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                        <span className="inline-flex items-center gap-1.5">
                          {getDeviceIcon(log.device)}
                          <span>
                            {log.device} ({log.os})
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                        {log.browser || '-'}
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)] truncate max-w-xs">
                        {log.referrer || 'Langsung'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredLogs.length > 100 && (
              <div className="p-3 text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
                Menampilkan 100 log terbaru.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Supabase Cloud Table Setup Hint (Optional) */}
      <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-primary)]">
            <Database size={15} className="text-[var(--color-accent)]" />
            <span>Informasi Database Supabase (Opsional)</span>
          </div>
          <button
            type="button"
            onClick={() => setShowSqlInfo((prev) => !prev)}
            className="text-xs text-[var(--color-accent)] hover:underline"
          >
            {showSqlInfo ? 'Sembunyikan' : 'Lihat Skema SQL'}
          </button>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          Log saat ini otomatis tercatat dan tersimpan dengan aman di browser lokal Anda. Jika ingin log disinkronkan antar perangkat melalui Supabase, Anda dapat membuat tabel <code className="text-white">visitor_logs</code> di SQL Editor Supabase.
        </p>

        {showSqlInfo && (
          <pre className="p-3 mt-2 rounded-lg bg-[var(--color-base)] border border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)] overflow-x-auto font-mono">
{`-- Jalankan query ini di SQL Editor dashboard Supabase Anda:
CREATE TABLE IF NOT EXISTS visitor_logs (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  visited_at TIMESTAMPTZ DEFAULT NOW(),
  path TEXT NOT NULL,
  browser TEXT,
  os TEXT,
  device TEXT,
  referrer TEXT,
  visitor_id TEXT
);

-- Izinkan anonim membaca dan mencatat log kunjungan
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to visitor_logs" ON visitor_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read visitor_logs" ON visitor_logs FOR SELECT USING (true);
CREATE POLICY "Allow authenticated delete visitor_logs" ON visitor_logs FOR DELETE USING (true);`}
          </pre>
        )}
      </div>
    </div>
  )
}
