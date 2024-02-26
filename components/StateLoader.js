import { useRecoilState, useSetRecoilState } from 'recoil'

import directionsAtom from '@state/atoms/directionsAtom'
import requestsAtom from '@state/atoms/requestsAtom'
import eventsAtom from '@state/atoms/eventsAtom'
import clientsAtom from '@state/atoms/clientsAtom'
import siteSettingsAtom from '@state/atoms/siteSettingsAtom'
import loggedUserAtom from '@state/atoms/loggedUserAtom'
import { useEffect } from 'react'
import LoadingSpinner from '@components/LoadingSpinner'
import ModalsPortal from '@layouts/modals/ModalsPortal'
import isSiteLoadingAtom from '@state/atoms/isSiteLoadingAtom'
import cn from 'classnames'
// import { useRouter } from 'next/router'
import { useWindowDimensionsRecoil } from '@helpers/useWindowDimensions'

const StateLoader = (props) => {
  if (props.error && Object.keys(props.error).length > 0)
    console.log('props.error', props.error)

  // const snackbar = useSnackbar()

  // const router = useRouter()

  // const [modalFunc, setModalsFunc] = useRecoilState(modalsFuncAtom)

  const [isSiteLoading, setIsSiteLoading] = useRecoilState(isSiteLoadingAtom)

  // const [mode, setMode] = useRecoilState(modeAtom)

  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom)

  const setRequestsState = useSetRecoilState(requestsAtom)
  const setEventsState = useSetRecoilState(eventsAtom)
  const setDirectionsState = useSetRecoilState(directionsAtom)
  const setClientsState = useSetRecoilState(clientsAtom)
  // const setAdditionalBlocksState = useSetRecoilState(additionalBlocksAtom)
  // const setUsersState = useSetRecoilState(usersAtom)
  // const setReviewsState = useSetRecoilState(reviewsAtom)
  // const setPaymentsState = useSetRecoilState(paymentsAtom)
  const [siteSettingsState, setSiteSettingsState] =
    useRecoilState(siteSettingsAtom)
  // const setRolesSettingsState = useSetRecoilState(rolesAtom)
  // const setHistoriesState = useSetRecoilState(historiesAtom)
  // const setQuestionnairesState = useSetRecoilState(questionnairesAtom)
  // const setQuestionnairesUsersState = useSetRecoilState(questionnairesUsersAtom)
  // const setServicesState = useSetRecoilState(servicesAtom)
  // const setServicesUsersState = useSetRecoilState(servicesUsersAtom)
  // const setServerSettingsState = useSetRecoilState(serverSettingsAtom)

  // const setItemsFunc = useSetRecoilState(itemsFuncAtom)

  useWindowDimensionsRecoil()

  // useEffect(() => {
  //   // const itemsFunc = itemsFuncGenerator(snackbar, loggedUser)
  //   // setItemsFunc(itemsFunc)
  //   setModalsFunc(
  //     modalsFuncGenerator(
  //       router,
  //       // itemsFunc,
  //       loggedUser,
  //       siteSettingsState,
  //     )
  //   )
  // }, [loggedUser, siteSettingsState])

  console.log('props :>> ', props)

  useEffect(() => {
    setLoggedUser(props.loggedUser)
    setRequestsState(props.requests)
    setEventsState(props.events)
    setDirectionsState(props.directions)
    setClientsState(props.clients)
    setSiteSettingsState(props.siteSettings)
    setIsSiteLoading(false)
  }, [])

  // useEffect(() => {
  //   if (loggedUser) {
  //     postData(
  //       `/api/loginhistory`,
  //       {
  //         userId: loggedUser._id,
  //         browser: browserVer(true),
  //       },
  //       null,
  //       null,
  //       false,
  //       null,
  //       true
  //     )
  //   }
  // }, [loggedUser])

  return (
    <div className={cn('relative overflow-hidden', props.className)}>
      {isSiteLoading ? (
        <div className="h-screen w-full">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="relative w-full bg-white">{props.children}</div>
      )}
      <ModalsPortal />
    </div>
  )
}

export default StateLoader
