export default function StatsBar({ tickets }) {
  const total = tickets.length
  const open = tickets.filter((t) => t.status === 'Open').length
  const inProgress = tickets.filter((t) => t.status === 'In Progress').length
  const resolved = tickets.filter((t) => t.status === 'Resolved').length

  const stats = [
    { label: 'Total tickets', value: total, accent: 'text-ink-900' },
    { label: 'Open', value: open, accent: 'text-brand' },
    { label: 'In progress', value: inProgress, accent: 'text-accent-amber' },
    { label: 'Resolved', value: resolved, accent: 'text-accent-moss' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-lg border border-ink-100 bg-surface px-4 py-3.5"
        >
          <p className="text-sm text-ink-500">{s.label}</p>
          <p className={`mt-1 text-2xl font-semibold ${s.accent}`}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}
