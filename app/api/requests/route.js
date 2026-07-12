import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'

import formatDate from '@helpers/formatDate'
import formatAddress from '@helpers/formatAddress'
import telegramPost from '@server/telegramApi'

export const runtime = 'nodejs'

const DEFAULT_ADDRESS = {
  town: '',
  street: '',
  house: '',
  entrance: '',
  floor: '',
  flat: '',
  comment: '',
  link2Gis: '',
  linkYandexNavigator: '',
  link2GisShow: true,
  linkYandexShow: true,
}

const parseBooleanEnv = (value, defaultValue = false) => {
  if (typeof value !== 'string') return defaultValue
  const normalized = value.trim().toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false
  return defaultValue
}

// Telegram remains available as a fallback integration, but lead delivery is
// intentionally disabled. ArtistCRM is the source of truth for new leads.
const TELEGRAM_ENABLED = false
const ARTISTCRM_REQUEST_TIMEOUT_MS = Number(
  process.env.ARTISTCRM_REQUEST_TIMEOUT_MS || 10000
)
const MAX_REQUEST_BODY_BYTES = 20_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map()

const logLead = (requestId, step, details = {}) => {
  console.log(`[lead:${requestId}] ${step}`, details)
}

const toLogError = (error) => ({
  name: error?.name,
  message: error?.message,
  code: error?.code,
  status: error?.status ?? error?.response?.status,
  stack: error?.stack,
})

const isRateLimited = (req) => {
  const forwardedFor = req.headers.get('x-forwarded-for') || ''
  const clientId = forwardedFor.split(',')[0].trim() || 'unknown'
  const now = Date.now()
  const recentRequests = (requestLog.get(clientId) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) return true

  recentRequests.push(now)
  requestLog.set(clientId, recentRequests)
  return false
}

const normalizePhone = (phone) =>
  typeof phone === 'string'
    ? phone.replace(/[^0-9]/g, '')
    : typeof phone === 'number'
    ? String(phone)
    : ''

const sanitizeContacts = (contacts) => {
  if (Array.isArray(contacts))
    return contacts.map((item) => String(item).trim()).filter(Boolean)
  if (typeof contacts === 'string')
    return contacts
      .split(/[\n,;]/)
      .map((item) => item.trim())
      .filter(Boolean)
  return []
}

const sanitizeText = (value, maxLength = 1000) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const escapeTelegramHtml = (value) =>
  String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const buildQuizComment = ({ type, audience, spectators }) =>
  [
    sanitizeText(type, 200) ? `Тип мероприятия: ${sanitizeText(type, 200)}` : '',
    sanitizeText(audience, 200) ? `Возраст гостей: ${sanitizeText(audience, 200)}` : '',
    sanitizeText(spectators, 200)
      ? `Количество зрителей: ${sanitizeText(spectators, 200)}`
      : '',
  ]
    .filter(Boolean)
    .join('\n')

const normalizeAddress = (rawAddress, legacyLocation) => {
  const normalized = {
    ...DEFAULT_ADDRESS,
    ...(rawAddress && typeof rawAddress === 'object' ? rawAddress : {}),
  }

  const hasMainFields =
    normalized.town ||
    normalized.street ||
    normalized.house ||
    normalized.flat

  if (legacyLocation && !normalized.comment && !hasMainFields) {
    normalized.comment = legacyLocation
  }

  return normalized
}

const parseBody = async (req) => {
  const contentType = (req.headers.get('content-type') || '').toLowerCase()

  if (contentType.includes('application/json')) {
    return { body: await req.json(), isFormSubmit: false }
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await req.formData()
    return {
      body: Object.fromEntries(formData.entries()),
      isFormSubmit: true,
    }
  }

  try {
    return { body: await req.json(), isFormSubmit: false }
  } catch (error) {
    return { body: {}, isFormSubmit: false }
  }
}

const extractContactByType = (contacts, type) => {
  if (!Array.isArray(contacts)) return ''
  const prepared = contacts
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .map((item) => item.toLowerCase())

  if (type === 'telegram') {
    const found = prepared.find(
      (item) =>
        item.includes('telegram') || item.includes('t.me') || item.includes('@')
    )
    return found || ''
  }

  if (type === 'whatsapp') {
    const found = prepared.find(
      (item) => item.includes('whatsapp') || item.includes('wa.me')
    )
    return found || ''
  }

  return ''
}

