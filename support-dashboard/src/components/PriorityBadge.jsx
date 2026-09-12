const styles = {
  High: 'text-accent-rose',
  Medium: 'text-accent-amber',
  Low: 'text-accent-moss',
}

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${styles[priority]}`}>
      <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
        {priority === 'High' && (
          <path d="M5 0 L10 10 L0 10 Z" fill="currentColor" />
        )}
        {priority === 'Medium' && (
          <rect x="0" y="2" width="10" height="6" fill="currentColor" />
        )}
        {priority === 'Low' && <circle cx="5" cy="5" r="5" fill="currentColor" />}
      </svg>
      {priority}
    </span>
  )
}
