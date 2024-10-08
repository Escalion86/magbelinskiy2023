'use client'

import ContentHeader from '@components/ContentHeader'
// import Filter from '@components/Filter'
import AddButton from '@components/IconToggleButtons/AddButton'
import EventStatusToggleButtons from '@components/IconToggleButtons/EventStatusToggleButtons'
import FilterToggleButton from '@components/IconToggleButtons/FilterToggleButton'
import SearchToggleButton from '@components/IconToggleButtons/SearchToggleButton'
import Search from '@components/Search'
import SortingButtonMenu from '@components/SortingButtonMenu'
import filterItems from '@helpers/filterItems'
import { getNounEvents } from '@helpers/getNoun'
import isEventActiveFunc from '@helpers/isEventActive'
import isEventCanceledFunc from '@helpers/isEventCanceled'
import isEventClosedFunc from '@helpers/isEventClosed'
import isEventExpiredFunc from '@helpers/isEventExpired'
import sortFuncGenerator from '@helpers/sortFuncGenerator'
import EventsList from '@layouts/lists/EventsList'
import { modalsFuncAtom } from '@state/atoms'
import eventsAtom from '@state/atoms/eventsAtom'
// import loggedUserAtom from '@state/atoms/loggedUserAtom'
import { useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

const defaultFilterValue = {
  directions: null,
  tags: [],
}

const EventsContent = () => {
  const events = useRecoilValue(eventsAtom)
  // const loggedUser = useRecoilValue(loggedUserAtom)

  const modalsFunc = useRecoilValue(modalsFuncAtom)

  const [isSearching, setIsSearching] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filter, setFilter] = useState({
    status: {
      active: true,
      finished: false,
      closed: false,
      canceled: false,
    },
  })
  const [searchText, setSearchText] = useState('')

  const [sort, setSort] = useState({ dateStart: 'asc' })
  const sortFunc = useMemo(() => sortFuncGenerator(sort), [sort])

  const [filterOptions, setFilterOptions] = useState(defaultFilterValue)

  const searchedEvents = useMemo(() => {
    if (!searchText) return events
    return filterItems(events, searchText, [], {}, ['title'])
  }, [events, searchText])

  const visibleEvents = useMemo(
    () =>
      searchedEvents.filter((event) => {
        const isEventExpired = isEventExpiredFunc(event)
        const isEventActive = isEventActiveFunc(event)
        const isEventCanceled = isEventCanceledFunc(event)
        const isEventClosed = isEventClosedFunc(event)
        const haveEventTag =
          filterOptions.tags?.length === 0
            ? true
            : event.tags
            ? event.tags.find((tag) => filterOptions.tags.includes(tag))
            : false
        return (
          haveEventTag &&
          ((isEventClosed && filter.status.finished) ||
            (isEventClosed && filter.status.closed) ||
            (isEventActive && filter.status.finished && isEventExpired) ||
            (isEventActive && filter.status.active && !isEventExpired) ||
            (isEventCanceled && filter.status.canceled)) &&
          (!filterOptions.directions ||
            filterOptions.directions === event.directionId)
        )
      }),
    [searchedEvents, filter, filterOptions]
  )

  const filteredAndSortedEvents = useMemo(
    () => [...visibleEvents].sort(sortFunc),
    [visibleEvents, sort]
  )

  const isFiltered = filterOptions.directions || filterOptions.tags.length > 0

  return (
    <>
      <ContentHeader>
        {/* <EventStatusToggleButtons
          value={filter.status}
          onChange={(value) =>
            setFilter((state) => ({ ...state, status: value }))
          }
        /> */}
        <div className="flex flex-1 flex-nowrap items-center justify-end gap-x-2">
          <div className="whitespace-nowrap text-lg font-bold">
            {getNounEvents(visibleEvents.length)}
          </div>
          <SortingButtonMenu
            sort={sort}
            onChange={setSort}
            sortKeys={['dateStart']}
          />
          <FilterToggleButton
            value={isFiltered}
            onChange={() => {
              setShowFilter((state) => !state)
            }}
          />
          <SearchToggleButton
            value={isSearching}
            onChange={() => {
              setIsSearching((state) => !state)
              if (isSearching) setSearchText('')
            }}
          />
          <AddButton onClick={() => modalsFunc.event.add()} />
        </div>
      </ContentHeader>
      <Search
        searchText={searchText}
        show={isSearching}
        onChange={setSearchText}
        className="mx-1 bg-gray-100"
      />
      {/* <Filter
        show={showFilter}
        onChange={setFilterOptions}
        filterOptions={filterOptions}
        defaultFilterValue={defaultFilterValue}
        setShowFilter={setShowFilter}
      /> */}
      {/* <CardListWrapper> */}
      <EventsList
        events={filteredAndSortedEvents}
        onTagClick={(tag) => {
          setFilterOptions((state) => ({ ...state, tags: [tag] }))
          setShowFilter(true)
        }}
      />
      {/* <div className="flex-1 w-full bg-opacity-15 bg-general">
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              itemCount={filteredAndSortedEvents.length}
              itemSize={
                windowWidthNum > 3 ? 182 : windowWidthNum === 3 ? 151 : 194
              }
              width={width}
            >
              {({ index, style }) => (
                <EventCard
                  style={style}
                  key={filteredAndSortedEvents[index]._id}
                  eventId={filteredAndSortedEvents[index]._id}
                  // hidden={!visibleEventsIds.includes(event._id)}
                  // noButtons={
                  //   loggedUser?.role !== 'admin' && loggedUser?.role !== 'dev'
                  // }
                />
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div> */}
      {/* {filteredAndSortedEvents?.length > 0 ? (
          filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event._id}
              eventId={event._id}
              // hidden={!visibleEventsIds.includes(event._id)}
              // noButtons={
              //   loggedUser?.role !== 'admin' && loggedUser?.role !== 'dev'
              // }
            />
          ))
        ) : (
          <div className="flex justify-center p-2">{`Нет мероприятий`}</div>
        )} */}
      {/* </CardListWrapper> */}
    </>
  )
}

export default EventsContent
