import { useTicketStore } from '../store/useTicketStore'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import StatusSelect from './StatusSelect'

function formatDateTime(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function TicketDetailPanel() {
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId)
  const tickets = useTicketStore((s) => s.tickets)
  const closeTicket = useTicketStore((s) => s.closeTicket)

  const ticket = tickets.find((t) => t.id === selectedTicketId)
  if (!ticket) return null

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        aria-label="Close ticket detail"
        onClick={closeTicket}
        className="absolute inset-0 bg-ink-900/30"
      />

      <aside className="relative flex h-full w-full max-w-md flex-col bg-surface shadow-panel sm:max-w-lg">
        <header className="flex items-start justify-between gap-4 border-b border-ink-100 px-6 py-5">
          <div>
            <p className="text-xs text-ink-300">{ticket.id}</p>
            <h2 className="mt-0.5 text-lg font-semibold text-ink-900">{ticket.subject}</h2>
          </div>
          <button
            onClick={closeTicket}
            aria-label="Close"
            className="rounded-md p-1.5 text-ink-500 hover:bg-canvas"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <section className="grid grid-cols-2 gap-4 rounded-lg border border-ink-100 p-4">
            <div>
              <p className="text-xs text-ink-300">Customer</p>
              <p className="mt-0.5 text-sm font-medium text-ink-900">{ticket.customerName}</p>
              <p className="text-xs text-ink-500">{ticket.customerEmail}</p>
            </div>
            <div>
              <p className="text-xs text-ink-300">Created</p>
              <p className="mt-0.5 text-sm text-ink-700">{formatDateTime(ticket.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-ink-300">Priority</p>
              <div className="mt-1">
                <PriorityBadge priority={ticket.priority} />
              </div>
            </div>
            <div>
              <p className="text-xs text-ink-300">Status</p>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status={ticket.status} />
              </div>
            </div>
          </section>

          <section className="mt-5">
            <p className="text-xs text-ink-300">Issue details</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{ticket.description}</p>
          </section>

          <section className="mt-6">
            <p className="text-xs text-ink-300">Conversation</p>
            <div className="mt-2 space-y-3">
              {ticket.conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm ${
                    msg.author === 'agent'
                      ? 'ml-auto bg-brand-light text-brand-dark'
                      : 'bg-canvas text-ink-700'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="mt-1 text-[11px] opacity-60">{formatDateTime(msg.timestamp)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-ink-100 px-6 py-4">
          <p className="text-xs text-ink-300">Update status</p>
          <StatusSelect ticket={ticket} />
        </footer>
      </aside>
    </div>
  )
}
