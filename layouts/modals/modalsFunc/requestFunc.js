import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import { DEFAULT_REQUEST } from '@helpers/constants'
import useErrors from '@helpers/useErrors'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAtomValue } from 'jotai'
import requestSelector from '@state/selectors/requestSelector'
import DateTimePicker from '@components/DateTimePicker'
import clientsAtom from '@state/atoms/clientsAtom'
import ClientPicker from '@components/ClientPicker'
import { modalsFuncAtom } from '@state/atoms'

const requestFunc = (requestId, clone = false) => {
  const RequestModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
    setTopLeftComponent,
  }) => {
    const request = useAtomValue(requestSelector(requestId))
    const setRequest = useAtomValue(itemsFuncAtom).request.set
    const clients = useAtomValue(clientsAtom)
    const modalsFunc = useAtomValue(modalsFuncAtom)

    const [clientId, setClientId] = useState(
      request?.clientId ?? DEFAULT_REQUEST.clientId ?? null
    )
    const [createdAt, setCreatedAt] = useState(null)
    const [eventDate, setEventDate] = useState(
      DEFAULT_REQUEST.eventDate ?? null
    )
    const [location, setLocation] = useState(
      DEFAULT_REQUEST.location ?? ''
    )
    const [contractSum, setContractSum] = useState(
      DEFAULT_REQUEST.contractSum ?? 0
    )
    const [comment, setComment] = useState(
      DEFAULT_REQUEST.comment ?? ''
    )
    const [yandexAim, setYandexAim] = useState('')
    const initializedRef = useRef(false)
    const yandexAimOptions = useMemo(
      () => [
        'poluchit_zvonok',
        'zakaz_show',
        'zakaz_zvonok',
        'after_focus_form',
        'form_test',
        'klick_nomber',
        'klick_WA',
        'klick_TG',
        'after_focus_click_number',
      ],
      []
    )

    const originalValues = useMemo(() => {
      const clientIdValue =
        request?.clientId ?? DEFAULT_REQUEST.clientId ?? null

      const createdAtValue =
        request?.createdAt ??
        (clone || !requestId
          ? new Date().toISOString()
          : DEFAULT_REQUEST.createdAt)

      const eventDateValue =
        request?.eventDate ??
        request?.date ??
        DEFAULT_REQUEST.eventDate ??
        null

      const legacyLocation = [request?.town, request?.address]
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter(Boolean)
        .join(', ')

      const locationValue =
        (typeof request?.location === 'string' && request.location.trim().length
          ? request.location.trim()
          : legacyLocation) ||
        (typeof DEFAULT_REQUEST.location === 'string'
          ? DEFAULT_REQUEST.location
          : '')

      const contractSumValue =
        typeof request?.contractSum === 'number'
          ? request.contractSum
          : typeof DEFAULT_REQUEST.contractSum === 'number'
          ? DEFAULT_REQUEST.contractSum
          : 0

      const commentValue =
        typeof request?.comment === 'string'
          ? request.comment
          : typeof DEFAULT_REQUEST.comment === 'string'
          ? DEFAULT_REQUEST.comment
          : ''

      const yandexAimValue =
        typeof request?.yandexAim === 'string' ? request.yandexAim : ''

      return {
        clientId: clientIdValue,
        createdAt: createdAtValue,
        eventDate: eventDateValue,
        location: locationValue,
        contractSum: contractSumValue,
        comment: commentValue,
        yandexAim: yandexAimValue,
      }
    }, [request, clone, requestId])

    useEffect(() => {
      initializedRef.current = false
    }, [requestId, clone])

    useEffect(() => {
      if (initializedRef.current) return
      if (requestId && !request) return
      setClientId(originalValues.clientId)
      setCreatedAt(originalValues.createdAt)
      setEventDate(originalValues.eventDate)
      setLocation(originalValues.location)
      setContractSum(originalValues.contractSum)
      setComment(originalValues.comment)
      setYandexAim(originalValues.yandexAim)
      initializedRef.current = true
    }, [clone, originalValues, request, requestId])

    const [errors, , addError, removeError] = useErrors()

    const selectedClient = useMemo(
      () =>
        clientId && clients.length
          ? clients.find((client) => client._id === clientId)
          : null,
      [clientId, clients]
    )

    const openClientSelectModal = () => {
      modalsFunc.client?.select((newClientId) => {
        setClientId(newClientId)
        removeError('clientId')
      })
    }

    const onClickConfirm = useCallback(async () => {
      let hasCustomError = false

      if (!clientId) {
        addError({ clientId: 'Выберите клиента' })
        hasCustomError = true
      }

      if (!selectedClient?.phone) {
        addError({ clientId: 'У клиента не указан телефон' })
        hasCustomError = true
      }

      if (!hasCustomError) {
        closeModal()
        const normalizedLocation = location ? location.trim() : ''
        const normalizedContractSum =
          typeof contractSum === 'number' && !Number.isNaN(contractSum)
            ? contractSum
            : 0
        const normalizedCreatedAt =
          createdAt || (clone || !requestId ? new Date().toISOString() : null)
        const normalizedEventDate = eventDate ?? null

        const clientNameValue = [selectedClient?.firstName, selectedClient?.secondName]
          .filter(Boolean)
          .join(' ')

        setRequest(
          {
            _id: request?._id,
            clientId,
            clientName: clientNameValue || selectedClient?._id,
            clientPhone: selectedClient?.phone ?? null,
            createdAt: normalizedCreatedAt,
            eventDate: normalizedEventDate,
            location: normalizedLocation,
            contractSum: normalizedContractSum,
            comment: comment.trim(),
            yandexAim: yandexAim.trim(),
          },
          clone
        )
      }
    }, [
      request,
      clientId,
      eventDate,
      location,
      contractSum,
      comment,
      yandexAim,
      closeModal,
      setRequest,
      addError,
      selectedClient,
    ])

    const isFormChanged = useMemo(
      () =>
        (originalValues.clientId ?? null) !== (clientId ?? null) ||
        originalValues.createdAt !== createdAt ||
        (originalValues.eventDate ?? null) !== (eventDate ?? null) ||
        originalValues.location !== location ||
        originalValues.contractSum !== contractSum ||
        originalValues.comment !== comment ||
        originalValues.yandexAim !== yandexAim,
      [
        originalValues,
        clientId,
        createdAt,
        eventDate,
        location,
        contractSum,
        comment,
        yandexAim,
      ]
    )

    const onConfirmRef = useRef(onClickConfirm)

    useEffect(() => {
      onConfirmRef.current = onClickConfirm
    }, [onClickConfirm])

    useEffect(() => {
      setOnConfirmFunc(
        isFormChanged ? () => onConfirmRef.current?.() : undefined
      )
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
    }, [
      isFormChanged,
      setDisableConfirm,
      setOnShowOnCloseConfirmDialog,
      setOnConfirmFunc,
    ])
    return (
      <FormWrapper>
        <ClientPicker
          selectedClient={selectedClient}
          selectedClientId={clientId}
          onSelectClick={openClientSelectModal}
          onCreateClick={() =>
            modalsFunc.client?.add((newClient) => {
              if (!newClient?._id) return
              setClientId(newClient._id)
              removeError('clientId')
            })
          }
          label="Клиент"
          required
          error={errors.clientId}
          paddingY
          fullWidth
        />
        <DateTimePicker
          value={createdAt}
          onChange={(value) => {
            removeError('createdAt')
            setCreatedAt(value ?? null)
          }}
          label="Дата заявки"
          error={errors.createdAt}
        />
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
        <Input
          label="Яндекс цель"
          type="text"
          value={yandexAim}
          onChange={setYandexAim}
          dataList={{ name: 'yandex-aim', list: yandexAimOptions }}
        />
        <ErrorsList errors={errors} />
      </FormWrapper>
    )
  }

  return {
    title: `${requestId && !clone ? 'Редактирование' : 'Создание'} заявки`,
    confirmButtonName: requestId && !clone ? 'Применить' : 'Создать',
    Children: RequestModal,
  }
}

export default requestFunc
