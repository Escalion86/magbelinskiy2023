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
import {
  DEFAULT_EVENT,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from '@helpers/constants'
import TabContext from '@components/Tabs/TabContext'
import TabPanel from '@components/Tabs/TabPanel'
import transactionsAtom from '@state/atoms/transactionsAtom'
import { deleteData } from '@helpers/CRUD'
import useErrors from '@helpers/useErrors'
import clientsAtom from '@state/atoms/clientsAtom'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { modalsFuncAtom } from '@state/atoms'
import eventSelector from '@state/selectors/eventSelector'
import requestSelector from '@state/selectors/requestSelector'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

const eventFunc = (eventId, clone = false, requestId = null) => {
  const EventModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
  }) => {
    const event = useAtomValue(eventSelector(eventId))
    const request = useAtomValue(requestSelector(requestId))
    const itemsFunc = useAtomValue(itemsFuncAtom)
    const setEvent = itemsFunc?.event?.set
    const convertRequest = itemsFunc?.request?.convert
    const clients = useAtomValue(clientsAtom)
    const colleagues = useMemo(
      () => clients.filter((client) => client.clientType === 'colleague'),
      [clients]
    )
    const modalsFunc = useAtomValue(modalsFuncAtom)
    const transactions = useAtomValue(transactionsAtom)
    const setTransactions = useSetAtom(transactionsAtom)
    const closeModalRef = useRef(closeModal)

    const initialIsTransferred =
      event?.isTransferred ??
      (event?.colleagueId ? true : DEFAULT_EVENT.isTransferred ?? false)

    const [clientId, setClientId] = useState(
      event?.clientId ?? request?.clientId ?? DEFAULT_EVENT.clientId
    )
    const [status, setStatus] = useState(
      event?.status ?? (requestId ? 'planned' : DEFAULT_EVENT.status)
    )
    const [eventDate, setEventDate] = useState(
      event?.eventDate ?? request?.eventDate ?? DEFAULT_EVENT.eventDate
    )
    const [dateEnd, setDateEnd] = useState(
      event?.dateEnd ?? DEFAULT_EVENT.dateEnd ?? null
    )
    const [dateEndTouched, setDateEndTouched] = useState(false)
    const [location, setLocation] = useState(
      event?.location ?? request?.location ?? DEFAULT_EVENT.location
    )
    const [contractSum, setContractSum] = useState(
      event?.contractSum ?? request?.contractSum ?? DEFAULT_EVENT.contractSum ?? 0
    )
    const [isByContract, setIsByContract] = useState(
      event?.isByContract ?? DEFAULT_EVENT.isByContract ?? false
    )
    const [isTransferred, setIsTransferred] = useState(initialIsTransferred)
    const [colleagueId, setColleagueId] = useState(
      event?.colleagueId ?? DEFAULT_EVENT.colleagueId ?? null
    )
    const [description, setDescription] = useState(
      event?.description ??
        event?.comment ??
        request?.comment ??
        DEFAULT_EVENT.description ??
        ''
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
        clientId: event?.clientId ?? request?.clientId ?? DEFAULT_EVENT.clientId,
        status: event?.status ?? (requestId ? 'planned' : DEFAULT_EVENT.status),
        eventDate:
          event?.eventDate ?? request?.eventDate ?? DEFAULT_EVENT.eventDate,
        location: event?.location ?? request?.location ?? DEFAULT_EVENT.location,
        contractSum:
          event?.contractSum ?? request?.contractSum ?? DEFAULT_EVENT.contractSum,
        isByContract: event?.isByContract ?? DEFAULT_EVENT.isByContract,
        description:
          event?.description ??
          event?.comment ??
          request?.comment ??
          DEFAULT_EVENT.description,
        dateEnd: event?.dateEnd ?? DEFAULT_EVENT.dateEnd,
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
        event?.description,
        event?.comment,
        event?.dateEnd,
        event?.calendarImportChecked,
        event?.colleagueId,
        initialIsTransferred,
        requestId,
        request?.clientId,
        request?.eventDate,
        request?.location,
        request?.contractSum,
        request?.comment,
      ]
    )

    const isFormChanged = useMemo(
      () =>
        initialEventValues.clientId !== clientId ||
        initialEventValues.status !== status ||
        initialEventValues.eventDate !== eventDate ||
        initialEventValues.dateEnd !== dateEnd ||
        initialEventValues.location !== location ||
        initialEventValues.contractSum !== contractSum ||
        initialEventValues.isByContract !== isByContract ||
        initialEventValues.isTransferred !== isTransferred ||
        initialEventValues.colleagueId !== colleagueId ||
        initialEventValues.description !== description ||
        initialEventValues.calendarImportChecked !== calendarImportChecked,
      [
        clientId,
        status,
        eventDate,
        dateEnd,
        location,
        contractSum,
        isByContract,
        isTransferred,
        colleagueId,
        description,
        calendarImportChecked,
        initialEventValues,
      ]
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

    const incomeTransactions = useMemo(
      () => eventTransactions.filter((item) => item.type === 'income'),
      [eventTransactions]
    )
    const expenseTransactions = useMemo(
      () => eventTransactions.filter((item) => item.type === 'expense'),
      [eventTransactions]
    )
    const incomeTotal = useMemo(
      () =>
        incomeTransactions.reduce(
          (total, item) => total + (item.amount ?? 0),
          0
        ),
      [incomeTransactions]
    )
    const hasTaxes = useMemo(
      () => eventTransactions.some((item) => item.category === 'taxes'),
      [eventTransactions]
    )
    const canClose = contractSum <= incomeTotal && (!isByContract || hasTaxes)
    const statusDisabledValues = useMemo(() => {
      if (status === 'closed') return []
      if (!canClose) return ['closed']
      return []
    }, [canClose, status])

    const addHourToDate = (value) => {
      if (!value) return null
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return null
      date.setHours(date.getHours() + 1)
      return date.toISOString()
    }

    useEffect(() => {
      if (dateEndTouched) return
      if (!eventDate) return
      if (!dateEnd) {
        setDateEnd(addHourToDate(eventDate))
      }
    }, [dateEnd, dateEndTouched, eventDate])

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
        if (
          status === 'closed' &&
          !canClose &&
          initialEventValues.status !== 'closed'
        ) {
          addErrorRef.current({
            status: isByContract
              ? 'Закрытие недоступно: нет транзакции Налоги или сумма поступлений меньше договорной'
              : 'Закрытие недоступно: сумма поступлений меньше договорной',
          })
          return
        }
        closeModalRef.current()
        const normalizedContractSum =
          typeof contractSum === 'number' && !Number.isNaN(contractSum)
            ? contractSum
            : 0
        const title =
          event?.title ??
          (request?.clientName
            ? `Мероприятие для ${request.clientName}`
            : DEFAULT_EVENT.title)
        const payload = {
          _id: event?._id,
          clientId,
          requestId: event?.requestId ?? requestId ?? null,
          status,
          isTransferred,
          colleagueId: isTransferred ? colleagueId : null,
          eventDate,
          dateEnd,
          location: location ? location.trim() : '',
          contractSum: normalizedContractSum,
          isByContract,
          description: description?.trim() ?? '',
          calendarImportChecked,
          title,
        }
        if (!event?._id && requestId && convertRequest) {
          convertRequest(requestId, payload)
          return
        }
        setEvent(payload, clone)
      }
    }, [
      addErrorRef,
      canClose,
      calendarImportChecked,
      clearErrorsRef,
      clientId,
      clone,
      closeModal,
      colleagueId,
      description,
      contractSum,
      isByContract,
      dateEnd,
      event?._id,
      event?.requestId,
      eventDate,
      isTransferred,
      initialEventValues.status,
      location,
      request?.clientName,
      requestId,
      convertRequest,
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
      modalsFunc.client?.select(
        (newColleagueId) => {
          setColleagueId(newColleagueId)
        },
        'Выбор коллеги',
        { clientTypes: ['colleague'] }
      )
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
            <EventStatusPicker
              status={status}
              onChange={setStatus}
              required
              disabledValues={statusDisabledValues}
              error={errors.status}
            />
            {!canClose && (
              <div className="text-xs text-gray-500">
                {isByContract && !hasTaxes
                  ? 'Закрытие недоступно: добавьте транзакцию Налоги.'
                  : 'Закрытие недоступно, пока сумма поступлений меньше договорной.'}
              </div>
            )}

            <DateTimePicker
              value={eventDate}
              onChange={(value) => {
                removeError('eventDate')
                setEventDate(value ?? null)
              }}
              label="Дата начала"
              error={errors.eventDate}
            />
            <DateTimePicker
              value={dateEnd}
              onChange={(value) => {
                setDateEndTouched(true)
                setDateEnd(value ?? null)
              }}
              label="Дата окончания"
            />
            <Input
              label="Локация"
              type="text"
              value={location}
              onChange={setLocation}
            />
            <Textarea
              label="Описание"
              onChange={setDescription}
              value={description}
              rows={3}
            />
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
            <IconCheckBox
              checked={isByContract}
              onClick={() => setIsByContract((prev) => !prev)}
              label="По договору"
              checkedIcon={faCircleCheck}
              checkedIconColor="#2563EB"
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
                  <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-500">
                    Поступления
                  </div>
                  {incomeTransactions.length === 0 ? (
                    <div className="px-3 pb-3 text-sm text-gray-500">
                      Поступлений нет
                    </div>
                  ) : (
                    incomeTransactions.map((transaction) => (
                      <div
                        key={transaction._id}
                        className="laptop:flex-row laptop:items-center laptop:justify-between flex flex-col gap-2 px-3 py-3"
                      >
                        <div className="flex flex-1 flex-wrap gap-3 text-sm">
                          <span className="font-semibold text-gray-900">
                            {transaction.amount.toLocaleString()} руб.
                          </span>
                          <span className="text-emerald-700">
                            {TRANSACTION_TYPES.find(
                              (item) => item.value === transaction.type
                            )?.name ?? transaction.type}
                          </span>
                          {transaction.category && (
                            <span className="text-gray-600">
                              {
                                TRANSACTION_CATEGORIES.find(
                                  (item) => item.value === transaction.category
                                )?.name
                              }
                            </span>
                          )}
                          <span className="text-gray-600">
                            {transaction.date
                              ? new Date(transaction.date).toLocaleString(
                                  'ru-RU'
                                )
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
                            onClick={() =>
                              openTransactionModal(transaction._id)
                            }
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
                    ))
                  )}
                  <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-500">
                    Расходы
                  </div>
                  {expenseTransactions.length === 0 ? (
                    <div className="px-3 pb-3 text-sm text-gray-500">
                      Расходов нет
                    </div>
                  ) : (
                    expenseTransactions.map((transaction) => (
                      <div
                        key={transaction._id}
                        className="laptop:flex-row laptop:items-center laptop:justify-between flex flex-col gap-2 px-3 py-3"
                      >
                        <div className="flex flex-1 flex-wrap gap-3 text-sm">
                          <span className="font-semibold text-gray-900">
                            {transaction.amount.toLocaleString()} руб.
                          </span>
                          <span className="text-red-700">
                            {TRANSACTION_TYPES.find(
                              (item) => item.value === transaction.type
                            )?.name ?? transaction.type}
                          </span>
                          {transaction.category && (
                            <span className="text-gray-600">
                              {
                                TRANSACTION_CATEGORIES.find(
                                  (item) => item.value === transaction.category
                                )?.name
                              }
                            </span>
                          )}
                          <span className="text-gray-600">
                            {transaction.date
                              ? new Date(transaction.date).toLocaleString(
                                  'ru-RU'
                                )
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
                            onClick={() =>
                              openTransactionModal(transaction._id)
                            }
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
                    ))
                  )}
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
