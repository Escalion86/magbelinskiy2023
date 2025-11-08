import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import { DEFAULT_REQUEST } from '@helpers/constants'
import useErrors from '@helpers/useErrors'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAtomValue } from 'jotai'
import requestSelector from '@state/selectors/requestSelector'
import DateTimePicker from '@components/DateTimePicker'
import PhoneInput from '@components/PhoneInput'

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

    const [clientName, setClientName] = useState(
      DEFAULT_REQUEST.clientName ?? ''
    )
    const [clientPhone, setClientPhone] = useState(
      DEFAULT_REQUEST.clientPhone ? Number(DEFAULT_REQUEST.clientPhone) : null
    )
    const [contactChannels, setContactChannels] = useState('')
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

    const originalValues = useMemo(() => {
      const originalName =
        request?.clientName ?? request?.name ?? DEFAULT_REQUEST.clientName ?? ''

      const rawPhone =
        request?.clientPhone ??
        request?.phone ??
        DEFAULT_REQUEST.clientPhone ??
        ''

      let sanitizedPhone = `${rawPhone}`.replace(/[^0-9]/g, '')

      if (sanitizedPhone.length === 10)
        sanitizedPhone = `7${sanitizedPhone}`
      else if (sanitizedPhone.length === 11 && sanitizedPhone.startsWith('8'))
        sanitizedPhone = `7${sanitizedPhone.slice(1)}`

      const clientPhoneValue =
        sanitizedPhone.length > 0 ? Number(sanitizedPhone) : null

      const contactSources = Array.isArray(request?.contactChannels)
        ? request.contactChannels
        : request?.contact
        ? [request.contact]
        : Array.isArray(DEFAULT_REQUEST.contactChannels)
        ? DEFAULT_REQUEST.contactChannels
        : []

      const contactChannelsValue = contactSources
        .filter((item) => typeof item === 'string' && item.trim().length > 0)
        .map((item) => item.trim())
        .join('\n')

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
        clientName: originalName,
        clientPhone: clientPhoneValue,
        contactChannels: contactChannelsValue,
        eventDate: eventDateValue,
        location: locationValue,
        contractSum: contractSumValue,
        comment: commentValue,
        yandexAim: yandexAimValue,
      }
    }, [request])

    useEffect(() => {
      setClientName(originalValues.clientName)
      setClientPhone(originalValues.clientPhone)
      setContactChannels(originalValues.contactChannels)
      setEventDate(originalValues.eventDate)
      setLocation(originalValues.location)
      setContractSum(originalValues.contractSum)
      setComment(originalValues.comment)
      setYandexAim(originalValues.yandexAim)
    }, [originalValues])

    const [errors, checkErrors, addError, removeError] = useErrors()

    const onClickConfirm = useCallback(async () => {
      const hasPhoneError = checkErrors({ phone: clientPhone })

      let hasCustomError = false

      if (!clientName || !clientName.trim()) {
        addError({ clientName: 'Укажите имя клиента' })
        hasCustomError = true
      }

      if (!hasPhoneError && !hasCustomError) {
        closeModal()
        const normalizedLocation = location ? location.trim() : ''
        const normalizedContractSum =
          typeof contractSum === 'number' && !Number.isNaN(contractSum)
            ? contractSum
            : 0
        const normalizedPhone =
          typeof clientPhone === 'number' && !Number.isNaN(clientPhone)
            ? clientPhone
            : null
        const normalizedEventDate = eventDate ?? null

        setRequest(
          {
            _id: request?._id,
            clientId: request?.clientId ?? null,
            clientName: clientName.trim(),
            clientPhone: normalizedPhone,
            contactChannels: contactChannels
              .split(/[\n,;]/)
              .map((value) => value.trim())
              .filter(Boolean),
            eventDate: normalizedEventDate,
            location: normalizedLocation,
            contractSum: normalizedContractSum,
            comment: comment.trim(),
            yandexAim: yandexAim.trim(),
          },
          clone
        )
        // if (direction && !clone) {
        //   await putData(
        //     `/api/directions/${direction._id}`,
        //     {
        //       title,
        //       description,
        //       showOnSite,
        //       image,
        //     },
        //     refreshPage
        //   )
        // } else {
        //   await postData(
        //     `/api/directions`,
        //     {
        //       title,
        //       description,
        //       showOnSite,
        //       image,
        //     },
        //     refreshPage
        //   )
        // }
      }
    }, [
      request,
      clientName,
      clientPhone,
      contactChannels,
      eventDate,
      location,
      contractSum,
      comment,
      yandexAim,
      checkErrors,
      closeModal,
      setRequest,
      addError,
    ])

    useEffect(() => {
      const isFormChanged =
        originalValues.clientName !== clientName ||
        (originalValues.clientPhone ?? null) !== (clientPhone ?? null) ||
        originalValues.contactChannels !== contactChannels ||
        (originalValues.eventDate ?? null) !== (eventDate ?? null) ||
        originalValues.location !== location ||
        originalValues.contractSum !== contractSum ||
        originalValues.comment !== comment ||
        originalValues.yandexAim !== yandexAim

      setOnConfirmFunc(isFormChanged ? onClickConfirm : undefined)
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
    }, [
      originalValues,
      clientName,
      clientPhone,
      contactChannels,
      eventDate,
      location,
      contractSum,
      comment,
      yandexAim,
      onClickConfirm,
      setDisableConfirm,
      setOnShowOnCloseConfirmDialog,
      setOnConfirmFunc,
    ])
    return (
      <FormWrapper>
        <Input
          label="Имя клиента"
          type="text"
          value={clientName}
          onChange={(value) => {
            removeError('clientName')
            setClientName(value)
          }}
          required
          error={errors.clientName}
        />
        <PhoneInput
          required
          label="Телефон клиента"
          value={clientPhone}
          onChange={(value) => {
            removeError('phone')
            setClientPhone(value)
          }}
          error={errors.phone}
        />
        <Textarea
          label="Способы связи"
          onChange={setContactChannels}
          value={contactChannels}
          rows={2}
          comment="Каждый способ с новой строки или через запятую"
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
