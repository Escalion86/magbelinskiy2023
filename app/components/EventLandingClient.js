'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect } from 'react'
import { Provider, useSetAtom } from 'jotai'
import PropTypes from 'prop-types'

import Header from '@blocks/titleComponents/Header'
import Background from '@blocks/titleComponents/Background'
import Button from '@blocks/components/Button'
import DivContent from '@blocks/components/DivContent'
import SpanGradientTitle from '@blocks/components/SpanGradientTitle'
import showModalZakazAtom from '@state/atoms/showModalZakazAtom'
import yandexAimAtom from '@state/atoms/yandexAimAtom'
import store from '@state/store'

const AboutBlock = dynamic(() => import('@blocks/AboutBlock'))
const VideoBlock = dynamic(() => import('@blocks/VideoBlock'))
const ReviewsBlock = dynamic(() => import('@blocks/ReviewsBlock'))
const AnketaBlock = dynamic(() => import('@blocks/AnketaBlock'))
const FooterBlock = dynamic(() => import('@blocks/FooterBlock'))
const SubfooterBlock = dynamic(() => import('@blocks/SubfooterBlock'))
const ModalZakaz = dynamic(() => import('@blocks/ModalZakaz'), { ssr: false })
const StateLoader = dynamic(() => import('@blocks/components/StateLoader'), {
  ssr: false,
})

const proofPoints = ['Кубок Мерлина', '22 года опыта', '3000+ выступлений']

const itemPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
})

