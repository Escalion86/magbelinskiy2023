import DateTimePicker from '@components/DateTimePicker'
import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import IconCheckBox from '@components/IconCheckBox'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import EventStatusPicker from '@components/ValuePicker/EventStatusPicker'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import ClientPicker from '@components/ClientPicker'
import ColleaguePicker from '@components/ColleaguePicker'
import { DEFAULT_EVENT, TRANSACTION_TYPES } from '@helpers/constants'
import TabContext from '@components/Tabs/TabContext'
import TabPanel from '@components/Tabs/TabPanel'
import transactionsAtom from '@state/atoms/transactionsAtom'
import { deleteData } from '@helpers/CRUD'
import useErrors from '@helpers/useErrors'
import clientsAtom from '@state/atoms/clientsAtom'
import colleaguesAtom from '@state/atoms/colleaguesAtom'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { modalsFuncAtom } from '@state/atoms'
import eventSelector from '@state/selectors/eventSelector'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

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
    const transactions = useAtomValue(transactionsAtom)
    const setTransactions = useSetAtom(transactionsAtom)
    const closeModalRef = useRef(closeModal)

    const initialIsTransferred =
      event?.isTransferred ??
      (event?.colleagueId ? true : DEFAULT_EVENT.isTransferred ?? false)

    const [clientId, setClientId] = useState(
      event?.clientId ?? DEFAULT_EVENT.clientId
    )
    const [status, setStatus] = useState(event?.status ?? DEFAULT_EVENT.status)
    const [eventDate, setEventDate] = useState(
      event?.eventDate ?? DEFAULT_EVENT.eventDate
    )
    const [location, setLocation] = useState(
      event?.location ?? DEFAULT_EVENT.location
    )
    const [contractSum, setContractSum] = useState(
      event?.contractSum ?? DEFAULT_EVENT.contractSum ?? 0
    )
    const [isTransferred, setIsTransferred] = useState(initialIsTransferred)
    const [colleagueId, setColleagueId] = useState(
      event?.colleagueId ?? DEFAULT_EVENT.colleagueId ?? null
    )
    const [comment, setComment] = useState(
      event?.comment ?? DEFAULT_EVENT.comment ?? ''
    )
    const [calendarImportChecked, setCalendarImportChecked] = useState(
      event?.calendarImportChecked ??
        DEFAULT_EVENT.calendarImportChecked ??
        false
    )

    const importedFromCalendar =
      event?.importedFromCalendar ?? DEFAULT_EVENT.importedFromCalendar

    const [errors, , addError, removeError, clearErrors] = useErrors()
    const addErrorRef = useRef(addError)
    const clearErrorsRef = useRef(clearErrors)

    useEffect(() => {
      addErrorRef.current = addError
      clearErrorsRef.current = clearErrors
      closeModalRef.current = closeModal
    }, [addError, clearErrors, closeModal])

    const initialEventValues = useMemo(
      () => ({
        clientId: event?.clientId ?? DEFAULT_EVENT.clientId,
        status: event?.status ?? DEFAULT_EVENT.status,
        eventDate: event?.eventDate ?? DEFAULT_EVENT.eventDate,
        location: event?.location ?? DEFAULT_EVENT.location,
        contractSum: event?.contractSum ?? DEFAULT_EVENT.contractSum,
        comment: event?.comment ?? DEFAULT_EVENT.comment,
        calendarImportChecked:
          event?.calendarImportChecked ?? DEFAULT_EVENT.calendarImportChecked,
        colleagueId: event?.colleagueId ?? DEFAULT_EVENT.colleagueId,
        isTransferred: initialIsTransferred,
      }),
      [
        event?.clientId,
        event?.status,
        event?.eventDate,
        event?.location,
        event?.contractSum,
        event?.comment,
        event?.calendarImportChecked,
        event?.colleagueId,
        initialIsTransferred,
      ]
    )

    const isFormChanged = useMemo(
      () =>
        initialEventValues.clientId !== clientId ||
        initialEventValues.status !== status ||
        initialEventValues.eventDate !== eventDate ||
        initialEventValues.location !== location ||
        initialEventValues.contractSum !== contractSum ||
        initialEventValues.isTransferred !== isTransferred ||
        initialEventValues.colleagueId !== colleagueId ||
        initialEventValues.comment !== comment ||
        initialEventValues.calendarImportChecked !== calendarImportChecked,
      [
        clientId,
        status,
        eventDate,
        location,
        contractSum,
        isTransferred,
        colleagueId,
        comment,
        calendarImportChecked,
        initialEventValues,
      ]
    )

    const onClickConfirm = useCallback(() => {
      clearErrorsRef.current()
      let hasError = false

      if (!clientId) {
        addErrorRef.current({ clientId: 'Выберите клиента' })
        hasError = true
      }
      if (isTransferred && !colleagueId) {
        addErrorRef.current({ colleagueId: 'Выберите коллегу' })
        hasError = true
      }

      if (!hasError) {
        closeModalRef.current()
        const normalizedContractSum =
          typeof contractSum === 'number' && !Number.isNaN(contractSum)
            ? contractSum
            : 0
        setEvent(
          {
            _id: event?._id,
            clientId,
            requestId: event?.requestId ?? null,
            status,
            isTransferred,
            colleagueId: isTransferred ? colleagueId : null,
            eventDate,
            location: location ? location.trim() : '',
            contractSum: normalizedContractSum,
            comment: comment?.trim() ?? '',
            calendarImportChecked,
          },
          clone
        )
      }
    }, [
      addErrorRef,
      calendarImportChecked,
      clearErrorsRef,
      clientId,
      clone,
      closeModal,
      colleagueId,
      comment,
      contractSum,
      event?._id,
      event?.requestId,
      eventDate,
      isTransferred,
      location,
      setEvent,
      status,
    ])

    useEffect(() => {
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
      setOnConfirmFunc(isFormChanged ? onClickConfirm : undefined)
    }, [
      isFormChanged,
      onClickConfirm,
      setDisableConfirm,
      setOnConfirmFunc,
      setOnShowOnCloseConfirmDialog,
    ])

    const selectedClient = useMemo(
      () =>
        clientId && clients.length
          ? clients.find((client) => client._id === clientId)
          : null,
      [clientId, clients]
    )

    const eventTransactions = useMemo(
      () =>
        (transactions ?? [])
          .filter((transaction) => transaction.eventId === event?._id)
          .sort(
            (a, b) =>
              new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
          ),
      [event?._id, transactions]
    )

    const [financeError, setFinanceError] = useState('')
    const [financeLoading, setFinanceLoading] = useState(false)

    const handleDeleteTransaction = async (id) => {
      setFinanceError('')
      setFinanceLoading(true)
      const response = await deleteData(`/api/transactions/${id}`)
      if (response !== null) {
        setTransactions((prev) => prev.filter((item) => item._id !== id))
      } else {
        setFinanceError('Не удалось удалить транзакцию')
      }
      setFinanceLoading(false)
    }

    const openClientSelectModal = () => {
      modalsFunc.client?.select((newClientId) => {
        setClientId(newClientId)
      })
    }

    const selectedColleague = useMemo(
      () =>
        colleagueId && colleagues.length
          ? colleagues.find((colleague) => colleague._id === colleagueId)
          : null,
      [colleagueId, colleagues]
    )

    const openColleagueSelectModal = () => {
      modalsFunc.colleague?.select((newColleagueId) => {
        setColleagueId(newColleagueId)
      })
    }

    const openTransactionModal = (transactionId) => {
      if (!event?._id || !event?.clientId) {
        setFinanceError('Сначала сохраните мероприятие и выберите клиента')
        return
      }
      setFinanceError('')
      if (transactionId)
        modalsFunc.transaction?.edit(event._id, transactionId, {
          contractSum,
        })
      else modalsFunc.transaction?.add(event._id, { contractSum })
    }

    return (
      <TabContext value="Общие">
        <TabPanel tabName="Общие">
          <FormWrapper>
              <ClientPicker
                selectedClient={selectedClient}
                selectedClientId={clientId}
                onSelectClick={openClientSelectModal}
                label="Клиент"
                required
                error={errors.clientId}
                paddingY
                fullWidth
              />

            <EventStatusPicker status={status} onChange={setStatus} required />

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
            <div className="flex flex-col gap-3 rounded border border-gray-200 bg-gray-50 p-3">
              <IconCheckBox
                checked={isTransferred}
                onClick={() => {
                  setIsTransferred((prev) => !prev)
                  removeError('colleagueId')
                }}
                label="Передано коллеге"
                checkedIcon={faCircleCheck}
                checkedIconColor="#F97316"
              />
              {isTransferred && (
                <ColleaguePicker
                  selectedColleague={selectedColleague}
                  selectedColleagueId={colleagueId}
                  onSelectClick={openColleagueSelectModal}
                  label="Коллега"
                  required={isTransferred}
                  error={errors.colleagueId}
                  paddingY
                  fullWidth
                />
              )}
            </div>
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
        </TabPanel>

        <TabPanel tabName="Финансы">
          <div className="flex flex-col gap-4">
            <Input
              label="Договорная сумма"
              type="number"
              value={contractSum}
              onChange={setContractSum}
              min={0}
            />

            <div className="flex items-center justify-between gap-3">
              <div className="text-base font-semibold text-gray-900">
                Транзакции
              </div>
              <button
                type="button"
                className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => openTransactionModal()}
                disabled={financeLoading || !event?._id || !event?.clientId}
              >
                Добавить транзакцию
              </button>
            </div>

            {financeError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {financeError}
              </div>
            )}

            <div className="rounded border border-gray-200 bg-white shadow-sm">
              {eventTransactions.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-500">
                  Транзакции не найдены
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {eventTransactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="laptop:flex-row laptop:items-center laptop:justify-between flex flex-col gap-2 px-3 py-3"
                    >
                      <div className="flex flex-1 flex-wrap gap-3 text-sm">
                        <span className="font-semibold text-gray-900">
                          {transaction.amount.toLocaleString()} руб.
                        </span>
                        <span
                          className={
                            transaction.type === 'income'
                              ? 'text-emerald-700'
                              : 'text-red-700'
                          }
                        >
                          {TRANSACTION_TYPES.find(
                            (item) => item.value === transaction.type
                          )?.name ?? transaction.type}
                        </span>
                        <span className="text-gray-600">
                          {transaction.date
                            ? new Date(transaction.date).toLocaleString('ru-RU')
                            : ''}
                        </span>
                        {transaction.comment && (
                          <span className="text-gray-700">
                            {transaction.comment}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                          onClick={() => openTransactionModal(transaction._id)}
                          disabled={financeLoading}
                        >
                          Редактировать
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-300 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50"
                          onClick={() =>
                            handleDeleteTransaction(transaction._id)
                          }
                          disabled={financeLoading}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabPanel>
      </TabContext>
    )
  }

  return {
    title: `${eventId && !clone ? 'Редактирование' : 'Создание'} мероприятия`,
    confirmButtonName: eventId && !clone ? 'Применить' : 'Создать',
    Children: EventModal,
  }
}

export default eventFunc
