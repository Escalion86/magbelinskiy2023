const PHONE_REGEX = /(\+?\d[\d\s\-()]{6,}\d)/g
const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
const CLIENT_NAME_REGEX = /(клиент|имя|заказчик)\s*[:\-]\s*(.+)/i
const COMMENT_REGEX = /(коммент|примечание|заметка|note)\s*[:\-]\s*(.+)/i
const CONTACT_LINK_REGEX =
  /(https?:\/\/t\.me\/\S+|t\.me\/\S+|https?:\/\/vk\.com\/\S+|vk\.com\/\S+)/gi

const normalizePhone = (value) => {
  if (!value) return ''
  return String(value).replace(/[^\d]/g, '')
}

const unique = (items) => Array.from(new Set(items.filter(Boolean)))

const AMOUNT_CANDIDATE_REGEX =
  /(\d[\d\s.,]*)(?:\s*(к|k|тыс|тыщ|т)(?![A-Za-zА-Яа-я])\.?)?/gi
const TOTAL_AMOUNT_LABELS = [
  'сумма',
  'стоимость',
  'итого',
  'budget',
  'всего',
  'оплата',
  'гонорар',
  'договор',
  'цена',
  'к оплате',
]
const DEPOSIT_AMOUNT_LABELS = [
  'задаток',
  'предоплата',
  'депозит',
  'аванс',
  'бронь',
  'предопл',
]

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

const sanitizeTextForAmounts = (text = '') =>
  text ? text.replace(PHONE_REGEX, ' ') : ''

const extractAmountCandidates = (text) => {
  if (!text) return []

  const amounts = []
  const sanitized = sanitizeTextForAmounts(text)
  for (const match of sanitized.matchAll(AMOUNT_CANDIDATE_REGEX)) {
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
  const sanitized = sanitizeTextForAmounts(text)
  for (const labelMatch of sanitized.matchAll(labelsRegex)) {
    const context = sanitized.slice(
      labelMatch.index ?? 0,
      (labelMatch.index ?? 0) + 120
    )
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

const detectTransferred = (summary, description) => {
  const text = `${summary ?? ''}\n${description ?? ''}`
  if (/передан|передано|передача|передал/i.test(text)) return true
  if (/коллег/i.test(text)) return true
  return false
}

const extractClientNameFromDescription = (description = '') => {
  const lines = description.split(/\r?\n/).map((line) => line.trim())
  const labelsRegex = new RegExp(
    `(?:${TOTAL_AMOUNT_LABELS.join('|')}|${DEPOSIT_AMOUNT_LABELS.join('|')})`,
    'i'
  )

  for (const line of lines) {
    if (!line) continue
    if (!/[A-Za-zА-Яа-я]/.test(line)) continue
    if (/\d/.test(line)) continue
    if (labelsRegex.test(line)) continue
    if (/коммент|примечание|заметка|note/i.test(line)) continue
    return line
  }

  return ''
}

const pickClientName = (summary, description, attendees) => {
  const descriptionMatch = description.match(CLIENT_NAME_REGEX)
  if (descriptionMatch?.[2]) return descriptionMatch[2].trim()

  const possibleName = extractClientNameFromDescription(description)
  if (possibleName) return possibleName

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
    findAmountByLabels(description, TOTAL_AMOUNT_LABELS) ??
    findAmountByLabels(summary, TOTAL_AMOUNT_LABELS)

  const depositAmountByLabel =
    findAmountByLabels(description, DEPOSIT_AMOUNT_LABELS) ??
    findAmountByLabels(summary, DEPOSIT_AMOUNT_LABELS)

  const amountsWithoutDeposit =
    depositAmountByLabel !== null
      ? allAmounts.filter((amount) => amount !== depositAmountByLabel)
      : []

  const totalAmount =
    totalAmountByLabel ??
    (amountsWithoutDeposit.length ? Math.max(...amountsWithoutDeposit) : null) ??
    (allAmounts.length ? Math.max(...allAmounts) : null)

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
    ...(description.match(CONTACT_LINK_REGEX) ?? []),
  ])

  const clientData = {}
  if (currency) clientData.currency = currency
  const depositDate = dateStart ?? eventDate ?? dateEnd ?? null

  if (depositAmount !== null || depositStatus)
    clientData.deposit = {
      amount: depositAmount ?? null,
      status: depositStatus ?? 'unknown',
      date: depositDate,
    }

  const isTransferred = detectTransferred(summary, description)

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
        : 'active',
    clientData,
    isTransferred,
  }
}
