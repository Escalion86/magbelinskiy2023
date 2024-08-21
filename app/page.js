'use client'

import AboutBlock from '@blocks/AboutBlock'
import AnketaBlock from '@blocks/AnketaBlock'
import FocusBlock from '@blocks/FocusBlock'
import FooterBlock from '@blocks/FooterBlock'
import GalleryBlock from '@blocks/GalleryBlock'
import GalleryBlock2 from '@blocks/GalleryBlock2'
import ModalFocusResult from '@blocks/ModalFocusResult'
import ModalInfo from '@blocks/ModalInfo'
import ModalZakaz from '@blocks/ModalZakaz'
import QuizBlock from '@blocks/QuizBlock'
import ReviewsBlock from '@blocks/ReviewsBlock'
import SubfooterBlock from '@blocks/SubfooterBlock'
import TitleBlock from '@blocks/TitleBlock'
import VideoBlock from '@blocks/VideoBlock'
import StateLoader from '@blocks/components/StateLoader'
import Header from '@blocks/titleComponents/Header'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'

const Section = ({ id }) => <section id={id} className="relative -top-[50px]" />

export default function Home() {
  return (
    <RecoilRoot>
      <div className="relative flex flex-col items-center justify-between min-h-screen scroll-smooth">
        <Header />
        <main className="relative flex flex-col items-center justify-between w-full max-w-full overflow-hidden">
          <TitleBlock />
          <Section id="video" />
          <VideoBlock />
          <Section id="about" />
          <AboutBlock />
          <Section id="focus" />
          <FocusBlock />
          <Section id="why" />
          <GalleryBlock />
          <Section id="quiz" />
          <QuizBlock />
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
      <RecoilNexus />
      <StateLoader />
    </RecoilRoot>
  )
}
