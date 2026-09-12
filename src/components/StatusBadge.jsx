const styles = {
  Open: 'bg-brand-light text-brand-dark',
  'In Progress': 'bg-amber-50 text-accent-amber border border-accent-amber/30',
  Resolved: 'bg-ink-100 text-ink-500',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || 'bg-ink-100 text-ink-500'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  )
}
