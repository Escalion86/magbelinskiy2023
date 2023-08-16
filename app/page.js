'use client'

import AboutBlock from '@/blocks/AboutBlock'
import AnketaBlock from '@/blocks/AnketaBlock'
import FooterBlock from '@/blocks/FooterBlock'
import GalleryBlock from '@/blocks/GalleryBlock'
import GalleryBlock2 from '@/blocks/GalleryBlock2'
import ModalInfo from '@/blocks/ModalInfo'
import ModalZakaz from '@/blocks/ModalZakaz'
import QuizBlock from '@/blocks/QuizBlock'
import ReviewsBlock from '@/blocks/ReviewsBlock'
import SubfooterBlock from '@/blocks/SubfooterBlock'
import TitleBlock from '@/blocks/TitleBlock'
import VideoBlock from '@/blocks/VideoBlock'
import StateLoader from '@/blocks/components/StateLoader'
import Header from '@/blocks/titleComponents/Header'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'

const Section = ({ id }) => <section id={id} className="relative -top-[50px]" />

export default function Home() {
  return (
    <RecoilRoot>
      <div className="relative flex min-h-screen flex-col items-center justify-between">
        <Header />
        <main className="relative flex w-full max-w-full flex-col items-center justify-between overflow-hidden">
          <TitleBlock />
          <Section id="video" />
          <VideoBlock />
          <GalleryBlock />
          <Section id="quiz" />
          <QuizBlock />
          <Section id="about" />
          <AboutBlock />
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
      <ModalInfo />
      <RecoilNexus />
      <StateLoader />
    </RecoilRoot>
  )
}
