import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import PhoneInput from '@components/PhoneInput'
import Textarea from '@components/Textarea'
import { DEFAULT_CLIENT } from '@helpers/constants'
import useErrors from '@helpers/useErrors'
import clientSelector from '@state/selectors/clientSelector'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAtomValue } from 'jotai'

const clientFunc = (clientId, clone = false) => {
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
    const [errors, checkErrors, addError, removeError] = useErrors()

    const isFormChanged = useMemo(
      () =>
        (client?.firstName ?? DEFAULT_CLIENT.firstName) !== firstName ||
        (client?.secondName ?? DEFAULT_CLIENT.secondName) !== secondName ||
        (client?.priorityContact ?? DEFAULT_CLIENT.priorityContact) !==
          priorityContact ||
        (client?.phone ?? DEFAULT_CLIENT.phone) !== phone,
      [firstName, phone, priorityContact, secondName]
    )

    useEffect(() => {
      const onClickConfirm = () => {
        const hasPhoneError = checkErrors({ phone: phone })
        let customError = false
        if (!firstName || !firstName.trim()) {
          addError({ firstName: 'Укажите имя' })
          customError = true
        }
        if (!hasPhoneError && !customError) {
          setClient(
            {
              _id: client?._id,
              firstName: firstName.trim(),
              secondName: secondName.trim(),
              priorityContact: priorityContact.trim(),
              phone: phone ?? null,
            },
            clone
          )
          closeModal()
        }
      }

      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
      setOnConfirmFunc(isFormChanged ? onClickConfirm : undefined)
    }, [
      firstName,
      secondName,
      priorityContact,
      phone,
      client,
      clone,
      setDisableConfirm,
      setOnConfirmFunc,
      setOnShowOnCloseConfirmDialog,
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
