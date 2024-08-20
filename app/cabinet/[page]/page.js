import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CabinetPage from './cabinet'
import fetchProps from '@server/fetchProps'

export default async function Cabinet({ params, searchParams }) {
  const session = await getServerSession()
  const user = session?.user
  const page = params?.page

  const fetchedProps = await fetchProps(user)

  if (!user) return redirect('/login')

  return <CabinetPage {...fetchedProps} page={page} />
}
