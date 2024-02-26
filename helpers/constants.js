import {
  faBan,
  faCertificate,
  faCheck,
  faClock,
  faGenderless,
  faLock,
  faMars,
  faPlay,
  faSignInAlt,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'

import {
  faBug,
  faMoneyBill,
  faUser,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import {
  faCalendarAlt,
  faCreditCard,
} from '@fortawesome/free-regular-svg-icons'

// import DirectionsContent from '@layouts/content/DirectionsContent'
import EventsContent from '@layouts/content/EventsContent'
// import DevContent from '@layouts/content/DevContent'
import ClientsContent from '@layouts/content/ClientsContent'

import {
  faInstagram,
  faTelegram,
  faVk,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

const colors = [
  'border-blue-400',
  'border-red-400',
  'border-yellow-400',
  'border-green-400',
  'border-purple-400',
  'border-orange-400',
  'border-gray-400',
  'border-amber-400',
  'border-pink-400',
  'text-red-400',
  'text-blue-400',
  'text-yellow-400',
  'text-green-400',
  'text-purple-400',
  'text-orange-400',
  'text-disabled',
  'text-amber-400',
  'text-pink-400',
  'bg-blue-400',
  'bg-red-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-orange-400',
  'bg-gray-400',
  'bg-amber-400',
  'bg-pink-400',
  'border-blue-500',
  'border-red-500',
  'border-yellow-500',
  'border-green-500',
  'border-purple-500',
  'border-orange-500',
  'border-gray-500',
  'border-amber-500',
  'border-pink-500',
  'text-red-500',
  'text-blue-500',
  'text-yellow-500',
  'text-green-500',
  'text-purple-500',
  'text-orange-500',
  'text-gray-500',
  'text-amber-500',
  'text-pink-500',
  'bg-blue-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-gray-500',
  'bg-amber-500',
  'bg-pink-500',
  'border-blue-600',
  'border-yellow-600',
  'border-red-600',
  'border-green-600',
  'border-purple-600',
  'border-orange-600',
  'border-gray-600',
  'border-amber-600',
  'border-pink-600',
  'border-amber-700',
  'text-gray-600',
  'text-blue-600',
  'text-yellow-600',
  'text-green-600',
  'text-purple-600',
  'text-orange-600',
  'text-gray-600',
  'text-amber-600',
  'text-pink-600',
  'text-amber-700',
  'bg-blue-600',
  'bg-red-600',
  'bg-yellow-600',
  'bg-green-600',
  'bg-purple-600',
  'bg-orange-600',
  'bg-gray-600',
  'bg-amber-600',
  'bg-pink-600',
  'bg-amber-700',
  'hover:border-blue-400',
  'hover:border-red-400',
  'hover:border-yellow-400',
  'hover:border-green-400',
  'hover:border-purple-400',
  'hover:border-orange-400',
  'hover:border-gray-400',
  'hover:border-amber-400',
  'hover:border-pink-400',
  'hover:text-red-400',
  'hover:text-blue-400',
  'hover:text-yellow-400',
  'hover:text-green-400',
  'hover:text-purple-400',
  'hover:text-orange-400',
  'hover:text-disabled',
  'hover:text-amber-400',
  'hover:text-pink-400',
  'hover:bg-blue-400',
  'hover:bg-red-400',
  'hover:bg-yellow-400',
  'hover:bg-green-400',
  'hover:bg-purple-400',
  'hover:bg-orange-400',
  'hover:bg-gray-400',
  'hover:bg-amber-400',
  'hover:bg-pink-400',
  'hover:border-blue-500',
  'hover:border-red-500',
  'hover:border-yellow-500',
  'hover:border-green-500',
  'hover:border-purple-500',
  'hover:border-orange-500',
  'hover:border-gray-500',
  'hover:border-amber-500',
  'hover:border-pink-500',
  'hover:text-red-500',
  'hover:text-blue-500',
  'hover:text-yellow-500',
  'hover:text-green-500',
  'hover:text-purple-500',
  'hover:text-orange-500',
  'hover:text-gray-500',
  'hover:text-amber-500',
  'hover:text-pink-500',
  'hover:text-amber-600',
  'hover:bg-blue-500',
  'hover:bg-red-500',
  'hover:bg-yellow-500',
  'hover:bg-green-500',
  'hover:bg-purple-500',
  'hover:bg-orange-500',
  'hover:bg-gray-500',
  'hover:bg-amber-500',
  'hover:bg-pink-500',
  'hover:border-blue-600',
  'hover:border-red-600',
  'hover:border-yellow-600',
  'hover:border-green-600',
  'hover:border-purple-600',
  'hover:border-orange-600',
  'hover:border-gray-600',
  'hover:border-amber-600',
  'hover:border-pink-600',
  'hover:border-amber-700',
  'hover:text-red-600',
  'hover:text-blue-600',
  'hover:text-yellow-600',
  'hover:text-green-600',
  'hover:text-purple-600',
  'hover:text-orange-600',
  'hover:text-gray-600',
  'hover:text-amber-600',
  'hover:text-pink-600',
  'hover:text-amber-700',
  'hover:bg-blue-600',
  'hover:bg-red-600',
  'hover:bg-yellow-600',
  'hover:bg-green-600',
  'hover:bg-purple-600',
  'hover:bg-orange-600',
  'hover:bg-gray-600',
  'hover:bg-amber-600',
  'hover:bg-pink-600',
  'hover:bg-amber-700',
]

export const TAILWIND_COLORS = [
  'blue-400',
  'green-400',
  'orange-400',
  'purple-400',
  'yellow-400',
  'amber-400',
  'general',
  'danger',
]

export const PASTEL_COLORS = [
  '#B6D8F2',
  '#CCD4BF',
  '#D0BCAC',
  '#F4CFDF',
  '#F7F6CF',
  // '#5784BA',
  '#9AC8EB',
  '#98D4BB',
  '#E7CBA9',
  '#EEBAB2',
  '#F5F3E7',
  '#F5BFD2',
  '#E5DB9C',
  '#F5E2E4',
  '#D0BCAC',
  '#BEB4C5',
  '#E6A57E',
  // '#218B82',
  '#9AD9DB',
  '#E5DBD9',
  '#EB96AA',
  '#C6C9D0',
  // '#C54B6C',
  '#E5B3BB',
  '#F9968B',
  // '#C47482',
  '#F27348',
  // '#26474E',
  '#76CDCD',
  // '#37667E',
  '#7B92AA',
  '#E4CEE0',
  // '#A15D98',
  '#DC828F',
  '#F7CE76',
  // '#8C7386',
  // '#9C9359',
  // '#A57283',
  '#E8D595',
]

export const GRADIENT_COLORS = ['#504436', '#84725A']

export const MONTHS = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
]

export const MONTHS_FULL_1 = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
]

export const MONTHS_FULL = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export const DAYS_OF_WEEK = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

export const DAYS_OF_WEEK_FULL = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
]

