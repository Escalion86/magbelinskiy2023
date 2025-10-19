// import goToUrlForAddEventToCalendar from '@helpers/goToUrlForAddEventToCalendar'
// import isUserQuestionnaireFilled from '@helpers/isUserQuestionnaireFilled'
import addModalSelector from '@state/selectors/addModalSelector'
import { setAtomValue } from '@state/storeHelpers'
// import additionalBlockFunc from './modalsFunc/additionalBlockFunc'
// import copyLinkFunc from './modalsFunc/copyLinkFunc'
import cropImageFunc from './modalsFunc/cropImageFunc'
import directionFunc from './modalsFunc/directionFunc'
import directionViewFunc from './modalsFunc/directionViewFunc'
import errorFunc from './modalsFunc/errorFunc'
import eventFunc from './modalsFunc/eventFunc'
// import eventSignUpFunc from './modalsFunc/eventSignUpFunc2'
import eventStatusEditFunc from './modalsFunc/eventStatusEditFunc'
// import eventUserStatusChangeFunc from './modalsFunc/eventUserStatusChangeFunc'
// import eventUsersFunc from './modalsFunc/eventUsersFunc'
// import eventUsersPaymentsFunc from './modalsFunc/eventUsersPaymentsFunc'
import eventViewFunc from './modalsFunc/eventViewFunc'
import eventsTagsFunc from './modalsFunc/eventsTagsFunc'
import jsonFunc from './modalsFunc/jsonFunc'
import paymentFunc from './modalsFunc/paymentFunc'
// import paymentsAutoFillFunc from './modalsFunc/paymentsAutoFillFunc'
// import questionnaireConstructorFunc from './modalsFunc/questionnaireConstructorFunc'
// import selectDirectionsFunc from './modalsFunc/selectDirectionsFunc'
import selectEventsFunc from './modalsFunc/selectEventsFunc'
import selectPaymentsFunc from './modalsFunc/selectPaymentsFunc'
// import selectServicesFunc from './modalsFunc/selectServicesFunc'
import selectUsersFunc from './modalsFunc/selectUsersFunc'
// import serviceApplyFunc from './modalsFunc/serviceApplyFunc'
import serviceFunc from './modalsFunc/serviceFunc'
// import serviceUserStatusEditFunc from './modalsFunc/serviceStatusEditFunc'
// import serviceUserFunc from './modalsFunc/serviceUserFunc'
// import serviceUserViewFunc from './modalsFunc/serviceUserViewFunc'
import serviceViewFunc from './modalsFunc/serviceViewFunc'
// import userDeleteFunc from './modalsFunc/userDeleteFunc'
// import userFunc from './modalsFunc/userFunc'
// import userLoginHistoryFunc from './modalsFunc/userLoginHistoryFunc'
import userPaymentsForEventFunc from './modalsFunc/userPaymentsForEventFunc'
// import userPaymentsFunc from './modalsFunc/userPaymentsFunc'
// import userQuestionnaireFunc from './modalsFunc/userQuestionnaireFunc'
// import userSignedUpEventsFunc from './modalsFunc/userSignedUpEventsFunc'
// import userViewFunc from './modalsFunc/userViewFunc'
// import userSetPasswordFunc from './modalsFunc/userSetPasswordFunc'
// import { asyncEventsUsersByEventIdSelector } from '@state/asyncSelectors/asyncEventsUsersByEventIdAtom'
// import eventSignUpToReserveAfterError from './modalsFunc/eventSignUpToReserveAfterError'
// import roleFunc from './modalsFunc/roleFunc'
// import browseLocationFunc from './modalsFunc/browseLocationFunc'
import eventHistoryFunc from './modalsFunc/eventHistoryFunc'
import paymentHistoryFunc from './modalsFunc/paymentHistoryFunc'
// import userHistoryFunc from './modalsFunc/userHistoryFunc'
// import userActionsHistoryFunc from './modalsFunc/userActionsHistoryFunc'
// import userPersonalStatusEditFunc from './modalsFunc/userPersonalStatusEditFunc'
// import likesEditFunc from './modalsFunc/likesEditFunc'
// import copyEventUserListFunc from './modalsFunc/copyEventUserListFunc'
// import likeEditFunc from './modalsFunc/likeEditFunc'
// import likesViewFunc from './modalsFunc/likesViewFunc'
// import eventAfterSignUpMessageFunc from './modalsFunc/eventAfterSignUpMessageFunc'
// import subEventFunc from './modalsFunc/subEventFunc'
// import eventUserSubEventChangeFunc from './modalsFunc/eventUserSubEventChangeFunc'
import requestViewFunc from './modalsFunc/requestViewFunc'
import requestFunc from './modalsFunc/requestFunc'
import requestStatusEditFunc from './modalsFunc/requestStatusEditFunc'

