'use client'

import React from 'react'
import cn from 'classnames'
import SpanGradientTitle from './components/SpanGradientTitle'
import Button from './components/Button'
import DivText from './components/DivText'
import { useRecoilState, useSetRecoilState } from 'recoil'
import showModalZakazAtom from '@/state/showModalZakazAtom'

const Title = ({ className }) => (
  <div
    className={cn(
      'text-black font-bold text-center w-[250px] phoneH:w-[280px] sm:w-[320px] md:w-[360px] tablet:w-[560px] text-[29px] phoneH:text-[32px] sm:text-[36px] md:text-[42px] tablet:text-[64px]',
      className
    )}
    style={{
      fontFamily: 'Buyan',
      lineHeight: '100%' /* 84px */,
    }}
  >
    <SpanGradientTitle>Оставьте заявку</SpanGradientTitle>, чтобы
    <br />
    обсудить шоу для вас
  </div>
)

const ModalZakaz = () => {
  const [showModalZakaz, setShowModalZakaz] = useRecoilState(showModalZakazAtom)

  return (
    <div
      className={cn(
        'transition-opacity duration-500 overflow-hidden fixed top-0 left-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-80',
        showModalZakaz ? 'opacity-100 w-screen' : 'opacity-0 w-0'
      )}
      onClick={() => setShowModalZakaz(false)}
    >
      <div
        className="relative flex flex-col items-center bg-white rounded-[30px] px-[65px] py-[60px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute flex items-center justify-center h-[28px] w-[28px] top-[24px] right-[29px] cursor-pointer group"
          onClick={() => setShowModalZakaz(false)}
        >
          <svg
            className="duration-300 group-hover:scale-125"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <g clip-path="url(#clip0_72_4080)">
              <path
                d="M0 19.6L6.84 9.84L0.16 0H4.2L9.12 7.76L13.64 0H17.84L11.4 9.52L18.08 19.6H14.04L9.08 11.88L4.04 19.6H0Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_72_4080">
                <rect width="18.08" height="19.6" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <Title />
        <DivText
          className="text-[#8888AB] text-center text-[17px] font-medium mt-[25px]"
          style={{
            lineHeight: '135%' /* 22.95px */,
          }}
        >
          Заполните форму и мы свяжемся с вами{' '}
          <span className="font-bold">
            в течение
            <br />
            15 минут
          </span>
          , чтобы подробно обсудить шоу.
        </DivText>
        <DivText
          className="text-[#8888AB] text-center mt-[15px]"
          style={{
            lineHeight: '135%' /* 22.95px */,
          }}
          size="small"
        >
          При необходимости договоримся о личной встрече.
        </DivText>
        <div
          className="mt-[35px] flex items-center w-full rounded-[7px]"
          style={{
            background:
              'linear-gradient(341deg, rgba(96, 139, 246, 0.16) 0%, rgba(96, 139, 246, 0.00) 100%), linear-gradient(0deg, #EDEDED 0%, #EDEDED 100%), #FFF',
            boxShadow: '0px 25px 36px 0px rgba(255, 255, 255, 0.20) inset',
          }}
        >
          <input
            className="w-full text-[#0e0e1ce6] py-[30px] px-[35px] text-[19px] font-medium bg-transparent outline-none"
            style={{
              lineHeight: '125%' /* 23.75px */,
              letterSpacing: '0.76px',
            }}
            placeholder="+7 ("
          />
        </div>
        <div className="w-full">
          <Button noShadow fullWidth className="mt-[15px] max-w-full">
            Перезвоните мне
          </Button>
        </div>
        <DivText
          className="text-[#8888AB] text-center text-[16px] font-normal mt-[25px]"
          style={{
            lineHeight: '135%' /* 22.95px */,
          }}
          size="small"
        >
          Нажимая на кнопку, вы соглашаетесь на{' '}
          <span className="underline">обработку персональных данных</span>
        </DivText>
      </div>
    </div>
  )
}

export default ModalZakaz
