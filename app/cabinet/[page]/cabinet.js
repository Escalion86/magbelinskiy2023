'use client'

import { signOut } from 'next-auth/react'
// import Fab from '@components/Fab'
// import FabMenu from '@components/FabMenu'
// import LoadingSpinner from '@components/LoadingSpinner'
import StateLoader from '@components/StateLoader'
import { CONTENTS } from '@helpers/constants'
// import isUserQuestionnaireFilled from '@helpers/isUserQuestionnaireFilled'
import BurgerLayout from '@layouts/BurgerLayout'
import CabinetHeader from '@layouts/CabinetHeader'
import CabinetWrapper from '@layouts/wrappers/CabinetWrapper'
import ContentWrapper from '@layouts/wrappers/ContentWrapper'
// import fetchProps from '@server/fetchProps'
// import loggedUserActiveStatusAtom from '@state/atoms/loggedUserActiveStatusAtom'
// import loggedUserAtom from '@state/atoms/loggedUserAtom'
// import loggedUserActiveRoleSelector from '@state/selectors/loggedUserActiveRoleSelector'
// import { getSession } from 'next-auth/react'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import { Provider } from 'jotai'
import store from '@state/store'
// import { useAtomValue } from 'jotai'

// const SuspenseChild = () => (
//   <div className="z-10 flex h-[calc(100vh-4rem)] w-full items-center justify-center">
//     <LoadingSpinner text="идет загрузка...." />
//   </div>
// )

function CabinetPage(props) {
  const { page } = props
  // const router = useRouter()
  // const page = router.asPath.replace('/cabinet/', '').split('?')[0]
  // const loggedUser = useAtomValue(loggedUserAtom)
  // const loggedUserActiveRole = useAtomValue(loggedUserActiveRoleSelector)
  // const loggedUserActiveStatusName = useAtomValue(loggedUserActiveStatusAtom)
  // const showFab = !loggedUserActiveRole?.hideFab || page === 'settingsFabMenu'

  // let redirect
  // if (!props.loggedUser) redirect = '/'

  // // Ограничиваем пользователям доступ к страницам
  // useEffect(() => {
  //   if (redirect) router.push(redirect, '', { shallow: true })
  // }, [redirect])

  // if (redirect) return null

  const Component = CONTENTS[page]
    ? CONTENTS[page].Component
    : (props) => <div className="flex justify-center px-2">Ошибка 404</div>

  const title = CONTENTS[page] ? CONTENTS[page].name : ''

  return (
    <>
      <Head>
        <title>{`Cigam.ru - Кабинет${title ? ' / ' + title : ''}`}</title>
        {/* <meta name="description" content={activeLecture.description} /> */}
      </Head>
      {/* <button onClick={() => signOut()}>SignOut</button> */}
      <Provider store={store}>
        <StateLoader {...props}>
          {/* {loggedUser && ( */}
          <CabinetWrapper>
            <CabinetHeader title={title} />
            <BurgerLayout />
            <ContentWrapper page={page}>
              <Component {...props} />
              {/* {!redirect && (
                <Suspense fallback={<SuspenseChild />}>
                  <Component {...props} />
                </Suspense>
              )} */}
            </ContentWrapper>
            {/* <FabMenu show={showFab} /> */}
          </CabinetWrapper>
          {/* )} */}
        </StateLoader>
      </Provider>
    </>
  )
}

export default CabinetPage
