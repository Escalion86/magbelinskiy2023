import SvadbaClient from './SvadbaClient'

export const metadata = {
  title: 'Иллюзионист на свадьбу в Красноярске — Алексей Белинский',
  description:
    'Закажите шоу иллюзиониста Алексея Белинского на свадьбу в Красноярске. Кубок Мерлина, 22 года опыта, 3000+ выступлений. Индивидуальный номер для молодожёнов.',
  keywords:
    'иллюзионист на свадьбу Красноярск, фокусник на свадьбу Красноярск, шоу фокусов на свадьбу, заказать фокусника на свадьбу',
  alternates: { canonical: '/svadba' },
  openGraph: {
    title: 'Иллюзионист на свадьбу в Красноярске — Алексей Белинский',
    description:
      'Интерактивное шоу телевизионного уровня и персональный номер для молодожёнов.',
    url: 'https://cigam.ru/svadba',
    siteName: 'cigam.ru',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/img/quiz/wedding.webp',
        width: 900,
        height: 600,
        alt: 'Иллюзионист Алексей Белинский на свадьбе',
      },
    ],
  },
}

export default function SvadbaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Шоу иллюзиониста на свадьбу',
    description:
      'Интерактивное иллюзионное шоу Алексея Белинского для свадеб в Красноярске.',
    provider: {
      '@type': 'Person',
      name: 'Алексей Белинский',
      telephone: '+7-391-989-76-89',
      url: 'https://cigam.ru',
    },
    areaServed: { '@type': 'City', name: 'Красноярск' },
    url: 'https://cigam.ru/svadba',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SvadbaClient />
    </>
  )
}
