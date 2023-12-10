'use client'
import { YandexMetricaProvider } from 'next-yandex-metrica'

export const YaMetricaWrapper = ({ children }) => (
  <YandexMetricaProvider
    tagID={38403125}
    initParameters={{
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    }}
  >
    {children}
  </YandexMetricaProvider>
)

export default YaMetricaWrapper
