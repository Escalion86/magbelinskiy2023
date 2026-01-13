'use client'

import cn from 'classnames'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { EVENT_STATUSES, EVENT_STATUSES_SIMPLE } from '@helpers/constants'
import { getEventStatusBadgeClasses } from '@helpers/eventStatusStyles'
import formatDate from '@helpers/formatDate'
import formatAddress from '@helpers/formatAddress'
import { modalsFuncAtom } from '@state/atoms'
import requestsAtom from '@state/atoms/requestsAtom'
import transactionsAtom from '@state/atoms/transactionsAtom'
import eventSelector from '@state/selectors/eventSelector'
import clientSelector from '@state/selectors/clientSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faE,
  faEquals,
  faHandHoldingDollar,
  faShare,
  faTimeline,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons'
import SvgSigma from 'svg/SvgSigma'
import CardButtons from '@components/CardButtons'

const CALENDAR_RESPONSE_MARKER = '--- Google Calendar Response ---'

const stripCalendarResponse = (text = '') => {
  const marker = `\n\n${CALENDAR_RESPONSE_MARKER}\n`
  const markerIndex = text.indexOf(marker)
  if (markerIndex === -1) return text.trim()
  return text.slice(0, markerIndex).trim()
}

const EventCard = ({ eventId, style }) => {
  const event = useAtomValue(eventSelector(eventId))
  const client = useAtomValue(clientSelector(event?.clientId))
  const transactions = useAtomValue(transactionsAtom)
  const requests = useAtomValue(requestsAtom)
  const modalsFunc = useAtomValue(modalsFuncAtom)

  const request = useMemo(
    () =>
      event?.requestId ? requests.find((r) => r._id === event.requestId) : null,
    [event?.requestId, requests]
  )

  const calendarLink = useMemo(() => {
    if (!event?.description) return null
    const match = event.description.match(
      /https?:\/\/(?:www\.)?google\.com\/calendar\/event\?eid=\S+|https?:\/\/calendar\.google\.com\/calendar\/\S+/i
    )
    if (!match?.[0]) return null
    return match[0].replace(/[),.]+$/, '')
  }, [event?.description])

  const { contractSum, paid, leftToPay, status } = useMemo(() => {
    if (!event) return { contractSum: 0, paid: 0, leftToPay: 0, status: null }

    const eventTransactions = transactions
      .filter((transaction) => transaction.eventId === event._id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const totals = eventTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') acc.income += transaction.amount
        else acc.expense += transaction.amount
        return acc
      },
      { income: 0, expense: 0 }
    )

    const contractSumValue = Number(event.contractSum ?? 0)
    const paidValue = totals.income
    const leftToPayValue = Math.max(contractSumValue - paidValue, 0)
    const statusValue =
      EVENT_STATUSES_SIMPLE.find((item) => item.value === event.status) ??
      EVENT_STATUSES.find((item) => item.value === event.status)

    return {
      contractSum: contractSumValue,
      paid: paidValue,
      leftToPay: leftToPayValue,
      status: statusValue,
    }
  }, [event, transactions])

  if (!event) return null

  const eventStart = event.eventDate ? new Date(event.eventDate) : null
  const eventEnd = event.dateEnd ? new Date(event.dateEnd) : eventStart
  const now = new Date()
  const eventDateLabel = event.eventDate
    ? formatDate(event.eventDate, false, true)
    : '-'

  const rawStatus = status?.value ?? event.status
  const isActiveLike =
    rawStatus === 'active' ||
    rawStatus === 'planned' ||
    rawStatus === 'in_progress' ||
    rawStatus === 'completed'

  const statusLabel = isActiveLike
    ? eventEnd && eventEnd.getTime() < now.getTime()
      ? 'Завершено'
      : 'Запланировано'
    : status?.name ?? 'Не указан'

  const coordsLink =
    event?.address?.latitude && event?.address?.longitude
      ? `dgis://2gis.ru/geo/${event.address.longitude},${event.address.latitude}`
      : null
  const searchAddress =
    event?.address?.town && event?.address?.street && event?.address?.house
      ? `${event.address.town}, ${event.address.street}, ${event.address.house}`
      : null
  const searchLink = searchAddress
    ? `https://2gis.ru/search/${encodeURIComponent(searchAddress).replaceAll(
        '%20',
        ''
      )}`
    : null
  const mapLink = event?.address?.link2Gis || coordsLink || searchLink

  return (
    <div style={style} className="px-2 py-1">
      <div
        className="laptop:flex-row laptop:items-start laptop:gap-4 relative flex h-full cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        onClick={() => modalsFunc.event?.edit(event._id)}
      >
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(event) => event.stopPropagation()}
        >
          <CardButtons
            item={event}
            typeOfItem="event"
            minimalActions
            alwaysCompact
            calendarLink={calendarLink}
            onEdit={() => modalsFunc.event?.edit(event._id)}
          />
        </div>
        <div className="flex items-center justify-between gap-x-1">
          <div className="flex min-w-0 items-center gap-2">
            {event.isTransferred && (
              <FontAwesomeIcon
                icon={faShare}
                className="h-4 w-4 text-amber-500"
                title="Передано коллеге"
              />
            )}
            <div className="truncate text-lg font-semibold text-gray-900">
              {event.title ||
                `Мероприятие${
                  client ? ` для ${client.firstName ?? 'клиента'}` : ''
                }`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!client && (
              <FontAwesomeIcon
                icon={faUserSlash}
                className="h-4 w-4 text-red-500"
                title="Клиент не указан"
              />
            )}
            <div
              className={cn(
                'mr-10 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm',
                getEventStatusBadgeClasses(status?.value ?? event.status)
              )}
            >
              {statusLabel}
            </div>
          </div>
        </div>
        <div className="flex gap-x-1">
          <div className="flex min-w-0 flex-1 flex-col gap-1 pr-2">
            <div className="text-lg font-semibold text-gray-700">
              {eventDateLabel}
            </div>
            <div className="flex flex-nowrap items-center gap-x-3 text-sm text-gray-600">
              <span className="font-medium">Клиент:</span>
              <span className="truncate">
                {client
                  ? `${client.firstName ?? ''} ${
                      client.secondName ?? ''
                    }`.trim() || client._id
                  : '-'}
                {client?.phone ? ` ( +${client.phone} )` : ''}
              </span>
            </div>
            <div className="flex flex-nowrap items-center gap-x-3 text-sm text-gray-600">
              <span className="font-medium">Место:</span>
              <span className="truncate">
                {formatAddress(event.address, '-')}
              </span>
            </div>
            {event.requestId && (
              <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-600">
                <span className="font-medium">Заявка:</span>
                {request ? (
                  <button
                    type="button"
                    className="font-medium text-blue-600 underline underline-offset-2"
                    onClick={(event) => {
                      event.stopPropagation()
                      modalsFunc.request?.view(request._id)
                    }}
                  >
                    {request.clientName || request._id}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-gray-400 underline underline-offset-2"
                    onClick={(event) => {
                      event.stopPropagation()
                      modalsFunc.request?.view(event.requestId)
                    }}
                  >
                    {event.requestId}
                  </button>
                )}
              </div>
            )}
            {mapLink && (
              <div className="mt-1">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  title="Открыть в 2ГИС"
                  onClick={(event) => event.stopPropagation()}
                  className="flex h-8 w-8 items-center justify-center transition-transform hover:scale-110"
                >
                  <img
                    src="/img/navigators/2gis.png"
                    alt="2gis"
                    className="h-5 w-5"
                  />
                </a>
              </div>
            )}
          </div>

          <div className="laptop:min-w-[240px] laptop:self-start flex shrink-0">
            <div className="flex flex-col gap-2 rounded-md border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700">
              <div className="flex items-center justify-between gap-3">
                <FontAwesomeIcon
                  icon={faHandHoldingDollar}
                  className="h-6 w-6"
                />
                <span className="font-semibold text-green-700">
                  {paid.toLocaleString()} руб.
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <FontAwesomeIcon icon={faClock} className="h-6 w-6" />
                <span
                  className={cn(
                    'font-semibold',
                    leftToPay > 0 ? 'text-amber-700' : 'text-green-700'
                  )}
                >
                  {leftToPay.toLocaleString()} руб.
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="h-5 min-h-5 w-5 min-w-5">
                  <SvgSigma className="fill-current" />
                </div>
                <span className="font-semibold">
                  {contractSum.toLocaleString()} руб.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
