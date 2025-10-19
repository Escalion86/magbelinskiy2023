import EventsContent from './EventsContent'
import ClientsContent from './ClientsContent'
import RequestsContent from './RequestsContent'

export const CONTENTS = Object.freeze({
  requests: {
    Component: RequestsContent,
    name: 'Заявки',
  },
  events: {
    Component: EventsContent,
    name: 'Мероприятия',
  },
  clients: {
    Component: ClientsContent,
    name: 'Клиенты',
  },
})