export const DEFAULT_USERS_SECURITY = Object.freeze({
  fullSecondName: true,
  fullThirdName: true,
  showBirthday: true,
  // showAge: null,
  // showContacts: null,
  showPhone: true,
  showWhatsapp: true,
  showViber: true,
  showTelegram: true,
  showInstagram: true,
  showVk: true,
  showEmail: true,
})

export const DEFAULT_USERS_NOTIFICATIONS = Object.freeze({
  telegram: { active: false, userName: null, id: null },
})

export const DEFAULT_USER = Object.freeze({
  firstName: '',
  secondName: '',
  thirdName: '',
  password: '',
  email: '',
  phone: null,
  whatsapp: null,
  viber: null,
  telegram: '',
  vk: '',
  instagram: '',
  birthday: null,
  gender: null,
  images: [],
  role: 'client',
  town: '',
  lastActivityAt: null,
  prevActivityAt: null,
  archive: false,
})

export const DEFAULT_ADDRESS = Object.freeze({
  town: '',
  street: '',
  house: '',
  entrance: '',
  floor: '',
  flat: '',
  comment: '',
})

export const DEFAULT_EVENT = Object.freeze({
  directionId: null,
  organizerId: null,
  title: '',
  description: '',
  dateStart: null,
  dateEnd: null,
  address: DEFAULT_ADDRESS,
  status: 'active',
  images: [],
  showOnSite: true,
  report: '',
  reportImages: [],
  warning: false,
  likes: false,
  likesProcessActive: true,
})

export const DEFAULT_SUBEVENT = Object.freeze({
  title: '',
  description: '',
  price: 0,
  maxParticipants: null,
  maxMans: null,
  maxWomans: null,
  maxMansNovice: null,
  maxWomansNovice: null,
  maxMansMember: null,
  maxWomansMember: null,
  minMansAge: 35,
  minWomansAge: 30,
  maxMansAge: 50,
  maxWomansAge: 45,
  usersStatusAccess: {},
  usersStatusDiscount: {},
  usersRelationshipAccess: 'yes',
  isReserveActive: true,
})

