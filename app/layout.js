import './globals.css'
import '../fonts/InterTight.css'
import '../fonts/Buyan.css'
import '../fonts/Montserrat.css'
// import { RecoilRoot } from 'recoil'
// import localFont from 'next/font/local'

// const inter = localFont({ src: '../fonts/InterTight-Regular.ttf' })

export const metadata = {
  title: 'Иллюзионист Алексей Белинский',
  description: 'Уникальное шоу на любое мероприятие',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
