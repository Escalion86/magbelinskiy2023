export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://cigam.ru/sitemap.xml',
    host: 'https://cigam.ru',
  }
}
