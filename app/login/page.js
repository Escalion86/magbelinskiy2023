import { getServerSession } from 'next-auth'
import LoginInputs from './loginInputs'
import { redirect } from 'next/navigation'
import authOptions from '../api/auth/[...nextauth]/_options'
// import { signIn } from 'next-auth/react'

export default async function Login() {
  let session = null

  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error('Ошибка получения сессии в /login', error)
  }

  const user = session?.user

  if (user) return redirect('cabinet')

  return <LoginInputs />
}
