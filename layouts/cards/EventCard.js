import CardButtons from '@components/CardButtons'
import { CardWrapper } from '@components/CardWrapper'
import EventTagsChipsLine from '@components/Chips/EventTagsChipsLine'
import DateTimeEvent from '@components/DateTimeEvent'
// import EventButtonSignIn from '@components/EventButtonSignIn'
// import EventUsersCounterAndAge from '@components/EventUsersCounterAndAge'
import PriceDiscount from '@components/PriceDiscount'
import TextInRing from '@components/TextInRing'
import TextLinesLimiter from '@components/TextLinesLimiter'
import eventStatusFunc from '@helpers/eventStatus'
import { modalsFuncAtom } from '@state/atoms'
import errorAtom from '@state/atoms/errorAtom'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import loadingAtom from '@state/atoms/loadingAtom'
import directionSelector from '@state/selectors/directionSelector'
import eventSelector from '@state/selectors/eventSelector'
import windowDimensionsNumSelector from '@state/selectors/windowDimensionsNumSelector'
import cn from 'classnames'
import { useRecoilValue } from 'recoil'

const EventCard = ({
  eventId,
  noButtons,
  hidden = false,
  onTagClick,
  style,
  changeStyle = 'laptop',
}) => {
  // const widthNum = useWindowDimensionsTailwindNum()
  const widthNum = useRecoilValue(windowDimensionsNumSelector)

  const modalsFunc = useRecoilValue(modalsFuncAtom)
  const event = useRecoilValue(eventSelector(eventId))

  const direction = useRecoilValue(directionSelector(event?.directionId))
  const loading = useRecoilValue(loadingAtom('event' + eventId))
  const error = useRecoilValue(errorAtom('event' + eventId))
  const itemFunc = useRecoilValue(itemsFuncAtom)
  // const subEventSum = useRecoilValue(subEventsSumOfEventSelector(event._id))

  if (!event) return null
  const eventStatus = eventStatusFunc(event)
  // const eventUsers = useRecoilValue(eventsUsersFullByEventIdSelector(eventId))

  // const eventLoggedUserStatus = useRecoilValue(
  //   loggedUserToEventStatusSelector(eventId)
  // )

  // const eventAssistants = eventUsers
  //   .filter((item) => item.user && item.status === 'assistant')
  //   .map((item) => item.user)

  // const eventAssistants = useRecoilValue(eventAssistantsSelector(eventId))

  // const formatedAddress = formatAddress(event.address)

  return (
    <CardWrapper
      loading={loading}
      error={error}
      onClick={() => !loading && modalsFunc.event.view(event._id)}
      showOnSite={event.showOnSite}
      gap={false}
      hidden={hidden}
      style={style}
    >
      {/* <div className="flex items-stretch"> */}
      {/* {event?.images && event.images.length > 0 && (
        <div
          className={cn(
            'relative flex justify-center flex-1 phoneH:flex-none',
            { 'laptop:w-auto': noButtons }
          )}
        >
          <img
            className="object-cover w-32 h-full min-w-32 min-h-42 laptop:w-40 laptop:h-40 max-h-60"
            src={event.images[0]}
            alt="event"
            // width={48}
            // height={48}
          />
          {event.status === 'canceled' && (
            <div className="absolute text-3xl font-bold -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 border-2 top-1/2 text-danger left-1/2 rotate-15 border-danger shadow-white2">
              Отменено
            </div>
          )}
        </div>
      )} */}
      <div
        className={cn(
          'relative hidden h-40 max-h-40 w-40 justify-center',
          changeStyle === 'laptop' ? 'laptop:flex' : 'desktop:flex',
          { 'laptop:w-auto': noButtons }
        )}
      >
        {direction?.image ? (
          <img
            className="laptop:object-cover min-w-32 laptop:w-72 w-full object-contain"
            src={direction.image}
            alt="direction"
            // width={48}
            // height={48}
          />
        ) : (
          <TextInRing text={direction?.title} />
        )}

        {eventStatus === 'canceled' && (
          <div className="text-danger rotate-15 border-danger shadow-white2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 bg-white bg-opacity-50 text-2xl font-bold">
            Отменено
          </div>
        )}
        {['finished', 'closed'].includes(eventStatus) && (
          <div className="text-success rotate-15 border-success shadow-white2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 bg-white bg-opacity-50 text-2xl font-bold">
            Завершено
          </div>
        )}
        {!event.showOnSite && (
          <div className="-rotate-15 shadow-white2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-purple-500 bg-white bg-opacity-50 text-3xl font-bold text-purple-500">
            Скрыто
          </div>
        )}
      </div>
      {/* // ) : (
      //   <div
      //     className={cn(
      //       'hidden tablet:flex relative justify-center flex-1 phoneH:flex-none h-44 max-h-44',
      //       { 'laptop:w-auto': noButtons }
      //     )}
      //   >
      //     <img
      //       className="object-contain w-full laptop:object-cover min-w-32 laptop:w-72"
      //       src={direction.image}
      //       alt="direction"
      //       // width={48}
      //       // height={48}
      //     />
      //     {event.status === 'canceled' && (
      //       <div className="absolute text-3xl font-bold -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 border-2 top-1/2 text-danger left-1/2 rotate-15 border-danger shadow-white2">
      //         Отменено
      //       </div>
      //     )}
      //   </div>
      // )} */}
      <div className="relative flex w-full flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="flex pl-2">
            <div
              className={cn(
                'flex h-[36px] flex-1 items-center gap-x-1',
                event.showOnSite ? '' : 'laptop:pl-0 pl-10'
              )}
            >
              <EventTagsChipsLine
                tags={event.tags}
                onTagClick={onTagClick}
                className="flex-1"
                // noWrap
              />
              {/* <div className="flex-1 truncate w-[90%]">{direction.title}</div> */}
              {!noButtons && (
                <CardButtons
                  item={event}
                  typeOfItem="event"
                  showOnSiteOnClick={() => {
                    itemFunc.event.set({
                      _id: event._id,
                      showOnSite: !event.showOnSite,
                    })
                  }}
                />
              )}
            </div>
            {/* <TextLinesLimiter
              className="flex-1 hidden text-lg font-bold laptop:text-xl laptop:block"
              lines={1}
            >
              {event.title}
            </TextLinesLimiter>
            {!noButtons && (
              <CardButtons
                item={event}
                typeOfItem="event"
                showOnSiteOnClick={() => {
                  itemFunc.event.set({
                    _id: event._id,
                    showOnSite: !event.showOnSite,
                  })
                }}
                className="hidden laptop:flex"
              />
            )} */}
          </div>
          <div className="flex h-[32px] min-h-[32px] flex-1">
            <div className="laptop:flex-row flex flex-1 flex-col">
              <div className="flex flex-1 items-center justify-center gap-2 pl-2 pr-1">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <TextLinesLimiter
                    className={cn(
                      'text-general -mt-1 flex-1 text-lg font-bold italic',
                      changeStyle === 'laptop'
                        ? 'laptop:hidden laptop:text-xl'
                        : 'desktop:hidden desktop:text-xl'
                    )}
                    // textClassName="leading-5"
                    lines={1}
                  >
                    {direction?.title ?? '[неизвестное направление]'}
                  </TextLinesLimiter>
                  <TextLinesLimiter
                    className={cn(
                      'flex min-h-[36px] w-full flex-1 items-center text-center text-lg font-bold',
                      changeStyle === 'laptop'
                        ? 'laptop:text-xl laptop:min-h-[40px]'
                        : 'desktop:min-h-[40px] desktop:text-xl'
                    )}
                    textClassName={cn(
                      'leading-4',
                      changeStyle === 'laptop'
                        ? 'laptop:leading-5'
                        : 'desktop:leading-5'
                    )}
                    lines={2}
                  >
                    {event.title}
                  </TextLinesLimiter>
                </div>
                <PriceDiscount item={event} className="hidden tablet:flex" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-center border-t border-gray-300 py-1 pl-2 pr-1">
          {/* <PriceDiscount event={event} className="hidden tablet:flex" /> */}
          {/* <div className="flex flex-wrap justify-between w-full"> */}
          <DateTimeEvent
            wrapperClassName="text-base laptop:text-lg font-bold leading-4 laptop:leading-5 justify-center laptop:justify-start"
            dateClassName="text-general"
            timeClassName="italic"
            durationClassName="italic text-base font-normal"
            event={event}
            showDayOfWeek
            fullMonth
            twoLines={widthNum <= 2}
            showDuration={widthNum > 3}
          />
          {/* <div className="text-lg font-bold leading-5 whitespace-nowrap tablet:text-right min-w-24 laptop:whitespace-pre-wrap text-general">
              {formatDateTime(
                event.date,
                false,
                false,
                true,
                false,
                event.duration
              )}
            </div> */}
          {/* <div className="text-lg font-bold leading-5 text-right whitespace-nowrap min-w-24 laptop:whitespace-pre-wrap text-general">
              {formatMinutes(event.duration ?? 60)}
            </div> */}
          {/* </div> */}
        </div>
        {/* 
        {widthNum >= 3 && (
          <div className="flex items-stretch justify-between border-t">
            <EventUsersCounterAndAge event={event} className="h-[42px]" />
            <EventButtonSignIn eventId={eventId} noButtonIfAlreadySignIn />
          </div>
        )} */}
      </div>
      {widthNum <= 2 && (
        <div className="flex w-full flex-1 flex-wrap justify-end">
          {/* <EventUsersCounterAndAge
            event={event}
            className="laptop:h-[42px] h-[38px] min-w-full flex-1 border-b border-t"
          /> */}
          <div className="flex h-9 w-full flex-1 items-stretch justify-end pr-1">
            <PriceDiscount item={event} className="mx-2 flex-1" />
            {/* <EventButtonSignIn eventId={eventId} noButtonIfAlreadySignIn thin /> */}
          </div>
        </div>
      )}
    </CardWrapper>
  )
}

export default EventCard
