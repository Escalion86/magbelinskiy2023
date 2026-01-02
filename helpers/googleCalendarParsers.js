const PHONE_REGEX = /(\+?\d[\d\s\-()]{6,}\d)/g
const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
const CLIENT_NAME_REGEX = /(клиент|имя|заказчик)\s*[:\-]\s*(.+)/i
const COMMENT_REGEX = /(коммент|примечание|заметка|note)\s*[:\-]\s*(.+)/i

const normalizePhone = (value) => {
  if (!value) return ''
  return String(value).replace(/[^\d]/g, '')
}

const unique = (items) => Array.from(new Set(items.filter(Boolean)))

const AMOUNT_CANDIDATE_REGEX = /(\d[\d\s.,]*)(?:\s*(к|k|тыс|тыщ|т\b))?/gi

const parseNumeric = (value) => {
  const normalized = value.replace(/\s+/g, '').replace(/,/g, '.')
  const numeric = Number.parseFloat(normalized)
  return Number.isFinite(numeric) ? numeric : null
}

const parseAmountCandidate = (rawNumber, suffix) => {
  const digitsCount = (rawNumber.match(/\d/g) ?? []).length
  if (!suffix && digitsCount >= 9) return null // скорее всего телефон

  const numeric = parseNumeric(rawNumber)
  if (numeric === null) return null

  const multiplier = suffix ? 1000 : 1
  return numeric * multiplier
}

const extractAmountCandidates = (text) => {
  if (!text) return []

  const amounts = []
  for (const match of text.matchAll(AMOUNT_CANDIDATE_REGEX)) {
    const [full, rawNumber, suffix] = match
    if (/%/.test(full)) continue

    const amount = parseAmountCandidate(rawNumber, suffix)
    if (amount !== null) amounts.push(amount)
  }

  return amounts
}

const findAmountByLabels = (text, labels) => {
  if (!text) return null

  const labelsRegex = new RegExp(`(?:${labels.join('|')})`, 'ig')
  for (const labelMatch of text.matchAll(labelsRegex)) {
    const context = text.slice(labelMatch.index ?? 0, (labelMatch.index ?? 0) + 120)
    const [amount] = extractAmountCandidates(context)
    if (amount !== undefined) return amount
  }

  return null
}

const detectCurrency = (text) => {
  if (!text) return null
  if (/₽|руб\.?|r\b|rub/i.test(text)) return 'RUB'
  if (/\$|usd/i.test(text)) return 'USD'
  if (/€|eur/i.test(text)) return 'EUR'
  return null
}

const detectDepositStatus = (chunk) => {
  if (!chunk) return null
  if (/оплач|получ|внес|перечисл/i.test(chunk)) return 'paid'
  if (/ожида|не оплач|нет|должен|ждем/i.test(chunk)) return 'pending'
  return null
}

const detectDepositStatusByMarkers = (summary) => {
  if (!summary) return null
  if (/❗❗/.test(summary)) return 'paid'
  if (/❗/.test(summary)) return 'deposit_paid'
  if (/❕/.test(summary)) return 'confirmed'
  return null
}

const pickClientName = (summary, description, attendees) => {
  const descriptionMatch = description.match(CLIENT_NAME_REGEX)
  if (descriptionMatch?.[2]) return descriptionMatch[2].trim()

  const attendeeName = attendees.find((attendee) => attendee?.displayName)?.displayName
  if (attendeeName) return attendeeName.trim()

  if (summary?.trim()) return summary.trim()

  return 'Мероприятие из календаря'
}

export const parseGoogleEvent = (event) => {
  const description = event?.description ?? ''
  const summary = event?.summary ?? ''
  const attendees = Array.isArray(event?.attendees) ? event.attendees : []

  const descriptionPhones = unique((description.match(PHONE_REGEX) ?? []).map(normalizePhone))
  const locationPhones = unique(
    (event?.location?.match(PHONE_REGEX) ?? []).map(normalizePhone)
  )
  const phones = unique([...descriptionPhones, ...locationPhones])

  const emails = unique(description.match(EMAIL_REGEX) ?? [])
  const attendeeEmails = unique(
    attendees.map((attendee) => attendee?.email).filter(Boolean)
  )

  const allAmounts = extractAmountCandidates(
    `${description}\n${summary}\n${event?.location ?? ''}`
  )

  const totalAmountByLabel =
    findAmountByLabels(description, ['сумма', 'стоимость', 'итого', 'budget']) ??
    findAmountByLabels(summary, ['сумма', 'стоимость', 'итого', 'budget'])

  const depositAmountByLabel =
    findAmountByLabels(description, ['задаток', 'предоплата', 'депозит', 'аванс']) ??
    findAmountByLabels(summary, ['задаток', 'предоплата', 'депозит', 'аванс'])

  const totalAmount =
    totalAmountByLabel ?? (allAmounts.length ? Math.max(...allAmounts) : null)

  let depositAmount = depositAmountByLabel

  const depositStatusMarker = detectDepositStatusByMarkers(summary)

  if (!depositAmount && depositStatusMarker && allAmounts.length > 1) {
    const candidates = allAmounts.filter((amount) => amount !== totalAmount)
    if (candidates.length) depositAmount = Math.min(...candidates)
  }

  const depositStatus =
    depositAmount || depositStatusMarker
      ?
          depositStatusMarker ||
          detectDepositStatus(description) ||
          detectDepositStatus(summary) ||
          'unknown'
      : null

  const currency =
    detectCurrency(description) || detectCurrency(summary) || (totalAmount ? 'RUB' : null)

  const commentMatch = description.match(COMMENT_REGEX)

  const clientName = pickClientName(summary, description, attendees)
  const clientPhone = phones[0] ?? ''

  const timeStart = event?.start?.dateTime ?? event?.start?.date ?? null
  const timeEnd = event?.end?.dateTime ?? event?.end?.date ?? null

  const dateStart = timeStart ? new Date(timeStart) : null
  const dateEnd = timeEnd ? new Date(timeEnd) : null
  const eventDate = dateStart ?? dateEnd ?? null

  const contactChannels = unique([
    ...emails,
    ...attendeeEmails,
    ...(clientPhone ? [`+${clientPhone}`] : []),
  ])

  const clientData = {}
  if (currency) clientData.currency = currency
  if (depositAmount !== null || depositStatus)
    clientData.deposit = {
      amount: depositAmount ?? null,
      status: depositStatus ?? 'unknown',
    }

  return {
    title: summary?.trim() || 'Мероприятие из Google Calendar',
    description: description.trim(),
    location: event?.location ?? '',
    clientName,
    clientPhone,
    contactChannels,
    dateStart,
    dateEnd,
    eventDate,
    contractSum: totalAmount,
    comment: commentMatch?.[2]?.trim() ?? '',
    status:
      event?.status === 'cancelled' || /отмена/i.test(summary)
        ? 'canceled'
        : 'planned',
    clientData,
  }
}
