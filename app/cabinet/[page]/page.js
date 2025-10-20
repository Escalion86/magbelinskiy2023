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

  const page = params?.page

  if (!session) return redirect('/login')

  const fetchedProps = await fetchProps(session?.user)

  return <CabinetPage {...fetchedProps} page={page} />
}
