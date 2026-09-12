import { useTicketStore } from '../store/useTicketStore'

const statusOptions = ['All', 'Open', 'In Progress', 'Resolved']
const priorityOptions = ['All', 'Low', 'Medium', 'High']

export default function FilterBar() {
  const searchQuery = useTicketStore((s) => s.searchQuery)
  const statusFilter = useTicketStore((s) => s.statusFilter)
  const priorityFilter = useTicketStore((s) => s.priorityFilter)
  const setSearchQuery = useTicketStore((s) => s.setSearchQuery)
  const setStatusFilter = useTicketStore((s) => s.setStatusFilter)
  const setPriorityFilter = useTicketStore((s) => s.setPriorityFilter)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search by customer, subject, or ticket ID"
          className="w-full rounded-md border border-ink-100 bg-surface py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-ink-100 bg-surface px-3 py-2 text-sm text-ink-700 focus:border-brand"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'All' ? 'All statuses' : opt}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-md border border-ink-100 bg-surface px-3 py-2 text-sm text-ink-700 focus:border-brand"
        >
          {priorityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'All' ? 'All priorities' : opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
