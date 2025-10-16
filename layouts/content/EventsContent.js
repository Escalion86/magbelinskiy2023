'use client'

import { useMemo, useState } from 'react'
import ContentHeader from '@components/ContentHeader'
import Button from '@components/Button'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import DateTimePicker from '@components/DateTimePicker'
import eventsAtom from '@state/atoms/eventsAtom'
import transactionsAtom from '@state/atoms/transactionsAtom'
import requestsAtom from '@state/atoms/requestsAtom'
import { useAtom, useAtomValue } from 'jotai'
import { modalsFuncAtom } from '@state/atoms'
import {
  EVENT_STATUSES,
  EVENT_STATUSES_SIMPLE,
  TRANSACTION_TYPES,
} from '@helpers/constants'
import { getEventStatusBadgeClasses } from '@helpers/eventStatusStyles'
import formatDate from '@helpers/formatDate'
import cn from 'classnames'

const defaultTransaction = {
  amount: '',
  type: 'expense',
  date: null,
  comment: '',
}

const statusOptions = [
  ...EVENT_STATUSES_SIMPLE,
  ...EVENT_STATUSES.filter(
    (status) =>
      !EVENT_STATUSES_SIMPLE.some((simple) => simple.value === status.value)
  ),
]

const EventsContent = () => {
  const [events, setEvents] = useAtom(eventsAtom)
  const [transactions, setTransactions] = useAtom(transactionsAtom)
  const requests = useAtomValue(requestsAtom)
  const modalsFunc = useAtomValue(modalsFuncAtom)

  const [formsState, setFormsState] = useState({})
  const [error, setError] = useState('')
  const [loadingEventId, setLoadingEventId] = useState('')
  const [loadingTransactionId, setLoadingTransactionId] = useState('')

  const requestsMap = useMemo(() => {
    const map = new Map()
    requests.forEach((request) => map.set(request._id, request))
    return map
  }, [requests])

  const transactionsByEvent = useMemo(() => {
    const grouped = new Map()
    transactions.forEach((transaction) => {
      if (!grouped.has(transaction.eventId)) grouped.set(transaction.eventId, [])
      grouped.get(transaction.eventId).push(transaction)
    })
    return grouped
  }, [transactions])

  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => {
        const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0
        const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0
        return dateB - dateA
      }),
    [events]
  )

  const updateEventState = (event) => {
    setEvents((prev) =>
      prev.map((item) => (item._id === event._id ? event : item))
    )
  }

  const handleEventUpdate = async (eventId, payload) => {
    setLoadingEventId(eventId)
    setError('')
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || !data.success)
        throw new Error(data.error || 'Не удалось обновить мероприятие')
      updateEventState(data.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoadingEventId('')
    }
  }

  const handleStatusChange = (eventId, status) =>
    handleEventUpdate(eventId, { status })

  const handleEventFieldChange = (eventId, field, value) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId ? { ...event, [field]: value } : event
      )
    )
  }

  const saveEventField = (eventId, field, value) =>
    handleEventUpdate(eventId, { [field]: value })

  const handleTransactionField = (eventId, field, value) => {
    setFormsState((prev) => ({
      ...prev,
      [eventId]: {
        ...(prev[eventId] ?? defaultTransaction),
        [field]: value,
      },
    }))
  }

  const handleAddTransaction = async (event) => {
    const form = formsState[event._id] ?? defaultTransaction
    if (!form.amount) {
      setError('Укажите сумму транзакции')
      return
    }
    setLoadingTransactionId(event._id)
    setError('')
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event._id,
          clientId: event.clientId,
          requestId: event.requestId ?? null,
          amount: form.amount,
          type: form.type,
          date: form.date,
          comment: form.comment,
        }),
      })
      const data = await response.json()
      if (!response.ok || !data.success)
        throw new Error(data.error || 'Не удалось добавить транзакцию')
      setTransactions((prev) => [...prev, data.data])
      setFormsState((prev) => ({
        ...prev,
        [event._id]: { ...defaultTransaction },
      }))
    } catch (error) {
      setError(error.message)
    } finally {
      setLoadingTransactionId('')
    }
  }

  const handleDeleteTransaction = async (transactionId) => {
    setLoadingTransactionId(transactionId)
    setError('')
    try {
      const response = await fetch(`/api/transactions/${transactionId}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (!response.ok || !data.success)
        throw new Error(data.error || 'Не удалось удалить транзакцию')
      setTransactions((prev) =>
        prev.filter((transaction) => transaction._id !== transactionId)
      )
    } catch (error) {
      setError(error.message)
    } finally {
      setLoadingTransactionId('')
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <ContentHeader>
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-xl font-semibold">Мероприятия</h2>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>Всего: {events.length}</span>
            <Button
              name="+"
              collapsing
              className="h-9 w-9 rounded-full text-lg"
              onClick={() => modalsFunc.event?.add()}
              disabled={!modalsFunc.event?.add}
            />
          </div>
        </div>
      </ContentHeader>
      {error && <div className="rounded border border-danger bg-red-50 p-3 text-sm text-danger">{error}</div>}
      <div className="flex-1 space-y-4 overflow-auto">
        {sortedEvents.map((event) => {
          const status =
            EVENT_STATUSES_SIMPLE.find((item) => item.value === event.status) ??
            EVENT_STATUSES.find((item) => item.value === event.status)
          const request = event.requestId
            ? requestsMap.get(event.requestId)
            : null
          const eventTransactions = (transactionsByEvent.get(event._id) ?? []).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          const totals = eventTransactions.reduce(
            (acc, transaction) => {
              if (transaction.type === 'income') acc.income += transaction.amount
              else acc.expense += transaction.amount
              return acc
            },
            { income: 0, expense: 0 }
          )
          const form = formsState[event._id] ?? defaultTransaction
          const isEventLoading = loadingEventId === event._id
          const isTransactionLoading = loadingTransactionId === event._id

          return (
            <div
              key={event._id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 laptop:flex-row laptop:items-start laptop:justify-between">
                <div>
                  <div className="text-lg font-semibold">
                    {event.title || `Мероприятие для ${event.clientName ?? 'клиента'}`}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Клиент: {event.clientName || '—'}{' '}
                    {event.clientPhone ? `( +${event.clientPhone} )` : ''}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Дата заявки:{' '}
                    {request?.createdAt
                      ? formatDate(request.createdAt, false, true)
                      : event.requestDate
                      ? formatDate(event.requestDate, false, true)
                      : '—'}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Дата мероприятия:{' '}
                    {event.eventDate
                      ? formatDate(event.eventDate, false, true)
                      : '—'}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Место: {event.location || '—'}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Комментарий: {event.comment || '—'}
                  </div>
                  {event.requestId && (
                    <div className="mt-1 text-sm text-gray-600">
                      Заявка:{' '}
                      {request ? (
                        <button
                          type="button"
                          className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-500"
                          onClick={() => modalsFunc.request?.edit(request._id)}
                        >
                          Открыть заявку
                        </button>
                      ) : (
                        <span className="text-gray-400">{event.requestId}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
                        getEventStatusBadgeClasses(status?.value ?? event.status)
                      )}
                    >
                      {status?.name ?? 'Не указан'}
                    </span>
                    <select
                      value={event.status}
                      onChange={(eventTarget) =>
                        handleStatusChange(event._id, eventTarget.target.value)
                      }
                      disabled={isEventLoading}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-700"
                    >
                      {statusOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <DateTimePicker
                    label="Дата мероприятия"
                    value={event.eventDate}
                    onChange={(value) => {
                      handleEventFieldChange(event._id, 'eventDate', value)
                      saveEventField(event._id, 'eventDate', value)
                    }}
                  />
                  <Input
                    label="Место"
                    value={event.location ?? ''}
                    onChange={(value) =>
                      handleEventFieldChange(event._id, 'location', value)
                    }
                    onBlur={(eventTarget) =>
                      saveEventField(event._id, 'location', eventTarget.target.value)
                    }
                  />
                  <Input
                    label="Сумма по договору"
                    type="number"
                    value={event.contractSum ?? 0}
                    onChange={(value) =>
                      handleEventFieldChange(event._id, 'contractSum', value)
                    }
                    onBlur={(eventTarget) =>
                      saveEventField(event._id, 'contractSum', eventTarget.target.value)
                    }
                  />
                  <Textarea
                    label="Комментарий"
                    value={event.comment ?? ''}
                    onChange={(value) =>
                      handleEventFieldChange(event._id, 'comment', value)
                    }
                    onBlur={(eventTarget) =>
                      saveEventField(event._id, 'comment', eventTarget.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="flex flex-col gap-2 laptop:flex-row laptop:items-center laptop:justify-between">
                  <div className="text-sm text-gray-700">
                    Расходы: {totals.expense.toLocaleString()} ₽ | Доходы:{' '}
                    {totals.income.toLocaleString()} ₽
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Input
                      label="Сумма"
                      type="number"
                      value={form.amount}
                      onChange={(value) =>
                        handleTransactionField(event._id, 'amount', value)
                      }
                    />
                    <DateTimePicker
                      label="Дата"
                      value={form.date}
                      onChange={(value) =>
                        handleTransactionField(event._id, 'date', value)
                      }
                    />
                    <select
                      value={form.type}
                      onChange={(eventTarget) =>
                        handleTransactionField(event._id, 'type', eventTarget.target.value)
                      }
                      className="mt-5 rounded border border-gray-300 px-2 py-1 text-sm"
                    >
                      {TRANSACTION_TYPES.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <Textarea
                      label="Комментарий"
                      value={form.comment}
                      onChange={(value) =>
                        handleTransactionField(event._id, 'comment', value)
                      }
                      rows={2}
                    />
                    <Button
                      name="Добавить транзакцию"
                      onClick={() => handleAddTransaction(event)}
                      loading={isTransactionLoading}
                      disabled={isTransactionLoading}
                    />
                  </div>
                </div>
                {eventTransactions.length > 0 ? (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-white">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-600">
                            Дата
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-600">
                            Тип
                          </th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-600">
                            Сумма
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-600">
                            Комментарий
                          </th>
                          <th className="px-3 py-2" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {eventTransactions.map((transaction) => (
                          <tr key={transaction._id}>
                            <td className="px-3 py-2">
                              {transaction.date
                                ? formatDate(transaction.date, false, true)
                                : '—'}
                            </td>
                            <td className="px-3 py-2">
                              {
                                TRANSACTION_TYPES.find(
                                  (item) => item.value === transaction.type
                                )?.name ?? '—'
                              }
                            </td>
                            <td className="px-3 py-2 text-right">
                              {transaction.amount.toLocaleString()} ₽
                            </td>
                            <td className="px-3 py-2 text-gray-600">
                              {transaction.comment || '—'}
                            </td>
                            <td className="px-3 py-2 text-right">
                              <Button
                                name="Удалить"
                                thin
                                classBgColor="bg-white"
                                classHoverBgColor="hover:bg-gray-100"
                                className="border border-gray-300 text-gray-700"
                                onClick={() => handleDeleteTransaction(transaction._id)}
                                loading={loadingTransactionId === transaction._id}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-gray-500">
                    Транзакций пока нет
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {sortedEvents.length === 0 && (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
            Мероприятий пока нет
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsContent
