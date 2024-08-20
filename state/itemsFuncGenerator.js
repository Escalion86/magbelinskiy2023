import { postData, putData, deleteData } from '@helpers/CRUD'
import isSiteLoadingAtom from './atoms/isSiteLoadingAtom'

import { setRecoil } from 'recoil-nexus'
import addErrorModalSelector from './selectors/addErrorModalSelector'
import setLoadingSelector from './selectors/setLoadingSelector'
import setNotLoadingSelector from './selectors/setNotLoadingSelector'
import setErrorSelector from './selectors/setErrorSelector'
import setNotErrorSelector from './selectors/setNotErrorSelector'
import eventEditSelector from './selectors/eventEditSelector'
import eventDeleteSelector from './selectors/eventDeleteSelector'
import directionEditSelector from './selectors/directionEditSelector'
import directionDeleteSelector from './selectors/directionDeleteSelector'
// import additionalBlockEditSelector from './selectors/additionalBlockEditSelector'
// import additionalBlockDeleteSelector from './selectors/additionalBlockDeleteSelector'
// import userDeleteSelector from './selectors/userDeleteSelector'
// import userEditSelector from './selectors/userEditSelector'
// import reviewEditSelector from './selectors/reviewEditSelector'
// import reviewDeleteSelector from './selectors/reviewDeleteSelector'
import paymentsAddSelector from './selectors/paymentsAddSelector'
import paymentEditSelector from './selectors/paymentEditSelector'
import paymentsDeleteSelector from './selectors/paymentsDeleteSelector'
import requestEditSelector from './selectors/requestEditSelector'
import requestDeleteSelector from './selectors/requestDeleteSelector'
// import siteSettingsAtom from './atoms/siteSettingsAtom'
// import questionnaireEditSelector from './selectors/questionnaireEditSelector'
// import questionnaireDeleteSelector from './selectors/questionnaireDeleteSelector'
// import questionnaireUsersEditSelector from './selectors/questionnaireUsersEditSelector'
// import questionnaireUsersDeleteSelector from './selectors/questionnaireUsersDeleteSelector'
// import serviceEditSelector from './selectors/serviceEditSelector'
// import serviceDeleteSelector from './selectors/serviceDeleteSelector'
// import servicesUsersEditSelector from './selectors/servicesUsersEditSelector'
// import servicesUsersDeleteSelector from './selectors/servicesUsersDeleteSelector'
// import setEventsUsersSelector from './async/setEventsUsersSelector'
// import signOutUserSelector from './async/signOutUserSelector'
// import signUpUserSelector from './async/signUpUserSelector'
// import setEventUserSelector from './async/setEventUserSelector'
// import rolesAtom from './atoms/rolesAtom'
// import updateEventsUsersSelector from './async/updateEventsUsersSelector'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const messages = {
  request: {
    update: {
      success: 'Заявка обновлено',
      error: 'Не удалось обновить заявку',
    },
    add: {
      success: 'Заявка создано',
      error: 'Не удалось создать заявку',
    },
    delete: {
      success: 'Заявка удалено',
      error: 'Не удалось удалить заявку',
    },
  },
  event: {
    update: {
      success: 'Мероприятие обновлено',
      error: 'Не удалось обновить мероприятие',
    },
    add: {
      success: 'Мероприятие создано',
      error: 'Не удалось создать мероприятие',
    },
    delete: {
      success: 'Мероприятие удалено',
      error: 'Не удалось удалить мероприятие',
    },
  },
  direction: {
    update: {
      success: 'Направление обновлено',
      error: 'Не удалось обновить направление',
    },
    add: {
      success: 'Направление создано',
      error: 'Не удалось создать направление',
    },
    delete: {
      success: 'Направление удалено',
      error: 'Не удалось удалить направление',
    },
  },
  client: {
    update: {
      success: 'Клиент обновлен',
      error: 'Не удалось обновить клиента',
    },
    add: {
      success: 'Клиент создан',
      error: 'Не удалось создать клиента',
    },
    delete: {
      success: 'Клиент удален',
      error: 'Не удалось удалить клиента',
    },
  },
  payment: {
    update: {
      success: 'Транзакция обновлена',
      error: 'Не удалось обновить транзакцию',
    },
    add: {
      success: 'Транзакция создана',
      error: 'Не удалось создать транзакцию',
    },
    delete: {
      success: 'Транзакция удалена',
      error: 'Не удалось удалить транзакцию',
    },
  },
  service: {
    update: {
      success: 'Услуга обновлена',
      error: 'Не удалось обновить услугу',
    },
    add: {
      success: 'Услуга создана',
      error: 'Не удалось создать услугу',
    },
    delete: {
      success: 'Услуга удалена',
      error: 'Не удалось удалить услугу',
    },
  },
  // eventsUser: {
  //   update: {
  //     success: 'Пользователь на мероприятии обновлен',
  //     error: 'Не удалось обновить пользователя на мероприятии',
  //   },
  //   add: {
  //     success: 'Пользователь на мероприятии создан',
  //     error: 'Не удалось создать пользователя на мероприятии',
  //   },
  //   delete: {
  //     success: 'Пользователь на мероприятии удален',
  //     error: 'Не удалось удалить пользователя на мероприятии',
  //   },
  // },
  // servicesUser: {
  //   update: {
  //     success: 'Заявка на услугу обновлена',
  //     error: 'Не удалось обновить заявку на услугу',
  //   },
  //   add: {
  //     success: 'Заявка на услугу создана',
  //     error: 'Не удалось создать заявку на услугу',
  //   },
  //   delete: {
  //     success: 'Заявка на услугу удалена',
  //     error: 'Не удалось удалить заявку на услугу',
  //   },
  // },
}

