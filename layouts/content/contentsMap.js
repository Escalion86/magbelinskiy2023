import EventsContent from './EventsContent'
import ClientsContent from './ClientsContent'
import RequestsContent from './RequestsContent'
import DevContent from './DevContent'

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
  dev: {
    Component: DevContent,
    name: 'Разработчик',
  },
})
