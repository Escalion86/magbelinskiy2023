import CardButtons from '@components/CardButtons'
import EventTagsChipsLine from '@components/Chips/EventTagsChipsLine'
import ContactsIconsButtons from '@components/ContactsIconsButtons'
import Divider from '@components/Divider'
import ImageGallery from '@components/ImageGallery'
import TextLine from '@components/TextLine'
import UserName from '@components/UserName'
import formatAddress from '@helpers/formatAddress'
import formatDateTime from '@helpers/formatDateTime'
import formatMinutes from '@helpers/formatMinutes'
import getEventDuration from '@helpers/getEventDuration'
import isEventClosedFunc from '@helpers/isEventClosed'
import directionSelector from '@state/selectors/directionSelector'
import eventSelector from '@state/selectors/eventSelector'
import userSelector from '@state/selectors/userSelector'
import DOMPurify from 'isomorphic-dompurify'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

const CardButtonsComponent = ({ event, isEventClosed }) => (
  <CardButtons
    item={event}
    typeOfItem="event"
    forForm
    showEditButton={!isEventClosed}
    showDeleteButton={false}
  />
)

const eventViewFunc = (eventId) => {
  const EventViewModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
    setTopLeftComponent,
  }) => {
    const event = useRecoilValue(eventSelector(eventId))

    const direction = useRecoilValue(directionSelector(event?.directionId))
    const organizer = useRecoilValue(userSelector(event?.organizerId))

    const duration = getEventDuration(event)

    const isEventClosed = isEventClosedFunc(event)

    useEffect(() => {
      if (setTopLeftComponent) {
        setTopLeftComponent(() => (
          <CardButtonsComponent event={event} isEventClosed={isEventClosed} />
        ))
      }
    }, [event, isEventClosed, setTopLeftComponent])

    if (!event || !eventId)
      return (
        <div className="flex w-full justify-center text-lg ">
          ОШИБКА! Мероприятие не найдено!
        </div>
      )

    return (
      <div className="flex flex-col gap-y-2">
        <ImageGallery images={event?.images} />
        <div className="flex flex-1 flex-col">
          <div className="flex w-full max-w-full flex-1 flex-col gap-y-1 px-2 py-2">
            <div className="flex w-full items-center gap-x-1">
              {event?.tags.length > 0 && (
                <EventTagsChipsLine tags={event?.tags} className="flex-1" />
              )}
              {!setTopLeftComponent && (
                <div className="flex flex-1 justify-end">
                  <CardButtonsComponent
                    event={event}
                    isEventClosed={isEventClosed}
                    showDeleteButton={false}
                  />
                </div>
              )}
            </div>
            <div className="flex w-full justify-center text-3xl font-bold">
              {event?.title}
            </div>
            <div
              className="textarea ql w-full max-w-full list-disc overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(event?.description),
              }}
            />
            <Divider thin light />
            <TextLine label="ID">{event?._id}</TextLine>
            {direction?.title && (
              <TextLine label="Направление">{direction.title}</TextLine>
            )}
            <TextLine label="Начало">
              {formatDateTime(event?.dateStart)}
            </TextLine>
            <TextLine label="Завершение">
              {formatDateTime(event?.dateEnd)}
            </TextLine>
            <TextLine label="Продолжительность">
              {formatMinutes(duration ?? 60)}
            </TextLine>

            {event?.address && (
              <TextLine label="Адрес">
                {formatAddress(event?.address, '[не указан]')}
              </TextLine>
            )}
            {event?.address && event.address?.town && event.address?.street && (
              <TextLine label="Ссылки для навигатора">
                <a
                  data-tip="Открыть адрес в 2ГИС"
                  href={`https://2gis.ru/search/${event.address.town},%20${
                    event.address.street
                  }%20${event.address.house.replaceAll('/', '%2F')}`}
                >
                  <img
                    className="h-6 min-h-6 w-6 min-w-6 object-contain"
                    src="/img/navigators/2gis.png"
                    alt="2gis"
                  />
                </a>
                <a
                  data-tip="Открыть адрес в Яндекс Навигаторе"
                  href={`yandexnavi://map_search?text=${
                    event.address.town
                  },%20${
                    event.address.street
                  }%20${event.address.house.replaceAll('/', '%2F')}`}
                >
                  <img
                    className="h-6 min-h-6 w-6 min-w-6 object-contain"
                    src="/img/navigators/yandex.png"
                    alt="2gis"
                  />
                </a>
              </TextLine>
            )}
            {event?.organizerId && (
              <>
                <TextLine label="Организатор">
                  <UserName user={organizer} noWrap />
                </TextLine>
                <TextLine label="Контакты организатора">
                  <ContactsIconsButtons user={organizer} />
                </TextLine>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return {
    title: `Мероприятие`,
    confirmButtonName: 'Записаться',
    Children: EventViewModal,
  }
}

export default eventViewFunc
