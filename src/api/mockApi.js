import { generateMockTickets } from '../data/mockTickets'

// Simulates a REST API with network delay and an occasional failure,
// so the UI has to handle loading / error / empty states for real.
const LATENCY_MS = 700
const FAILURE_RATE = 0.06

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchTickets() {
  await delay(LATENCY_MS)

  if (Math.random() < FAILURE_RATE) {
    throw new Error('Could not reach the ticketing service. Please try again.')
  }

  return generateMockTickets(42)
}

export async function updateTicketStatus(ticketId, nextStatus) {
  await delay(300)

  if (Math.random() < FAILURE_RATE) {
    throw new Error('The status change did not save. Please try again.')
  }

  return { id: ticketId, status: nextStatus }
}
