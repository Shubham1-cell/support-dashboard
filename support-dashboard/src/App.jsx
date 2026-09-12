import { useEffect } from 'react'
import { useTicketStore } from './store/useTicketStore'
import StatsBar from './components/StatsBar'
import FilterBar from './components/FilterBar'
import TicketList from './components/TicketList'
import TicketDetailPanel from './components/TicketDetailPanel'
import { LoadingState, ErrorState } from './components/StatusStates'

export default function App() {
  const status = useTicketStore((s) => s.status)
  const error = useTicketStore((s) => s.error)
  const tickets = useTicketStore((s) => s.tickets)
  const loadTickets = useTicketStore((s) => s.loadTickets)
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId)
  const filteredTickets = useTicketStore((s) => s.getFilteredTickets())

  useEffect(() => {
    loadTickets()
  }, [loadTickets])

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold text-ink-900">Support desk</h1>
          <p className="text-sm text-ink-500">Review and manage incoming customer tickets</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        {status === 'loading' && <LoadingState />}

        {status === 'error' && <ErrorState message={error} onRetry={loadTickets} />}

        {status === 'success' && (
          <>
            <StatsBar tickets={tickets} />
            <FilterBar />
            <TicketList tickets={filteredTickets} />
          </>
        )}
      </main>

      {selectedTicketId && <TicketDetailPanel />}
    </div>
  )
}