const modalsFuncGenerator = (
  router,
  itemsFunc,
  loggedUser,
  siteSettings,
  loggedUserActiveRole,
  loggedUserActiveStatus
) => {
  const addModal = (value) => setAtomValue(addModalSelector, value)
  // const itemsFunc = getRecoil(itemsFuncAtom)

  return {
    add: addModal,
    confirm: ({
      title = 'Отмена изменений',
      text = 'Вы уверены, что хотите закрыть окно без сохранения изменений?',
      onConfirm,
    }) =>
      addModal({
        title,
        text,
        onConfirm,
      }),
    minimalSize: () =>
      addModal({
        title: 'Маленький размер фотографии',
        text: 'Фотография слишком маленькая. Размер должен быть не менее 100x100',
        confirmButtonName: `Понятно`,
        onConfirm: true,
        showDecline: false,
      }),
    // copyLink: (data) => addModal(copyLinkFunc(data)),
    browserUpdate: (url) =>
      addModal({
        title: 'Устаревшая версия браузера',
        text: `Необходимо обновить браузер. Некоторые функции сайта могут не работать. Пожалуйста обновите браузер.\n\nТекущая версия браузера: ${navigator.userAgent}`,
        confirmButtonName: `Обновить`,
        onConfirm: true,
        showDecline: true,
        onConfirm: () => router.push(url, ''),
      }),
    custom: addModal,
    cropImage: (...data) => addModal(cropImageFunc(...data)),
    error: (data) => addModal(errorFunc(data)),
    json: (data) => addModal(jsonFunc(data)),
    selectEvents: (
      itemsId,
      filterRules,
      onChange,
      exceptedIds,
      acceptedIds,
      maxEvents,
      canSelectNone,
      modalTitle
    ) =>
      addModal(
        selectEventsFunc(
          itemsId,
          filterRules,
          onChange,
          exceptedIds,
          acceptedIds,
          maxEvents,
          canSelectNone,
          modalTitle
        )
      ),
    selectUsers: (
      itemsId,
      filterRules,
      onChange,
      exceptedIds,
      acceptedIds,
      maxUsers,
      canSelectNone,
      modalTitle
    ) =>
      addModal(
        selectUsersFunc(
          itemsId,
          filterRules,
          onChange,
          exceptedIds,
          acceptedIds,
          maxUsers,
          canSelectNone,
          modalTitle
        )
      ),
    // selectDirections: (
    //   itemsId,
    //   filterRules,
    //   onChange,
    //   exceptedIds,
    //   acceptedIds,
    //   maxDirections,
    //   canSelectNone,
    //   modalTitle
    // ) =>
    //   addModal(
    //     selectDirectionsFunc(
    //       itemsId,
    //       filterRules,
    //       onChange,
    //       exceptedIds,
    //       acceptedIds,
    //       maxDirections,
    //       canSelectNone,
    //       modalTitle
    //     )
    //   ),
    // selectServices: (
    //   itemsId,
    //   filterRules,
    //   onChange,
    //   exceptedIds,
    //   acceptedIds,
    //   maxServices,
    //   canSelectNone,
    //   modalTitle
    // ) =>
    //   addModal(
    //     selectServicesFunc(
    //       itemsId,
    //       filterRules,
    //       onChange,
    //       exceptedIds,
    //       acceptedIds,
    //       maxServices,
    //       canSelectNone,
    //       modalTitle
    //     )
    //   ),
    selectPayments: (
      itemsId,
      filterRules,
      onChange,
      exceptedIds,
      acceptedIds,
      maxPayments,
      canSelectNone,
      modalTitle
    ) =>
      addModal(
        selectPaymentsFunc(
          itemsId,
          filterRules,
          onChange,
          exceptedIds,
          acceptedIds,
          maxPayments,
          canSelectNone,
          modalTitle
        )
      ),
    direction: {
      add: (directionId) => addModal(directionFunc(directionId, true)),
      edit: (directionId) => addModal(directionFunc(directionId)),
      delete: (directionId) =>
        addModal({
          title: 'Удаление направления',
          text: 'Вы уверены, что хотите удалить направление?',
          onConfirm: async () => itemsFunc.direction.delete(directionId),
        }),
      view: (directionId) => addModal(directionViewFunc(directionId)),
    },
    eventsTags: {
      edit: () => addModal(eventsTagsFunc()),
    },
    request: {
      add: (requestId) => addModal(requestFunc(requestId, true)),
      edit: (requestId) => addModal(requestFunc(requestId)),
      statusEdit: (requestId) => addModal(requestStatusEditFunc(requestId)),
      view: (requestId) => addModal(requestViewFunc(requestId)),
    },
    event: {
      add: (eventId) => addModal(eventFunc(eventId, true)),
      edit: (eventId) => addModal(eventFunc(eventId)),
      // users: (eventId) => addModal(eventUsersFunc(eventId)),
      history: (eventId) => addModal(eventHistoryFunc(eventId)),
      statusEdit: (eventId) => addModal(eventStatusEditFunc(eventId)),
      // payments: (eventId) => addModal(eventUsersPaymentsFunc(eventId)),
      close: (eventId) =>
        addModal({
          title: 'Закрытие мероприятия',
          text: 'Вы уверены, что хотите закрыть мероприятие?',
          onConfirm: async () => itemsFunc.event.close(eventId),
        }),
      cancel: (eventId) =>
        addModal({
          title: 'Отмена события',
          text: 'Вы уверены, что хотите отменить мероприятие (это не удалит мероприятие, а лишь изменит его статус на отмененное)?',
          onConfirm: async () => itemsFunc.event.cancel(eventId),
        }),
      uncancel: (eventId) =>
        addModal({
          title: 'Возобновление события',
          text: 'Вы уверены, что хотите возобновить мероприятие?',
          onConfirm: async () => itemsFunc.event.uncancel(eventId),
        }),
      delete: (eventId) =>
        addModal({
          title: 'Удаление события',
          text: 'Вы уверены, что хотите удалить мероприятие?',
          onConfirm: async () => itemsFunc.event.delete(eventId),
        }),
      view: (eventId) => addModal(eventViewFunc(eventId)),
      // editLikes: (eventId) => addModal(likesEditFunc(eventId)),
      // viewLikes: (eventId) => addModal(likesViewFunc(eventId)),
      // copyUsersList: (eventId) => addModal(copyEventUserListFunc(eventId)),
    },
    // eventUser: {
    //   editStatus: (eventUser) => addModal(eventUserStatusChangeFunc(eventUser)),
    //   editSubEvent: (eventUser, onConfirm) =>
    //     addModal(eventUserSubEventChangeFunc(eventUser, onConfirm)),
    //   editLike: (eventUser, adminView) =>
    //     addModal(likeEditFunc(eventUser, adminView)),
    //   likesResult: (eventUser) => addModal(likeEditFunc(eventUser)),
    // },
    payment: {
      add: (paymentId, props) => addModal(paymentFunc(paymentId, true, props)),
      edit: (paymentId) => addModal(paymentFunc(paymentId)),
      history: (paymentId) => addModal(paymentHistoryFunc(paymentId)),
      // autoFill: (eventId) => addModal(paymentsAutoFillFunc(eventId)),
      delete: (paymentId) =>
        addModal({
          title: 'Удаление транзакции',
          text: 'Вы уверены, что хотите удалить транзакцию?',
          onConfirm: async () => itemsFunc.payment.delete(paymentId),
        }),
      userEvent: (userId, eventId) =>
        addModal(userPaymentsForEventFunc(userId, eventId)),
    },
    // user: {
    //   add: (userId) => addModal(userFunc(userId, true)),
    //   edit: (userId) => addModal(userFunc(userId)),
    //   history: (userId) => addModal(userHistoryFunc(userId)),
    //   historyActions: (userId) => addModal(userActionsHistoryFunc(userId)),
    //   editPersonalStatus: (userId) =>
    //     addModal(userPersonalStatusEditFunc(userId)),
    //   delete: (userId) =>
    //     addModal(
    //       userDeleteFunc(userId)
    //       //   {
    //       //   title: 'Удаление пользователя',
    //       //   text: 'Вы уверены, что хотите удалить пользователя?',
    //       //   onConfirm: async () => itemsFunc.user.delete(userId),
    //       // }
    //     ),
    //   view: (userId, params) => addModal(userViewFunc(userId, params)),
    //   events: (userId) => addModal(userSignedUpEventsFunc(userId)),
    //   payments: (userId) => addModal(userPaymentsFunc(userId)),
    //   setPassword: (userId) => addModal(userSetPasswordFunc(userId)),
    // },
    service: {
      add: (serviceId) => addModal(serviceFunc(serviceId, true)),
      edit: (serviceId) => addModal(serviceFunc(serviceId)),
      view: (serviceId) => addModal(serviceViewFunc(serviceId)),
      delete: (serviceId) =>
        addModal({
          title: 'Удаление услуги',
          text: 'Вы уверены, что хотите удалить услугу?',
          onConfirm: async () => itemsFunc.service.delete(serviceId),
        }),
      buy: (serviceId, userId) =>
        addModal({
          title: 'Покупка услуги',
          text: 'Вы уверены, что хотите приобрести услугу?',
          onConfirm: async () => {
            itemsFunc.service.buy(serviceId, userId)
            addModal({
              title: 'Покупка услуги',
              text: 'Заявка на покупку услуги отправлена! Администратор свяжется с вами в ближайшее время.',
            })
          },
        }),
    },
    // serviceUser: {
    //   add: (serviceId) => addModal(serviceUserFunc(serviceId, true)),
    //   edit: (serviceId) => addModal(serviceUserFunc(serviceId)),
    //   view: (serviceUserId) => addModal(serviceUserViewFunc(serviceUserId)),
    //   delete: (serviceUserId) =>
    //     addModal({
    //       title: 'Удаление заявки на услугу',
    //       text: 'Вы уверены, что хотите удалить заявку на услугу?',
    //       onConfirm: async () => itemsFunc.servicesUser.delete(serviceUserId),
    //     }),
    //   statusEdit: (serviceUserId) =>
    //     addModal(serviceUserStatusEditFunc(serviceUserId)),
    // },
    // browseLocation: () => addModal(browseLocationFunc()),
  }
}

export default modalsFuncGenerator
