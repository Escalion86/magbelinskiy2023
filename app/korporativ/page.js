import KorporativClient from './KorporativClient'

export const metadata = {
  title: 'Иллюзионист на корпоратив в Красноярске — Алексей Белинский',
  description:
    'Шоу иллюзиониста Алексея Белинского на корпоратив в Красноярске. Кубок Мерлина, 22 года опыта, 3000+ выступлений. Персональный номер с логотипом компании.',
  keywords:
    'иллюзионист на корпоратив Красноярск, фокусник на корпоратив Красноярск, шоу фокусов на корпоратив, заказать фокусника на корпоратив',
  alternates: { canonical: '/korporativ' },
  openGraph: {
    title: 'Иллюзионист на корпоратив в Красноярске — Алексей Белинский',
    description:
      'Интерактивное шоу телевизионного уровня с персональным номером для вашей компании.',
    url: 'https://cigam.ru/korporativ',
    siteName: 'cigam.ru',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/img/promo2.png',
        width: 996,
        height: 1330,
        alt: 'Иллюзионист Алексей Белинский на корпоративе',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Иллюзионист на корпоратив в Красноярске — Алексей Белинский',
    description:
      'Интерактивное шоу телевизионного уровня с персональным номером для вашей компании.',
    images: ['/img/promo2.png'],
  },
}

export default function KorporativPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Шоу иллюзиониста на корпоратив',
    description:
      'Интерактивное иллюзионное шоу Алексея Белинского для корпоративных мероприятий в Красноярске.',
    provider: {
      '@type': 'Person',
      name: 'Алексей Белинский',
      telephone: '+7-391-989-76-89',
      url: 'https://cigam.ru',
    },
    areaServed: {
      '@type': 'City',
      name: 'Красноярск',
    },
    url: 'https://cigam.ru/korporativ',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <KorporativClient />
    </>
  )
}
