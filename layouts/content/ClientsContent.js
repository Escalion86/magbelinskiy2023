'use client'

import { useMemo, useState } from 'react'
import ContentHeader from '@components/ContentHeader'
import Input from '@components/Input'
import clientsAtom from '@state/atoms/clientsAtom'
import requestsAtom from '@state/atoms/requestsAtom'
import eventsAtom from '@state/atoms/eventsAtom'
import { useRecoilValue } from 'recoil'
import formatDate from '@helpers/formatDate'

const ClientsContent = () => {
  const clients = useRecoilValue(clientsAtom)
  const requests = useRecoilValue(requestsAtom)
  const events = useRecoilValue(eventsAtom)

  const [search, setSearch] = useState('')

  const clientsWithStats = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase()
    return clients
      .map((client) => {
        const clientRequests = requests.filter(
          (request) => request.clientId === client._id
        )
        const clientEvents = events.filter(
          (event) => event.clientId === client._id
        )
        const lastRequest = clientRequests.reduce((latest, request) => {
          if (!request.createdAt) return latest
          const requestDate = new Date(request.createdAt)
          return !latest || requestDate > latest ? requestDate : latest
        }, null)
        return {
          ...client,
          requestsCount: clientRequests.length,
          eventsCount: clientEvents.length,
          lastRequest,
        }
      })
      .filter((client) => {
        if (!lowerSearch) return true
        return [
          client.firstName,
          client.secondName,
          client.phone ? `+${client.phone}` : '',
          client.priorityContact ?? '',
        ]
          .join(' ')
          .toLowerCase()
          .includes(lowerSearch)
      })
      .sort((a, b) => {
        if (a.lastRequest && b.lastRequest)
          return b.lastRequest.getTime() - a.lastRequest.getTime()
        if (a.lastRequest) return -1
        if (b.lastRequest) return 1
        return (b.requestsCount || 0) - (a.requestsCount || 0)
      })
  }, [clients, events, requests, search])

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <ContentHeader>
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-xl font-semibold">Клиенты</h2>
          <div className="text-sm text-gray-600">Всего: {clients.length}</div>
        </div>
      </ContentHeader>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <Input
          label="Поиск клиента"
          value={search}
          onChange={setSearch}
          placeholder="Введите имя, телефон или контакт"
        />
      </div>
      <div className="flex-1 overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-gray-500">
                Клиент
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-gray-500">
                Телефон
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-gray-500">
                Контакты
              </th>
              <th className="px-4 py-3 text-right font-semibold uppercase tracking-wide text-gray-500">
                Заявки
              </th>
              <th className="px-4 py-3 text-right font-semibold uppercase tracking-wide text-gray-500">
                Мероприятия
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-gray-500">
                Последняя заявка
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clientsWithStats.map((client) => (
              <tr key={client._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">
                  {client.firstName || '—'}{' '}
                  {client.secondName || ''}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {client.phone ? `+${client.phone}` : '—'}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {client.priorityContact || '—'}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {client.requestsCount}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {client.eventsCount}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {client.lastRequest
                    ? formatDate(client.lastRequest.toISOString(), false, true)
                    : '—'}
                </td>
              </tr>
            ))}
            {clientsWithStats.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  Клиенты не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClientsContent
