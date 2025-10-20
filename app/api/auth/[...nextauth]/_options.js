import CredentialsProvider from 'next-auth/providers/credentials'
import crypto from 'crypto'

const getAuthSecret = () => {
  if (process.env.NEXTAUTH_SECRET) {
    return process.env.NEXTAUTH_SECRET
  }

  const login = process.env.LOGIN
  const password = process.env.PASSWORD

  if (!login || !password) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'NEXTAUTH_SECRET не задан. Укажите переменную окружения или задайте LOGIN и PASSWORD.'
      )
    }

    return undefined
  }

  const fallbackSecret = crypto
    .createHash('sha256')
    .update(`${login}:${password}`)
    .digest('hex')

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'NEXTAUTH_SECRET не найден. Используется детерминированный секрет, сформированный из LOGIN и PASSWORD.'
    )
  }

  return fallbackSecret
}

const authSecret = getAuthSecret()

const authOptions = {
  // Configure one or more authentication providers
  pages: { signIn: '/login' },
  secret: authSecret,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          // const user = login(credentials)
          // console.log({ credentials })
          if (
            credentials.name === process.env.LOGIN &&
            credentials.password === process.env.PASSWORD
          ) {
            console.log('credentials :>> ', credentials)
            console.log('success')
            return credentials
          }

          return null
          // return user
        } catch (error) {
          console.log({ error })
          return null
        }
      },
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   // async jwt({ token, user }) {
  //   //   return { ...token, ...user }
  //   // },
  //   async session({ session, user, token }) {
  //     // await fetchingLog(
  //     //   { from: 'nextauth callback session', user: session?.user },
  //     //   process.env.NEXTAUTH_SITE
  //     // )

  //     const userPhone = session.user.name

  //     // Находим данные пользователя и обновляем время активности
  //     // await fetchingLog(
  //     //   { from: 'start dbConnect in nextauth' },
  //     //   process.env.NEXTAUTH_SITE
  //     // )
  //     await dbConnect()
  //     // await fetchingLog(
  //     //   { from: 'finish dbConnect in nextauth' },
  //     //   process.env.NEXTAUTH_SITE
  //     // )

  //     console.log('dbConnect')

  //     const result = await Users.findOne({ phone: userPhone })
  //     // const result = await Users.findOneAndUpdate(
  //     //   { phone: userPhone },
  //     //   {
  //     //     lastActivityAt: Date.now(),
  //     //     // prevActivityAt: session.user.lastActivityAt,
  //     //   }
  //     // )
  //     // console.log('!!!!!!!!!!!result', result)

  //     // const result = await fetchingUserByPhone(
  //     //   userPhone,
  //     //   process.env.NEXTAUTH_SITE
  //     // )
  //     // await fetchingLog(
  //     //   { from: 'result in nextauth', result },
  //     //   process.env.NEXTAUTH_SITE
  //     // )

  //     // Если пользователь есть в базе (а он должен быть)
  //     if (result) {
  //       // await fetchingLog(
  //       //   {
  //       //     from: 'user finded. update User activity time in nextauth authorize',
  //       //   },
  //       //   process.env.NEXTAUTH_SITE
  //       // )
  //       result.prevActivityAt = result.lastActivityAt
  //       result.lastActivityAt = Date.now()
  //       result.save()

  //       // await fetchingLog(
  //       //   { from: 'user activity time saved' },
  //       //   process.env.NEXTAUTH_SITE
  //       // )

  //       // session.user._id = result._id
  //       // session.user.role = result.role
  //       // session.user.firstName = result.firstName
  //     }
  //     return Promise.resolve(session)
  //   },
  // },
}

export default authOptions
