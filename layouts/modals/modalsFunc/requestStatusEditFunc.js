import { useCallback, useEffect, useState } from 'react'
import RequestStatusPicker from '@components/ValuePicker/RequestStatusPicker'
import { DEFAULT_REQUEST } from '@helpers/constants'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import requestSelector from '@state/selectors/requestSelector'
import { useAtomValue } from 'jotai'

const requestStatusEditFunc = (requestId) => {
  const RequestStatusEditModal = ({
    closeModal,
    setOnConfirmFunc,
    setDisableConfirm,
    setConfirmButtonName,
  }) => {
    const request = useAtomValue(requestSelector(requestId))
    const itemsFunc = useAtomValue(itemsFuncAtom)

    const [status, setStatus] = useState(
      request?.status ?? DEFAULT_REQUEST.status
    )

    if (!requestId || !request)
      return (
        <div className="flex w-full justify-center text-lg">
          ОШИБКА! Заявка не найдена!
        </div>
      )

    const handleConfirm = useCallback(async () => {
      closeModal()
      if (status === 'convert') {
        await itemsFunc?.request?.convert?.(request._id)
        return
      }

      if (status !== request.status) {
        await itemsFunc?.request?.set(
          {
            _id: request._id,
            status,
          },
          false,
          true
        )
      }
    }, [closeModal, itemsFunc, request._id, request.status, status])

    useEffect(() => {
      const isConvert = status === 'convert'
      const hasChanges = isConvert || status !== request.status

      setConfirmButtonName(isConvert ? 'Преобразовать' : 'Применить')
      setDisableConfirm(!hasChanges)
      setOnConfirmFunc(hasChanges ? handleConfirm : undefined)
    }, [handleConfirm, request.status, setConfirmButtonName, setDisableConfirm, setOnConfirmFunc, status])

    return (
      <div className="flex flex-col gap-y-3">
        <RequestStatusPicker
          status={status}
          onChange={setStatus}
          disableConvert={!!request.eventId}
          required
        />
        {request.eventId && (
          <div className="text-sm text-gray-500">
            Мероприятие по этой заявке уже создано, повторное преобразование
            недоступно.
          </div>
        )}
      </div>
    )
  }

  return {
    title: 'Изменение статуса заявки',
    confirmButtonName: 'Применить',
    showDecline: false,
    Children: RequestStatusEditModal,
  }
}

export default requestStatusEditFunc
