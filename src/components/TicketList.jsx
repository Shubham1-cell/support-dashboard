import { useTicketStore } from '../store/useTicketStore'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import StatusSelect from './StatusSelect'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function TicketList({ tickets }) {
  const selectTicket = useTicketStore((s) => s.selectTicket)

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ink-100 bg-surface py-16 text-center">
        <p className="text-sm font-medium text-ink-700">No tickets match these filters</p>
        <p className="mt-1 text-sm text-ink-300">Try a different search term or clear a filter.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink-100 bg-surface">
      {/* Desktop table */}
      <table className="hidden w-full text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-300">
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Subject</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr
              key={t.id}
              onClick={() => selectTicket(t.id)}
              className="cursor-pointer border-b border-ink-100 last:border-0 hover:bg-canvas"
            >
              <td className="px-4 py-3">
                <p className="font-medium text-ink-900">{t.customerName}</p>
                <p className="text-xs text-ink-300">{t.id}</p>
              </td>
              <td className="max-w-xs truncate px-4 py-3 text-ink-700">{t.subject}</td>
              <td className="px-4 py-3">
                <PriorityBadge priority={t.priority} />
              </td>
              <td className="px-4 py-3">
                <StatusSelect ticket={t} />
              </td>
              <td className="px-4 py-3 text-ink-500">{formatDate(t.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <ul className="divide-y divide-ink-100 sm:hidden">
        {tickets.map((t) => (
          <li
            key={t.id}
            onClick={() => selectTicket(t.id)}
            className="flex cursor-pointer flex-col gap-2 px-4 py-4 active:bg-canvas"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink-900">{t.customerName}</p>
                <p className="text-xs text-ink-300">{t.id}</p>
              </div>
              <StatusBadge status={t.status} />
            </div>
            <p className="text-sm text-ink-700">{t.subject}</p>
            <div className="flex items-center justify-between">
              <PriorityBadge priority={t.priority} />
              <span className="text-xs text-ink-500">{formatDate(t.createdAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
