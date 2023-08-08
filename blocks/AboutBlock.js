'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px] text-center xl:text-left',
      className
    )}
    style={{
      color: '#FFF',
      /* Title H1 -- First Block */
      fontFamily: 'Buyan',
      // fontSize: 84,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '100%' /* 84px */,
    }}
  >
    <SpanGradientTitle>20 лет дарю эмоции</SpanGradientTitle> людям
    <br />
    при помощи иллюзий
  </div>
)

const ListItem = ({ children }) => (
  <div className="flex gap-x-[14px] md:gap-x-[20px] items-center justify-start">
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
    <div className="flex-1 text-[13px] md:text-[19px] font-normal text-white">
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
      'flex flex-col gap-y-[18px] min-w-[340px] max-w-[400px] sm:min-w-[460px] md:min-w-[600px] sm:max-w-[460px] md:max-w-[600px]',
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

const ImgSpring = ({ className }) => (
  <img
    // className="object-cover min-w-[270px] md:min-w-[360px] inline aspect-[9/7]"
    className={className}
    alt="gif"
    src="/img/cardsSpring.gif"
    style={{
      background:
        'linear-gradient(320deg, rgba(96, 139, 246, 0.60) 0%, rgba(96, 139, 246, 0.00) 32.66%, rgba(134, 123, 255, 0.00) 78.17%, rgba(134, 123, 255, 0.60) 100%), rgba(0, 0, 0, 0.06)',
      backgroundBlendMode: 'color-dodge, normal',
    }}
    draggable={false}
  />
)

const AboutBlock = () => {
  return (
    <DivContent className="flex flex-col items-center gap-y-[20px]">
      <div className="flex gap-x-[100px] flex-wrap xl:flex-nowrap justify-center gap-y-[78px]">
        <div className="flex flex-col items-center flex-1">
          <Title />
          <ImgSpring className="mt-[35px] sm:hidden rounded-[10px] object-cover w-[240px] h-[360px]" />
          <div>
            <div className="mt-[30px] sm:mt-[60px] text-[14px] md:text-[21px] font-bold text-white">
              Меня зовут Алексей Белинский, и я иллюзионист:
            </div>
            <List className="mt-[20px] sm:mt-[25px]" />
          </div>
        </div>
        <ImgSpring className="hidden sm:block rounded-[20px] object-cover min-w-[460px] h-[690px]" />
      </div>
    </DivContent>
  )
}

export default AboutBlock