const sendTelegramMessage = async ({ requestId, text, normalizedPhone }) => {
  if (!TELEGRAM_ENABLED) {
    logLead(requestId, 'telegram skipped: disabled')
    return false
  }

  if (!process.env.TELEGRAM_TOKEN) {
    logLead(requestId, 'telegram skipped: missing TELEGRAM_TOKEN')
    return false
  }

  logLead(requestId, 'telegram request start')

  const result = await telegramPost(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      chat_id: 261102161,
      text,
      parse_mode: 'html',
    },
    null,
    (error) =>
      logLead(requestId, 'telegram response error', { error: toLogError(error) }),
    true
  )

  const delivered = Boolean(result)
  logLead(requestId, delivered ? 'telegram response ok' : 'telegram failed')
  return delivered
}

const sendPublicLeadToArtistCRM = async ({
  requestId,
  clientName,
  phone,
  comment,
  eventDate,
  contractSum,
  address,
  source,
  contacts,
}) => {
  const baseUrl = process.env.PUBLIC_LEADS_API_BASE_URL
  const apiKey = process.env.PUBLIC_LEADS_API_KEY

  if (!baseUrl || !apiKey) {
    logLead(requestId, 'artistcrm skipped: missing config', {
      hasBaseUrl: Boolean(baseUrl),
      hasApiKey: Boolean(apiKey),
    })
    return false
  }

  const endpoint = `${baseUrl.replace(/\/+$/, '')}/api/public/lead`
  const payload = {
    name: clientName || undefined,
    phone: phone || undefined,
    comment: comment || undefined,
    eventDate: eventDate ? new Date(eventDate).toISOString() : undefined,
    contractSum: Number(contractSum) || undefined,
    town: address?.town || undefined,
    address: formatAddress(address, null) || undefined,
    source: source || 'site_form',
    telegram: extractContactByType(contacts, 'telegram') || undefined,
    whatsapp: extractContactByType(contacts, 'whatsapp') || undefined,
  }

  const controller = new AbortController()
  const timeout = setTimeout(
    () => controller.abort(),
    ARTISTCRM_REQUEST_TIMEOUT_MS
  )

  logLead(requestId, 'artistcrm request start', {
    endpoint,
    timeoutMs: ARTISTCRM_REQUEST_TIMEOUT_MS,
    payload: {
      ...payload,
      phone: payload.phone ? '[provided]' : undefined,
    },
  })

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Public-Api-Key': apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    const responseText = await response.text().catch(() => '')

    if (!response.ok) {
      logLead(requestId, 'artistcrm response error', {
        status: response.status,
        statusText: response.statusText,
        endpoint,
        details: responseText.slice(0, 2000),
      })
      return false
    }

    logLead(requestId, 'artistcrm response ok', {
      status: response.status,
      endpoint,
      details: responseText.slice(0, 1000),
    })
    return true
  } catch (error) {
    logLead(requestId, 'artistcrm request failed', {
      error: toLogError(error),
      endpoint,
    })
    return false
  } finally {
    clearTimeout(timeout)
  }
}

