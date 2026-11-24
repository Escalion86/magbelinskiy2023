import { experienceLabel } from '@helpers/experience'
import { eventSeo, faqStructuredData, serviceOffer } from '@helpers/eventSeo'
import DetskiyPrazdnikClient from './DetskiyPrazdnikClient'

export function generateMetadata() {
  const label = experienceLabel()
  return {
    title: 'Фокусник на детский праздник в Красноярске — Алексей Белинский',
    description:
      `Интерактивное шоу фокусника Алексея Белинского на детский праздник в Красноярске. ${label} опыта, 3000+ выступлений. Формат для детей и родителей.`,
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
}

export default function DetskiyPrazdnikPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    offers: serviceOffer(eventSeo['detskiy-prazdnik'].price),
    name: 'Шоу фокусника на детский праздник',
    description:
      'Интерактивное шоу фокусника Алексея Белинского для детских праздников в Красноярске.',
    provider: {
      '@type': 'Person',
      name: 'Алексей Белинский',
      telephone: '+7-913-837-00-20',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData(eventSeo['detskiy-prazdnik'].faq)) }}
      />
      <DetskiyPrazdnikClient />
    </>
  )
}
