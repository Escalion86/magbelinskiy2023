import './globals.css'
import '../fonts/InterTight.css'
import '../fonts/Buyan.css'
import '../fonts/Montserrat.css'

import { Suspense } from 'react'
import Metrika from './components/metrika'
import Head from 'next/head'

export const metadata = {
  title: 'Иллюзионист Алексей Белинский',
  description: 'Уникальное шоу на любое мероприятие',
}

export default function RootLayout({ children }) {
  const isProduction = process.env.NODE_ENV !== 'development'
  return (
    <html lang="ru" className="scroll-smooth">
      {isProduction && (
        <Head>
          <Suspense>
            <Metrika />
          </Suspense>
        </Head>
      )}
      <body>{children}</body>
    </html>
  )
}
