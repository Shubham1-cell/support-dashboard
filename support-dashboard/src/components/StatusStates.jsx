export function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[68px] animate-pulse rounded-lg border border-ink-100 bg-ink-100/40" />
        ))}
      </div>
      <div className="h-10 animate-pulse rounded-md border border-ink-100 bg-ink-100/40" />
      <div className="space-y-2 rounded-lg border border-ink-100 bg-surface p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-md bg-ink-100/40" />
        ))}
      </div>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-accent-rose/30 bg-accent-rose/5 py-16 text-center">
      <p className="text-sm font-medium text-accent-rose">Something went wrong</p>
      <p className="mt-1 max-w-sm text-sm text-ink-500">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
      >
        Try again
      </button>
    </div>
  )
}
