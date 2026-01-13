'use client'

import { useMemo, useCallback } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import ContentHeader from '@components/ContentHeader'
import Button from '@components/Button'
import eventsAtom from '@state/atoms/eventsAtom'
import { useAtomValue } from 'jotai'
import { modalsFuncAtom } from '@state/atoms'
import EventCard from '@layouts/cards/EventCard'

const ITEM_HEIGHT = 190

const EventsContent = ({ filter = 'all' }) => {
  const events = useAtomValue(eventsAtom)
  const modalsFunc = useAtomValue(modalsFuncAtom)

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events

    const now = new Date()
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime()

    return events.filter((event) => {
      if (!event?.eventDate) return filter === 'upcoming'
      const eventDate = new Date(event.eventDate).getTime()
      return filter === 'upcoming'
        ? eventDate >= startOfToday
        : eventDate < startOfToday
    })
  }, [events, filter])

  const sortedEvents = useMemo(() => {
    const sorter = (a, b) => {
      const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0
      const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0
      return filter === 'upcoming' ? dateA - dateB : dateB - dateA
    }
    return [...filteredEvents].sort(sorter)
  }, [filteredEvents, filter])

  const filterName =
    filter === 'upcoming'
      ? 'Предстоящие'
      : filter === 'past'
      ? 'Прошедшие'
      : 'Все'

  const renderRow = useCallback(
    ({ index, style }) => {
      const event = sortedEvents[index]

      return (
        <EventCard
          eventId={event._id}
          style={{ ...style, padding: '6px 8px' }}
        />
      )
    },
    [sortedEvents]
  )

  return (
    <div className="flex h-full flex-col gap-4">
      <ContentHeader>
        <div className="flex flex-1 items-center justify-between">
          <div />
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>
              {filterName}: {sortedEvents.length}
            </span>
            <span className="hidden tablet:inline">Всего: {events.length}</span>
            <Button
              name="+"
              collapsing
              className="h-9 w-9 rounded-full text-lg"
              onClick={() => modalsFunc.event?.add()}
              disabled={!modalsFunc.event?.add}
            />
          </div>
        </div>
      </ContentHeader>
      <div className="min-h-0 flex-1 overflow-hidden">
        {sortedEvents.length > 0 ? (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                itemCount={sortedEvents.length}
                itemSize={ITEM_HEIGHT}
                itemKey={(index) => sortedEvents[index]._id ?? index}
              >
                {renderRow}
              </List>
            )}
          </AutoSizer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
            Мероприятий пока нет для выбранного периода
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsContent
