'use client'

import dynamic from 'next/dynamic'
import { memo } from 'react'

import Header from '@blocks/titleComponents/Header'
import TitleBlock from '@blocks/TitleBlock'
import { Provider } from 'jotai'
import store from '@state/store'

const SectionFallback = () => (
  <div className="w-full h-[320px] rounded-3xl bg-zinc-900/40 animate-pulse" aria-hidden="true" />
)

const AboutBlock = dynamic(() => import('@blocks/AboutBlock'), {
  loading: SectionFallback,
})
const VideoBlock = dynamic(() => import('@blocks/VideoBlock'), {
  loading: SectionFallback,
})
const GalleryBlock = dynamic(() => import('@blocks/GalleryBlock'), {
  loading: SectionFallback,
})
const QuizBlock = dynamic(() => import('@blocks/QuizBlock'), {
  loading: SectionFallback,
})
const FocusBlock = dynamic(() => import('@blocks/FocusBlock'), {
  loading: SectionFallback,
})
const GalleryBlock2 = dynamic(() => import('@blocks/GalleryBlock2'), {
  loading: SectionFallback,
})
const ReviewsBlock = dynamic(() => import('@blocks/ReviewsBlock'), {
  loading: SectionFallback,
})
const AnketaBlock = dynamic(() => import('@blocks/AnketaBlock'), {
  loading: SectionFallback,
})
const FooterBlock = dynamic(() => import('@blocks/FooterBlock'), {
  loading: SectionFallback,
})
const SubfooterBlock = dynamic(() => import('@blocks/SubfooterBlock'), {
  loading: SectionFallback,
})

const ModalZakaz = dynamic(() => import('@blocks/ModalZakaz'), { ssr: false, loading: () => null })
const ModalFocusResult = dynamic(() => import('@blocks/ModalFocusResult'), {
  ssr: false,
  loading: () => null,
})
const ModalInfo = dynamic(() => import('@blocks/ModalInfo'), { ssr: false, loading: () => null })
const StateLoader = dynamic(() => import('@blocks/components/StateLoader'), {
  ssr: false,
  loading: () => null,
})

const Section = memo(({ id }) => <section id={id} className="relative -top-[50px]" />)
Section.displayName = 'Section'

export default function Home() {
  return (
    <Provider store={store}>
      <div className="relative flex flex-col items-center justify-between min-h-screen scroll-smooth">
        <Header />
        <main className="relative flex flex-col items-center justify-between w-full max-w-full overflow-hidden">
          <TitleBlock />

          <Section id="about" />
          <AboutBlock />
          <Section id="video" />
          <VideoBlock />
          <Section id="why" />
          <GalleryBlock />
          <Section id="quiz" />
          <QuizBlock />
          <Section id="focus" />
          <FocusBlock />
          <Section id="fotos" />
          <GalleryBlock2 />
          <Section id="reviews" />
          <ReviewsBlock />
          <Section id="zakaz" />
          <AnketaBlock />
          <FooterBlock />
          <SubfooterBlock />
        </main>

        {/* Фон */}
        <div
          style={{
            maskMode: 'alpha',
            background:
              'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%)',
          }}
          className="absolute top-0 w-full h-full overflow-hidden -z-20 shrink-0"
        >
          <div
            className="w-full h-full"
            style={{
              background: '#0E0E1C',
            }}
          />
          <div
            className="absolute w-full h-full"
            style={{
              opacity: 0.3,
              background:
                'url("/img/noise.png"), lightgray 0% 0% / 100px 100px repeat',
              mixBlendMode: 'soft-light',
            }}
          />
        </div>
      </div>
      <ModalZakaz />
      <ModalFocusResult />
      <ModalInfo />
      <StateLoader />
    </Provider>
  )
}
