'use client'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivContent from './components/DivContent'
import DivText from './components/DivText'
import Gallery from './galleryComponents/Gallery'
import { useSetRecoilState } from 'recoil'
import showModalZakazAtom from '@/state/showModalZakazAtom'

const Title = ({ className }) => (
  <div
    className={cn(
      'w-[190px] phoneH:w-[200px] sm:w-[220px] md:w-[260px] tablet:w-[400px] text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px]',
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
    Привезу реквизит и <SpanGradientTitle>сделаю все сам</SpanGradientTitle>
  </div>
)

const GalleryBlock = () => {
  const setShowModalZakaz = useSetRecoilState(showModalZakazAtom)

  return (
    <div className="relative flex flex-col items-center w-full">
      <DivContent className="flex flex-col items-center gap-y-[20px]">
        <div className="flex items-start xl:items-center justify-between flex-col max-w-[520px] tablet:max-w-[680px] xl:max-w-full xl:flex-row gap-x-[200px]">
          <div className="flex flex-col gap-y-[50px]">
            <Title />
            <Button
              className="hidden xl:block"
              onClick={() => setShowModalZakaz(true)}
            />
          </div>
          <DivText className="tablet:max-w-[680px] max-w-[270px] sm:max-w-[400px] md:max-w-[520px] mt-[30px] xl:mt-0">
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Я сделаю иллюзионное шоу под ключ.{' '}
            </span>
            Это значит, что вам нужно просто позвать меня, остальное я сделаю
            сам.
            <br />
            <br />
            <span
              style={{
                fontWeight: 700,
              }}
            >
              Я сам подберу программу номера{' '}
            </span>
            под ваш праздник, привезу оборудование и реквизиты, все установлю и
            проведу шоу. <br />
            <br />
            <span
              style={{
                fontWeight: 700,
              }}
            >
              После такого представления{' '}
            </span>
            гости долго будут находиться под впечатлениями и не понимать, как
            такое возможно в реальной жизни.
          </DivText>
        </div>
      </DivContent>
      <div className="relative z-10 w-full xl:px-[52px]">
        <Gallery type={1} />
      </div>
      <div
        className="absolute hidden md:block xl:hidden right-0 z-10 w-[207px] h-[265px] 2xl:w-[235px] 2xl:h-[303px] top-[90px] aspect-[235/303]"
        style={{
          // width: 289,
          // height: '28%',
          flexShrink: 0,
          background: 'url("/img/hand2.png")',
          mixBlendMode: 'hard-light',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="absolute left-[calc(15%-400px)] top-[150px]"
        style={{
          width: 320,
          height: 509,
          transform: 'rotate(135deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
      <div
        className="absolute left-[calc(15%-490px)] top-[100px]"
        style={{
          width: 258,
          height: 410,
          transform: 'rotate(-165deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(64deg, #773FCA 0%, #8E42FF 71.51%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
      <div
        className="absolute right-[calc(15%-350px)] top-[300px] xl:top-[680px]"
        style={{
          width: 260,
          height: 413,
          transform: 'rotate(30deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(63deg, #4272D1 0%, #83ACFF 100%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
      <div
        className="absolute right-[calc(15%-340px)] top-[700px] xl:top-[1080px]"
        style={{
          width: 209,
          height: 332,
          transform: 'rotate(90deg)',
          borderRadius: 900,
          opacity: 0.6,
          background: 'linear-gradient(64deg, #773FCA 0%, #8E42FF 71.51%)',
          boxShadow: '6px 6px 26px 0px rgba(255, 255, 255, 0.35) inset',
          filter: 'blur(177.5px)',
        }}
      />
    </div>
  )
}

export default GalleryBlock