const setFunc = (selector) => (value) => setRecoil(selector, value)

// const setFamilyFunc = (selector) => (id, value) =>
//   setRecoil(selector(id), value)

const props = {
  setLoading: setFunc(isSiteLoadingAtom),
  addErrorModal: setFunc(addErrorModalSelector),
  setLoadingCard: setFunc(setLoadingSelector),
  setNotLoadingCard: setFunc(setNotLoadingSelector),
  setErrorCard: setFunc(setErrorSelector),
  setNotErrorCard: setFunc(setNotErrorSelector),
  setEvent: setFunc(eventEditSelector),
  deleteEvent: setFunc(eventDeleteSelector),
  setDirection: setFunc(directionEditSelector),
  deleteDirection: setFunc(directionDeleteSelector),
  setRequest: setFunc(requestEditSelector),
  deleteRequest: setFunc(requestDeleteSelector),
  addPayments: setFunc(paymentsAddSelector),
  setPayment: setFunc(paymentEditSelector),
  deletePayment: setFunc(paymentsDeleteSelector),

  // setEventsUsers: setFamilyFunc(setEventsUsersSelector),
  // updateEventsUsers: setFamilyFunc(updateEventsUsersSelector),
  // deleteEventsUser: setFunc(signOutUserSelector),
  // addEventsUser: setFunc(signUpUserSelector),
  // setEventsUser: setFunc(setEventUserSelector),

  // setSiteSettings: setFunc(siteSettingsAtom),
  // setQuestionnaire: setFunc(questionnaireEditSelector),
  // deleteQuestionnaire: setFunc(questionnaireDeleteSelector),
  // setQuestionnaireUsers: setFunc(questionnaireUsersEditSelector),
  // deleteQuestionnaireUsers: setFunc(questionnaireUsersDeleteSelector),
  // setService: setFunc(serviceEditSelector),
  // deleteService: setFunc(serviceDeleteSelector),
  // setServicesUser: setFunc(servicesUsersEditSelector),
  // deleteServicesUser: setFunc(servicesUsersDeleteSelector),
  // setRoles: setFunc(rolesAtom),
}

