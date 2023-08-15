'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'
import BackLight from './components/BackLight'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-center font-buyan text-[29px] font-bold leading-[100%] text-white phoneH:text-[32px] sm:text-[36px] md:text-left md:text-[42px] tablet:text-[64px]',
      className
    )}
  >
    <SpanGradientTitle>20 лет дарю эмоции</SpanGradientTitle> людям
    <br />
    при помощи иллюзий
  </div>
)

const ListItem = ({ children }) => (
  <div className="flex items-center justify-start gap-x-[14px] md:gap-x-[20px]">
    <svg
      className="w-[20px]"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_72_1965)" filter="url(#filter0_i_72_1965)">
        <path
          d="M5.91814 16.115C7.67533 16.115 9.17702 14.8629 10.0019 14C10.8276 14.8629 12.3251 16.115 14.0823 16.115C17.1077 16.115 19.2227 14.0051 19.2227 10.9856C19.2227 7.65651 16.5975 5.50422 14.0586 3.42385C12.8598 2.44077 11.6178 1.42554 10.666 0.296946C10.5873 0.203792 10.4892 0.1289 10.3786 0.0774726C10.268 0.0260455 10.1476 -0.000682636 10.0256 -0.000854492L9.97652 -0.000854492C9.85444 -0.000578416 9.73388 0.0261919 9.62316 0.0776075C9.51244 0.129023 9.41421 0.203859 9.33523 0.296946C8.38261 1.42385 7.14149 2.43992 5.94268 3.423C3.40291 5.50338 0.776855 7.65481 0.776855 10.9848C0.777701 14.0051 2.89107 16.115 5.91814 16.115Z"
          fill="url(#paint0_linear_72_1965)"
        />
        <path
          d="M6.86084 19.8255C8.93776 19.4579 11.0631 19.4579 13.14 19.8255C11.063 16.702 10.0004 10.6605 10.0004 10.6605C10.0004 10.6605 8.9539 16.702 6.86084 19.8255Z"
          fill="url(#paint1_linear_72_1965)"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_72_1965"
          x="0"
          y="-0.000854492"
          width="22"
          height="22"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_72_1965"
          />
        </filter>
        <linearGradient
          id="paint0_linear_72_1965"
          x1="0.776856"
          y1="14.2349"
          x2="18.7002"
          y2="13.8771"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#692DC1" />
          <stop offset="1" stopColor="#AC80EC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_72_1965"
          x1="6.86084"
          y1="18.7563"
          x2="12.9637"
          y2="18.6833"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#692DC1" />
          <stop offset="1" stopColor="#AC80EC" />
        </linearGradient>
        <clipPath id="clip0_72_1965">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 -0.000854492)"
          />
        </clipPath>
      </defs>
    </svg>
    <div className="flex-1 text-[13px] font-normal text-white md:text-[19px]">
      {children}
    </div>
  </div>
)

