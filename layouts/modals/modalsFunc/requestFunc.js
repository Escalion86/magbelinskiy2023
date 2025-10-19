import CheckBox from '@components/CheckBox'
import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import {
  AUDIENCE,
  DEFAULT_REQUEST,
  EVENT_TYPES,
  SPECTATORS,
} from '@helpers/constants'
import useErrors from '@helpers/useErrors'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { useCallback, useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import ComboBox from '@components/ComboBox'
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

    const [phone, setPhone] = useState(request?.phone ?? DEFAULT_REQUEST.phone)
    const [source, setSource] = useState(
      request?.source ?? DEFAULT_REQUEST.source
    )
    const [date, setDate] = useState(request?.date ?? DEFAULT_REQUEST.date)
    const [audience, setAudience] = useState(
      request?.audience ?? DEFAULT_REQUEST.audience
    )
    const [type, setType] = useState(request?.type ?? DEFAULT_REQUEST.type)
    const [customType, setCustomType] = useState(
      request?.customType ?? DEFAULT_REQUEST.customType
    )
    const [spectators, setSpectators] = useState(
      request?.spectators ?? DEFAULT_REQUEST.spectators
    )
    const [town, setTown] = useState(request?.town ?? DEFAULT_REQUEST.town)
    const [address, setAddress] = useState(
      request?.address ?? DEFAULT_REQUEST.address
    )
    const [official, setOfficial] = useState(
      request?.official ?? DEFAULT_REQUEST.official
    )
    const [comment, setComment] = useState(
      request?.comment ?? DEFAULT_REQUEST.comment
    )

    const [errors, checkErrors, addError, removeError, clearErrors] =
      useErrors()

    const onClickConfirm = useCallback(async () => {
      if (!checkErrors({ date })) {
        closeModal()
        setRequest(
          {
            _id: request?._id,
            phone,
            source,
            date,
            audience,
            type,
            customType,
            spectators,
            town,
            address,
            official,
            comment,
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
      phone,
      source,
      date,
      audience,
      type,
      customType,
      spectators,
      town,
      address,
      official,
      comment,
      checkErrors,
      closeModal,
      setRequest,
    ])

    useEffect(() => {
      const isFormChanged =
        (request?.phone ?? DEFAULT_REQUEST.phone) !== phone ||
        (request?.source ?? DEFAULT_REQUEST.source) !== source ||
        (request?.date ?? DEFAULT_REQUEST.date) !== date ||
        (request?.audience ?? DEFAULT_REQUEST.audience) !== audience ||
        (request?.type ?? DEFAULT_REQUEST.type) !== type ||
        (request?.customType ?? DEFAULT_REQUEST.customType) !== customType ||
        (request?.spectators ?? DEFAULT_REQUEST.spectators) !== spectators ||
        (request?.town ?? DEFAULT_REQUEST.town) !== town ||
        (request?.address ?? DEFAULT_REQUEST.address) !== address ||
        (request?.official ?? DEFAULT_REQUEST.official) !== official ||
        (request?.comment ?? DEFAULT_REQUEST.comment) !== comment

      setOnConfirmFunc(isFormChanged ? onClickConfirm : undefined)
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
    }, [
      // request,
      phone,
      source,
      date,
      audience,
      type,
      customType,
      spectators,
      town,
      address,
      official,
      comment,
      // onClickConfirm,
      // setDisableConfirm,
      // setOnShowOnCloseConfirmDialog,
      // setOnConfirmFunc,
    ])
    return (
      <FormWrapper>
        {/* <Input
          label="Название"
          type="text"
          value={title}
          onChange={(value) => {
            removeError('title')
            setTitle(value)
          }}
          // labelClassName="w-40"
          error={errors.title}
        /> */}
        <DateTimePicker
          value={date}
          onChange={(date) => {
            removeError('date')
            setDateStart(date)
          }}
          label="Дата заявки"
          required
          error={errors.date}
          // noMargin
        />
        <ComboBox
          label="Тип"
          value={type}
          items={EVENT_TYPES}
          onChange={setType}
          paddingY="small"
          fullWidth={false}
          placeholder="Не выбрано"
        />
        {type === 'other' && (
          <Input
            label="Другой тип"
            type="text"
            value={customType}
            onChange={setCustomType}
          />
        )}
        <ComboBox
          label="Аудитория"
          value={audience}
          items={AUDIENCE}
          onChange={setAudience}
          paddingY="small"
          fullWidth={false}
          placeholder="Не выбрано"
        />
        <ComboBox
          label="Количество зрителей"
          value={spectators}
          items={SPECTATORS}
          onChange={setSpectators}
          paddingY="small"
          fullWidth={false}
          placeholder="Не выбрано"
        />
        <PhoneInput
          required
          label="Телефон заявителя"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          copyPasteButtons
        />
        <Input label="Город" type="text" value={town} onChange={setTown} />
        <Input
          label="Адрес"
          type="text"
          value={address}
          onChange={setAddress}
        />
        <Textarea
          label="Комментарий"
          onChange={setComment}
          value={comment}
          rows={3}
        />
        <Input
          label="Источник"
          type="text"
          value={source}
          onChange={setSource}
        />
        <CheckBox
          checked={official || false}
          labelPos="left"
          onClick={() => setOfficial((checked) => !checked)}
          label="Юр. лицо"
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