export const DEFAULT_QUESTIONNAIRE = Object.freeze({
  title: '',
  data: [],
})

export const DEFAULT_QUESTIONNAIRE_ITEM = Object.freeze({
  type: 'text',
  label: '',
  key: '',
  show: true,
  required: false,
})

export const DEFAULT_IMAGE_CONSTRUCTOR_ITEM = Object.freeze({
  type: 'text',
  key: '',
  show: true,
})

export const DEFAULT_DIRECTION = Object.freeze({
  title: '',
  shortDescription: '',
  description: '',
  image: null,
  showOnSite: true,
  rules: {
    userStatus: 'select',
    userRelationship: 'select',
  },
})

export const DEFAULT_REVIEW = Object.freeze({
  author: '',
  review: '',
  authorAge: null,
  showOnSite: true,
})

export const DEFAULT_PAYMENT = Object.freeze({
  sector: 'event',
  payDirection: null,
  userId: null,
  eventId: null,
  serviceId: null,
  productId: null,
  payType: null,
  sum: 0,
  status: 'created',
  payAt: undefined,
  comment: '',
})

export const DEFAULT_ADDITIONAL_BLOCK = Object.freeze({
  title: '',
  description: '',
  image: null,
  menuName: '',
  index: null,
  showOnSite: true,
})

export const DEFAULT_SERVICE = Object.freeze({
  title: '',
  description: '',
  shortDescription: '',
  images: [],
  menuName: '',
  index: null,
  showOnSite: true,
  price: 0,
  questionnaire: null,
  usersStatusAccess: {},
  usersStatusDiscount: {},
})

export const DEFAULT_PRODUCT = Object.freeze({
  title: '',
  description: '',
  shortDescription: '',
  images: [],
  menuName: '',
  index: null,
  showOnSite: true,
  price: 0,
  questionnaire: null,
  usersStatusAccess: {},
  usersStatusDiscount: {},
})

export const DEFAULT_SERVICE_USER = Object.freeze({
  userId: '',
  serviceId: '',
  answers: {},
  status: 'active',
})

export const DEFAULT_SITE_SETTINGS = Object.freeze({
  email: '',
  phone: '',
  whatsapp: '',
  viber: '',
  telegram: '',
  instagram: '',
  vk: '',
  codeSendService: 'telefonip',
})

export const EVENT_RELATIONSHIP_ACCESS = [
  { value: 'yes', name: 'Всем', color: 'green-400' },
  { value: 'no', name: 'Без пары', color: 'blue-400' },
  { value: 'only', name: 'Только с парой', color: 'red-400' },
]

export const EVENT_STATUSES = [
  { value: 'active', name: 'Активно', color: 'blue-400', icon: faPlay },
  { value: 'canceled', name: 'Отменено', color: 'red-400', icon: faBan },
  { value: 'closed', name: 'Закрыто', color: 'green-400', icon: faLock },
]

export const SERVICE_USER_STATUSES = [
  { value: 'active', name: 'Активно', color: 'blue-400', icon: faPlay },
  { value: 'canceled', name: 'Отменено', color: 'red-400', icon: faBan },
  { value: 'closed', name: 'Закрыто', color: 'green-400', icon: faLock },
]

export const PRODUCT_USER_STATUSES = [
  { value: 'active', name: 'Активно', color: 'blue-400', icon: faPlay },
  { value: 'canceled', name: 'Отменено', color: 'red-400', icon: faBan },
  { value: 'closed', name: 'Закрыто', color: 'green-400', icon: faLock },
]

export const EVENT_STATUSES_WITH_TIME = [
  ...EVENT_STATUSES,
  { value: 'finished', name: 'Завершено', color: 'green-400', icon: faCheck },
  { value: 'inProgress', name: 'В процессе', color: 'blue-400', icon: faClock },
]

export const EVENT_USER_STATUSES = [
  { value: 'participant', name: 'Участник', color: 'green-400' },
  { value: 'assistant', name: 'Ведущий', color: 'blue-400' },
  { value: 'reserve', name: 'Резерв', color: 'yellow-400' },
  { value: 'ban', name: 'Бан', color: 'red-400' },
]

