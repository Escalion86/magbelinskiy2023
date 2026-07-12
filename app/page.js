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

const SeoPreview = memo(({ title, text, placeholderHeight }) => (
  <article
    className="mx-auto flex w-full max-w-[1360px] flex-col justify-center px-[18px] py-[70px] text-white md:px-[52px]"
    style={{ minHeight: `${placeholderHeight}px` }}
  >
    <h2 className="font-buyan text-[36px] font-bold leading-[105%] md:text-[58px]">
      {title}
    </h2>
    <p className="mt-5 max-w-[850px] text-[16px] leading-[150%] text-[#A8A8CA] md:text-[21px]">
      {text}
    </p>
  </article>
))
SeoPreview.displayName = 'SeoPreview'

const DeferredSection = memo(
  ({ id, children, placeholderHeight = 320, title, text }) => (
  <>
    <Section id={id} />
    <LazySection
      className="w-full"
      placeholderHeight={placeholderHeight}
      fallback={
        <SeoPreview
          title={title}
          text={text}
          placeholderHeight={placeholderHeight}
        />
      }
    >
      <div
        className="w-full"
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: `auto ${placeholderHeight}px`,
        }}
      >
        {children}
      </div>
    </LazySection>
  </>
  )
)
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
          <DeferredSection
            id="video"
            placeholderHeight={640}
            title="Иллюзионное шоу телевизионного уровня"
            text="Левитация, чтение мыслей, исчезновения и превращения — посмотрите видео-презентацию выступления Алексея Белинского."
          >
            <VideoBlock />
          </DeferredSection>
          <DeferredSection
            id="why"
            placeholderHeight={900}
            title="Иллюзионист на корпоратив, свадьбу и взрослый праздник"
            text="Программа адаптируется под аудиторию, площадку и тематику события. В шоу можно встроить фотографию, логотип компании или участие героев вечера."
          >
            <GalleryBlock />
          </DeferredSection>
          <DeferredSection
            id="quiz"
            placeholderHeight={700}
            title="Подберите формат шоу за 30 секунд"
            text="Ответьте на три коротких вопроса о мероприятии, возрасте и количестве гостей — это поможет предложить подходящий формат программы."
          >
            <QuizBlock />
          </DeferredSection>
          <DeferredSection
            id="focus"
            placeholderHeight={800}
            title="Попробуйте интерактивный фокус"
            text="Выберите одну из пяти карт, запомните её и проверьте, сможет ли Алексей угадать ваш выбор."
          >
            <FocusBlock />
          </DeferredSection>
          <DeferredSection
            id="fotos"
            placeholderHeight={700}
            title="Фотографии с выступлений"
            text="Корпоративы, свадьбы, юбилеи, презентации и большие сцены — примеры живых выступлений в Красноярске и других городах."
          >
            <GalleryBlock2 />
          </DeferredSection>
          <DeferredSection
            id="reviews"
            placeholderHeight={700}
            title="Отзывы зрителей и участников шоу"
            text="Выступления Алексея высоко оценили заказчики, гости мероприятий и участники телевизионного шоу «Всё, кроме обычного»."
          >
            <ReviewsBlock />
          </DeferredSection>
          <DeferredSection
            id="zakaz"
            placeholderHeight={680}
            title="Заказать шоу Алексея Белинского"
            text="Оставьте номер телефона, чтобы обсудить программу, дату, площадку и персональный номер для вашего мероприятия."
          >
            <AnketaBlock />
          </DeferredSection>
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
      <ModalFocusResult />
      <ModalInfo />
      <StateLoader />
    </Provider>
  )
}
