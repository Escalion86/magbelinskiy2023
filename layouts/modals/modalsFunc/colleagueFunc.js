import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import PhoneInput from '@components/PhoneInput'
import { postData, putData } from '@helpers/CRUD'
import useErrors from '@helpers/useErrors'
import useSnackbar from '@helpers/useSnackbar'
import colleaguesAtom from '@state/atoms/colleaguesAtom'
import colleagueSelector from '@state/selectors/colleagueSelector'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

const DEFAULT_COLLEAGUE = {
  name: '',
  phone: null,
  whatsapp: null,
  telegram: '',
}

const colleagueFunc = (colleagueId, clone = false, onSuccess) => {
  const ColleagueModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
  }) => {
    const colleague = useAtomValue(colleagueSelector(colleagueId))
    const setColleagues = useSetAtom(colleaguesAtom)
    const { success, error } = useSnackbar()

    const [name, setName] = useState(
      colleague?.name ?? DEFAULT_COLLEAGUE.name
    )
    const [phone, setPhone] = useState(
      colleague?.phone ?? DEFAULT_COLLEAGUE.phone
    )
    const [whatsapp, setWhatsapp] = useState(
      colleague?.whatsapp ?? DEFAULT_COLLEAGUE.whatsapp
    )
    const [telegram, setTelegram] = useState(
      colleague?.telegram ?? DEFAULT_COLLEAGUE.telegram
    )

    const [errors, , addError, removeError] = useErrors()

    const isFormChanged = useMemo(
      () =>
        (colleague?.name ?? DEFAULT_COLLEAGUE.name) !== name ||
        (colleague?.phone ?? DEFAULT_COLLEAGUE.phone) !== phone ||
        (colleague?.whatsapp ?? DEFAULT_COLLEAGUE.whatsapp) !== whatsapp ||
        (colleague?.telegram ?? DEFAULT_COLLEAGUE.telegram) !== telegram,
      [colleague, name, phone, telegram, whatsapp]
    )

    const saveColleague = useCallback(async () => {
      if (!name || !name.trim()) {
        addError({ name: 'Укажите имя' })
        return
      }

      const payload = {
        name: name.trim(),
        phone: phone ?? null,
        whatsapp: whatsapp ?? null,
        telegram: telegram?.trim() ?? '',
      }

      if (colleagueId && !clone) {
        const updated = await putData(
          `/api/colleagues/${colleagueId}`,
          payload,
          null,
          null,
          true
        )
        if (updated?.data || updated?._id) {
          const normalized = updated?.data ?? updated
          setColleagues((prev) =>
            prev.map((item) =>
              item._id === normalized._id ? normalized : item
            )
          )
          success('Коллега обновлен')
          if (typeof onSuccess === 'function') onSuccess(normalized)
          closeModal()
          return
        }
        error('Не удалось обновить коллегу')
        return
      }

      const created = await postData(
        '/api/colleagues',
        payload,
        null,
        null,
        true
      )
      if (created?.data || created?._id) {
        const normalized = created?.data ?? created
        setColleagues((prev) => [...prev, normalized])
        success('Коллега создан')
        if (typeof onSuccess === 'function') onSuccess(normalized)
        closeModal()
        return
      }
      error('Не удалось создать коллегу')
    }, [
      addError,
      clone,
      closeModal,
      colleagueId,
      error,
      name,
      onSuccess,
      phone,
      setColleagues,
      success,
      telegram,
      whatsapp,
    ])

    useEffect(() => {
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
      setOnConfirmFunc(isFormChanged ? saveColleague : undefined)
    }, [
      isFormChanged,
      saveColleague,
      setDisableConfirm,
      setOnConfirmFunc,
      setOnShowOnCloseConfirmDialog,
    ])

    return (
      <FormWrapper>
        <Input
          label="Имя"
          value={name}
          onChange={(value) => {
            removeError('name')
            setName(value)
          }}
          required
          error={errors.name}
        />
        <PhoneInput
          label="Телефон"
          value={phone}
          onChange={(value) => {
            removeError('phone')
            setPhone(value)
          }}
          error={errors.phone}
        />
        <PhoneInput
          label="WhatsApp"
          value={whatsapp}
          onChange={(value) => {
            removeError('whatsapp')
            setWhatsapp(value)
          }}
          error={errors.whatsapp}
        />
        <Input
          label="Telegram"
          value={telegram}
          onChange={(value) => {
            removeError('telegram')
            setTelegram(value)
          }}
          error={errors.telegram}
        />
        <ErrorsList errors={errors} />
      </FormWrapper>
    )
  }

  return {
    title: `${colleagueId && !clone ? 'Редактирование' : 'Создание'} коллеги`,
    confirmButtonName: colleagueId && !clone ? 'Применить' : 'Создать',
    Children: ColleagueModal,
  }
}

export default colleagueFunc
