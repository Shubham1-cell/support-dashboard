const customers = [
  'Amara Osei', 'Liam Chen', 'Priya Nair', 'Diego Fernandez', 'Sofia Rossi',
  'Ken Watanabe', 'Grace Kim', 'Noah Williams', 'Fatima Al-Sayed', 'Ivan Petrov',
  'Maya Johnson', 'Lucas Silva', 'Aisha Bello', 'Ethan Brooks', 'Nadia Kowalski',
  'Ravi Kapoor', 'Chloe Martin', 'Omar Haddad', 'Elena Popescu', 'Tom Baker',
]

const subjects = [
  'Unable to reset account password',
  'Invoice shows incorrect billing amount',
  'App crashes when uploading a photo',
  'Feature request: dark mode for reports',
  'Order shipped to wrong address',
  'Refund not received after 10 days',
  'Cannot connect integration to Slack',
  'Two-factor login codes never arrive',
  'Data export is missing recent entries',
  'Subscription renewed despite cancellation',
  'Dashboard charts not loading on Safari',
  'API returning 500 errors intermittently',
  'Team member cannot be added to workspace',
  'Mobile app logs out every few minutes',
  'Need help migrating from old plan',
  'Duplicate charge on credit card',
  'Notification emails going to spam',
  'Custom domain SSL certificate failed',
  'Unable to download previous invoices',
  'Search results are outdated',
]

const priorities = ['Low', 'Medium', 'High']
const statuses = ['Open', 'In Progress', 'Resolved']

const messageBank = [
  'Thanks for reaching out, could you share a screenshot of the issue?',
  "I've attached the screenshot, this happens every time I try.",
  "We're looking into this now, appreciate your patience.",
  'Any update? This is blocking my team.',
  'This should be fixed now, can you please confirm on your end?',
  'Confirmed, working fine now. Thank you!',
]

function seedRandom(seed) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function buildConversation(rand, count) {
  const convo = []
  for (let i = 0; i < count; i++) {
    convo.push({
      author: i % 2 === 0 ? 'customer' : 'agent',
      text: messageBank[Math.floor(rand() * messageBank.length)],
      timestamp: new Date(Date.now() - (count - i) * 3600 * 1000 * (i + 1)).toISOString(),
    })
  }
  return convo
}

export function generateMockTickets(total = 42) {
  const rand = seedRandom(total * 7 + 13)
  const tickets = []

  for (let i = 0; i < total; i++) {
    const createdDaysAgo = Math.floor(rand() * 30)
    const created = new Date(Date.now() - createdDaysAgo * 24 * 3600 * 1000)
    const status = statuses[Math.floor(rand() * statuses.length)]
    const priority = priorities[Math.floor(rand() * priorities.length)]

    tickets.push({
      id: `TCK-${1000 + i}`,
      customerName: customers[i % customers.length],
      customerEmail: `${customers[i % customers.length].toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`,
      subject: subjects[i % subjects.length],
      description:
        'Customer reported this issue through the support widget. Below is the full context and any prior conversation history for this ticket.',
      priority,
      status,
      createdAt: created.toISOString(),
      conversation: buildConversation(rand, 2 + Math.floor(rand() * 4)),
    })
  }

  return tickets
}