export const POST = async (req) => {
  const requestId = randomUUID()

  const contentLength = Number(req.headers.get('content-length') || 0)
  if (contentLength > MAX_REQUEST_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Слишком большой запрос', requestId },
      { status: 413 }
    )
  }

  if (isRateLimited(req)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Слишком много попыток. Попробуйте ещё раз через несколько минут.',
        requestId,
      },
      { status: 429 }
    )
  }

  logLead(requestId, 'request received', {
    url: req.url,
    contentType: req.headers.get('content-type'),
    userAgent: req.headers.get('user-agent'),
    referer: req.headers.get('referer'),
  })

  let body = {}
  let isFormSubmit = false

  try {
    ;({ body, isFormSubmit } = await parseBody(req))
    logLead(requestId, 'body parsed', {
      isFormSubmit,
      keys: Object.keys(body),
    })
  } catch (error) {
    logLead(requestId, 'body parse failed', { error: toLogError(error) })
    return NextResponse.json(
      { success: false, error: 'Не удалось прочитать заявку', requestId },
      { status: 400 }
    )
  }

  const getRedirectUrl = (status) =>
    new URL(`/?request=${status}#zakaz`, req.url)
  const formSuccessResponse = () =>
    NextResponse.redirect(getRedirectUrl('success'), 303)
  const formErrorResponse = (message) =>
    NextResponse.redirect(
      new URL(
        `/?request=error&message=${encodeURIComponent(message)}#zakaz`,
        req.url
      ),
      303
    )
  const errorResponse = (message, status = 400) =>
    isFormSubmit
      ? formErrorResponse(message)
      : NextResponse.json(
          { success: false, error: message, requestId },
          { status }
        )
  const successResponse = (data) =>
    isFormSubmit
      ? formSuccessResponse()
      : NextResponse.json({ success: true, data, requestId }, { status: 201 })

  try {
    const clientName =
      sanitizeText(body.clientName ?? body.name, 200) || 'Не указан'
    const rawPhone = body.clientPhone ?? body.phone ?? ''
    const normalizedPhone = normalizePhone(rawPhone)
    const contactChannels =
      body.contactChannels ?? body.contact ?? body.priorityContact ?? ''
    const eventDate = body.eventDate ?? body.date ?? null
    const legacyLocation =
      body.location ??
      [body.town, body.address]
        .filter((value) => typeof value === 'string' && value.trim().length > 0)
        .join(', ')
    const address = normalizeAddress(body.address, legacyLocation)
    const contractSum = body.contractSum ?? body.price ?? 0
    const numericContractSum = Number(contractSum) || 0
    const quizComment = buildQuizComment(body)
    const comment = [sanitizeText(body.comment, 2000), quizComment]
      .filter(Boolean)
      .join('\n')
    const yandexAim = sanitizeText(body.yandexAim, 100)
    const contacts = sanitizeContacts(contactChannels)
    const formattedAddress = formatAddress(address, null)
    const displayPhone =
      typeof rawPhone === 'string' && rawPhone.trim().length > 0
        ? rawPhone.trim()
        : normalizedPhone
        ? `+${normalizedPhone}`
        : ''

    logLead(requestId, 'payload normalized', {
      clientName,
      hasPhone: Boolean(rawPhone),
      normalizedPhoneLength: normalizedPhone.length,
      hasEventDate: Boolean(eventDate),
      hasComment: Boolean(comment),
      contactChannelsType: Array.isArray(contactChannels)
        ? 'array'
        : typeof contactChannels,
      yandexAim,
      telegramEnabled: TELEGRAM_ENABLED,
      artistcrmConfigured: Boolean(
        process.env.PUBLIC_LEADS_API_BASE_URL &&
          process.env.PUBLIC_LEADS_API_KEY
      ),
    })

    if (!rawPhone || !normalizedPhone) {
      logLead(requestId, 'validation failed', {
        error: 'Укажите телефон клиента',
        rawPhone,
      })
      return errorResponse('Укажите телефон клиента')
    }

    const messageParts = [
      `Новая заявка${process.env.DOMAIN ? ` с ${process.env.DOMAIN}` : ''}`,
      '',
      clientName
        ? `<b>Имя клиента:</b> ${escapeTelegramHtml(clientName)}`
        : null,
      displayPhone
        ? `<b>Телефон:</b> ${escapeTelegramHtml(displayPhone)}`
        : null,
      contacts.length > 0
        ? `<b>Способы связи:</b> ${escapeTelegramHtml(contacts.join(', '))}`
        : null,
      eventDate
        ? `<b>Дата мероприятия:</b> ${formatDate(eventDate, false, true)}`
        : null,
      formattedAddress
        ? `<b>Локация:</b> ${escapeTelegramHtml(formattedAddress)}`
        : null,
      numericContractSum
        ? `<b>Договорная сумма:</b> ${numericContractSum.toLocaleString(
            'ru-RU'
          )} ₽`
        : null,
      comment ? `<b>Комментарий:</b> ${escapeTelegramHtml(comment)}` : null,
      yandexAim
        ? `<b>Яндекс цель:</b> ${escapeTelegramHtml(yandexAim)}`
        : null,
    ].filter(Boolean)

    const [telegramDelivered, artistcrmDelivered] = await Promise.all([
      sendTelegramMessage({
        requestId,
        text: messageParts.join('\n'),
        normalizedPhone,
      }).catch((error) => {
        logLead(requestId, 'telegram unexpected error', {
          error: toLogError(error),
        })
        return false
      }),
      sendPublicLeadToArtistCRM({
        requestId,
        clientName,
        phone: displayPhone || `+${normalizedPhone}`,
        comment,
        eventDate,
        contractSum: numericContractSum,
        address,
        source: body.source || yandexAim || 'site_form',
        contacts,
      }).catch((error) => {
        logLead(requestId, 'artistcrm unexpected error', {
          error: toLogError(error),
        })
        return false
      }),
    ])

    logLead(requestId, 'delivery finished', {
      telegramDelivered,
      artistcrmDelivered,
    })

    if (!artistcrmDelivered) {
      logLead(requestId, 'delivery failed: artistcrm did not accept lead')
      return errorResponse(
        'Не удалось сохранить заявку. Пожалуйста, попробуйте ещё раз или свяжитесь по телефону.',
        503
      )
    }

    logLead(requestId, 'response success')

    return successResponse({
      delivery: {
        telegram: telegramDelivered,
        artistcrm: artistcrmDelivered,
        atLeastOneDelivered: telegramDelivered || artistcrmDelivered,
      },
    })
  } catch (error) {
    logLead(requestId, 'fatal error', { error: toLogError(error) })
    return errorResponse('Не удалось отправить заявку', 500)
  }
}
