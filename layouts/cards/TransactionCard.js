'use client'

import PropTypes from 'prop-types'
import CardButtons from '@components/CardButtons'
import formatDate from '@helpers/formatDate'

const typeClassNames = {
  income: 'bg-green-500',
  expense: 'bg-red-500',
}

const formatTransactionDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  const datePart = formatDate(date.toISOString(), false, true)
  const timePart = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${datePart} ${timePart}`
}

const TransactionCard = ({
  transaction,
  client,
  event,
  type,
  style,
  onEdit,
  onDelete,
}) => {
  const clientName = client
    ? `${client.firstName || ''} ${client.secondName || ''}`.trim()
    : '-'

  const eventTitle =
    event?.title?.trim() ||
    (event?.eventDate
      ? `Мероприятие ${formatDate(event.eventDate, false, true)}`
      : '-')

  const eventDateTime = event?.eventDate
    ? `${formatDate(event.eventDate, false, true)} ${new Date(
        event.eventDate
      ).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    : null

  const eventTitleWithDate = eventDateTime
    ? `${eventTitle} - ${eventDateTime}`
    : eventTitle

  return (
    <div style={style} className="px-2 py-2">
      <div
        role="button"
        tabIndex={0}
        onClick={onEdit}
        className="group relative flex h-full w-full cursor-pointer overflow-visible rounded-xl border border-gray-200 bg-white p-4 pr-4 text-left shadow-sm transition hover:border-gray-300 hover:shadow"
      >
        <div
          className="absolute right-2 top-2 z-10"
          onClick={(event) => event.stopPropagation()}
        >
          <CardButtons
            item={transaction}
            typeOfItem="transaction"
            minimalActions
            alwaysCompact
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
        <div
          className={`absolute left-0 top-0 h-full w-1.5 ${
            typeClassNames[type?.value ?? transaction.type] || 'bg-gray-300'
          }`}
        />

        <div className="flex h-full w-full flex-col gap-2 pl-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="text-sm font-semibold text-gray-900">
              {formatTransactionDate(transaction.date)}
            </div>
          </div>
          <div className="grid gap-2 text-sm text-gray-700 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="truncate">
              <div className="truncate font-medium text-gray-800">
                {clientName || '-'}
              </div>
            </div>
            <div className="truncate">
              <div className="truncate font-medium text-gray-800">
                {eventTitleWithDate}
              </div>
            </div>
          </div>
          {transaction.comment && (
            <div className="text-sm text-gray-600">
              {transaction.comment}
            </div>
          )}
        </div>
        <div className="mt-auto self-end whitespace-nowrap text-right text-lg font-semibold text-gray-900">
          {transaction.amount
            ? `${transaction.amount.toLocaleString()} ₽`
            : '0 ₽'}
        </div>
      </div>
    </div>
  )
}

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    type: PropTypes.string,
    clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    eventId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comment: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
  client: PropTypes.shape({
    firstName: PropTypes.string,
    secondName: PropTypes.string,
  }),
  event: PropTypes.shape({
    title: PropTypes.string,
    eventDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
  }),
  type: PropTypes.shape({
    value: PropTypes.string,
  }),
  style: PropTypes.shape({}),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

TransactionCard.defaultProps = {
  client: null,
  event: null,
  type: null,
  style: null,
}

export default TransactionCard
