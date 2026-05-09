import './globals.css'
import './burger.css'
import '../fonts/InterTight.css'
import '../fonts/Buyan.css'
import '../fonts/Montserrat.css'
import '../fonts/FuturaPT.css'

import { Suspense } from 'react'
import Metrika from './components/metrika'
import Script from 'next/script'
// import Head from 'next/head'

export const metadata = {
  title: 'Фокусник-иллюзионист Алексей Белинский — заказать шоу в Красноярске',
  description:
    'Закажите шоу иллюзиониста в Красноярске. Обладатель Кубка Мерлина, 22 года опыта, 3000+ выступлений. Корпоративы, свадьбы, дни рождения. Выезд в Абакан, Новосибирск. Тел: 8(913)837-00-20',
  keywords:
    'фокусник Красноярск, иллюзионист Красноярск, заказать фокусника, шоу иллюзиониста, корпоратив фокусник, фокусник на свадьбу, детский фокусник Красноярск',
  openGraph: {
    title: 'Фокусник-иллюзионист Алексей Белинский — шоу в Красноярске',
    description:
      'Кубок Мерлина · 22 года опыта · 3000+ выступлений. Корпоративы, свадьбы, детские праздники. Красноярск.',
    url: 'https://cigam.ru',
    siteName: 'cigam.ru',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  const isProduction = process.env.NODE_ENV !== 'development'
  return (
    <html lang="ru" className="scroll-smooth" data-scroll-behavior="smooth">
      <body>
        {isProduction && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(38403125, "init", {
          defer: true,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true
        });    
      `}
            </Script>
            <Suspense fallback={<></>}>
              <Metrika />
            </Suspense>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
