import DateTimePicker from '@components/DateTimePicker'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import InputWrapper from '@components/InputWrapper'
import { TRANSACTION_TYPES } from '@helpers/constants'
import { postData, putData } from '@helpers/CRUD'
import transactionsAtom from '@state/atoms/transactionsAtom'
import eventSelector from '@state/selectors/eventSelector'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

const transactionFunc = ({ eventId, transactionId, contractSum } = {}) => {
  const TransactionModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
  }) => {
    const event = useAtomValue(eventSelector(eventId))
    const transactions = useAtomValue(transactionsAtom)
    const setTransactions = useSetAtom(transactionsAtom)

    const transaction = useMemo(
      () =>
        transactionId
          ? transactions.find((item) => item._id === transactionId)
          : null,
      [transactionId, transactions]
    )

    const initialAmount = useMemo(
      () => transaction?.amount ?? 0,
      [transaction?.amount]
    )
    const initialType = useMemo(
      () => transaction?.type ?? 'income',
      [transaction?.type]
    )
    const initialDate = useMemo(() => {
      if (transaction?.date) return new Date(transaction.date).toISOString()
      if (event?.eventDate) return new Date(event.eventDate).toISOString()
      return new Date().toISOString()
    }, [event?.eventDate, transaction?.date])
    const initialComment = useMemo(
      () => transaction?.comment ?? '',
      [transaction?.comment]
    )

    const [amount, setAmount] = useState(initialAmount)
    const [type, setType] = useState(initialType)
    const [date, setDate] = useState(initialDate)
    const [comment, setComment] = useState(initialComment)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const isFormChanged = useMemo(
      () =>
        initialAmount !== amount ||
        initialType !== type ||
        initialDate !== date ||
        initialComment !== comment,
      [amount, type, date, comment, initialAmount, initialType, initialDate, initialComment]
    )

    const handleSave = useCallback(async () => {
      if (!event?._id || !event?.clientId) {
        setError('Сначала сохраните мероприятие и выберите клиента')
        return
      }
      setError('')
      setLoading(true)

      const payload = {
        amount: Number(amount) || 0,
        type,
        date,
        comment: comment?.trim() ?? '',
      }

      if (transactionId) {
        const updated = await putData(
          `/api/transactions/${transactionId}`,
          payload,
          null,
          null,
          true
        )
        if (updated?.data) {
          setTransactions((prev) =>
            prev.map((item) =>
              item._id === transactionId ? updated.data : item
            )
          )
          closeModal()
        } else {
          setError('Не удалось обновить транзакцию')
        }
      } else {
        const created = await postData(
          '/api/transactions',
          {
            ...payload,
            eventId: event._id,
            clientId: event.clientId,
            requestId: event.requestId ?? null,
            contractSum,
          },
          null,
          null,
          true
        )
        if (created?.data) {
          setTransactions((prev) => [...prev, created.data])
          closeModal()
        } else {
          setError('Не удалось создать транзакцию')
        }
      }

      setLoading(false)
    }, [
      amount,
      type,
      date,
      comment,
      event?._id,
      event?.clientId,
      event?.requestId,
      transactionId,
      contractSum,
      setTransactions,
      closeModal,
    ])

    useEffect(() => {
      setOnConfirmFunc(handleSave)
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(
        loading ||
          !event?._id ||
          !event?.clientId ||
          (transactionId ? !isFormChanged : false)
      )
    }, [
      event?._id,
      event?.clientId,
      transactionId,
      handleSave,
      isFormChanged,
      loading,
      setDisableConfirm,
      setOnConfirmFunc,
      setOnShowOnCloseConfirmDialog,
    ])

    return (
      <FormWrapper>
        <Input
          label="Сумма"
          type="number"
          value={amount}
          onChange={setAmount}
          min={0}
          disabled={loading}
        />
        <InputWrapper label="Тип" paddingY fitWidth>
          <div className="flex gap-2">
            {TRANSACTION_TYPES.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`rounded border px-3 py-2 text-sm font-semibold transition ${
                  type === item.value
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setType(item.value)}
                disabled={loading}
              >
                {item.name}
              </button>
            ))}
          </div>
        </InputWrapper>
        <DateTimePicker
          value={date}
          onChange={(value) =>
            setDate(value ?? new Date().toISOString())
          }
          label="Дата"
          disabled={loading}
        />
        <Input
          label="Комментарий"
          value={comment}
          onChange={setComment}
          disabled={loading}
        />
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
      </FormWrapper>
    )
  }

  const isEdit = Boolean(transactionId)

  return {
    title: `${isEdit ? 'Редактирование' : 'Создание'} транзакции`,
    confirmButtonName: isEdit ? 'Сохранить' : 'Создать',
    Children: TransactionModal,
  }
}

export default transactionFunc
