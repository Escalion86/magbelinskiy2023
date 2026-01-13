import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import InputWrapper from '@components/InputWrapper'
import PhoneInput from '@components/PhoneInput'
import Textarea from '@components/Textarea'
import { CLIENT_TYPES, DEFAULT_CLIENT } from '@helpers/constants'
import useErrors from '@helpers/useErrors'
import clientSelector from '@state/selectors/clientSelector'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAtomValue } from 'jotai'

const clientFunc = (clientId, clone = false, onSuccess) => {
  const ClientModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
  }) => {
    const client = useAtomValue(clientSelector(clientId))
    const setClient = useAtomValue(itemsFuncAtom).client.set

    const [firstName, setFirstName] = useState(
      client?.firstName ?? DEFAULT_CLIENT.firstName
    )
    const [secondName, setSecondName] = useState(
      client?.secondName ?? DEFAULT_CLIENT.secondName
    )
    const [priorityContact, setPriorityContact] = useState(
      client?.priorityContact ?? DEFAULT_CLIENT.priorityContact
    )
    const [phone, setPhone] = useState(client?.phone ?? DEFAULT_CLIENT.phone)
    const [clientType, setClientType] = useState(
      client?.clientType ?? DEFAULT_CLIENT.clientType
    )
    const [errors, checkErrors, addError, removeError] = useErrors()

    const isFormChanged = useMemo(
      () =>
        (client?.firstName ?? DEFAULT_CLIENT.firstName) !== firstName ||
        (client?.secondName ?? DEFAULT_CLIENT.secondName) !== secondName ||
        (client?.priorityContact ?? DEFAULT_CLIENT.priorityContact) !==
          priorityContact ||
        (client?.phone ?? DEFAULT_CLIENT.phone) !== phone ||
        (client?.clientType ?? DEFAULT_CLIENT.clientType) !== clientType,
      [firstName, phone, priorityContact, secondName, clientType]
    )

    const onClickConfirm = useCallback(async () => {
        const hasPhoneError = checkErrors({ phone: phone })
        let customError = false
        if (!firstName || !firstName.trim()) {
          addError({ firstName: 'Укажите имя' })
          customError = true
        }
        if (!hasPhoneError && !customError) {
          const result = await setClient(
            {
              _id: client?._id,
              firstName: firstName.trim(),
              secondName: secondName.trim(),
              priorityContact: priorityContact.trim(),
              phone: phone ?? null,
              clientType,
            },
            clone
          )
          if (result && typeof onSuccess === 'function') onSuccess(result)
          closeModal()
        }
      }, [
        addError,
        checkErrors,
        client?._id,
        clone,
        closeModal,
        firstName,
        phone,
        priorityContact,
        secondName,
        setClient,
        onSuccess,
      ])

    useEffect(() => {
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
      setOnConfirmFunc(isFormChanged ? onClickConfirm : undefined)
    }, [
      setDisableConfirm,
      setOnConfirmFunc,
      setOnShowOnCloseConfirmDialog,
      isFormChanged,
      onClickConfirm,
    ])

    return (
      <FormWrapper>
        <Input
          label="Имя"
          value={firstName}
          onChange={(value) => {
            removeError('firstName')
            setFirstName(value)
          }}
          required
          error={errors.firstName}
        />
        <Input label="Фамилия" value={secondName} onChange={setSecondName} />
        <PhoneInput
          label="Телефон"
          value={phone}
          onChange={(value) => {
            removeError('phone')
            setPhone(value)
          }}
          required
          error={errors.phone}
        />
        <Textarea
          label="Контакт (whatsapp/telegram и др.)"
          value={priorityContact}
          onChange={setPriorityContact}
          rows={2}
        />
        <InputWrapper label="Тип клиента" paddingY fitWidth>
          <div className="flex flex-wrap gap-2">
            {CLIENT_TYPES.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`rounded border px-3 py-2 text-sm font-semibold transition ${
                  clientType === item.value
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setClientType(item.value)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </InputWrapper>
        <ErrorsList errors={errors} />
      </FormWrapper>
    )
  }

  return {
    title: `${clientId && !clone ? 'Редактирование' : 'Создание'} клиента`,
    confirmButtonName: clientId && !clone ? 'Применить' : 'Создать',
    Children: ClientModal,
  }
}

export default clientFunc
