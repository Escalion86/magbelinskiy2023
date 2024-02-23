import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CabinetPage from './cabinet'

export default async function Cabinet({ params, searchParams }) {
  const session = await getServerSession()
  const user = session?.user
  const page = params?.page

  console.log('page :>> ', page)

  if (!user) return redirect('login')

  return <CabinetPage />
}