export const GENDERS = [
  { value: 'male', name: 'Мужчина', color: 'blue-400', icon: faMars },
  { value: 'famale', name: 'Женщина', color: 'red-400', icon: faVenus },
]

export const GENDERS_WITH_NO_GENDER = [
  ...GENDERS,
  { value: 'null', name: 'Не выбрано', color: 'gray-400', icon: faGenderless },
]

export const ORIENTATIONS = [
  { value: 'getero', name: 'Гетеросексуал', color: 'blue-400' },
  { value: 'bi', name: 'Бисексуал', color: 'purple-400' },
  { value: 'homo', name: 'Гомосексуал', color: 'red-400' },
]

export const CODE_SEND_SERVICES = [
  { value: 'telefonip', name: 'TelefonIP', color: 'orange-400' },
  { value: 'ucaller', name: 'UCaller', color: 'blue-400' },
]

export const SOCIALS = [
  { name: 'Whatsapp', value: 'whatsapp', icon: faWhatsapp, color: 'green-500' },
  { name: 'VK', value: 'vk', icon: faVk, color: 'blue-500' },
  {
    name: 'Instagram',
    value: 'instagram',
    icon: faInstagram,
    color: 'general',
  },
  {
    name: 'Telegram',
    value: 'telegram',
    icon: faTelegram,
    color: 'blue-400',
  },
]

export const CONTENTS = Object.freeze({
  // directions: {
  //   Component: DirectionsContent,
  //   name: 'Сайт / Направления',
  // },
  events: {
    Component: EventsContent,
    name: 'Мероприятия',
  },
  // notifications: {
  //   Component: LoggedUserNotificationsContent,
  //   name: 'Уведомления',
  // },
  clients: {
    Component: ClientsContent,
    name: 'Клиенты',
  },
  // dev: {
  //   Component: DevContent,
  //   name: 'Разработчик',
  // },
})

export const pages = [
  // {
  //   id: 0,
  //   group: 0,
  //   name: 'Моя статистика',
  //   href: 'userStatistics',
  //   icon: faTrophy,
  //   accessRoles: CONTENTS['userStatistics'].accessRoles,
  //   roleAccess: CONTENTS['userStatistics'].roleAccess,
  // },
  {
    id: 4,
    group: 2,
    name: 'Мероприятия',
    href: 'events',
    icon: faCalendarAlt,
  },
  // {
  //   id: 5,
  //   group: 3,
  //   name: 'Направления',
  //   href: 'directions',
  //   icon: faHeart,
  // },
  {
    id: 10,
    group: 4,
    name: 'Клиенты',
    href: 'clients',
    icon: faUser,
  },
  // {
  //   id: 11,
  //   group: 5,
  //   name: 'Транзакции',
  //   href: 'payments',
  //   icon: faMoneyBill,
  // },
  {
    id: 99,
    group: 99,
    name: 'Разработчик',
    href: 'dev',
    icon: faBug,
  },
]

export const pagesGroups = [
  // {
  //   id: 0,
  //   name: 'Моя статистика',
  //   icon: faTrophy,
  // },
  {
    id: 2,
    name: 'Мероприятия',
    icon: faCalendarAlt,
  },
  {
    id: 4,
    name: 'Клиенты',
    icon: faUser,
  },
  // {
  //   id: 5,
  //   name: 'Транзакции',
  //   icon: faMoneyBill,
  // },
  // {
  //   id: 10,
  //   name: 'Настройки',
  //   icon: faCog,
  //   // accessRoles: ['supervisor', 'dev'],
  // },
  {
    id: 99,
    name: 'Разработчик',
    icon: faBug,
    // accessRoles: ['dev']
  },
]

export const PAY_TYPES = [
  { value: 'card', name: 'Картой', color: 'blue-400', icon: faCreditCard },
  { value: 'cash', name: 'Наличными', color: 'green-400', icon: faMoneyBill },
  {
    value: 'remittance',
    name: 'Перевод',
    color: 'yellow-400',
    icon: faSignInAlt,
  },
  {
    value: 'coupon',
    name: 'Купон',
    color: 'general',
    icon: faCertificate,
  },
]
// var arr = [{key:"11", value:"1100"},{key:"22", value:"2200"}];
// var object = arr.reduce(
//   (obj, item) => Object.assign(obj, { [item.key]: item.value }), {})

export const PAY_TYPES_OBJECT = PAY_TYPES.reduce(
  (obj, item) => Object.assign(obj, { [item.value]: item.name }),
  {}
)

