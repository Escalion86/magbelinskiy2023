import DateTimePicker from '@components/DateTimePicker'
import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import IconCheckBox from '@components/IconCheckBox'
import Input from '@components/Input'
import InputWrapper from '@components/InputWrapper'
import Textarea from '@components/Textarea'
import EventStatusPicker from '@components/ValuePicker/EventStatusPicker'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { DEFAULT_EVENT } from '@helpers/constants'
import useErrors from '@helpers/useErrors'
import clientsAtom from '@state/atoms/clientsAtom'
import colleaguesAtom from '@state/atoms/colleaguesAtom'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { modalsFuncAtom } from '@state/atoms'
import eventSelector from '@state/selectors/eventSelector'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAtomValue } from 'jotai'

const eventFunc = (eventId, clone = false) => {
  const EventModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
  }) => {
    const event = useAtomValue(eventSelector(eventId))
    const setEvent = useAtomValue(itemsFuncAtom).event.set
    const clients = useAtomValue(clientsAtom)
    const colleagues = useAtomValue(colleaguesAtom)
    const modalsFunc = useAtomValue(modalsFuncAtom)

    const [clientId, setClientId] = useState(
      event?.clientId ?? DEFAULT_EVENT.clientId
    )
    const [status, setStatus] = useState(event?.status ?? DEFAULT_EVENT.status)
    const [colleagueId, setColleagueId] = useState(
      event?.colleagueId ?? DEFAULT_EVENT.colleagueId
    )
    const [eventDate, setEventDate] = useState(
      event?.eventDate ?? DEFAULT_EVENT.eventDate
    )
    const [location, setLocation] = useState(
      event?.location ?? DEFAULT_EVENT.location
    )
    const [contractSum, setContractSum] = useState(
      DEFAULT_EVENT.contractSum ?? 0
    )
    const [comment, setComment] = useState(DEFAULT_EVENT.comment ?? '')
    const [calendarImportChecked, setCalendarImportChecked] = useState(
      DEFAULT_EVENT.calendarImportChecked ?? false
    )

    const importedFromCalendar =
      event?.importedFromCalendar ?? DEFAULT_EVENT.importedFromCalendar

    // const originalRef = useRef({
    //   clientId: event?.clientId ?? null,
    //   status: event?.status ?? DEFAULT_EVENT.status,
    //   colleagueId: event?.colleagueId ?? null,
    //   eventDate: event?.eventDate ?? DEFAULT_EVENT.eventDate ?? null,
    //   location:
    //     typeof event?.location === 'string'
    //       ? event.location
    //       : typeof DEFAULT_EVENT.location === 'string'
    //       ? DEFAULT_EVENT.location
    //       : '',
    //   contractSum:
    //     typeof event?.contractSum === 'number'
    //       ? event.contractSum
    //       : typeof DEFAULT_EVENT.contractSum === 'number'
    //       ? DEFAULT_EVENT.contractSum
    //       : 0,
    //   comment:
    //     typeof event?.comment === 'string'
    //       ? event.comment
    //       : typeof DEFAULT_EVENT.comment === 'string'
    //       ? DEFAULT_EVENT.comment
    //       : '',
    //   calendarImportChecked: Boolean(
    //     event?.calendarImportChecked ?? DEFAULT_EVENT.calendarImportChecked
    //   ),
    // })

    // useEffect(() => {
    //   originalRef.current = {
    //     clientId: event?.clientId ?? null,
    //     status: event?.status ?? DEFAULT_EVENT.status,
    //     colleagueId: event?.colleagueId ?? null,
    //     eventDate: event?.eventDate ?? DEFAULT_EVENT.eventDate ?? null,
    //     location:
    //       typeof event?.location === 'string'
    //         ? event.location
    //         : typeof DEFAULT_EVENT.location === 'string'
    //         ? DEFAULT_EVENT.location
    //         : '',
    //     contractSum:
    //       typeof event?.contractSum === 'number'
    //         ? event.contractSum
    //         : typeof DEFAULT_EVENT.contractSum === 'number'
    //         ? DEFAULT_EVENT.contractSum
    //         : 0,
    //     comment:
    //       typeof event?.comment === 'string'
    //         ? event.comment
    //         : typeof DEFAULT_EVENT.comment === 'string'
    //         ? DEFAULT_EVENT.comment
    //         : '',
    //     calendarImportChecked: Boolean(
    //       event?.calendarImportChecked ?? DEFAULT_EVENT.calendarImportChecked
    //     ),
    //   }

    //   setClientId(originalRef.current.clientId)
    //   setStatus(originalRef.current.status)
    //   setColleagueId(originalRef.current.colleagueId)
    //   setEventDate(originalRef.current.eventDate)
    //   setLocation(originalRef.current.location)
    //   setContractSum(originalRef.current.contractSum)
    //   setComment(originalRef.current.comment)
    //   setCalendarImportChecked(originalRef.current.calendarImportChecked)
    // }, [event])

    useEffect(() => {
      if (status !== 'transferred' && colleagueId !== null) {
        setColleagueId(null)
      }
    }, [status, colleagueId])

    const [errors, , addError, removeError, clearErrors] = useErrors()

    const isFormChanged = useMemo(
      () =>
        (event?.clientId ?? DEFAULT_EVENT.clientId) !== clientId ||
        (event?.status ?? DEFAULT_EVENT.status) !== status ||
        (event?.colleagueId ?? DEFAULT_EVENT.colleagueId) !== colleagueId ||
        (event?.eventDate ?? DEFAULT_EVENT.eventDate) !== eventDate ||
        (event?.eventDate ?? DEFAULT_EVENT.location) !== location ||
        (event?.eventDate ?? DEFAULT_EVENT.contractSum) !== contractSum ||
        (event?.eventDate ?? DEFAULT_EVENT.comment) !== comment ||
        (event?.eventDate ?? DEFAULT_EVENT.calendarImportChecked) !==
          calendarImportChecked,
      [
        clientId,
        status,
        colleagueId,
        eventDate,
        location,
        contractSum,
        comment,
        calendarImportChecked,
        event,
      ]
    )

    useEffect(() => {
      const onClickConfirm = () => {
        clearErrors()
        let hasError = false

        if (!clientId) {
          addError({ clientId: 'Выберите клиента' })
          hasError = true
        }
        if (status === 'transferred' && !colleagueId) {
          addError({ colleagueId: 'Выберите коллегу' })
          hasError = true
        }

        if (!hasError) {
          closeModal()
          const normalizedContractSum =
            typeof contractSum === 'number' && !Number.isNaN(contractSum)
              ? contractSum
              : 0
          setEvent(
            {
              _id: event?._id,
              clientId,
              requestId: event.requestId ?? null,
              status,
              colleagueId: status === 'transferred' ? colleagueId : null,
              eventDate,
              location: location ? location.trim() : '',
              contractSum: normalizedContractSum,
              comment: comment?.trim() ?? '',
              calendarImportChecked,
            },
            clone
          )
        }
      }

      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
      setOnConfirmFunc(isFormChanged ? onClickConfirm : undefined)
    }, [
      clientId,
      status,
      colleagueId,
      eventDate,
      location,
      contractSum,
      comment,
      calendarImportChecked,
      event,
    ])

    const selectedClient = useMemo(
      () =>
        clientId && clients.length
          ? clients.find((client) => client._id === clientId)
          : null,
      [clientId, clients]
    )

    const sortedColleagues = useMemo(
      () =>
        [...colleagues].sort((a, b) =>
          (a.name ?? '').localeCompare(b.name ?? '')
        ),
      [colleagues]
    )

    const openClientSelectModal = () => {
      const ClientSelectModal = ({ closeModal }) => {
        const [search, setSearch] = useState('')
        const filteredClients = clients
          .filter((client) => {
            if (!search.trim()) return true
            const text = search.trim().toLowerCase()
            return [
              client.firstName,
              client.secondName,
              client.priorityContact,
              client.phone ? `+${client.phone}` : '',
            ]
              .filter(Boolean)
              .join(' ')
              .toLowerCase()
              .includes(text)
          })
          .sort((a, b) => (a.firstName ?? '').localeCompare(b.firstName ?? ''))

        const onPick = (client) => {
          setClientId(client._id)
          closeModal()
        }

        return (
          <div className="flex h-full flex-col gap-2">
            <Input
              label="Поиск клиента"
              value={search}
              onChange={setSearch}
              placeholder="Имя, телефон или контакт"
            />
            <div className="flex-1 overflow-auto rounded border border-gray-200">
              {filteredClients.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">
                  Клиенты не найдены
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredClients.map((client) => (
                    <button
                      key={client._id}
                      className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-gray-50"
                      onClick={() => onPick(client)}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {[client.firstName, client.secondName]
                            .filter(Boolean)
                            .join(' ') || '[Без имени]'}
                        </span>
                        <span className="text-sm text-gray-600">
                          {client.phone
                            ? `+${client.phone}`
                            : 'Телефон не указан'}
                        </span>
                      </div>
                      {client.priorityContact && (
                        <span className="text-xs text-gray-500">
                          {client.priorityContact}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      }

      modalsFunc.custom({
        title: 'Выбор клиента',
        confirmButtonName: 'Закрыть',
        Children: ClientSelectModal,
      })
    }

    return (
      <FormWrapper>
        <InputWrapper label="Клиент" required error={errors.clientId} paddingY>
          <div className="flex items-center gap-2">
            <div
              className="flex-1 cursor-pointer rounded border border-gray-300 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              onClick={openClientSelectModal}
            >
              <div className="text-base font-semibold text-gray-900">
                {[selectedClient?.firstName, selectedClient?.secondName]
                  .filter(Boolean)
                  .join(' ') || 'Не выбрано'}
              </div>
              <div className="text-sm text-gray-600">
                {selectedClient?.priorityContact || 'Контакт не указан'}
              </div>
              <div className="text-sm text-gray-600">
                {selectedClient?.phone
                  ? `+${selectedClient.phone}`
                  : 'Телефон не указан'}
              </div>
            </div>
            {clientId && (
              <button
                type="button"
                className="flex h-[54px] w-[54px] items-center justify-center rounded bg-gray-100 text-primary shadow-sm transition hover:bg-gray-200"
                onClick={() => modalsFunc.client?.edit(clientId)}
                title="Редактировать клиента"
              >
                ✎
              </button>
            )}
          </div>
        </InputWrapper>

        <EventStatusPicker status={status} onChange={setStatus} required />
        {status === 'transferred' && (
          <InputWrapper
            label="Кому передано"
            required
            error={errors.colleagueId}
          >
            <select
              className="h-9 w-full rounded border border-gray-300 px-2 text-sm focus:border-general focus:outline-none"
              value={colleagueId ?? ''}
              onChange={(e) => {
                removeError('colleagueId')
                const value = e.target.value || null
                setColleagueId(value)
              }}
            >
              <option value="">Не выбрано</option>
              {sortedColleagues.map((colleague) => (
                <option key={colleague._id} value={colleague._id}>
                  {colleague.name}{' '}
                  {colleague.phone ? `(+${colleague.phone})` : ''}
                </option>
              ))}
            </select>
          </InputWrapper>
        )}

        <DateTimePicker
          value={eventDate}
          onChange={(value) => {
            removeError('eventDate')
            setEventDate(value ?? null)
          }}
          label="Дата мероприятия"
          error={errors.eventDate}
        />
        <Input
          label="Локация"
          type="text"
          value={location}
          onChange={setLocation}
        />
        <Input
          label="Договорная сумма"
          type="number"
          value={contractSum}
          onChange={setContractSum}
          min={0}
        />
        <Textarea
          label="Комментарий"
          onChange={setComment}
          value={comment}
          rows={3}
        />
        <IconCheckBox
          checked={calendarImportChecked}
          onClick={() => setCalendarImportChecked((checked) => !checked)}
          label={
            importedFromCalendar
              ? 'Импорт из календаря проверен'
              : 'Проверка мероприятия завершена'
          }
          checkedIcon={faCircleCheck}
          checkedIconColor="#10B981"
          big
        />
        <ErrorsList errors={errors} />
      </FormWrapper>
    )
  }

  return {
    title: `${eventId && !clone ? 'Редактирование' : 'Создание'} мероприятия`,
    confirmButtonName: eventId && !clone ? 'Применить' : 'Создать',
    Children: EventModal,
  }
}

export default eventFunc
