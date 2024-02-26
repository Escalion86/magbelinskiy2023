import './globals.css'
import '../fonts/InterTight.css'
import '../fonts/Buyan.css'
import '../fonts/Montserrat.css'
// import Provider from './providers'
// import Head from 'next/head'
// import { RecoilRoot } from 'recoil'
// import localFont from 'next/font/local'

// const inter = localFont({ src: '../fonts/InterTight-Regular.ttf' })
import { Suspense } from 'react'
import Metrika from './components/metrika'

export const metadata = {
  title: 'Иллюзионист Алексей Белинский',
  description: 'Уникальное шоу на любое мероприятие',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body>
        {/* <Provider> */}
        {children}
        {/* </Provider> */}
        <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html>
  )
}