const itemsFuncGenerator = (
  snackbar,
  loggedUser,
  array = [
    'request',
    'event',
    // 'eventsUser',
    'direction',
    // 'additionalBlock',
    // 'user',
    // 'review',
    'payment',
    // 'questionnaire',
    // 'questionnairesUser',
    // 'service',
    // 'eventsUser',
    // 'servicesUser',
    // 'eventsTag',
  ]
) => {
  const {
    setLoadingCard,
    setNotLoadingCard,
    setErrorCard,
    // setNotErrorCard,
    addErrorModal,
    // snackbar = {},
  } = props
  const obj = {}
  array?.length > 0 &&
    array.forEach((itemName) => {
      obj[itemName] = {
        set: async (item, clone, noSnackbar) => {
          if (item?._id && !clone) {
            setLoadingCard(itemName + item._id)
            return await putData(
              `/api/${itemName.toLowerCase()}s/${item._id}`,
              item,
              (data) => {
                setNotLoadingCard(itemName + item._id)
                if (!noSnackbar && messages[itemName]?.update?.success)
                  snackbar.success(messages[itemName].update.success)
                props['set' + capitalizeFirstLetter(itemName)](data)
                // setEvent(data)
              },
              (error) => {
                if (!noSnackbar && messages[itemName]?.update?.error)
                  snackbar.error(messages[itemName].update.error)
                setErrorCard(itemName + item._id)
                const data = {
                  errorPlace: 'UPDATE ERROR',
                  itemName,
                  item,
                  error,
                }
                addErrorModal(data)
              },
              false,
              loggedUser?._id
            )
          } else {
            const clearedItem = { ...item }
            delete clearedItem._id
            return await postData(
              `/api/${itemName.toLowerCase()}s`,
              clearedItem,
              (data) => {
                if (!noSnackbar && messages[itemName]?.add?.success)
                  snackbar.success(messages[itemName].add.success)
                props['set' + capitalizeFirstLetter(itemName)](data)
                // setEvent(data)
              },
              (error) => {
                if (!noSnackbar && messages[itemName]?.add?.error)
                  snackbar.error(messages[itemName].add.error)
                setErrorCard(itemName + item._id)
                const data = {
                  errorPlace: 'CREATE ERROR',
                  itemName,
                  item,
                  error,
                }
                addErrorModal(data)
                console.log(data)
              },
              false,
              loggedUser?._id
            )
          }
        },
        delete: async (itemId) => {
          setLoadingCard(itemName + itemId)
          return await deleteData(
            `/api/${itemName.toLowerCase()}s/${itemId}`,
            () => {
              if (messages[itemName]?.delete?.success)
                snackbar.success(messages[itemName].delete.success)
              props['delete' + capitalizeFirstLetter(itemName)](itemId)
            },
            (error) => {
              if (messages[itemName]?.delete?.error)
                snackbar.error(messages[itemName].delete.error)
              setErrorCard(itemName + itemId)
              const data = {
                errorPlace: 'DELETE ERROR',
                itemName,
                itemId,
                error,
              }
              addErrorModal(data)
              console.log(data)
            },
            false,
            loggedUser?._id
            //  deleteEvent(itemId)
          )
        },
      }
    })

  // obj['additionalBlock'].up = async (itemId) => {
  //   // Сначала получаем список элементов которые можно поднять
  //   toggleLoading('additionalBlock' + itemId)
  //   await putData(
  //     `/api/additionalblocks/${itemId}`,
  //     () => props['setAdditionalBlock'](itemId)
  //     //  deleteEvent(itemId)
  //   )
  // }

  obj.event.cancel = async (eventId) => {
    setLoadingCard('event' + eventId)
    return await putData(
      `/api/events/${eventId}`,
      { status: 'canceled' },
      (data) => {
        snackbar.success('Мероприятие отменено')
        setNotLoadingCard('event' + eventId)
        props.setEvent(data)
      },
      (error) => {
        snackbar.error('Не удалось отменить мероприятие')
        setErrorCard('event' + eventId)
        const data = { errorPlace: 'EVENT CANCEL ERROR', eventId, error }
        addErrorModal(data)
        console.log(data)
      },
      false,
      loggedUser?._id
    )
  }

  obj.event.close = async (eventId) => {
    setLoadingCard('event' + eventId)
    return await putData(
      `/api/events/${eventId}`,
      { status: 'close' },
      (data) => {
        snackbar.success('Мероприятие закрыто')
        setNotLoadingCard('event' + eventId)
        props.setEvent(data)
      },
      (error) => {
        snackbar.error('Не удалось закрыть мероприятие')
        setErrorCard('event' + eventId)
        const data = { errorPlace: 'EVENT CLOSE ERROR', eventId, error }
        addErrorModal(data)
        console.log(data)
      },
      false,
      loggedUser?._id
    )
  }
  // obj.roles = {}
  // obj.roles.update = async (roles) => {
  //   return await postData(
  //     `/api/roles`,
  //     roles,
  //     (data) => {
  //       snackbar.success('Роли обновлены')
  //       props.setRoles(data)
  //     },
  //     (error) => {
  //       snackbar.error('Не удалось обновить роли')
  //       const data = { errorPlace: 'ROLES UPDATE ERROR', roles, error }
  //       addErrorModal(data)
  //       console.log(data)
  //     },
  //     false,
  //     loggedUser?._id
  //   )
  // }

  obj.payment.link = async (paymentId, eventId) => {
    setLoadingCard('payment' + paymentId)
    return await putData(
      `/api/payments/${paymentId}`,
      { eventId },
      (data) => {
        snackbar.success('Транзакция привязана к мероприятию')
        setNotLoadingCard('payment' + paymentId)
        props.setPayment(data)
      },
      (error) => {
        snackbar.error('Не удалось привязать транзакцию к мероприятию')
        setErrorCard('payment' + paymentId)
        const data = {
          errorPlace: 'PAYMENT LINK ERROR',
          paymentId,
          eventId,
          error,
        }
        addErrorModal(data)
        console.log(data)
      },
      false,
      loggedUser?._id
    )
  }

  obj.payment.unlink = async (paymentId) => {
    setLoadingCard('payment' + paymentId)
    return await putData(
      `/api/payments/${paymentId}`,
      { eventId: null },
      (data) => {
        snackbar.success('Транзакция отвязана от мероприятия')
        setNotLoadingCard('payment' + paymentId)
        props.setPayment(data)
      },
      (error) => {
        snackbar.error('Не удалось отвязать транзакцию от мероприятия')
        setErrorCard('payment' + paymentId)
        const data = {
          errorPlace: 'PAYMENT UNLINK ERROR',
          paymentId,
          error,
        }
        addErrorModal(data)
        console.log(data)
      },
      false,
      loggedUser?._id
    )
  }

  obj.event.uncancel = async (eventId) => {
    setLoadingCard('event' + eventId)
    return await putData(
      `/api/events/${eventId}`,
      { status: 'active' },
      (data) => {
        snackbar.success('Мероприятие активировано')
        setNotLoadingCard('event' + eventId)
        props.setEvent(data)
      },
      (error) => {
        snackbar.error('не удалось активировать мероприятие')
        setErrorCard('event' + eventId)
        const data = { errorPlace: 'EVENT ACTIVE ERROR', eventId, error }
        addErrorModal(data)
        console.log(data)
      },
      false,
      loggedUser?._id
    )
  }

  return obj
}

export default itemsFuncGenerator