export const PAY_DIRECTIONS = [
  {
    value: 'toUser',
    name: 'Пользователю (за помощь / возврат)',
    color: 'red-400',
    icon: faMoneyBill, // faUserAlt,
  },
  {
    value: 'toEvent',
    name: 'Затраты организатора',
    color: 'red-400',
    icon: faMoneyBill, //faCalendar,
  },
  {
    value: 'fromUser',
    name: 'Оплата мероприятия',
    color: 'green-400',
    icon: faMoneyBill, //faUserAlt,
  },
  {
    value: 'fromEvent',
    name: 'Доп. доходы',
    color: 'green-400',
    icon: faMoneyBill, //faCalendar,
  },
]

export const EVENT_PAY_DIRECTIONS = [
  {
    value: 'toUser',
    name: 'Пользователю (за помощь)',
    color: 'red-400',
    icon: faMoneyBill, //faUserAlt,
  },
  {
    value: 'toEvent',
    name: 'Затраты на мероприятие',
    color: 'red-400',
    icon: faMoneyBill, //faCalendar,
  },
  {
    value: 'fromUser',
    name: 'Оплата мероприятия',
    color: 'green-400',
    icon: faMoneyBill, //faUserAlt,
  },
  {
    value: 'fromEvent',
    name: 'Доп. доходы',
    color: 'green-400',
    icon: faMoneyBill, //faCalendar,
  },
]

export const SERVICE_PAY_DIRECTIONS = [
  {
    value: 'toUser',
    name: 'Специалисту',
    color: 'red-400',
    icon: faMoneyBill, //faUserAlt,
  },
  {
    value: 'toService',
    name: 'Затраты на услугу',
    color: 'red-400',
    icon: faMoneyBill, //faHeart,
  },
  {
    value: 'fromUser',
    name: 'Оплата услуги',
    color: 'green-400',
    icon: faMoneyBill, //faUserAlt,
  },
  {
    value: 'fromService',
    name: 'Доп. доходы',
    color: 'green-400',
    icon: faMoneyBill, //faHeart,
  },
]

export const PRODUCT_PAY_DIRECTIONS = [
  // {
  //   value: 'toUser',
  //   name: 'Покупателю (возврат)',
  //   color: 'red-400',
  //   icon: faUserAlt,
  // },
  {
    value: 'toProduct',
    name: 'Затраты на продукт',
    color: 'red-400',
    icon: faMoneyBill, //faHeart,
  },
  {
    value: 'fromUser',
    name: 'Оплата товара',
    color: 'green-400',
    icon: faMoneyBill, //faUserAlt,
  },
  {
    value: 'fromProduct',
    name: 'Доп. доходы',
    color: 'green-400',
    icon: faMoneyBill, //faHeart,
  },
]

export const PRODUCT_PAY_INTERNAL = [
  {
    value: 'toInternal',
    name: 'Затраты',
    color: 'red-400',
    icon: faMoneyBill, //faBriefcase,
  },
  {
    value: 'toUser',
    name: 'Зарплата работнику',
    color: 'red-400',
    icon: faMoneyBill, //faUserAlt,
  },
  {
    value: 'fromInternal',
    name: 'Доп. доходы',
    color: 'green-400',
    icon: faMoneyBill, //faBriefcase,
  },
]

export const DEFAULT_USERS_STATUS_ACCESS = {
  noReg: true,
  novice: true,
  member: true,
}

export const DEFAULT_USERS_STATUS_DISCOUNT = {
  novice: 0,
  member: 0,
}

export const USERS_STATUSES = [
  { value: 'novice', name: 'Новичок', color: 'green-400', icon: faUser },
  {
    value: 'member',
    name: 'Участник клуба',
    color: 'blue-400',
    imageSrc: '/img/svg_icons/medal.svg',
  },
  { value: 'ban', name: 'Бан', color: 'danger', icon: faBan },
]

export const USERS_ROLES = [
  { value: 'client', name: 'Пользователь', color: 'blue-400' },
  { value: 'moder', name: 'Модератор', color: 'green-400' },
  { value: 'admin', name: 'Администратор', color: 'orange-400' },
  { value: 'supervisor', name: 'Руководитель', color: 'general' },
  { value: 'dev', name: 'Разработчик', color: 'danger' },
]

export const UCALLER_VOICE = true
export const UCALLER_MIX = true
