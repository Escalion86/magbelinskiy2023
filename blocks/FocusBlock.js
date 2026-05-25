'use client'

import React, { useState } from 'react'
import SpanGradientTitle from './components/SpanGradientTitle'
import DivContent from './components/DivContent'
import BackLight from './components/BackLight'
import Image from 'next/image'
import { motion } from 'framer-motion'
import cn from 'classnames'
import { useSetAtom } from 'jotai'
import showModalFocusResultAtom from '@state/atoms/showModalFocusResultAtom'
import yandexAimAtom from '@state/atoms/yandexAimAtom'

const Title = ({ className }) => (
  <div
    className={cn(
      'font-buyan phoneH:text-[32px] tablet:text-[64px] text-center text-[29px] leading-[100%] font-bold text-white sm:text-[36px] md:text-left md:text-[42px]',
      className
    )}
  >
    Хочешь <SpanGradientTitle>фокус</SpanGradientTitle>?
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

const FocusBlock = () => {
  const setShowModalFocusResult = useSetAtom(showModalFocusResultAtom)
  const setYandexAim = useSetAtom(yandexAimAtom)
  const [focusStart, setFocusStart] = useState(false)

  return (
    <div className="relative flex w-full min-w-screen justify-center">
      <div className="absolute top-0 left-0 aspect-[558/1614] w-[25%] opacity-20 md:-top-[150px] md:left-[min(calc(3%-60px),0px)] md:w-[320px] md:opacity-50">
        <Image
          // className="object-cover min-w-[270px] md:min-w-[360px] inline aspect-[9/7]"
          alt="glass"
          src="/img/broken_glass_left.png"
          draggable={false}
          fill
          sizes="300px"
          priority={false}
        />
      </div>
      <div className="absolute right-0 bottom-[0px] aspect-[572/1621] w-[25%] opacity-20 sm:bottom-[20px] md:right-[min(calc(3%-60px),0px)] md:-bottom-[240px] md:w-[300px] md:opacity-50 xl:-bottom-[240px]">
        <Image
          // className="object-cover min-w-[270px] md:min-w-[360px] inline aspect-[9/7]"
          alt="glass"
          src="/img/broken_glass_right.png"
          draggable={false}
          fill
          sizes="300px"
          priority={false}
        />
      </div>
      <BackLight
        className="-top-[80px] left-[calc(7.5%-300px)] md:-top-[90px]"
        opacity={30}
      />
      <BackLight
        className="-top-[80px] right-0 md:top-[460px] md:translate-x-1/2 xl:top-[220px]"
        opacity={10}
      />
      <DivContent className="flex flex-col items-center gap-y-[20px]">
        <div className="flex w-full flex-wrap justify-center gap-x-[100px] gap-y-[78px] xl:flex-nowrap">
          <div className="flex flex-1 flex-col items-center">
            <Title />
            <div className="xs:max-w-[400px] phoneH:max-w-[450px] flex w-full max-w-[300px] flex-col items-center px-[50px] sm:max-w-[550px] md:max-w-[750px]">
              <div className="mt-[20px] text-[14px] font-bold text-white sm:mt-[60px] md:text-[21px]">
                Посмотри на эти 5 карт...
                <br />
                Не торопись и <SpanGold>МЫСЛЕННО</SpanGold>
                {' выбери '}
                <SpanGold>ОДНУ</SpanGold>
                {' карту!'}
                <br />
                {'А затем нажми на кнопку "Я выбрал карту"'}
              </div>
              <div className="xs:h-28 phoneH:h-32 relative mt-10 h-24 w-full sm:h-36 md:h-48">
                <motion.div
                  transition={{ duration: 1, delay: 9 }}
                  animate={{ opacity: focusStart ? 0 : 100 }}
                  initial={{ opacity: 100 }}
                  className="xs:w-[50px] phoneH:w-[62px] absolute left-0 aspect-[224/313] w-[45px] -translate-x-1/2 rounded-[4px] bg-white p-2 sm:w-[80px] md:w-[100px]"
                >
                  <Image
                    alt="9_Dimonds"
                    src="/img/focus/9D.png"
                    draggable={false}
                    sizes="100px"
                    fill
                  />
                </motion.div>
                <motion.div
                  transition={{ duration: 1, delay: 10 }}
                  animate={{
                    left: focusStart ? '50%' : '25%',
                    scale: focusStart ? 1.4 : 1,
                    translateX: '-50%',
                  }}
                  initial={{
                    left: '25%',
                    scale: 1,
                    translateX: '-50%',
                  }}
                  className="xs:w-[50px] phoneH:w-[62px] absolute aspect-[224/313] w-[45px] transform rounded-[4px] bg-white p-2 sm:w-[80px] md:w-[100px]"
                >
                  <Image
                    alt="4_Hearts"
                    src="/img/focus/4H.png"
                    draggable={false}
                    fill
                    sizes="100px"
                  />
                </motion.div>
                <motion.div
                  transition={{ duration: 1, delay: 9 }}
                  animate={{ opacity: focusStart ? 0 : 100 }}
                  initial={{ opacity: 100 }}
                  className="xs:w-[50px] phoneH:w-[62px] absolute left-[50%] aspect-[224/313] w-[45px] -translate-x-1/2 rounded-[4px] bg-white p-2 sm:w-[80px] md:w-[100px]"
                >
                  <Image
                    alt="Ace_Hearts"
                    src="/img/focus/AD.png"
                    draggable={false}
                    fill
                    sizes="100px"
                  />
                </motion.div>
                <motion.div
                  transition={{ duration: 1, delay: 9 }}
                  animate={{ opacity: focusStart ? 0 : 100 }}
                  initial={{ opacity: 100 }}
                  className="xs:w-[50px] phoneH:w-[62px] absolute left-[75%] aspect-[224/313] w-[45px] -translate-x-1/2 rounded-[4px] bg-white p-2 sm:w-[80px] md:w-[100px]"
                >
                  <Image
                    alt="7_Clubs"
                    src="/img/focus/7C.png"
                    draggable={false}
                    fill
                    sizes="100px"
                  />
                </motion.div>
                <motion.div
                  transition={{ duration: 1, delay: 9 }}
                  animate={{ opacity: focusStart ? 0 : 100 }}
                  initial={{ opacity: 100 }}
                  className="xs:w-[50px] phoneH:w-[62px] absolute left-[100%] aspect-[224/313] w-[45px] -translate-x-1/2 rounded-[4px] bg-white p-2 sm:w-[80px] md:w-[100px]"
                >
                  <Image
                    alt="King_Dimonds"
                    src="/img/focus/KH.png"
                    draggable={false}
                    fill
                    sizes="100px"
                  />
                </motion.div>
              </div>
              <div className="relative h-12 w-full">
                <div
                  className={cn(
                    'absolute top-0 right-0 bottom-0 left-0 z-10 flex justify-center',
                    focusStart ? 'z-0' : 'z-20'
                  )}
                >
                  <button
                    className={cn(
                      'border-opacity-20 h-[40px] rounded-[10px] border border-white px-[20px] text-[15px] font-medium text-white duration-300 hover:border-[#FFCA45] hover:text-[#FFCA45] md:h-[46px] md:text-[19px]',
                      focusStart ? 'opacity-0' : 'cursor-pointer'
                    )}
                    onClick={() => setFocusStart(true)}
                  >
                    Я выбрал карту
                  </button>
                </div>
                <motion.div
                  transition={{ duration: 2, delay: 7 }}
                  animate={{ opacity: focusStart ? 0 : 100 }}
                  initial={{ opacity: 100 }}
                  className="absolute top-0 right-0 bottom-0 left-0 z-10 flex justify-center gap-x-2"
                >
                  <motion.div
                    transition={{ duration: 2, delay: 1 }}
                    animate={{ opacity: focusStart ? 100 : 0 }}
                    initial={{ opacity: 0 }}
                    className="text-[14px] text-white md:text-[21px]"
                  >
                    Ну чтож...
                  </motion.div>
                  <motion.div
                    transition={{ duration: 2, delay: 3 }}
                    animate={{ opacity: focusStart ? 100 : 0 }}
                    initial={{ opacity: 0 }}
                    className="text-[14px] text-white md:text-[21px]"
                  >
                    Дай подумать...
                  </motion.div>
                  <motion.div
                    transition={{ duration: 2, delay: 5.5 }}
                    animate={{ opacity: focusStart ? 100 : 0 }}
                    initial={{ opacity: 0 }}
                    className="text-[14px] text-white md:text-[21px]"
                  >
                    Я думаю...
                  </motion.div>
                </motion.div>
                <motion.div
                  transition={{ duration: 2, delay: 9 }}
                  animate={{ opacity: focusStart ? 100 : 0 }}
                  initial={{ opacity: 0 }}
                  className="absolute top-0 right-0 bottom-0 left-0 z-10 w-full text-center text-[14px] font-bold text-white md:text-[21px]"
                >
                  ТВОЯ КАРТА <SpanGold>4 ЧЕРВИ</SpanGold>!
                </motion.div>
              </div>
              <motion.div
                transition={{ duration: 1, delay: 10.5 }}
                animate={{ opacity: focusStart ? 100 : 0 }}
                initial={{ opacity: 0 }}
                className="relative flex h-12 w-full justify-center gap-x-10"
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center gap-x-10">
                  <button
                    className="border-opacity-20 h-[40px] rounded-[10px] border border-white px-[20px] text-[15px] font-medium text-white duration-300 hover:border-[#FFCA45] hover:text-[#FFCA45] md:h-[46px] md:text-[19px]"
                    onClick={() => {
                      setYandexAim('after_focus_form')
                      setShowModalFocusResult('right')
                    }}
                  >
                    УГАДАЛ
                  </button>
                  <button
                    className="border-opacity-20 h-[40px] rounded-[10px] border border-white px-[20px] text-[15px] font-medium text-white duration-300 hover:border-[#FFCA45] hover:text-[#FFCA45] md:h-[46px] md:text-[19px]"
                    onClick={() => {
                      setYandexAim('after_focus_form')
                      setShowModalFocusResult('wrong')
                    }}
                  >
                    НЕ УГАДАЛ
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </DivContent>
    </div>
  )
}

export default FocusBlock
