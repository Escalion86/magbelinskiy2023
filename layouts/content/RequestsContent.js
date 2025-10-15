'use client'

import { useMemo, useState } from 'react'
import ContentHeader from '@components/ContentHeader'
import Button from '@components/Button'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import DateTimePicker from '@components/DateTimePicker'
import requestsAtom from '@state/atoms/requestsAtom'
import clientsAtom from '@state/atoms/clientsAtom'
import eventsAtom from '@state/atoms/eventsAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { REQUEST_STATUSES } from '@helpers/constants'
import formatDate from '@helpers/formatDate'

const emptyForm = {
  clientName: '',
  clientPhone: '',
  contactChannels: '',
  eventDate: null,
  location: '',
  contractSum: '',
  comment: '',
}

const statusMap = REQUEST_STATUSES.reduce((acc, item) => {
  acc[item.value] = item
  return acc
}, {})

const statusClassNames = {
  new: 'bg-blue-500',
  in_progress: 'bg-amber-500',
  converted: 'bg-green-500',
  canceled: 'bg-red-500',
}

const RequestsContent = () => {
  const [requests, setRequests] = useRecoilState(requestsAtom)
  const setClients = useSetRecoilState(clientsAtom)
  const setEvents = useSetRecoilState(eventsAtom)

  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState('')

  const sortedRequests = useMemo(
    () =>
      [...requests].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      }),
    [requests]
  )

  const handleReset = () => {
    setForm(emptyForm)
    setEditingId(null)
    setFormError('')
  }

  const updateCollections = ({ request, client, event }) => {
    if (request) {
      setRequests((prev) =>
        prev.some((item) => item._id === request._id)
          ? prev.map((item) => (item._id === request._id ? request : item))
          : [request, ...prev]
      )
    }
    if (client) {
      setClients((prev) => {
        if (!client._id) return prev
        const exists = prev.find((item) => item._id === client._id)
        if (exists)
          return prev.map((item) => (item._id === client._id ? client : item))
        return [...prev, client]
      })
    }
    if (event) {
      setEvents((prev) => {
        if (prev.some((item) => item._id === event._id))
          return prev.map((item) => (item._id === event._id ? event : item))
        return [...prev, event]
      })
    }
  }

  const handleSubmit = async () => {
    setFormLoading(true)
    setFormError('')
    try {
      const payload = {
        clientName: form.clientName.trim(),
        clientPhone: form.clientPhone,
        contactChannels: form.contactChannels,
        eventDate: form.eventDate,
        location: form.location,
        contractSum: form.contractSum,
        comment: form.comment,
      }

      const url = editingId ? `/api/requests/${editingId}` : '/api/requests'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.error || 'Ошибка сохранения заявки')

      updateCollections(data.data)
      handleReset()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = (request) => {
    setEditingId(request._id)
    setForm({
      clientName: request.clientName ?? '',
      clientPhone: request.clientPhone ?? '',
      contactChannels: Array.isArray(request.contactChannels)
        ? request.contactChannels.join('\n')
        : '',
      eventDate: request.eventDate ?? null,
      location: request.location ?? '',
      contractSum:
        request.contractSum !== undefined && request.contractSum !== null
          ? String(request.contractSum)
          : '',
      comment: request.comment ?? '',
    })
    setFormError('')
  }

  const handleStatusChange = async (requestId, status) => {
    setActionLoading(requestId)
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.error || 'Не удалось обновить статус')
      updateCollections(data.data)
    } catch (error) {
      setFormError(error.message)
    } finally {
      setActionLoading('')
    }
  }

  const handleConvert = async (requestId) => {
    setActionLoading(requestId)
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ convertToEvent: true }),
      })
      const data = await response.json()
      if (!response.ok || !data.success)
        throw new Error(data.error || 'Не удалось создать мероприятие')
      updateCollections(data.data)
    } catch (error) {
      setFormError(error.message)
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <ContentHeader>
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-xl font-semibold">Заявки</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Всего: {requests.length}</span>
          </div>
        </div>
      </ContentHeader>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">
          {editingId ? 'Редактирование заявки' : 'Новая заявка'}
        </h3>
        <div className="grid gap-3 laptop:grid-cols-2">
          <Input
            label="Имя клиента"
            value={form.clientName}
            onChange={(value) => setForm((prev) => ({ ...prev, clientName: value }))}
            required
          />
          <Input
            label="Телефон"
            value={form.clientPhone}
            onChange={(value) => setForm((prev) => ({ ...prev, clientPhone: value }))}
            required
          />
          <DateTimePicker
            label="Дата и время мероприятия"
            value={form.eventDate}
            onChange={(value) => setForm((prev) => ({ ...prev, eventDate: value }))}
          />
          <Input
            label="Место проведения"
            value={form.location}
            onChange={(value) => setForm((prev) => ({ ...prev, location: value }))}
          />
          <Input
            label="Сумма по договору"
            type="number"
            value={form.contractSum}
            onChange={(value) => setForm((prev) => ({ ...prev, contractSum: value }))}
          />
          <Textarea
            label="Контакты"
            value={form.contactChannels}
            onChange={(value) => setForm((prev) => ({ ...prev, contactChannels: value }))}
            rows={3}
          />
        </div>
        <Textarea
          className="mt-3"
          label="Комментарий"
          value={form.comment}
          onChange={(value) => setForm((prev) => ({ ...prev, comment: value }))}
          rows={3}
        />
        {formError && <div className="mt-2 text-sm text-danger">{formError}</div>}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            name={editingId ? 'Сохранить' : 'Создать заявку'}
            onClick={handleSubmit}
            loading={formLoading}
            disabled={formLoading}
          />
          {editingId && (
            <Button
              name="Отменить"
              classBgColor="bg-gray-200"
              classHoverBgColor="hover:bg-gray-300"
              className="text-gray-700"
              onClick={handleReset}
              disabled={formLoading}
            />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Клиент
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Дата заявки
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Дата мероприятия
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Место
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Сумма
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Статус
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Комментарий
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedRequests.map((request) => {
              const status = statusMap[request.status] ?? statusMap.new
              const isLoading = actionLoading === request._id
              return (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 align-top text-sm text-gray-900">
                    <div className="font-semibold">{request.clientName}</div>
                    <div className="text-xs text-gray-500">
                      {request.clientPhone ? `+${request.clientPhone}` : '—'}
                    </div>
                    {request.contactChannels?.length > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        {request.contactChannels.join(', ')}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    {request.createdAt
                      ? formatDate(request.createdAt, false, true)
                      : '—'}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    {request.eventDate
                      ? formatDate(request.eventDate, false, true)
                      : '—'}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    {request.location || '—'}
                  </td>
                  <td className="px-4 py-3 align-top text-right text-sm text-gray-700">
                    {request.contractSum ? `${request.contractSum.toLocaleString()} ₽` : '—'}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold text-white ${
                          statusClassNames[status.value] || 'bg-blue-500'
                        }`}
                      >
                        {status.name}
                      </span>
                      <select
                        value={request.status}
                        onChange={(event) =>
                          handleStatusChange(request._id, event.target.value)
                        }
                        disabled={isLoading}
                        className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-700"
                      >
                        {REQUEST_STATUSES.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-600">
                    {request.comment || '—'}
                  </td>
                  <td className="px-4 py-3 align-top text-right text-sm">
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        name="Редактировать"
                        thin
                        onClick={() => handleEdit(request)}
                        classBgColor="bg-white"
                        classHoverBgColor="hover:bg-gray-100"
                        className="border border-gray-300 text-gray-700"
                      />
                      <Button
                        name={request.eventId ? 'Открыть мероприятие' : 'Преобразовать'}
                        thin
                        onClick={() =>
                          request.eventId
                            ? null
                            : handleConvert(request._id)
                        }
                        disabled={!!request.eventId || isLoading}
                        loading={isLoading}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
            {sortedRequests.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  Заявок пока нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RequestsContent
