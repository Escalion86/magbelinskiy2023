export default function sitemap() {
  const lastModified = new Date('2026-07-23T00:41:06+07:00')

  return [
    {
      url: 'https://cigam.ru',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://cigam.ru/korporativ',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://cigam.ru/svadba',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://cigam.ru/detskiy-prazdnik',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://cigam.ru/yubiley',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
