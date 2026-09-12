# Support Desk — Customer Support Dashboard

A small dashboard for a support team to view, search, filter, and triage customer
support tickets, built with **React**, **Tailwind CSS**, and **Zustand**.

## Features

- **Stats bar** — total, open, in progress, and resolved ticket counts, live-updating.
- **Ticket list** — customer, subject, priority, status, and created date; renders as
  a table on desktop and stacked cards on mobile.
- **Search** — by customer name, subject, or ticket ID.
- **Filters** — by status and by priority, combinable with search.
- **Inline status change** — update a ticket's status directly from the list or the
  detail panel, with an optimistic update and rollback if the (simulated) request fails.
- **Ticket detail panel** — a slide-over panel showing customer info, issue
  description, current status/priority, timestamps, and the full conversation history.
- **Loading / error / empty states** — a skeleton while data loads, a retry-able
  error state (the mock API randomly fails ~6% of the time to make this real), and an
  empty state when filters return nothing.

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** for styling
- **Zustand** for state management (tickets, filters, selection, async status)
- A **mock REST API** (`src/api/mockApi.js`) that simulates network latency and
  occasional failures over generated ticket data — no external API keys needed.

## Project structure

```
src/
  api/mockApi.js            mock REST endpoints (fetch tickets, update status)
  data/mockTickets.js       deterministic mock ticket + conversation generator
  store/useTicketStore.js   Zustand store: data, filters, selection, actions
  components/
    StatsBar.jsx
    FilterBar.jsx
    StatusSelect.jsx
    TicketList.jsx           (table on desktop, cards on mobile)
    TicketDetailPanel.jsx    (slide-over with conversation history)
    StatusBadge.jsx / PriorityBadge.jsx
    StatusStates.jsx         (loading skeleton + error state)
  App.jsx
  main.jsx
```

## Setup instructions

Requires Node.js 18+.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# App runs at http://localhost:5173
```

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: customer support dashboard"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

## Deploying (Vercel — easiest option)

1. Push the repo to GitHub (above).
2. Go to https://vercel.com/new and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy** — Vercel gives you a live URL a minute later.

(Netlify works the same way: build command `npm run build`, publish directory `dist`.)

## Notes on approach

- Data is generated deterministically (seeded) so the same 42 tickets appear each
  session, while the API layer still simulates real latency/errors so loading and
  error handling are genuinely exercised, not just styled.
- Status changes are optimistic (UI updates immediately) and roll back if the
  simulated request fails, which is closer to how a real ticketing UI behaves.
- The detail view is a slide-over panel rather than a separate route or modal — it
  keeps the ticket list visible/scroll-position intact while reading details, and
  adapts to full-width on mobile.
- Colors avoid a single "SaaS default" palette: status uses a teal/brand color,
  priority uses distinct amber/rose/moss so it's scannable without relying only on
  badge shape.

## What's not included / could be extended next

- Pagination or virtualization for very large ticket volumes (currently one page of ~40).
- Adding a reply to a ticket's conversation (currently read-only history).
- Persisting changes across a real backend (currently in-memory per session).
- Unit tests for the store and components.

## AI tools used

This project was built with the help of **Claude** (Anthropic), which generated the
initial component structure, the Zustand store, the mock API layer, and the Tailwind
styling based on the task brief. All code was reviewed for correctness and structure
before submission.
