import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CabinetPage from './cabinet'
import fetchProps from '@server/fetchProps'
import authOptions from '../../api/auth/[...nextauth]/_options'

export default async function Cabinet({ params, searchParams }) {
  let session = null

  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error('Ошибка получения сессии в /cabinet/[page]', error)
  }

  const user = session?.user
  const page = params?.page

  if (!user) return redirect('/login')

  const fetchedProps = await fetchProps(user)

  return <CabinetPage {...fetchedProps} page={page} />
}
