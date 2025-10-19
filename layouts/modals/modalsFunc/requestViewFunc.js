import { AUDIENCE, EVENT_TYPES } from '@helpers/constants'
import requestSelector from '@state/selectors/requestSelector'
import DOMPurify from 'isomorphic-dompurify'
import { useAtomValue } from 'jotai'

const requestViewFunc = (requestId) => {
  const RequestViewModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
    setTopLeftComponent,
  }) => {
    const request = useAtomValue(requestSelector(requestId))

    if (!requestId || !request)
      return (
        <div className="flex w-full justify-center text-lg ">
          ОШИБКА! Заявка не найдена!
        </div>
      )

    const requestAudience =
      AUDIENCE.find((item) => item.value === request.audience)?.name ??
      undefined
    const requestType =
      EVENT_TYPES.find((item) => item.value === request.type)?.name ?? undefined

    return (
      <div className="flex flex-col">
        <div className="flex flex-1 flex-col items-start justify-center px-1 text-sm text-black">
          <div className="flex gap-x-1">
            <div className="font-bold">Тип:</div>
            <div>{requestType}</div>
          </div>
          <div className="flex gap-x-1">
            <div className="font-bold">Аудитория:</div>
            <div>{requestAudience}</div>
          </div>
          <div className="flex gap-x-1">
            <div className="font-bold">Кол-во зрителей:</div>
            <div>{request?.spectators}</div>
          </div>
          {(request?.town || request?.address) && (
            <div className="flex gap-x-1">
              <div className="font-bold">Адрес:</div>
              <div>
                {request?.town}
                {request?.address ? ' ' + request?.address : ''}
              </div>
            </div>
          )}
          {request?.contact && (
            <div className="flex gap-x-1">
              <div className="font-bold">Способ связи:</div>
              <div>{request.contact}</div>
            </div>
          )}
          {request?.phone && (
            <div className="flex gap-x-1">
              <div className="font-bold">Телефон:</div>
              <div>+{request.phone}</div>
            </div>
          )}
          {request?.comment && (
            <div className="flex gap-x-1">
              <div className="font-bold">Комментарий:</div>
              <div>{request.comment}</div>
            </div>
          )}
          <div className="flex gap-x-1">
            <div className="font-bold">Юр. лицо:</div>
            <div>{request?.official === false ? 'Нет' : 'Да'}</div>
          </div>
        </div>
      </div>
    )
  }

  return {
    title: `Заявка`,
    confirmButtonName: 'Закрыть',
    showDecline: false,
    onConfirm: true,
    Children: RequestViewModal,
  }
}

export default requestViewFunc