const SpanGold = ({ children }) => (
  <span
    style={{
      background: 'linear-gradient(67deg, #C17C0E 0%, #FFCA45 63.68%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    {children}
  </span>
)

const List = ({ className }) => (
  <div
    className={cn(
      'flex min-w-[340px] max-w-[400px] flex-col gap-y-[18px] sm:min-w-[460px] sm:max-w-[460px] md:min-w-[600px] md:max-w-[600px]',
      className
    )}
  >
    <ListItem>
      Обладатель <SpanGold>Высшей международной награды</SpanGold> в области
      иллюзионного искусства — кубка Мерлина.
    </ListItem>
    <ListItem>
      <SpanGold>2000+ выступлений</SpanGold> разного масштаба: от семейного
      формата до больших шоу-программ.
    </ListItem>
    <ListItem>
      <SpanGold>Двукратный чемпион</SpanGold> Всероссийского конкурса
      Micromagic.
    </ListItem>
    <ListItem>
      Участник <SpanGold>телевизионного шоу</SpanGold> «Все, кроме обычного» на
      ТНТ.
    </ListItem>
    <ListItem>
      Выступаю и провожу <SpanGold>шоу за границей</SpanGold>: Болгария,
      Вьетнам, Казахстан, Абхазия.
    </ListItem>
    <ListItem>
      Открыл единственную в России <SpanGold>школу по фокусам</SpanGold> и
      сценическому искусству для детей — Академию Юных Волшебников.
    </ListItem>
    <ListItem>
      <SpanGold>Член закрытого клуба</SpanGold> фокусников России и СНГ.
    </ListItem>
  </div>
)

const ImgSpring = ({ className, imgClassName, imgSizeClassName }) => (
  <div className={cn('relative', imgSizeClassName, className)}>
    {/* <img
    className="absolute"
    alt="gif"
    src="/img/bgCardsSpring.png"
    draggable={false}
  /> */}
    {/* <div
      className="top-0 left-0 absolute rounded-[20px] opacity-10 w-full h-full rotate-[5deg]"
      style={{
        background:
          'linear-gradient(320deg, rgba(96, 139, 246, 0.60) 0%, rgba(96, 139, 246, 0.00) 32.66%, rgba(134, 123, 255, 0.00) 78.17%, rgba(134, 123, 255, 0.60) 100%), rgba(0, 0, 0, 0.10)',
        backgroundBlendMode: 'color-dodge, normal',
        boxShadow: '4px 4px 25px 0px rgba(255, 255, 255, 0.15) inset',
      }}
    /> */}
    <svg
      className={cn(
        'absolute left-1/2 top-1/2 h-[113%] w-[113%] -translate-x-1/2 -translate-y-1/2 rotate-[5deg]'
      )}
      viewBox="0 0 520 729"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_72_1947)">
        <g opacity="0.1">
          <rect
            x="30.0005"
            y="19.3385"
            width="460"
            height="690"
            rx="20"
            fill="black"
            fillOpacity="0.1"
          />
          <rect
            x="30.0005"
            y="19.3385"
            width="460"
            height="690"
            rx="20"
            fill="url(#paint0_linear_72_1947)"
            fillOpacity="0.6"
            style={{ mixBlendMode: 'color-dodge' }}
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_i_72_1947"
          x="0.806641"
          y="0.605469"
          width="522.387"
          height="731.466"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="12.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_72_1947"
          />
        </filter>
        <linearGradient
          id="paint0_linear_72_1947"
          x1="490"
          y1="758.339"
          x2="75.0004"
          y2="19.3385"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#608BF7" />
          <stop offset="0.326583" stopColor="#608BF6" stopOpacity="0" />
          <stop offset="0.781706" stopColor="#867BFF" stopOpacity="0" />
          <stop offset="1" stopColor="#867BFF" />
        </linearGradient>
      </defs>
    </svg>
    <img
      // className="object-cover min-w-[270px] md:min-w-[360px] inline aspect-[9/7]"
      className={cn('relative object-cover', imgClassName, imgSizeClassName)}
      alt="gif"
      src="/img/cardsSpring.gif"
      style={{
        background:
          'linear-gradient(320deg, rgba(96, 139, 246, 0.60) 0%, rgba(96, 139, 246, 0.00) 32.66%, rgba(134, 123, 255, 0.00) 78.17%, rgba(134, 123, 255, 0.60) 100%), rgba(0, 0, 0, 0.06)',
        backgroundBlendMode: 'color-dodge, normal',
      }}
      draggable={false}
    />
  </div>
)

const AboutBlock = () => {
  return (
    <div className="relative flex w-full justify-center">
      <img
        // className="object-cover min-w-[270px] md:min-w-[360px] inline aspect-[9/7]"
        className="absolute left-0 top-0 w-[25%] object-cover opacity-20 md:-top-[290px] md:left-[min(calc(3%-60px),0px)] md:w-[320px] md:opacity-50"
        alt="glass"
        src="/img/broken_glass_left.png"
        draggable={false}
      />
      <img
        // className="object-cover min-w-[270px] md:min-w-[360px] inline aspect-[9/7]"
        className="absolute bottom-[350px] right-0 w-[25%] object-cover opacity-20 sm:bottom-[650px] md:bottom-[240px] md:right-[min(calc(3%-60px),0px)] md:w-[300px] md:opacity-50 xl:-bottom-[240px]"
        alt="glass"
        src="/img/broken_glass_right.png"
        draggable={false}
      />
      <BackLight
        className="-top-[80px] left-[calc(7.5%-300px)] md:-top-[90px]"
        opacity={30}
      />
      <BackLight
        className="-top-[80px] right-0 md:top-[460px] md:translate-x-1/2 xl:top-[220px]"
        opacity={10}
      />

      {/* broken_glass_ */}
      <DivContent className="flex flex-col items-center gap-y-[20px]">
        <div className="flex flex-wrap justify-center gap-x-[100px] gap-y-[78px] xl:flex-nowrap">
          <div className="flex flex-1 flex-col items-center">
            <Title />
            <ImgSpring
              imgClassName="rounded-[10px]"
              imgSizeClassName="w-[240px] h-[360px]"
              className="mt-[35px] sm:hidden"
            />
            <div>
              <div className="mt-[30px] text-[14px] font-bold text-white sm:mt-[60px] md:text-[21px]">
                Меня зовут Алексей Белинский, и я иллюзионист:
              </div>
              <List className="mt-[20px] sm:mt-[25px]" />
            </div>
          </div>
          <ImgSpring
            imgClassName="rounded-[20px]"
            imgSizeClassName="min-w-[460px] h-[690px]"
            className="hidden rounded-[20px] sm:block"
          />
        </div>
      </DivContent>
    </div>
  )
}

export default AboutBlock
