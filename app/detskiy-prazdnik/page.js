import DetskiyPrazdnikClient from './DetskiyPrazdnikClient'

export const metadata = {
  title: 'Фокусник на детский праздник в Красноярске — Алексей Белинский',
  description:
    'Интерактивное шоу фокусника Алексея Белинского на детский праздник в Красноярске. 22 года опыта, 3000+ выступлений. Формат для детей и родителей.',
  keywords:
    'фокусник на детский праздник Красноярск, детское шоу фокусов Красноярск, иллюзионист детям, заказать фокусника на день рождения ребёнка',
  alternates: { canonical: '/detskiy-prazdnik' },
  openGraph: {
    title: 'Фокусник на детский праздник в Красноярске — Алексей Белинский',
    description:
      'Интерактивное шоу, в котором именинник и гости становятся участниками чудес.',
    url: 'https://cigam.ru/detskiy-prazdnik',
    siteName: 'cigam.ru',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/img/quiz/kids.webp',
        width: 900,
        height: 600,
        alt: 'Фокусник Алексей Белинский на детском празднике',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фокусник на детский праздник в Красноярске — Алексей Белинский',
    description:
      'Интерактивное шоу, в котором именинник и гости становятся участниками чудес.',
    images: ['/img/quiz/kids.webp'],
  },
}

export default function DetskiyPrazdnikPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Шоу фокусника на детский праздник',
    description:
      'Интерактивное шоу фокусника Алексея Белинского для детских праздников в Красноярске.',
    provider: {
      '@type': 'Person',
      name: 'Алексей Белинский',
      telephone: '+7-391-989-76-89',
      url: 'https://cigam.ru',
    },
    areaServed: { '@type': 'City', name: 'Красноярск' },
    url: 'https://cigam.ru/detskiy-prazdnik',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DetskiyPrazdnikClient />
    </>
  )
}
