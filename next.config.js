/** @type {import('next').NextConfig} */
// Дата сборки: используется как lastmod в sitemap — меняется только при деплое,
// а не на каждый запрос, иначе поисковики перестают доверять значению.
const nextConfig = {
  env: { BUILD_TIME: new Date().toISOString() },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
