import EventsContent from './EventsContent'
import ClientsContent from './ClientsContent'
import RequestsContent from './RequestsContent'
import DevContent from './DevContent'
import TransactionsContent from './TransactionsContent'

const UpcomingEventsContent = () => <EventsContent filter="upcoming" />
const PastEventsContent = () => <EventsContent filter="past" />

export const CONTENTS = Object.freeze({
  requests: {
    Component: RequestsContent,
    name: 'Заявки',
  },
  eventsUpcoming: {
    Component: UpcomingEventsContent,
    name: 'Предстоящие мероприятия',
  },
  eventsPast: {
    Component: PastEventsContent,
    name: 'Прошедшие мероприятия',
  },
  clients: {
    Component: ClientsContent,
    name: 'Клиенты',
  },
  transactions: {
    Component: TransactionsContent,
    name: 'Транзакции',
  },
  events: {
    Component: UpcomingEventsContent,
    name: 'Мероприятия',
  },
  dev: {
    Component: DevContent,
    name: 'Разработчик',
  },
})
