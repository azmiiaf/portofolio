import { useState, useMemo } from 'react'

export default function VisitorChart({ logs = [] }) {
  const [rangeDays, setRangeDays] = useState(7)
  const [hoveredBar, setHoveredBar] = useState(null)

  // Compute daily stats for the selected range
  const chartData = useMemo(() => {
    const days = []
    const now = new Date()

    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(now.getDate() - i)
      const dateKey = d.toISOString().split('T')[0] // YYYY-MM-DD
      const label = d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: rangeDays > 14 ? 'numeric' : 'short',
      })
      const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' })

      days.push({
        dateKey,
        label,
        dayName,
        visits: 0,
        uniqueVisitors: new Set(),
      })
    }

    // Populate counts from real logs
    logs.forEach((log) => {
      if (!log.visited_at) return
      const logDate = log.visited_at.split('T')[0]
      const match = days.find((item) => item.dateKey === logDate)
      if (match) {
        match.visits += 1
        if (log.visitor_id) {
          match.uniqueVisitors.add(log.visitor_id)
        }
      }
    })

    return days.map((item) => ({
      ...item,
      uniqueCount: item.uniqueVisitors.size,
    }))
  }, [logs, rangeDays])

  const maxVisits = useMemo(() => {
    const max = Math.max(...chartData.map((d) => d.visits), 0)
    return max > 0 ? max : 5
  }, [chartData])

  return (
    <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-6">
      {/* Chart Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Tren Kunjungan Harian
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Grafik frekuensi kunjungan portofolio dalam {rangeDays} hari terakhir.
          </p>
        </div>

        {/* Range Selector */}
        <div className="inline-flex items-center rounded-lg bg-[var(--color-surface-2)] p-1 border border-[var(--color-border)] shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setRangeDays(7)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              rangeDays === 7
                ? 'bg-[var(--color-accent)] text-black'
                : 'text-[var(--color-text-secondary)] hover:text-white'
            }`}
          >
            7 Hari
          </button>
          <button
            type="button"
            onClick={() => setRangeDays(14)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              rangeDays === 14
                ? 'bg-[var(--color-accent)] text-black'
                : 'text-[var(--color-text-secondary)] hover:text-white'
            }`}
          >
            14 Hari
          </button>
          <button
            type="button"
            onClick={() => setRangeDays(30)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              rangeDays === 30
                ? 'bg-[var(--color-accent)] text-black'
                : 'text-[var(--color-text-secondary)] hover:text-white'
            }`}
          >
            30 Hari
          </button>
        </div>
      </div>

      {/* Visual Chart Area */}
      <div className="relative pt-6">
        {/* Tooltip */}
        {hoveredBar && (
          <div
            className="absolute -top-3 z-20 pointer-events-none transform -translate-x-1/2 bg-[var(--color-surface-2)] border border-[var(--color-border-light)] px-3 py-1.5 rounded-lg shadow-xl text-xs"
            style={{ left: `${hoveredBar.xPercent}%` }}
          >
            <p className="font-semibold text-[var(--color-text-primary)] mb-0.5">
              {hoveredBar.data.dayName}, {hoveredBar.data.label}
            </p>
            <p className="text-[var(--color-accent)] font-medium">
              {hoveredBar.data.visits} kunjungan
            </p>
            <p className="text-[var(--color-text-muted)] text-[10px]">
              {hoveredBar.data.uniqueCount} pengunjung unik
            </p>
          </div>
        )}

        {/* Chart Bars Grid */}
        <div className="h-48 w-full flex items-end gap-1.5 sm:gap-3 border-b border-[var(--color-border)] pb-2 relative">
          {/* Guide background lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-dashed border-[var(--color-border-light)] w-full" />
            <div className="border-b border-dashed border-[var(--color-border-light)] w-full" />
            <div className="border-b border-dashed border-[var(--color-border-light)] w-full" />
          </div>

          {chartData.map((d, idx) => {
            const heightPercent = maxVisits > 0 ? (d.visits / maxVisits) * 100 : 0
            const isHighest = d.visits > 0 && d.visits === maxVisits
            const xPercent = ((idx + 0.5) / chartData.length) * 100

            return (
              <div
                key={d.dateKey}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredBar({ data: d, xPercent })}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Number above bar if has visits */}
                {d.visits > 0 && (
                  <span className="text-[10px] font-semibold mb-1 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                    {d.visits}
                  </span>
                )}

                {/* Bar Column */}
                <div
                  className={`w-full max-w-[32px] rounded-t-md transition-all duration-300 ${
                    d.visits === 0
                      ? 'h-1 bg-[var(--color-border)]/50'
                      : isHighest
                      ? 'bg-[var(--color-accent)] shadow-[0_0_12px_rgba(181,240,0,0.2)]'
                      : 'bg-emerald-500/80 group-hover:bg-[var(--color-accent)]'
                  }`}
                  style={{
                    height: d.visits === 0 ? '4px' : `${Math.max(heightPercent, 8)}%`,
                  }}
                />

                {/* X Axis Label */}
                <div className="mt-2 text-center select-none">
                  <p className="text-[10px] font-medium text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
                    {d.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
