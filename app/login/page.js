import { getServerSession } from 'next-auth'
import LoginInputs from './loginInputs'
import { redirect } from 'next/navigation'
// import authOptions from '../api/auth/[...nextauth]/_options'
// import { signIn } from 'next-auth/react'

export default async function Login() {
  const session = await getServerSession()
  const user = session?.user

  if (user) return redirect('cabinet')

  return <LoginInputs />
}
