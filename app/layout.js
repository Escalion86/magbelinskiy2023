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
  metadataBase: new URL('https://cigam.ru'),
  title: 'Фокусник-иллюзионист Алексей Белинский — заказать шоу в Красноярске',
  description:
    'Закажите шоу иллюзиониста в Красноярске. Обладатель Кубка Мерлина, 22 года опыта, 3000+ выступлений. Корпоративы, свадьбы, дни рождения. Тел: 8 (391) 989-76-89',
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
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Иллюзионист Алексей Белинский',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фокусник-иллюзионист Алексей Белинский — шоу в Красноярске',
    description:
      'Кубок Мерлина · 22 года опыта · 3000+ выступлений. Шоу для корпоративов, свадеб и праздников.',
    images: ['/logo.png'],
  },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }) {
  const isProduction = process.env.NODE_ENV !== 'development'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Иллюзионист Алексей Белинский',
    jobTitle: 'Иллюзионист',
    url: 'https://cigam.ru',
    image: 'https://cigam.ru/img/promo2.png',
    telephone: '+7-391-989-76-89',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Красноярск',
      addressCountry: 'RU',
    },
    sameAs: [
      'https://vk.com/escalion',
      'https://t.me/escalion',
      'https://instagram.com/magbelinskiy',
      'https://max.ru/u/f9LHodD0cOIpR54J815HiQSRUGQ2bw5yna_h_MGsMS4G50iYuK_ZPsHI87o',
    ],
  }

  return (
    <html lang="ru" className="scroll-smooth" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
