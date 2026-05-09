'use client'

import dynamic from 'next/dynamic'
import { memo, useEffect } from 'react'

import Header from '@blocks/titleComponents/Header'
import TitleBlock from '@blocks/TitleBlock'
import LazySection from '@components/LazySection'
import { Provider } from 'jotai'
import store from '@state/store'

const AboutBlock = dynamic(() => import('@blocks/AboutBlock'), {
  loading: () => null,
})
const VideoBlock = dynamic(() => import('@blocks/VideoBlock'), {
  loading: () => null,
})
const GalleryBlock = dynamic(() => import('@blocks/GalleryBlock'), {
  loading: () => null,
})
const QuizBlock = dynamic(() => import('@blocks/QuizBlock'), {
  loading: () => null,
})
const FocusBlock = dynamic(() => import('@blocks/FocusBlock'), {
  loading: () => null,
})
const GalleryBlock2 = dynamic(() => import('@blocks/GalleryBlock2'), {
  loading: () => null,
})
const ReviewsBlock = dynamic(() => import('@blocks/ReviewsBlock'), {
  loading: () => null,
})
const AnketaBlock = dynamic(() => import('@blocks/AnketaBlock'), {
  loading: () => null,
})
const FooterBlock = dynamic(() => import('@blocks/FooterBlock'), {
  loading: () => null,
})
const SubfooterBlock = dynamic(() => import('@blocks/SubfooterBlock'), {
  loading: () => null,
})

const ModalZakaz = dynamic(() => import('@blocks/ModalZakaz'), {
  ssr: false,
  loading: () => null,
})
const ModalFocusResult = dynamic(() => import('@blocks/ModalFocusResult'), {
  ssr: false,
  loading: () => null,
})
const ModalInfo = dynamic(() => import('@blocks/ModalInfo'), {
  ssr: false,
  loading: () => null,
})
const StateLoader = dynamic(() => import('@blocks/components/StateLoader'), {
  ssr: false,
  loading: () => null,
})

const Section = memo(({ id }) => (
  <section id={id} className="relative -top-[50px]" />
))
Section.displayName = 'Section'

const DeferredSection = memo(({ id, children, placeholderHeight = 320 }) => (
  <>
    <Section id={id} />
    <LazySection placeholderHeight={placeholderHeight}>{children}</LazySection>
  </>
))
DeferredSection.displayName = 'DeferredSection'

export default function Home() {
  useEffect(() => {
    document.body.classList.remove('theme-dark')
  }, [])

  return (
    <Provider store={store}>
      <div className="relative flex min-h-screen flex-col items-center justify-between scroll-smooth">
        <Header />
        <main className="relative flex w-full max-w-full flex-col items-center justify-between overflow-hidden">
          <TitleBlock />

          <Section id="about" />
          <AboutBlock />
          <DeferredSection id="video" placeholderHeight={640}>
            <VideoBlock />
          </DeferredSection>
          <DeferredSection id="why" placeholderHeight={900}>
            <GalleryBlock />
          </DeferredSection>
          <DeferredSection id="quiz" placeholderHeight={700}>
            <QuizBlock />
          </DeferredSection>
          <DeferredSection id="focus" placeholderHeight={800}>
            <FocusBlock />
          </DeferredSection>
          <DeferredSection id="fotos" placeholderHeight={700}>
            <GalleryBlock2 />
          </DeferredSection>
          <DeferredSection id="reviews" placeholderHeight={700}>
            <ReviewsBlock />
          </DeferredSection>
          <DeferredSection id="zakaz" placeholderHeight={680}>
            <AnketaBlock />
          </DeferredSection>
          <LazySection placeholderHeight={260}>
            <FooterBlock />
            <SubfooterBlock />
          </LazySection>
        </main>

        {/* Фон */}
        <div
          style={{
            maskMode: 'alpha',
            background:
              'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%)',
          }}
          className="absolute top-0 -z-20 h-full w-full shrink-0 overflow-hidden"
        >
          <div
            className="h-full w-full"
            style={{
              background: '#0E0E1C',
            }}
          />
          <div
            className="absolute h-full w-full"
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
