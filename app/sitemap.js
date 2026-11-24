export default function sitemap() {
  const lastModified = new Date(process.env.BUILD_TIME || Date.now())

  return [
    {
      url: 'https://cigam.ru',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://cigam.ru/korporativ',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://cigam.ru/svadba',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://cigam.ru/detskiy-prazdnik',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://cigam.ru/yubiley',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
