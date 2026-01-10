'use client'

import cn from 'classnames'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { EVENT_STATUSES, EVENT_STATUSES_SIMPLE } from '@helpers/constants'
import { getEventStatusBadgeClasses } from '@helpers/eventStatusStyles'
import formatDate from '@helpers/formatDate'
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
  faTimeline,
} from '@fortawesome/free-solid-svg-icons'
import SvgSigma from 'svg/SvgSigma'

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

  return (
    <div style={style} className="px-2 py-1">
      <div
        className="laptop:flex-row laptop:items-start laptop:gap-4 relative flex h-full cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        onClick={() => modalsFunc.event?.edit(event._id)}
      >
        <div className="flex items-center justify-between gap-x-1">
          <div className="truncate text-lg font-semibold text-gray-900">
            {event.title ||
              `Мероприятие${
                client ? ` для ${client.firstName ?? 'клиента'}` : ''
              }`}
          </div>
          <div
            className={cn(
              'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm',
              getEventStatusBadgeClasses(status?.value ?? event.status)
            )}
          >
            {statusLabel}
          </div>
        </div>
        <div className="flex gap-x-1">
          <div className="flex min-w-0 flex-1 flex-col gap-1 pr-2">
            <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-600">
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
            <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-600">
              <span className="font-medium">Дата мероприятия:</span>
              <span>
                {event.eventDate
                  ? formatDate(event.eventDate, false, true)
                  : '-'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-600">
              <span className="font-medium">Место:</span>
              <span className="truncate">{event.location || '-'}</span>
            </div>
            {event.requestId && (
              <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-600">
                <span className="font-medium">Заявка:</span>
                {request ? (
                  <span className="font-medium text-blue-600 underline underline-offset-2">
                    {request.clientName || request._id}
                  </span>
                ) : (
                  <span className="text-gray-400">{event.requestId}</span>
                )}
              </div>
            )}
            {event.comment && (
              <div className="flex flex-wrap items-start gap-x-2 text-sm text-gray-600">
                <span className="font-medium">Комментарий:</span>
                <span className="max-h-12 overflow-hidden break-words">
                  {event.comment}
                </span>
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
