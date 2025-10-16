'use client'

import { useMemo } from 'react'
import ContentHeader from '@components/ContentHeader'
import Button from '@components/Button'
import requestsAtom from '@state/atoms/requestsAtom'
import { useAtomValue } from 'jotai'
import { modalsFuncAtom } from '@state/atoms'
import { REQUEST_STATUSES } from '@helpers/constants'
import formatDate from '@helpers/formatDate'

const createStatusMap = (statuses) =>
  statuses.reduce((acc, item) => {
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
  const requests = useAtomValue(requestsAtom)
  const modalsFunc = useAtomValue(modalsFuncAtom)

  const statusMap = useMemo(() => createStatusMap(REQUEST_STATUSES), [])

  const sortedRequests = useMemo(
    () =>
      [...requests].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      }),
    [requests]
  )

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <ContentHeader>
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-xl font-semibold">Заявки</h2>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>Всего: {requests.length}</span>
            <Button
              name="+"
              collapsing
              className="h-9 w-9 rounded-full text-lg"
              onClick={() => modalsFunc.request?.add()}
              disabled={!modalsFunc.request?.add}
            />
          </div>
        </div>
      </ContentHeader>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedRequests.map((request) => {
              const status = statusMap[request.status] ?? statusMap.new
              return (
                <tr
                  key={request._id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => modalsFunc.request?.edit(request._id)}
                >
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
                    <button
                      type="button"
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold text-white ${
                        statusClassNames[status.value] || 'bg-blue-500'
                      }`}
                      onClick={(event) => {
                        event.stopPropagation()
                        modalsFunc.request?.statusEdit(request._id)
                      }}
                    >
                      {status.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-600">
                    {request.comment || '—'}
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
