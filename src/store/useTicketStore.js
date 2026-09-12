import { create } from 'zustand'
import { fetchTickets, updateTicketStatus } from '../api/mockApi'

export const useTicketStore = create((set, get) => ({
  tickets: [],
  status: 'idle', // idle | loading | success | error
  error: null,

  searchQuery: '',
  statusFilter: 'All',
  priorityFilter: 'All',

  selectedTicketId: null,

  loadTickets: async () => {
    set({ status: 'loading', error: null })
    try {
      const tickets = await fetchTickets()
      set({ tickets, status: 'success' })
    } catch (err) {
      set({ status: 'error', error: err.message })
    }
  },

  setSearchQuery: (value) => set({ searchQuery: value }),
  setStatusFilter: (value) => set({ statusFilter: value }),
  setPriorityFilter: (value) => set({ priorityFilter: value }),

  selectTicket: (id) => set({ selectedTicketId: id }),
  closeTicket: () => set({ selectedTicketId: null }),

  changeTicketStatus: async (ticketId, nextStatus) => {
    const previous = get().tickets
    // optimistic update
    set({
      tickets: previous.map((t) =>
        t.id === ticketId ? { ...t, status: nextStatus } : t
      ),
    })

    try {
      await updateTicketStatus(ticketId, nextStatus)
    } catch (err) {
      // roll back on failure
      set({ tickets: previous, error: err.message })
    }
  },

  getFilteredTickets: () => {
    const { tickets, searchQuery, statusFilter, priorityFilter } = get()
    const query = searchQuery.trim().toLowerCase()

    return tickets.filter((t) => {
      const matchesQuery =
        !query ||
        t.customerName.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query)

      const matchesStatus = statusFilter === 'All' || t.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter

      return matchesQuery && matchesStatus && matchesPriority
    })
  },
}))
