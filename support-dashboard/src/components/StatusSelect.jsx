import { useTicketStore } from '../store/useTicketStore'

const options = ['Open', 'In Progress', 'Resolved']

export default function StatusSelect({ ticket }) {
  const changeTicketStatus = useTicketStore((s) => s.changeTicketStatus)

  return (
    <select
      value={ticket.status}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.stopPropagation()
        changeTicketStatus(ticket.id, e.target.value)
      }}
      className="rounded-md border border-ink-100 bg-surface px-2 py-1.5 text-xs font-medium text-ink-700 focus:border-brand"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}
