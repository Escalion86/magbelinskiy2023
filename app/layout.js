import './globals.css'
import '../fonts/InterTight.css'
import '../fonts/Buyan.css'
import '../fonts/Montserrat.css'

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
        <Suspense>
          <Metrika />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
