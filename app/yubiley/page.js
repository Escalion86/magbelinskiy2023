import YubileyClient from './YubileyClient'

export const metadata = {
  title: 'Иллюзионист на юбилей в Красноярске — Алексей Белинский',
  description:
    'Закажите шоу иллюзиониста Алексея Белинского на юбилей в Красноярске. Кубок Мерлина, 22 года опыта, 3000+ выступлений. Персональный номер для юбиляра.',
  keywords:
    'иллюзионист на юбилей Красноярск, фокусник на юбилей Красноярск, шоу фокусов на день рождения, заказать фокусника на юбилей',
  alternates: { canonical: '/yubiley' },
  openGraph: {
    title: 'Иллюзионист на юбилей в Красноярске — Алексей Белинский',
    description:
      'Интерактивное шоу телевизионного уровня и персональный номер для юбиляра.',
    url: 'https://cigam.ru/yubiley',
    siteName: 'cigam.ru',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/img/quiz/birthday.webp',
        width: 900,
        height: 600,
        alt: 'Иллюзионист Алексей Белинский на юбилее',
      },
    ],
  },
}

export default function YubileyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Шоу иллюзиониста на юбилей',
    description:
      'Интерактивное иллюзионное шоу Алексея Белинского для юбилеев и взрослых дней рождения в Красноярске.',
    provider: {
      '@type': 'Person',
      name: 'Алексей Белинский',
      telephone: '+7-391-989-76-89',
      url: 'https://cigam.ru',
    },
    areaServed: { '@type': 'City', name: 'Красноярск' },
    url: 'https://cigam.ru/yubiley',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <YubileyClient />
    </>
  )
}