const configPropType = PropTypes.shape({
  goalPrefix: PropTypes.string.isRequired,
  hero: PropTypes.shape({
    kicker: PropTypes.string.isRequired,
    titleBefore: PropTypes.string.isRequired,
    titleAccent: PropTypes.string.isRequired,
    titleAfter: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired,
  }).isRequired,
  formats: PropTypes.shape({
    titleBefore: PropTypes.string.isRequired,
    titleAccent: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(itemPropType).isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    imageCaption: PropTypes.string.isRequired,
  }).isRequired,
  occasions: PropTypes.shape({
    titleBefore: PropTypes.string.isRequired,
    titleAccent: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  process: PropTypes.shape({
    titleBefore: PropTypes.string.isRequired,
    titleAccent: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(itemPropType).isRequired,
    cta: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired

const SectionTitle = ({ children, center = false }) => (
  <h2
    className={`font-buyan tablet:text-[64px] text-[38px] leading-[100%] font-bold text-white sm:text-[46px] ${
      center ? 'text-center' : ''
    }`}
  >
    {children}
  </h2>
)

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
}

const Hero = ({ config }) => {
  const setShowModalZakaz = useSetAtom(showModalZakazAtom)
  const setYandexAim = useSetAtom(yandexAimAtom)
  const { hero, goalPrefix } = config

  return (
    <section className="titleblock relative flex min-h-[780px] w-full min-w-[375px] items-center overflow-hidden md:max-h-[920px] md:min-h-screen">
      <Background />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0E0E1C] via-[#0E0E1C]/80 to-transparent md:via-[#0E0E1C]/55" />
      <DivContent
        noMargin
        className="z-20 pt-[130px] pb-[65px] md:pt-[170px] md:pb-[90px]"
      >
        <div className="max-w-[730px]">
          <div className="mb-[22px] inline-flex rounded-[7px] border border-white/10 bg-[#1A1A32]/60 px-[15px] py-[9px] text-[12px] font-medium text-white backdrop-blur-sm md:text-[16px]">
            {hero.kicker}
          </div>
          <h1 className="font-buyan phoneH:text-[50px] tablet:text-[88px] text-[45px] leading-[94%] font-bold text-white sm:text-[62px] md:text-[74px]">
            {hero.titleBefore}
            <br />
            <span className="bg-gradient-to-r from-[#C17C0E] via-[#FFCA45] to-[#FFE49A] bg-clip-text text-transparent">
              {hero.titleAccent}
            </span>
            <br />
            {hero.titleAfter}
          </h1>
          <p className="mt-[25px] max-w-[620px] text-[16px] leading-[145%] font-medium text-[#D7D7EA] md:text-[21px]">
            {hero.description}
          </p>
          <div className="mt-[24px] grid max-w-[650px] grid-cols-1 gap-[10px] text-[13px] text-white sm:grid-cols-3 md:text-[16px]">
            {proofPoints.map((item) => (
              <div
                key={item}
                className="rounded-[7px] border border-white/10 bg-[#1A1A32]/55 px-[14px] py-[12px] backdrop-blur-sm"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-[35px] flex flex-col items-start gap-[20px] sm:flex-row sm:items-center">
            <Button
              onClick={() => {
                setYandexAim(`${goalPrefix}_zakaz_show`)
                setShowModalZakaz(true)
              }}
            >
              {hero.cta}
            </Button>
            <a
              href="#formats"
              className="cursor-pointer border-b border-dashed border-[#A8A8CA] text-[15px] text-[#A8A8CA] transition-colors hover:border-[#FFCA45] hover:text-[#FFCA45] md:text-[18px]"
            >
              Посмотреть форматы
            </a>
          </div>
        </div>
      </DivContent>
    </section>
  )
}

Hero.propTypes = { config: configPropType }

const FormatsSection = ({ config }) => {
  const { formats } = config

  return (
    <section id="formats" className="relative w-full py-[90px] md:py-[140px]">
      <DivContent noMargin>
        <div className="grid items-center gap-[45px] xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionTitle>
              {formats.titleBefore}{' '}
              <SpanGradientTitle>{formats.titleAccent}</SpanGradientTitle>
            </SectionTitle>
            <p className="mt-[22px] max-w-[670px] text-[15px] leading-[150%] text-[#A8A8CA] md:text-[20px]">
              {formats.description}
            </p>
            <div className="mt-[35px] grid gap-[14px]">
              {formats.items.map((format, index) => (
                <article
                  key={format.title}
                  className="rounded-[14px] border border-white/10 bg-gradient-to-br from-[#1A1A32]/90 to-[#111120]/80 p-[22px] md:p-[28px]"
                >
                  <div className="flex gap-[18px]">
                    <span className="font-buyan text-[28px] font-bold text-[#FFCA45] md:text-[36px]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-[19px] font-semibold text-white md:text-[24px]">
                        {format.title}
                      </h3>
                      <p className="mt-[8px] text-[14px] leading-[145%] text-[#A8A8CA] md:text-[17px]">
                        {format.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[18px] border border-white/10">
            <Image
              src={formats.image}
              alt={formats.imageAlt}
              className="aspect-[3/2] w-full object-cover"
              width={900}
              height={600}
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E0E1C] via-[#0E0E1C]/75 to-transparent p-[24px] pt-[100px] md:p-[34px] md:pt-[140px]">
              <p className="text-[18px] leading-[130%] font-semibold text-white md:text-[25px]">
                {formats.imageCaption}
              </p>
            </div>
          </div>
        </div>
      </DivContent>
    </section>
  )
}

FormatsSection.propTypes = { config: configPropType }

const OccasionsSection = ({ config }) => (
  <section id="why" className="relative w-full py-[70px] md:py-[120px]">
    <DivContent noMargin>
      <SectionTitle center>
        {config.occasions.titleBefore}{' '}
        <SpanGradientTitle>{config.occasions.titleAccent}</SpanGradientTitle>
      </SectionTitle>
      <div className="mx-auto mt-[40px] grid max-w-[1000px] grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[16px]">
        {config.occasions.items.map((item) => (
          <div
            key={item}
            className="flex min-h-[92px] items-center gap-[12px] rounded-[12px] border border-white/10 bg-[#191929]/75 p-[16px] text-[14px] font-medium text-white md:min-h-[120px] md:p-[24px] md:text-[19px]"
          >
            <Image
              src="/icons/check.svg"
              alt=""
              className="h-[22px] w-[22px] shrink-0 md:h-[28px] md:w-[28px]"
              width={28}
              height={28}
            />
            {item}
          </div>
        ))}
      </div>
    </DivContent>
  </section>
)

OccasionsSection.propTypes = { config: configPropType }

const ProcessSection = ({ config }) => {
  const setShowModalZakaz = useSetAtom(showModalZakazAtom)
  const setYandexAim = useSetAtom(yandexAimAtom)
  const { process, goalPrefix } = config

  return (
    <section className="relative w-full py-[90px] md:py-[140px]">
      <DivContent noMargin>
        <SectionTitle center>
          {process.titleBefore}{' '}
          <SpanGradientTitle>{process.titleAccent}</SpanGradientTitle>
        </SectionTitle>
        <div className="mt-[42px] grid gap-[14px] md:grid-cols-3 md:gap-[18px]">
          {process.items.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[15px] border border-white/10 bg-gradient-to-br from-[#1A1A32] to-[#111120] p-[24px] md:min-h-[250px] md:p-[30px]"
            >
              <div className="font-buyan text-[46px] font-bold text-[#FFCA45] md:text-[60px]">
                0{index + 1}
              </div>
              <h3 className="mt-[12px] text-[20px] font-semibold text-white md:text-[24px]">
                {step.title}
              </h3>
              <p className="mt-[10px] text-[14px] leading-[150%] text-[#A8A8CA] md:text-[17px]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-[42px] flex justify-center">
          <Button
            onClick={() => {
              setYandexAim(`${goalPrefix}_process_zakaz`)
              setShowModalZakaz(true)
            }}
          >
            {process.cta}
          </Button>
        </div>
      </DivContent>
    </section>
  )
}

ProcessSection.propTypes = { config: configPropType }

export default function EventLandingClient({ config }) {
  useEffect(() => {
    document.body.classList.remove('theme-dark')
  }, [])

  return (
    <Provider store={store}>
      <div className="relative flex min-h-screen flex-col items-center overflow-hidden scroll-smooth">
        <Header />
        <main className="relative flex w-full flex-col items-center overflow-hidden">
          <Hero config={config} />
          <FormatsSection config={config} />
          <OccasionsSection config={config} />
          <section id="video" className="w-full">
            <VideoBlock />
          </section>
          <section id="about" className="w-full pt-[40px] md:pt-[80px]">
            <AboutBlock />
          </section>
          <ProcessSection config={config} />
          <section id="reviews" className="w-full">
            <ReviewsBlock />
          </section>
          <section id="zakaz" className="w-full">
            <AnketaBlock />
          </section>
          <FooterBlock />
          <SubfooterBlock />
        </main>
        <div className="absolute inset-0 -z-20 h-full w-full bg-[#0E0E1C]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'url("/img/noise.png") 0% 0% / 100px 100px repeat',
              mixBlendMode: 'soft-light',
            }}
          />
        </div>
      </div>
      <ModalZakaz />
      <StateLoader />
    </Provider>
  )
}

EventLandingClient.propTypes = { config: configPropType }
